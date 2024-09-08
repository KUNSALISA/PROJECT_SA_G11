package entity

import (
	"time"

	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	Email     string    `json:"email"`
	Password  string    `json:"password"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Birthday  time.Time `json:"birthday"`

	Admin []FlightAndFlightDetails `gorm:"foreignKey:AdminID"`

	// 1 admin เป็นเจ้าของได้หลาย Benefits
	Benefits []Benefits `gorm:"foreignKey:AdminID"`
}
