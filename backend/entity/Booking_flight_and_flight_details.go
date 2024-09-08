package entity

import (

	"gorm.io/gorm"

)

type Booking_flight_and_flight_details struct {
	gorm.Model

	Type string
	
	BookingID *uint
	Booking Booking`gorm:"foreignKey:BookingID"`

	FlightAndFlightDetailsID *uint
	FlightAndFlightDetails FlightAndFlightDetails`gorm:"foreignKey:FlightAndFlightDetailsID"`
	
}