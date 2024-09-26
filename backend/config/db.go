// package config

// import (
//     "fmt"
//     "log"
//     "time"

//     "example.com/paymentSystem/entity"
//     "gorm.io/driver/sqlite"
//     "gorm.io/gorm"
// )

// var db *gorm.DB

// // DB คืนค่าการเชื่อมต่อฐานข้อมูล
// func DB() *gorm.DB {
//     return db
// }

// // ConnectionDB เชื่อมต่อกับฐานข้อมูล
// func ConnectionDB() {
//     database, err := gorm.Open(sqlite.Open("projectsa.db?cache=shared"), &gorm.Config{})
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

//     // สร้างข้อมูลตัวอย่างสำหรับ Member
//     members := []entity.Member{
//         {
//             Password:   "hashedpassword1", // ควรใช้ฟังก์ชันแฮชจริง
//             Email:      "john.doe@example.com",
//             FirstName:  "John",
//             LastName:   "Doe",
//             Birthday:   time.Date(1990, time.January, 1, 0, 0, 0, 0, time.UTC),
//             Gender:     "Male",
//             TotalPoint: 100,
//         },
//         {
//             Password:   "hashedpassword2", // ควรใช้ฟังก์ชันแฮชจริง
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

//     // สร้างข้อมูลตัวอย่างสำหรับ Booking
//     bookings := []entity.Booking{
//         {
//             BookingDate: time.Now(),
//             TotalPrice:  "5000.00",
//         },
//         {
//             BookingDate: time.Now(),
//             TotalPrice:  "7500.00",
//         },
//     }

//     for _, booking := range bookings {
//         err := db.FirstOrCreate(&booking, entity.Booking{BookingDate: booking.BookingDate, TotalPrice: booking.TotalPrice}).Error
//         if err != nil {
//             log.Printf("Error creating booking: %v", err)
//         }
//     }

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

//     fmt.Println("Database setup completed with seed data.")
// }

package config

import (
    "fmt"
    "log"
    "os"
    "time"

    "example.com/paymentSystem/entity"
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

var db *gorm.DB

// DB คืนค่าการเชื่อมต่อฐานข้อมูล
func DB() *gorm.DB {
    return db
}

// ConnectionDB เชื่อมต่อกับฐานข้อมูล
func ConnectionDB() {
    // ใช้ environment variable สำหรับชื่อฐานข้อมูล
    dbName := os.Getenv("DB_NAME")
    if dbName == "" {
        dbName = "projectsa.db?cache=shared" // ค่าเริ่มต้น
    }

    database, err := gorm.Open(sqlite.Open(dbName), &gorm.Config{})
    if err != nil {
        panic("failed to connect database")
    }
    fmt.Println("Connected to database")
    db = database
}

// SetupDatabase ทำการ AutoMigrate และสร้างข้อมูลตัวอย่าง
func SetupDatabase() {
    // ทำการ AutoMigrate ตารางทั้งหมด
    err := db.AutoMigrate(
        &entity.Member{},
        &entity.Booking{},
        &entity.Benefits{},
        &entity.Payment{},
    )
    if err != nil {
        log.Fatalf("AutoMigrate failed: %v", err)
    }

    // แยกการสร้างข้อมูลตัวอย่างออกเป็นฟังก์ชัน
    seedMembers()
    seedBookings()
    seedBenefits()
    seedPayments()

    fmt.Println("Database setup completed with seed data.")
}

func seedMembers() {
    // สร้างข้อมูลตัวอย่างสำหรับ Member
    members := []entity.Member{
        {
            Password:   "$2a$14$wXG6mPqFZP/7Qm5dXn8e7OvE9yJZiLrj1g5HjE9MjOcT8p1vFQZla", // hashedpassword1
            Email:      "john.doe@example.com",
            FirstName:  "John",
            LastName:   "Doe",
            Birthday:   time.Date(1990, time.January, 1, 0, 0, 0, 0, time.UTC),
            Gender:     "Male",
            TotalPoint: 100,
        },
        {
            Password:   "$2a$14$O3Hv5A6V4ZlHjK3x7N8e7OvE9yJZiLrj1g5HjE9MjOcT8p1vFQZlb", // hashedpassword2
            Email:      "jane.smith@example.com",
            FirstName:  "Jane",
            LastName:   "Smith",
            Birthday:   time.Date(1992, time.February, 2, 0, 0, 0, 0, time.UTC),
            Gender:     "Female",
            TotalPoint: 200,
        },
    }

    for _, member := range members {
        err := db.FirstOrCreate(&member, entity.Member{Email: member.Email}).Error
        if err != nil {
            log.Printf("Error creating member %s: %v", member.Email, err)
        }
    }
}

func seedBookings() {
    // สร้างข้อมูลตัวอย่างสำหรับ Booking
    bookings := []entity.Booking{
        {
            BookingDate: time.Now(),
            TotalPrice:  5000.00,
        },
        {
            BookingDate: time.Now(),
            TotalPrice:  7500.00,
        },
    }

    for _, booking := range bookings {
        err := db.FirstOrCreate(&booking, entity.Booking{BookingDate: booking.BookingDate, TotalPrice: booking.TotalPrice}).Error
        if err != nil {
            log.Printf("Error creating booking: %v", err)
        }
    }
}

func seedBenefits() {
    // สร้างข้อมูลตัวอย่างสำหรับ Benefits
    benefits := []entity.Benefits{
        {
            BenefitsName:  "Discount 10%",
            FlyingFrom:    "BKK",
            GoingTo:       "DMK",
            PointRequired: 50,
            Quantity:      100,
            Code:          "DISC10",
            Trip:          "Domestic",
            Type:          "Standard",
        },
        {
            BenefitsName:  "Free Upgrade",
            FlyingFrom:    "CNX",
            GoingTo:       "HKT",
            PointRequired: 150,
            Quantity:      50,
            Code:          "UPGRADE",
            Trip:          "International",
            Type:          "Premium",
        },
    }

    for _, benefit := range benefits {
        err := db.FirstOrCreate(&benefit, entity.Benefits{Code: benefit.Code}).Error
        if err != nil {
            log.Printf("Error creating benefit %s: %v", benefit.Code, err)
        }
    }
}

func seedPayments() {
    // สร้างข้อมูลตัวอย่างสำหรับ Payment
    payments := []entity.Payment{
        {
            PaymentStatus: true,
            PaymentDate:   time.Now(),
            PaymentTime:   "14:30",
            MemberID:      1, // อ้างอิงไปยัง MemberID 1
            BookingID:     1, // อ้างอิงไปยัง BookingID 1
            BenefitID:     1, // อ้างอิงไปยัง BenefitID 1
        },
        {
            PaymentStatus: false,
            PaymentDate:   time.Now(),
            PaymentTime:   "16:45",
            MemberID:      2, // อ้างอิงไปยัง MemberID 2
            BookingID:     2, // อ้างอิงไปยัง BookingID 2
            BenefitID:     2, // อ้างอิงไปยัง BenefitID 2
        },
    }

    for _, payment := range payments {
        err := db.FirstOrCreate(&payment, entity.Payment{
            MemberID:  payment.MemberID,
            BookingID: payment.BookingID,
            BenefitID: payment.BenefitID,
        }).Error
        if err != nil {
            log.Printf("Error creating payment for MemberID %d, BookingID %d, BenefitID %d: %v", payment.MemberID, payment.BookingID, payment.BenefitID, err)
        }
    }
}
