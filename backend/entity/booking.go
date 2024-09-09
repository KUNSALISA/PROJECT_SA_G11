package entity

import (
	"time"

	"gorm.io/gorm"
)

type Booking struct {
	gorm.Model
	BookingDate time.Time
	TotalPrice  string

	// 1 booking เป็นเจ้าของได้หนึ่ง payment
	PAYMENT Payment `gorm:"foreignKey:BookingID"`

	Booking_passenger                 []Booking_passenger                 `gorm:"foreignKey:BookingID"`
	Booking_seat                      []Booking_seat                      `gorm:"foreignKey:BookingID"`
	Booking_baggage                   []Booking_baggage                   `gorm:"foreignKey:BookingID"`
	Booking_food_beverage             []Booking_food_beverage             `gorm:"foreignKey:BookingID"`
	Booking_flight_and_flight_details []Booking_flight_and_flight_details `gorm:"foreignKey:BookingID"`
}
