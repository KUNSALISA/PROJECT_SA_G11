package entity

import (

	"gorm.io/gorm"

)

type BookingBaggage struct {
	gorm.Model
	
	BookingID *uint
	Booking Booking`gorm:"foreignKey:BookingID"`

	BaggageID *uint
	Baggage Baggage`gorm:"foreignKey:BaggageID"`
	
}