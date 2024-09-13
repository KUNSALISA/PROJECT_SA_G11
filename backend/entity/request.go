package entity

import (
	"gorm.io/gorm"
)

type Request struct {
	gorm.Model
	Category     string
	First_Name   string
	Last_Name    string
	Email        string
	Subject      string
	Mobile_Phone string
	Message      string

	// MemberID ทำหน้าที่เป็น FK
	MemberID *uint
	Member   Member `gorm:"foreignKey:MemberID"`
}
