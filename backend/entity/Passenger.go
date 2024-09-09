package entity

import (
	"time"

	"gorm.io/gorm"
)

type Passenger struct {
	gorm.Model

	first_name      string
	last_name       string
	gender          string
	birthday        time.Time
	email           string
	phone           string
	passport_number string
	passport_date   string

	MemberID *uint
	Member   Member `gorm:"foreignKey:MemberID"`

	Booking_passenger []Booking_passenger `gorm:"foreignKey:PassengerID"`
}
