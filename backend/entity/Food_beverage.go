package entity

import (

	"gorm.io/gorm"

)

type Food_beverage struct {
	gorm.Model
	
	name string
	price float64
	category string
	status string

	Booking_food_beverage []Booking_food_beverage `gorm:"foreignKey:Food_beverageID"`
}