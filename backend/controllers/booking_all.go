package controllers

import (
	"time"
	"net/http"
    "github.com/KUNSALISA/PROJECT_SA_G11/config"
	"github.com/KUNSALISA/PROJECT_SA_G11/entity"
	"github.com/gin-gonic/gin"
    "fmt"
)


func GetBookingAll(c *gin.Context){
	var booking entity.Booking

	//if err := c.ShouldBindJSON(&booking); err != nil {
	//	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	//	return
	//}

	if err := config.DB().
		Preload("BookingBaggage.Baggage").
		Preload("BookingPassenger.Passenger").
		Preload("BookingFlightAndFlightDetails.FlightAndFlightDetails").
		Find(&booking).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": booking})
}

func GetBookingAllID(c *gin.Context) {
	var booking entity.Booking
	id := c.Param("id")

	if err := config.DB().
		Preload("BookingBaggage.Baggage").
		Preload("BookingPassenger.Passenger").
		Preload("BookingFlightAndFlightDetails.FlightAndFlightDetails").
		First(&booking,id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
		return
	}

	// Return the booking details in JSON format
	c.JSON(http.StatusOK, gin.H{"data": booking})
}


func timeParseHelper(dateStr string, layout string) time.Time {
    t, err := time.Parse(layout, dateStr)
    if err != nil {
        return time.Time{} // Or handle the error accordingly
    }
    return t
}


func CreateBookingAll(c *gin.Context) {
    var booking entity.Booking

    // Bind the JSON input to the booking struct
    if err := c.ShouldBindJSON(&booking); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    db := config.DB()

    // Create the main booking record
    newBooking := entity.Booking{
        BookingDate: time.Now(),
        TotalPrice:  booking.TotalPrice,
    }

    // Save the booking
    if err := db.Create(&newBooking).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to create booking"})
        return
    }

    // Handle the booking passengers
    for _, bookingPassenger := range booking.BookingPassenger {
        // Create the passenger
        newPassenger := entity.Passenger{
            FirstName:       bookingPassenger.Passenger.FirstName,
            LastName:        bookingPassenger.Passenger.LastName,
            Gender:          bookingPassenger.Passenger.Gender,
            BirthDay:        bookingPassenger.Passenger.BirthDay,
            Email:           bookingPassenger.Passenger.Email,
            Phone:           bookingPassenger.Passenger.Phone,
            PassportNumber:  bookingPassenger.Passenger.PassportNumber,
            PassportDate:    bookingPassenger.Passenger.PassportDate,
        }

        if err := db.Create(&newPassenger).Error; err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to create passenger"})
            return
        }

        // Create the booking-passenger association
        bp := entity.BookingPassenger{
            BookingID:   &newBooking.ID,
            PassengerID: &newPassenger.ID,
        }

        if err := db.Create(&bp).Error; err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to create booking-passenger association"})
            return
        }
    }

    // Handle the booking baggage
    for _, bookingBaggage := range booking.BookingBaggage {
        // Create the baggage
        newBaggage := entity.Baggage{
            Weight: bookingBaggage.Baggage.Weight,
            Price:  bookingBaggage.Baggage.Price,
        }

        if err := db.Create(&newBaggage).Error; err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to create baggage"})
            return
        }

        // Create the booking-baggage association
        bb := entity.BookingBaggage{
            BookingID: &newBooking.ID,
            BaggageID: &newBaggage.ID,
        }

        if err := db.Create(&bb).Error; err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to create booking-baggage association"})
            return
        }
    }

    // Handle the booking flight details
    for _, bookingFlightDetail := range booking.BookingFlightAndFlightDetails {
        bookingFlight := entity.BookingFlightAndFlightDetails{
            BookingID:              &newBooking.ID,
            FlightAndFlightDetailsID: bookingFlightDetail.FlightAndFlightDetailsID,
            Type: bookingFlightDetail.Type,
        }

        if err := db.Create(&bookingFlight).Error; err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to create booking-flight details association"})
            return
        }
    }

    fmt.Println("TotalPrice received: ", booking.TotalPrice)

    // Return success message
    c.JSON(http.StatusCreated, gin.H{
        "message": "Booking created successfully",
        "data":    newBooking,
    })
}
