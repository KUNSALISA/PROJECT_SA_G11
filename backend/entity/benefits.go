package entity

import "gorm.io/gorm"

type Benefits struct {
	gorm.Model
	BenefitsName	string
	FlyingFrom		string
	GoingTo			string
	PointRequired	uint
	Quantity		uint
	Code			string
	Trip			string
	Type			string

	AirlineID *uint
	Airline Airline `gorm:"foreignKey:AirlineID"`

	AdminID *uint
	Admin Admin `gorm:"foreignKey:AdminID"`

	// 1 benefit เป็นเจ้าของได้หนึ่ง payment
	Payment Payment `gorm:"foreignKey:BenefitID"`
}