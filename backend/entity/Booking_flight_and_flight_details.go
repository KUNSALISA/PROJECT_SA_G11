package entity

import (

	"gorm.io/gorm"

)

type BookingFlightAndFlightDetails struct {
	gorm.Model

	Type string
	
	BookingID *uint
	Booking Booking`gorm:"foreignKey:BookingID"`

	FlightAndFlightDetailsID *uint
	FlightAndFlightDetails FlightAndFlightDetails`gorm:"foreignKey:FlightAndFlightDetailsID"`
	
}