package entity

import (

	"gorm.io/gorm"

)

type Booking_food_beverage struct {
	gorm.Model
	
	BookingID *uint
	Booking Booking`gorm:"foreignKey:BookingID"`

	Food_beverageID *uint
	Food_beverage Food_beverage`gorm:"foreignKey:Food_beverageID"`
	
}