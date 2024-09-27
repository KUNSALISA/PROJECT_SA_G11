package main

import (
	"github.com/KUNSALISA/PROJECT_SA_G11/config"
	"github.com/KUNSALISA/PROJECT_SA_G11/controllers"
	"github.com/gin-gonic/gin"
)

const PORT = "8080"

func main() {
	// เริ่มต้นเชื่อมต่อกับฐานข้อมูล
	config.SetupDatabase()

	// สร้าง Gin engine ใหม่
	r := gin.Default()

	// ใช้ CORS middleware
	r.Use(CORSMiddleware())

	// เส้นทางทั้งหมดจะไม่ต้องยืนยันตัวตน
	r.POST("/login", controllers.LoginByUsername)
	r.POST("/register", controllers.RegisterAdmin)

	// Airline routes
	r.GET("/airline", controllers.GetAirline)
	r.GET("/airline/:ID", controllers.GetAirlineByID)

	// Airport routes
	r.GET("/airport", controllers.GetAirports)
	r.GET("/airport/:ID", controllers.GetAirportByID)

	// TypeOfFlight routes
	r.GET("/TypeOfFlight", controllers.GetTypeOfFlight)
	r.GET("/TypeOfFlight/:ID", controllers.GetTypeOfFlightByID)

	// FlightDetails routes
	r.POST("/flight-details", controllers.CreateFlightDetails)
	r.GET("/flight-details", controllers.GetFlightDetails)
	r.GET("/flight-details/:id", controllers.GetFlightDetailsByID)
	r.PATCH("/flight-details", controllers.UpdateFlightDetails)
	r.DELETE("/flight-details/:id", controllers.DeleteFlightDetails)

	// Flight and FlightDetails combined routes
	r.POST("/flight-and-flight-details", controllers.CreateFlightAndFlightDetails)
	r.GET("/flight-and-flight-details", controllers.GetFlightAndFlightDetails)
	r.GET("/flight-and-flight-details/:id", controllers.GetFlightAndFlightDetailsByID)
	r.PUT("/flight-and-flight-details/:id", controllers.UpdateFlightAndFlightDetails)
	r.DELETE("/flight-and-flight-details/:id", controllers.DeleteFlightAndFlightDetails)

	// กำหนด routes สำหรับ notifications
	r.GET("/notifications", controllers.GetNotifications)
	r.GET("/notifications/:id", controllers.GetNotificationByID)
	r.POST("/notifications", controllers.CreateNotification)
	r.PUT("/notifications/:id", controllers.UpdateNotification)
	r.DELETE("/notifications/:id", controllers.DeleteNotification)

	// กำหนด routes สำหรับ requests
	r.GET("/requests", controllers.GetRequests)
	r.GET("/requests/:id", controllers.GetRequestByID)
	r.POST("/requests", controllers.CreateRequest)
	r.PUT("/requests/:id", controllers.UpdateRequest)
	r.DELETE("/requests/:id", controllers.DeleteRequest)

	// Group Routes
    benefitsRoutes := r.Group("/Benefits")
    {
        benefitsRoutes.POST("/", controllers.CreateBenefits)
        benefitsRoutes.GET("/:id", controllers.GetBenefitsID)
        benefitsRoutes.GET("/", controllers.GetBenefits)
        benefitsRoutes.DELETE("/:id", controllers.DeleteBenefits)
        benefitsRoutes.PATCH("/:id", controllers.UpdateBenefits)
    }
    
    bookingsRoutes := r.Group("/bookings")
    {
        bookingsRoutes.POST("/", controllers.CreateBooking)
        bookingsRoutes.GET("/:id", controllers.GetBookingID)
        bookingsRoutes.GET("/", controllers.GetBooking)
        bookingsRoutes.DELETE("/:id", controllers.DeleteBooking)
        bookingsRoutes.PATCH("/:id", controllers.UpdateBooking)
    }

    membersRoutes := r.Group("/Member")
    {
        membersRoutes.POST("/", controllers.CreateMember)
        membersRoutes.GET("/:id", controllers.GetMemberID)
        membersRoutes.GET("/", controllers.GetMember)
        membersRoutes.DELETE("/:id", controllers.DeleteMember)
        membersRoutes.PATCH("/:id", controllers.UpdateMember)
    }

    paymentsRoutes := r.Group("/Payment")
    {
        paymentsRoutes.POST("/", controllers.CreatePayment)
        paymentsRoutes.GET("/:id", controllers.GetPaymentID)
        paymentsRoutes.GET("/", controllers.GetPayment)
        paymentsRoutes.DELETE("/:id", controllers.DeletePayment)
        paymentsRoutes.PATCH("/:id", controllers.UpdatePayment)
        paymentsRoutes.POST("/Mock", controllers.CreatePayment) // ใช้ CreatePayment แทน MockPayment
    }

	// รันเซิร์ฟเวอร์ที่พอร์ตที่กำหนด
	r.Run("localhost:" + PORT)
}

// CORSMiddleware เป็น Middleware ที่ใช้เปิดการสนับสนุน CORS
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204) // หากเป็นคำขอ OPTIONS ให้ตอบกลับด้วย 204
			return
		}
		c.Next() // ดำเนินการต่อกับคำขอที่ไม่ใช่ OPTIONS
	}
}
