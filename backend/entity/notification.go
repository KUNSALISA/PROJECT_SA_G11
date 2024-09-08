package entity

import (
	"time"

	"gorm.io/gorm"
)

type Notification struct {
	gorm.Model
	Read      bool
	Create_At time.Time
	Update_At time.Time
	Context   string

	// MemberID ทำหน้าที่เป็น FK
	MemberID *uint
	Member   []Member `gorm:"foriegnKey:MemberID"`

	// BenefitsID ทำหน้าที่เป็น FK
	BenefitsID *uint
	Benefits   []Benefits `gorm:"foriegnKey:BenefitID"`
}
