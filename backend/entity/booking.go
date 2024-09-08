package entity

import (
	"time"

	"gorm.io/gorm"
)

type Booking struct {
	gorm.Model  
	BookingDate   time.Time
	TotalPrice 	  string

	// 1 booking เป็นเจ้าของได้หนึ่ง payment
	PAYMENT Payment `gorm:"foreignKey:BookingID"`
}