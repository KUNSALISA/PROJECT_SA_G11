package entity

import (
	/* "time" */

	"gorm.io/gorm"
)

type Notification struct {
	gorm.Model
	Read bool `json:"read"`
	/* CreateAt time.Time `json:"creat_at"`
	UpdateAt time.Time `json:"update_at"` */
	Context string `json:"context"`

	// MemberID ทำหน้าที่เป็น FK
	MemberID *uint
	Member   Member `gorm:"foreignKey:MemberID"`

	// BenefitsID ทำหน้าที่เป็น FK
	BenefitsID *uint
	Benefits   Benefits `gorm:"foreignKey:BenefitsID"`
}
