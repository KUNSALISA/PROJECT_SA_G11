// package entity

// import (
// 	"time"

// 	"gorm.io/gorm"
// )

// type Booking struct {
// 	gorm.Model
// 	BookingDate time.Time
// 	TotalPrice  string

// 	// 1 booking เป็นเจ้าของได้หนึ่ง payment
// 	PAYMENT Payment `gorm:"foreignKey:BookingID"`

// 	Booking_passenger                 []Booking_passenger                 `gorm:"foreignKey:BookingID"`
// 	Booking_baggage                   []Booking_baggage                   `gorm:"foreignKey:BookingID"`
// 	Booking_flight_and_flight_details []Booking_flight_and_flight_details `gorm:"foreignKey:BookingID"`
// }

package entity

import (
    "time"

    "gorm.io/gorm"
)

type Booking struct {
    gorm.Model
    BookingDate time.Time
    TotalPrice  float64 // เปลี่ยนเป็น float64

    // 1 Booking สามารถมี 1 Payment
    Payment *Payment `gorm:"foreignKey:BookingID"`

    BookingPassenger []BookingPassenger `gorm:"foreignKey:BookingID"`
	BookingBaggage []BookingBaggage `gorm:"foreignKey:BookingID"`
	BookingFlightAndFlightDetails []BookingFlightAndFlightDetails `gorm:"foreignKey:BookingID"`
}