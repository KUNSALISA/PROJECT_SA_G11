package entity

import (

	"gorm.io/gorm"

)

type Booking_passenger struct {
	gorm.Model
	
	BookingID *uint
	Booking Booking`gorm:"foreignKey:BookingID"`

	PassengerID *uint
	Passenger Passenger`gorm:"foreignKey:PassengerID"`
	
}