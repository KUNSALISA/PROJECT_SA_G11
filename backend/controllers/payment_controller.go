package controllers

import (
	"math/rand"
	"net/http"
	"time"

	"github.com/KUNSALISA/PROJECT_SA_G11/config"
	"github.com/KUNSALISA/PROJECT_SA_G11/entity"
	"github.com/gin-gonic/gin"
)

// POST /Payment
func CreatePayment(c *gin.Context) {
    var payment entity.Payment
    if err := c.ShouldBindJSON(&payment); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if payment.PaymentDate.IsZero() {
        c.JSON(http.StatusBadRequest, gin.H{"error": "PaymentDate is required"})
        return
    }

    // ตรวจสอบว่าข้อมูล Member, Booking, และ Benefit ถูกต้องหรือไม่
    var member entity.Member
    if err := config.DB().First(&member, payment.MemberID).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
        return
    }

    var booking entity.Booking
    if err := config.DB().First(&booking, payment.BookingID).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Booking not found"})
        return
    }

    var benefit entity.Benefits
    if err := config.DB().First(&benefit, payment.BenefitID).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Benefit not found"})
        return
    }

    // เรียก mock payment API เพื่อจำลองการชำระเงิน
    paymentSuccess, message := MockPaymentProcessor(&payment)

    // บันทึกผลลัพธ์ของการชำระเงิน
    payment.PaymentStatus = paymentSuccess
    payment.PaymentDate = time.Now()
    payment.PaymentTime = time.Now().Format("15:04")

    if err := config.DB().Create(&payment).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if paymentSuccess {
        c.JSON(http.StatusCreated, gin.H{"message": message, "data": payment})
    } else {
        c.JSON(http.StatusBadRequest, gin.H{"error": message, "data": payment})
    }

    if payment.PaymentStatus {
        member.TotalPoint += benefit.PointRequired
        if err := config.DB().Save(&member).Error; err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }
    }
}

// GET /Payment
func GetPayment(c *gin.Context) {
    var payments []entity.Payment

    db := config.DB()
    results := db.Find(&payments)
    if results.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, payments)
}

// GET /Payment/:id
func GetPaymentID(c *gin.Context) {
    var payment entity.Payment
    id := c.Param("id")

    if err := config.DB().First(&payment, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": payment})
}

// DELETE /Payment/:id
func DeletePayment(c *gin.Context) {
    var payment entity.Payment
    id := c.Param("id")

    if err := config.DB().First(&payment, id).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    if err := config.DB().Delete(&payment).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Payment deleted successfully"})
}

// PATCH /Payment/:id
func UpdatePayment(c *gin.Context) {
    var payment entity.Payment
    id := c.Param("id")

    if err := config.DB().First(&payment, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }

    if err := c.ShouldBindJSON(&payment); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if payment.PaymentDate.IsZero() {
        c.JSON(http.StatusBadRequest, gin.H{"error": "PaymentDate is required"})
        return
    }

    if err := config.DB().Save(&payment).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": payment})
}

func MockPayment(c *gin.Context) {
    var payment entity.Payment

    // รับข้อมูลการชำระเงินจากผู้ใช้ (อาจจะเป็นแค่ข้อมูลจำลอง)
    if err := c.ShouldBindJSON(&payment); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // ตรวจสอบข้อมูลของ Member, Booking และ Benefit
    var member entity.Member
    if err := config.DB().First(&member, payment.MemberID).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Member not found"})
        return
    }

    var booking entity.Booking
    if err := config.DB().First(&booking, payment.BookingID).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Booking not found"})
        return
    }

    var benefit entity.Benefits
    if err := config.DB().First(&benefit, payment.BenefitID).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Benefit not found"})
        return
    }

    // สมมติการชำระเงินสำเร็จ (PaymentStatus = true)
    payment.PaymentStatus = true
    payment.PaymentDate = time.Now()
    payment.PaymentTime = time.Now().Format("15:04")

    // บันทึกการชำระเงินลงฐานข้อมูล
    if err := config.DB().Create(&payment).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Mock payment successful", "data": payment})
}

// Mock Payment Processor
func MockPaymentProcessor(payment *entity.Payment) (bool, string) {
    // Simulate calling a mock payment API by generating a random result
    rand.Seed(time.Now().UnixNano())
    success := rand.Intn(2) == 1 // Randomly determine if payment is successful or not
    if success {
        return true, "Payment Successful"
    } else {
        return false, "Payment Failed"
    }
}

// package controller

// import (
// 	"math/rand"
// 	"net/http"
// 	"strconv"
// 	"time"

// 	"example.com/paymentSystem/config"
// 	"example.com/paymentSystem/entity"
// 	"github.com/gin-gonic/gin"
// )

