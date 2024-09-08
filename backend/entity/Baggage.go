package entity

import (

	"gorm.io/gorm"

)

type Baggage struct {
	gorm.Model
	
	weight int
	price  float64
	status string
	
	Booking_baggage []Booking_baggage `gorm:"foreignKey:BaggageID"`
}