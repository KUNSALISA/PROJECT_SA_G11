package controllers

import (
	"net/http"
	"time"
	"github.com/KUNSALISA/PROJECT_SA_G11/config"
	"github.com/KUNSALISA/PROJECT_SA_G11/entity"
	"github.com/gin-gonic/gin"

)

type FlightResponse struct {
    ID              uint      
    Airline         string    
    DepartureTime   time.Time 
    ArrivalTime     time.Time 
	Hour			uint16
    Departure       string    
    Arrival         string    
    Price           uint16    
}


// GetAvailableFlights เป็นฟังก์ชันที่ค้นหาเที่ยวบินที่ว่างตามเงื่อนไขที่ผู้ใช้กรอก
func GetAvailableFlights(c *gin.Context) {
	// รับค่า query parameters จากผู้ใช้
	departure := c.Query("departure")        // รหัสสนามบินต้นทาง
	arrival := c.Query("arrival")            // รหัสสนามบินปลายทาง
	flightDate := c.Query("flight_date")     // วันที่เที่ยวบิน

	// ตรวจสอบรูปแบบของ flightDate ว่าเป็นรูปแบบ YYYY-MM-DD หรือไม่
	parsedDate, err := time.Parse("2006-01-02", flightDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid flight date format. Use YYYY-MM-DD."})
		return
	}

	// สร้างตัวแปรเพื่อเก็บข้อมูลเที่ยวบินที่ดึงมา
	var flightDetails []entity.FlightAndFlightDetails

	// ค้นหาข้อมูลจาก FlightAndFlightDetails และทำการ join ตารางที่เกี่ยวข้องเพื่อดึงข้อมูล
	err = config.DB().
		Joins("JOIN flight_details ON flight_and_flight_details.flight_detail_id = flight_details.id").       // Join ตาราง FlightDetails
		Joins("JOIN airlines ON flight_details.airline_id = airlines.id").                                    // Join ตาราง Airlines
		Joins("JOIN airports AS from_airport ON flight_details.flying_from_id = from_airport.id").            // Join ตารางสนามบินต้นทาง
		Joins("JOIN airports AS to_airport ON flight_details.going_to_id = to_airport.id").                   // Join ตารางสนามบินปลายทาง
		Preload("FlightDetail.Airline").                                                                      // โหลดข้อมูลสายการบิน
		Preload("FlightDetail.FlyingFrom").                                                                   // โหลดข้อมูลสนามบินต้นทาง
		Preload("FlightDetail.GoingTo").                                                                      // โหลดข้อมูลสนามบินปลายทาง
		Where("flight_and_flight_details.flight_date = ?", parsedDate).                                        // ใช้วันที่จาก FlightAndFlightDetails
		Where("from_airport.airport_code = ?", departure).                                                    // เงื่อนไขสนามบินต้นทาง
		Where("to_airport.airport_code = ?", arrival).                                                        // เงื่อนไขสนามบินปลายทาง
		Find(&flightDetails).Error                                                                            // ค้นหาและบันทึกผลใน flightDetails

	// ตรวจสอบว่ามีข้อผิดพลาดในการค้นหาหรือไม่
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบว่ามีเที่ยวบินที่ตรงกับเงื่อนไขหรือไม่
	if len(flightDetails) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "No flights found for the given criteria"})
		return
	}

	// แปลง flightDetails เป็น FlightResponse เพื่อส่งคืนข้อมูลที่ง่ายต่อ frontend
    var response []FlightResponse
    for _, flight := range flightDetails {
        response = append(response, FlightResponse{
            ID:            flight.ID,  // ฟิลด์ ID ของเที่ยวบิน
            Airline:       flight.FlightDetail.Airline.AirlineName,
            DepartureTime: flight.FlightDetail.ScheduleStart,
            ArrivalTime:   flight.FlightDetail.ScheduleEnd,
			Hour:		flight.FlightDetail.Hour,
            Departure:     flight.FlightDetail.FlyingFrom.AirportCode,
            Arrival:       flight.FlightDetail.GoingTo.AirportCode,
            Price:         flight.FlightDetail.Cost,
			
        })
    }

	// ส่งคืนข้อมูลเที่ยวบินพร้อมรายละเอียดทั้งหมด
	c.JSON(http.StatusOK, response)
}