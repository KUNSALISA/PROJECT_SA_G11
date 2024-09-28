package entity

import (

	"gorm.io/gorm"

)

type Baggage struct {
	gorm.Model
	
	Weight int
	Price  float64
	
	BookingBaggage []BookingBaggage `gorm:"foreignKey:BaggageID"`
}