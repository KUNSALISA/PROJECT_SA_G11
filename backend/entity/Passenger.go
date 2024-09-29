package entity

import (
	
	"time"
	"gorm.io/gorm"

)

type Passenger struct {
	gorm.Model
	
	FirstName string
	LastName string
	Gender string
	BirthDay time.Time
	Email string
	Phone string
	PassportNumber string
	PassportDate string

	MemberID *uint
	Member Member`gorm:"foreignKey:MemberID"`

	BookingPassenger []BookingPassenger `gorm:"foreignKey:PassengerID"`
}