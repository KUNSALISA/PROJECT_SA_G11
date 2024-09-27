package entity

import (
	"time"

	"gorm.io/gorm"
)

type FlightAndFlightDetails struct {
	gorm.Model

	FlightDate time.Time 

	FlightDetailID *uint
	FlightDetail   FlightDetails `gorm:"foreignKey:FlightDetailID"`

	AdminID *uint
	Admin   Admin `gorm:"foreignKey:admin_id"`

	Booking_flight_and_flight_details []Booking_flight_and_flight_details `gorm:"foreignKey:FlightAndFlightDetailsID"`
}
