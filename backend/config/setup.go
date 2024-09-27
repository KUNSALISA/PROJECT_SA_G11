package config

import (
	"time"

	"github.com/KUNSALISA/PROJECT_SA_G11/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func UintPtr(i uint) *uint {
	return &i
}

func SetupDatabase() {
	// เปิดการเชื่อมต่อฐานข้อมูล SQLite
	database, err := gorm.Open(sqlite.Open("G11_PROJECT.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// ทำการ AutoMigrate เพื่อสร้างตารางตามโครงสร้างของ Entity ที่กำหนด
	database.AutoMigrate(
		&entity.Admin{},
		&entity.Airline{},
		&entity.Airport{},
		&entity.FlightAndFlightDetails{},
		&entity.FlightDetails{},
		&entity.TypeOfFlight{},
		&entity.Member{},
		&entity.Benefits{},
		&entity.Notification{},
		&entity.Request{},
	)
	db = database

	// สร้างข้อมูลผู้ใช้ (Admin)
	hashedPassword, _ := HashPassword("admin")
	birthday, _ := time.Parse("2006-01-02", "2003-08-15")
	admins := []entity.Admin{
		{
			Email:     "Admin@gmail.com",
			Password:  hashedPassword,
			FirstName: "Salisa",
			LastName:  "Manage",
			Birthday:  birthday,
		},
	}
	for _, admin := range admins {
		db.FirstOrCreate(&admin, entity.Admin{Email: admin.Email})
	}

	// สร้างข้อมูลประเภทเที่ยวบิน (TypeOfFlight)
	flightTypes := []entity.TypeOfFlight{
		{TypeFlight: "Departures"},
		{TypeFlight: "Domestic flight"},
	}
	for _, flightType := range flightTypes {
		db.FirstOrCreate(&flightType, entity.TypeOfFlight{TypeFlight: flightType.TypeFlight})
	}

	// สร้างข้อมูลสายการบิน (Airline)
	airlines := []entity.Airline{
		{AirlineName: "AirAsia"},
		{AirlineName: "Thai Airways"},
		{AirlineName: "Bangkok Airways"},
		{AirlineName: "Thai Lion Air"},
		{AirlineName: "Qantas"},
		{AirlineName: "NokAir"},
		{AirlineName: "Vietjet"},
		{AirlineName: "Lufthansa"},
		{AirlineName: "China Southern Airlines"},
		{AirlineName: "China Eastern Airline"},
		{AirlineName: "Turkish"},
		{AirlineName: "Hainan"},
	}
	for _, airline := range airlines {
		db.FirstOrCreate(&airline, entity.Airline{AirlineName: airline.AirlineName})
	}

	// สร้างข้อมูลสนามบิน (Airport)
	airports := []entity.Airport{
		{AirportName: "Suvarnabhumi Airport", AirportCode: "BKK"},
		{AirportName: "Don Mueang International Airport", AirportCode: "DMK"},
		{AirportName: "Chiang Mai International Airport", AirportCode: "CNX"},
		{AirportName: "Phuket International Airport", AirportCode: "HKT"},
		{AirportName: "Samui Airport", AirportCode: "USM"},
	}
	for _, airport := range airports {
		db.FirstOrCreate(&airport, entity.Airport{AirportName: airport.AirportName})
	}

	// ดึงข้อมูลที่เกี่ยวข้องเพื่อนำมาใช้ในข้อมูล FlightDetails
	var airline entity.Airline
	var flyingFrom, goingTo entity.Airport
	var flightType entity.TypeOfFlight

	db.First(&airline, "airline_name = ?", "AirAsia")
	db.First(&flyingFrom, "airport_name = ?", "Suvarnabhumi Airport")
	db.First(&goingTo, "airport_name = ?", "Don Mueang International Airport")
	db.First(&flightType, "type_flight = ?", "Departures")

	// ตรวจสอบการดึงข้อมูล
	if airline.ID == 0 || flyingFrom.ID == 0 || goingTo.ID == 0 || flightType.ID == 0 {
		panic("related data not found")
	}

	// สร้างข้อมูลรายละเอียดเที่ยวบิน (FlightDetails)
	flightDetails := []entity.FlightDetails{
		{
			FlightCode:    "FD4113",
			ScheduleStart: time.Date(2023, 9, 10, 8, 30, 0, 0, time.UTC),
			ScheduleEnd:   time.Date(2023, 9, 10, 12, 30, 0, 0, time.UTC),
			Hour:          4,
			Cost:          100,
			Point:         10,
			AirlineID:     UintPtr(airline.ID),
			FlyingFromID:  UintPtr(flyingFrom.ID),
			GoingToID:     UintPtr(goingTo.ID),
			TypeID:        UintPtr(flightType.ID),
		},
		{
			FlightCode:    "AA102",
			ScheduleStart: time.Date(2023, 10, 5, 9, 45, 0, 0, time.UTC),
			ScheduleEnd:   time.Date(2023, 10, 5, 13, 45, 0, 0, time.UTC),
			Hour:          4,
			Cost:          150,
			Point:         20,
			AirlineID:     UintPtr(3), // ID ของสายการบินที่กำหนด
			FlyingFromID:  UintPtr(1), // ID ของสนามบินต้นทาง
			GoingToID:     UintPtr(4), // ID ของสนามบินปลายทาง
			TypeID:        UintPtr(2), // ID ของประเภทเที่ยวบิน
		},
		{
			FlightCode:    "TG202",
			ScheduleStart: time.Date(2023, 12, 15, 11, 15, 0, 0, time.UTC),
			ScheduleEnd:   time.Date(2023, 12, 15, 15, 15, 0, 0, time.UTC),
			Hour:          4,
			Cost:          200,
			Point:         30,
			AirlineID:     UintPtr(6),
			FlyingFromID:  UintPtr(5),
			GoingToID:     UintPtr(3),
			TypeID:        UintPtr(1),
		},
	}

	// แทรกหรืออัปเดตข้อมูล FlightDetails
	for _, flightDetail := range flightDetails {
		db.Where(entity.FlightDetails{FlightCode: flightDetail.FlightCode}).
			Assign(flightDetail).FirstOrCreate(&flightDetail)
	}

	// Hash รหัสผ่าน
	hashedPassword, _ = HashPassword("160593")

	// กำหนดวันเกิดในรูปแบบที่ถูกต้อง
	Birthday, _ := time.Parse("2006-01-02", "1993-05-16")

	// กำหนดข้อมูลสมาชิก
	Member := &entity.Member{
		Password:    hashedPassword,
		Email:       "iu@gmail.com",
		FirstName:   "Jieun",
		LastName:    "Lee",
		Birthday:    Birthday,
		Gender:      "Female",
		TotalPoint: 16593,
	}

	// ตรวจสอบและสร้างสมาชิกถ้าไม่พบในระบบ
	db.FirstOrCreate(Member, &entity.Member{
		Email: "iu@gmail.com",
	})

	Notification := &entity.Notification{
		Read:    false,
		Context: "บินฟรีเชียงใหม่-สมุย เพียงใช้คะแนนสะสม 9000 คะแนน",
	}

	db.FirstOrCreate(Notification, &entity.Notification{
		Context: "บินฟรีเชียงใหม่-สมุย เพียงใช้คะแนนสะสม 9000 คะแนน",
	})

	Request := &entity.Request{
		Category:    "Payment",
		FirstName:   "Jieun",
		LastName:    "Lee",
		Email:       "iu@gmail.com",
		Subject:     "ปัญหาการชำระเงิน",
		MobilePhone: "0987654321",
		Message:     "ชำระเงิน...",
	}

	db.FirstOrCreate(Request, &entity.Request{
		Category:    "Payment",
		FirstName:   "Jieun",
		LastName:    "Lee",
		Email:       "iu@gmail.com",
		Subject:     "ปัญหาการชำระเงิน",
		MobilePhone: "0987654321",
		Message:     "ชำระเงิน...",
	})
}

// package config

// import (
//     "fmt"
//     "log"
//     "os"
//     "time"

//     "example.com/paymentSystem/entity"
//     "gorm.io/driver/sqlite"
//     "gorm.io/gorm"
// )

// var db *gorm.DB

// func DB() *gorm.DB {
//     return db
// }

// func ConnectionDB() {
//     // ใช้ environment variable สำหรับชื่อฐานข้อมูล
//     dbName := os.Getenv("DB_NAME")
//     if dbName == "" {
//         dbName = "projectsa.db?cache=shared" // ค่าเริ่มต้น
//     }

//     database, err := gorm.Open(sqlite.Open(dbName), &gorm.Config{})
//     if err != nil {
//         panic("failed to connect database")
//     }
//     fmt.Println("Connected to database")
//     db = database
// }

// // SetupDatabase ทำการ AutoMigrate และสร้างข้อมูลตัวอย่าง
// func SetupDatabase() {
//     // ทำการ AutoMigrate ตารางทั้งหมด
//     err := db.AutoMigrate(
//         &entity.Member{},
//         &entity.Booking{},
//         &entity.Benefits{},
//         &entity.Payment{},
//     )
//     if err != nil {
//         log.Fatalf("AutoMigrate failed: %v", err)
//     }

//     // แยกการสร้างข้อมูลตัวอย่างออกเป็นฟังก์ชัน
//     seedMembers()
//     seedBookings()
//     seedBenefits()
//     seedPayments()

//     fmt.Println("Database setup completed with seed data.")
// }

// func seedMembers() {
//     // สร้างข้อมูลตัวอย่างสำหรับ Member
//     members := []entity.Member{
//         {
//             Password:   "$2a$14$wXG6mPqFZP/7Qm5dXn8e7OvE9yJZiLrj1g5HjE9MjOcT8p1vFQZla", // hashedpassword1
//             Email:      "john.doe@example.com",
//             FirstName:  "John",
//             LastName:   "Doe",
//             Birthday:   time.Date(1990, time.January, 1, 0, 0, 0, 0, time.UTC),
//             Gender:     "Male",
//             TotalPoint: 100,
//         },
//         {
//             Password:   "$2a$14$O3Hv5A6V4ZlHjK3x7N8e7OvE9yJZiLrj1g5HjE9MjOcT8p1vFQZlb", // hashedpassword2
//             Email:      "jane.smith@example.com",
//             FirstName:  "Jane",
//             LastName:   "Smith",
//             Birthday:   time.Date(1992, time.February, 2, 0, 0, 0, 0, time.UTC),
//             Gender:     "Female",
//             TotalPoint: 200,
//         },
//     }

//     for _, member := range members {
//         err := db.FirstOrCreate(&member, entity.Member{Email: member.Email}).Error
//         if err != nil {
//             log.Printf("Error creating member %s: %v", member.Email, err)
//         }
//     }
// }

// func seedBookings() {
//     // สร้างข้อมูลตัวอย่างสำหรับ Booking
//     bookings := []entity.Booking{
//         {
//             BookingDate: time.Now(),
//             TotalPrice:  5000.00,
//         },
//         {
//             BookingDate: time.Now(),
//             TotalPrice:  7500.00,
//         },
//     }

//     for _, booking := range bookings {
//         err := db.FirstOrCreate(&booking, entity.Booking{BookingDate: booking.BookingDate, TotalPrice: booking.TotalPrice}).Error
//         if err != nil {
//             log.Printf("Error creating booking: %v", err)
//         }
//     }
// }

// func seedBenefits() {
//     // สร้างข้อมูลตัวอย่างสำหรับ Benefits
//     benefits := []entity.Benefits{
//         {
//             BenefitsName:  "Discount 10%",
//             FlyingFrom:    "BKK",
//             GoingTo:       "DMK",
//             PointRequired: 50,
//             Quantity:      100,
//             Code:          "DISC10",
//             Trip:          "Domestic",
//             Type:          "Standard",
//         },
//         {
//             BenefitsName:  "Free Upgrade",
//             FlyingFrom:    "CNX",
//             GoingTo:       "HKT",
//             PointRequired: 150,
//             Quantity:      50,
//             Code:          "UPGRADE",
//             Trip:          "International",
//             Type:          "Premium",
//         },
//     }

//     for _, benefit := range benefits {
//         err := db.FirstOrCreate(&benefit, entity.Benefits{Code: benefit.Code}).Error
//         if err != nil {
//             log.Printf("Error creating benefit %s: %v", benefit.Code, err)
//         }
//     }
// }

// func seedPayments() {
//     // สร้างข้อมูลตัวอย่างสำหรับ Payment
//     payments := []entity.Payment{
//         {
//             PaymentStatus: true,
//             PaymentDate:   time.Now(),
//             PaymentTime:   "14:30",
//             MemberID:      1, // อ้างอิงไปยัง MemberID 1
//             BookingID:     1, // อ้างอิงไปยัง BookingID 1
//             BenefitID:     1, // อ้างอิงไปยัง BenefitID 1
//         },
//         {
//             PaymentStatus: false,
//             PaymentDate:   time.Now(),
//             PaymentTime:   "16:45",
//             MemberID:      2, // อ้างอิงไปยัง MemberID 2
//             BookingID:     2, // อ้างอิงไปยัง BookingID 2
//             BenefitID:     2, // อ้างอิงไปยัง BenefitID 2
//         },
//     }

//     for _, payment := range payments {
//         err := db.FirstOrCreate(&payment, entity.Payment{
//             MemberID:  payment.MemberID,
//             BookingID: payment.BookingID,
//             BenefitID: payment.BenefitID,
//         }).Error
//         if err != nil {
//             log.Printf("Error creating payment for MemberID %d, BookingID %d, BenefitID %d: %v", payment.MemberID, payment.BookingID, payment.BenefitID, err)
//         }
//     }
// }
