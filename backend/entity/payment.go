// package entity

// import (
// 	"time"

// 	"gorm.io/gorm"
// )

// type Payment struct {
// 	gorm.Model
// 	PaymentStatus bool
// 	PaymentDate   time.Time
// 	PaymentTime   string

// 	MemberID  uint
// 	BookingID uint
// 	BenefitID uint
// }

package entity

import (
    "time"

    "gorm.io/gorm"
)

type Payment struct {
    gorm.Model
    PaymentStatus bool      `gorm:"not null"`
    PaymentDate   time.Time `gorm:"not null"`
    PaymentTime   string    `gorm:"not null"`

    MemberID  uint          `gorm:"not null"`
    BookingID uint          `gorm:"not null"`
    BenefitID uint          `gorm:"not null"`

    Member    Member    `gorm:"foreignKey:MemberID"`
    Booking   Booking   `gorm:"foreignKey:BookingID"`
    Benefit   Benefits  `gorm:"foreignKey:BenefitID"`
}