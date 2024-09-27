package config

import (
	"fmt"
	"time"

	"github.com/KUNSALISA/PROJECT_SA_G11/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

// ฟังก์ชันสำหรับการคืนค่าการเชื่อมต่อฐานข้อมูล
func DB() *gorm.DB {
	return db
}

// ฟังก์ชันสำหรับเชื่อมต่อฐานข้อมูล
func ConnectionDB() {
	// เชื่อมต่อกับฐานข้อมูล SQLite
	database, err := gorm.Open(sqlite.Open("HELPCENTER.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	fmt.Println("connected database")
	db = database
}

// ฟังก์ชันสำหรับการตั้งค่าฐานข้อมูลและสร้าง schema
func SetupDatabase() {
	// AutoMigrate สำหรับ entity ต่าง ๆ
	db.AutoMigrate(
		&entity.Admin{},
		&entity.Member{},
		&entity.Benefits{},
		&entity.Notification{},
		&entity.Request{},
	)

	// Hash รหัสผ่าน
	hashedPassword, _ := HashPassword("160593")

	// กำหนดวันเกิดในรูปแบบที่ถูกต้อง
	Birthday, _ := time.Parse("2006-01-02", "1993-05-16")

	// กำหนดข้อมูลสมาชิก
	Member := &entity.Member{
		Password:    hashedPassword,
		Email:       "iu@gmail.com", // ค่าควรไม่ซ้ำกัน
		FirstName:   "Jieun",
		LastName:    "Lee",
		Birthday:    Birthday,
		Gender:      "Female",
		TotalPoints: 16593, // เปลี่ยนชื่อให้สอดคล้องกัน
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
