package entity

import (
	"time"

	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	PaymentStatus bool
	PaymentDate   time.Time
	PaymentTime   string

	MemberID  uint
	BookingID uint
	BenefitID uint
}