// // Helper function สำหรับตรวจสอบข้อมูล
// func validatePayment(payment *entity.Payment) (bool, string) {
//     var member entity.Member
//     if err := config.DB().First(&member, payment.MemberID).Error; err != nil {
//         return false, "Member not found"
//     }

//     var booking entity.Booking
//     if err := config.DB().First(&booking, payment.BookingID).Error; err != nil {
//         return false, "Booking not found"
//     }

//     var benefit entity.Benefits
//     if err := config.DB().First(&benefit, payment.BenefitID).Error; err != nil {
//         return false, "Benefit not found"
//     }

//     return true, ""
// }

// // Mock Payment Processor
// func MockPaymentProcessor() (bool, string) {
//     // Simulate calling a mock payment API by generating a random result
//     rand.Seed(time.Now().UnixNano())
//     success := rand.Intn(2) == 1 // Randomly determine if payment is successful or not
//     if success {
//         return true, "Payment Successful"
//     } else {
//         return false, "Payment Failed"
//     }
// }

// // POST /Payment
// func CreatePayment(c *gin.Context) {
//     var payment entity.Payment
//     if err := c.ShouldBindJSON(&payment); err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     if payment.PaymentDate.IsZero() {
//         c.JSON(http.StatusBadRequest, gin.H{"error": "PaymentDate is required"})
//         return
//     }

//     // ตรวจสอบความถูกต้องของข้อมูล
//     valid, message := validatePayment(&payment)
//     if !valid {
//         c.JSON(http.StatusBadRequest, gin.H{"error": message})
//         return
//     }

//     // เรียก Mock Payment Processor
//     paymentSuccess, message := MockPaymentProcessor()

//     // บันทึกผลลัพธ์ของการชำระเงิน
//     payment.PaymentStatus = paymentSuccess
//     payment.PaymentDate = time.Now()
//     payment.PaymentTime = time.Now().Format("15:04")

//     if err := config.DB().Create(&payment).Error; err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     if paymentSuccess {
//         // เพิ่ม TotalPoint ให้กับสมาชิก
//         var member entity.Member
//         if err := config.DB().First(&member, payment.MemberID).Error; err == nil {
//             member.TotalPoint += config.DB().Model(&entity.Benefits{}).Where("id = ?", payment.BenefitID).Take(&entity.Benefits{}).PointRequired
//             if err := config.DB().Save(&member).Error; err != nil {
//                 c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update member points"})
//                 return
//             }
//         }

//         c.JSON(http.StatusCreated, gin.H{"message": message, "data": payment})
//     } else {
//         c.JSON(http.StatusBadRequest, gin.H{"error": message, "data": payment})
//     }
// }

// // GET /Payment
// func GetPayment(c *gin.Context) {
//     var payments []entity.Payment

//     // เพิ่มการแบ่งหน้า
//     page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
//     limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
//     offset := (page - 1) * limit

//     db := config.DB()
//     results := db.Offset(offset).Limit(limit).Find(&payments)
//     if results.Error != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
//         return
//     }

//     c.JSON(http.StatusOK, payments)
// }

// // GET /Payment/:id
// func GetPaymentID(c *gin.Context) {
//     var payment entity.Payment
//     id := c.Param("id")

//     if err := config.DB().First(&payment, id).Error; err != nil {
//         c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
//         return
//     }

//     c.JSON(http.StatusOK, gin.H{"data": payment})
// }

// // DELETE /Payment/:id
// func DeletePayment(c *gin.Context) {
//     var payment entity.Payment
//     id := c.Param("id")

//     if err := config.DB().First(&payment, id).Error; err != nil {
//         c.JSON(http.StatusNotFound, gin.H{"error": "Payment not found"})
//         return
//     }

//     if err := config.DB().Delete(&payment).Error; err != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
//         return
//     }

//     c.JSON(http.StatusOK, gin.H{"message": "Payment deleted successfully"})
// }

// // PATCH /Payment/:id
// func UpdatePayment(c *gin.Context) {
//     var payment entity.Payment
//     id := c.Param("id")

//     if err := config.DB().First(&payment, id).Error; err != nil {
//         c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
//         return
//     }

//     var input entity.Payment
//     if err := c.ShouldBindJSON(&input); err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     if input.PaymentDate.IsZero() {
//         c.JSON(http.StatusBadRequest, gin.H{"error": "PaymentDate is required"})
//         return
//     }

//     // อัปเดตฟิลด์ที่ได้รับจาก input
//     payment.PaymentStatus = input.PaymentStatus
//     payment.PaymentDate = input.PaymentDate
//     payment.PaymentTime = input.PaymentTime
//     payment.MemberID = input.MemberID
//     payment.BookingID = input.BookingID
//     payment.BenefitID = input.BenefitID

//     if err := config.DB().Save(&payment).Error; err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     c.JSON(http.StatusOK, gin.H{"data": payment})
// }