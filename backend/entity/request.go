package entity

import (
	"gorm.io/gorm"
)

type Request struct {
	gorm.Model
	Category    string `json:"category"`
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	Email       string `json:"email"`
	Subject     string `json:"subject"`
	MobilePhone string `json:"mobile_phone"`
	Message     string `json:"message"`

	// MemberID ทำหน้าที่เป็น FK
	MemberID *uint
	Member   Member `gorm:"foreignKey:MemberID"`
}
