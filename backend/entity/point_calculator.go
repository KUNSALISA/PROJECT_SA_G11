package entity

import "gorm.io/gorm"

type Point_Calculator struct {
	gorm.Model
	FlyingFrom	string
	GoingTo		string
	Class		string
	ClassCode 	string
	Point		uint

	AirlineID *uint
	Airline Airline `gorm:"foreignKey:AirlineID"`

}