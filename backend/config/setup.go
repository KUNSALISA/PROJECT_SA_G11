package config

import (
	"log"
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
		&entity.Point_Calculator{},
		&entity.Benefits{},
		&entity.Notification{},
		&entity.Request{},
		&entity.Booking{},
		&entity.Payment{},
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
		{AirlineName: "NokAir"},
		{AirlineName: "Thai Airways"},
		{AirlineName: "Vietjet"},
		// {AirlineName: "Bangkok Airways"},
		// {AirlineName: "Thai Lion Air"},
		// {AirlineName: "Qantas"},
		// {AirlineName: "NokAir"},
		// {AirlineName: "Vietjet"},
		// {AirlineName: "Lufthansa"},
		// {AirlineName: "China Southern Airlines"},
		// {AirlineName: "China Eastern Airline"},
		// {AirlineName: "Turkish"},
		// {AirlineName: "Hainan"},
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
			AirlineID:     UintPtr(4),
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

	BenefitsDetails := []entity.Benefits{
		// {BenefitsName: "Bangkok (Suvarnabhumi) - Samui", FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Samui", PointRequired: 6500, Quantity: 10, Code: "sFlfg487", Class: "Business",Trip: "One Way", Img: ""},
		{BenefitsName: "Bangkok (Suvarnabhumi) - Samui", FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Samui", PointRequired: 4000, Quantity: 10, Code: "Agjyj201", Class: "Economy",Trip: "One Way", 
		Img1: "https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4MpR4CLyh1p02j54vC6f1SHzCFBa86m8YSZtm0MOyGFOxDqJCop.webp", 
		Img2: "https://ik.imagekit.io/tvlk/blog/2022/01/%E0%B8%96%E0%B8%99%E0%B8%99%E0%B8%84%E0%B8%99%E0%B9%80%E0%B8%94%E0%B8%B4%E0%B8%99%E0%B8%9A%E0%B9%88%E0%B8%AD%E0%B8%9C%E0%B8%B8%E0%B8%9401.jpg?tr=dpr-2,w-675", 
		Img3: "https://www.fairhousevillas.com/blog/wp-content/uploads/2023/01/%E0%B9%84%E0%B8%9B%E0%B9%80%E0%B8%81%E0%B8%B2%E0%B8%B0%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%A2-2-2-1024x602.jpg"},
		// {BenefitsName: "Bangkok (Suvarnabhumi) - Maldives", FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Maldives", PointRequired: 14000, Quantity: 10, Code: "liuaq006", Class: "Business",Trip: "One Way"},
		{BenefitsName: "Bangkok (Suvarnabhumi) - Maldives", FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Maldives", PointRequired: 11500, Quantity: 10, Code: "jsoem493", Class: "Economy",Trip: "One Way", 
		Img1: "https://flyerbonus-official-store.bangkokair.com/uploads/temp/05bacab3-ac18-47cd-a567-7e7eba8a5bc8/file_dfx38jmx.jpg",
		Img2: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/180000/180680-Maldives-All.jpg", 
		Img3: "https://flyerbonus-official-store.bangkokair.com/uploads/temp/cf82f160-b364-4aef-a0e2-cc630c070d33/file_mvbx4j3q.png"},
		// {BenefitsName: "Bangkok (Suvarnabhumi) - Lampang", FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Lampang", PointRequired: 5000, Quantity: 10, Code: "Yoash039", Class: "Business",Trip: "One Way"},
		{BenefitsName: "Bangkok (Suvarnabhumi) - Lampang", FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Lampang", PointRequired: 2500, Quantity: 10, Code: "Hqpeo348", Class: "Economy",Trip: "One Way", 
		Img1: "https://blog.bangkokair.com/wp-content/uploads/2023/09/Lampang-rainy-seasons-scaled.jpeg",
		Img2: "https://www.checkinchill.com/wp-content/uploads/shutterstock_2216900917.jpg", 
		Img3: "https://www.ktc.co.th/pub/media/Article/08/ktc-KaoFu.webp"},
		// {BenefitsName: "Bangkok (Suvarnabhumi) - Phuket", FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Phuket", PointRequired: 5000, Quantity: 10, Code: "cnosd882", Class: "Business",Trip: "One Way"},
		{BenefitsName: "Bangkok (Suvarnabhumi) - Phuket", FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Phuket", PointRequired: 2500, Quantity: 10, Code: "Udcnn235", Class: "Economy",Trip: "One Way", 
		Img1: "https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2024/05/%E0%B8%94%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD-2024-05-20T120256.309.png",
		Img2: "https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2024/05/%E0%B8%94%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD-2024-05-20T131237.222.png", 
		Img3: "https://www.ananda.co.th/blog/thegenc/wp-content/uploads/2024/05/%E0%B8%94%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%B1%E0%B8%87%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD-2024-05-20T124256.553.png"},
		// {BenefitsName: "Bangkok (Suvarnabhumi) - Trat", FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Trat", PointRequired: 5000, Quantity: 10, Code: "Wewld398", Class: "Business",Trip: "One Way"},
		{BenefitsName: "Bangkok (Suvarnabhumi) - Trat", FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Trat", PointRequired: 2500, Quantity: 10, Code: "spdmk948", Class: "Economy",Trip: "One Way", 
		Img1: "https://ik.imagekit.io/tvlk/blog/2019/03/shutterstock_480954832-800x534.jpg?tr=dpr-2,w-675",
		Img2: "https://s359.kapook.com//pagebuilder/3f189b3c-c90c-4c86-8a5f-c48763345b83.jpg", 
		Img3: "https://cms.dmpcdn.com/travel/2020/03/09/03fee100-61e2-11ea-8884-dfd81909e81a_original.JPG"},
		// {BenefitsName: "Bangkok (Suvarnabhumi) - Chiang Mai", FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Chiang Mai", PointRequired: 5000, Quantity: 10, Code: "Vosdl455", Class: "Business",Trip: "One Way"},
		{BenefitsName: "Bangkok (Suvarnabhumi) - Chiang Mai", FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Chiang Mai", PointRequired: 2500, Quantity: 10, Code: "kdfai588", Class: "Economy",Trip: "One Way", 
		Img1: "https://v4i.rweb-images.com/www.maehongsongreentravel.com/images/editor/Chiang%20Mai/%e0%b9%80%e0%b8%8a%e0%b8%b5%e0%b8%a2%e0%b8%87%e0%b9%83%e0%b8%ab%e0%b8%a1%e0%b9%88.jpg",
		Img2: "https://www.checkinchill.com/wp-content/uploads/checkinchill-14-9-2023-161.jpg", 
		Img3: "https://www.checkinchill.com/wp-content/uploads/shutterstock_1895810143.jpg"},
		// {BenefitsName: "Bangkok (Suvarnabhumi) - Sukhothai", FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Sukhothai", PointRequired: 5000, Quantity: 10, Code: "Dsaop358", Class: "Business",Trip: "One Way"},
		{BenefitsName: "Bangkok (Suvarnabhumi) - Sukhothai", FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Sukhothai", PointRequired: 2500, Quantity: 10, Code: "akdpU482", Class: "Economy",Trip: "One Way", 
		Img1: "https://www.legendhasukhothai.com/image/39894277300SUKHOTHAI-HISTORICAL-PARK.jpg",
		Img2: "https://sundayz.me/wp-content/uploads/2020/03/kaoluang-sukhothai-21.jpg", 
		Img3: "https://travel.mthai.com/app/uploads/2014/06/20140623_3_1403514199_120767.jpg"},
		// {BenefitsName: "Chiang Mai - Krabi", FlyingFrom: "Chiang Mai", GoingTo: "Krabi", PointRequired: 9000, Quantity: 10, Code: "hyKrs329", Class: "Business",Trip: "One Way"},
		{BenefitsName: "Chiang Mai - Krabi", FlyingFrom: "Chiang Mai", GoingTo: "Krabi", PointRequired: 6500, Quantity: 10, Code: "sRpeo396", Class: "Economy",Trip: "One Way", 
		Img1: "https://s359.kapook.com//pagebuilder/3dc6d425-c9da-459b-bc46-1ede891bb45e.jpg",
		Img2: "https://roijang.com/wp-content/uploads/2022/12/shutterstock_2061926990.jpg", 
		Img3: "https://roijang.com/wp-content/uploads/2022/12/shutterstock_289362893.jpg"},
	}
	for _, pkg := range BenefitsDetails {
		db.FirstOrCreate(&pkg,entity.Benefits{Code: pkg.Code})
	}

	PointCal := []entity.Point_Calculator{
		{FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Samui", Point: 750, Class: "Business"},
		{FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Samui", Point: 500, Class: "Economy"},
		{FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Maldives", Point: 750, Class: "Business"},
		{FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Maldives", Point: 500, Class: "Economy"},
		{FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Lampang", Point: 750, Class: "Business"},
		{FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Lampang", Point: 500, Class: "Economy"},
		{FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Phuket", Point: 750, Class: "Business"},
		{FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Phuket", Point: 500, Class: "Economy"},
		{FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Trat", Point: 750, Class: "Business"},
		{FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Trat", Point: 500, Class: "Economy"},
		{FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Chiang Mai", Point: 750, Class: "Business"},
		{FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Chiang Mai", Point: 500, Class: "Economy"},
		{FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Sukhothai", Point: 750, Class: "Business"},
		{FlyingFrom: "Bangkok (Suvarnabhum)", GoingTo: "Sukhothai", Point: 500, Class: "Economy"},
		{FlyingFrom: "Chiang Mai", GoingTo: "Krabi", Point: 750, Class: "Business"},
		{FlyingFrom: "Chiang Mai", GoingTo: "Krabi", Point: 500, Class: "Economy"},
	}
	for _, pcloop := range PointCal {
		db.FirstOrCreate(&pcloop,entity.Point_Calculator{GoingTo: pcloop.GoingTo, Point: pcloop.Point})
	}
}

