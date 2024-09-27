package entity

import (
	"time"

	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	Email     string    
	Password  string    
	FirstName string    
	LastName  string    
	Birthday  time.Time 

	Admin []FlightAndFlightDetails `gorm:"foreignKey:AdminID"`

	// 1 admin เป็นเจ้าของได้หลาย Benefits
	Benefits []Benefits `gorm:"foreignKey:AdminID"`
}
