package entity

import (

	"gorm.io/gorm"

)

type Booking_seat struct {
	gorm.Model
	
	BookingID *uint
	Booking Booking`gorm:"foreignKey:BookingID"`

	SeatID *uint
	Seat Seat`gorm:"foreignKey:SeatID"`
	
}