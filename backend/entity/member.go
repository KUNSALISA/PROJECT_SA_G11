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
	TotalPoint uint

	// 1 member เป็นเจ้าของได้หลาย payment
	Payment []Payment `gorm:"foreignKey:MemberID"`

	// 1 member เป็นเจ้าของได้หลาย Request
	Requests []Request `gorm:"foreignKey:MemberID"`

	// 1 member เป็นเจ้าของได้หลาย Notification
	Notifications []Notification `gorm:"foreignKey:MemberID"`

	Passenger []Passenger `gorm:"foreignKey:MemberID"`

	Point_Calculators []Point_Calculator `gorm:"many2many:Member_has_Point_Calculator"`
}
