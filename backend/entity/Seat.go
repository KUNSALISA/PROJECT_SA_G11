package entity

import (

	"gorm.io/gorm"

)

type Seat struct {
	gorm.Model
	
	seat_number string
	class  string
	price float64
	status string
	
	Booking_seat []Booking_seat `gorm:"foreignKey:SeatID"`
}