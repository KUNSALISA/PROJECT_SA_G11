package entity

import (
	"time"

	"gorm.io/gorm"
)

type Member struct {
	gorm.Model  
	Password   string
	Email      string
	FirstName  string
	LastName   string
	Birthday   time.Time
	Gender     string
	TotalPoint string

	// 1 member เป็นเจ้าของได้หลาย payment
	Payment []Payment `gorm:"foreignKey:MemberID"`
}