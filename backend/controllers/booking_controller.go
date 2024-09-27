// package controller

// import (
//     "net/http"
//     "example.com/paymentSystem/entity"
//     "example.com/paymentSystem/config"
//     "github.com/gin-gonic/gin"
// )

// // POST /bookings
// func CreateBooking(c *gin.Context) {
//     var booking entity.Booking
//     if err := c.ShouldBindJSON(&booking); err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     if err := config.DB().Create(&booking).Error; err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     c.JSON(http.StatusCreated, gin.H{"data": booking})
// }

// // GET /bookings
// func GetBooking(c *gin.Context) {
//     var bookings []entity.Booking

//     db := config.DB()
//     results := db.Find(&bookings)
//     if results.Error != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
//         return
//     }

//     c.JSON(http.StatusOK, bookings)
// }

// // GET /bookings/:id
// func GetBookingID(c *gin.Context) {
//     var booking entity.Booking
//     id := c.Param("id")

//     if err := config.DB().First(&booking, id).Error; err != nil {
//         c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
//         return
//     }

//     c.JSON(http.StatusOK, gin.H{"data": booking})
// }

// // DELETE /bookings/:id
// func DeleteBooking(c *gin.Context) {
//     id := c.Param("id")
//     if tx := config.DB().Delete(&entity.Booking{}, id); tx.RowsAffected == 0 {
//         c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
//         return
//     }

//     c.JSON(http.StatusOK, gin.H{"data": id})
// }

// // PATCH /bookings/:id
// func UpdateBooking(c *gin.Context) {
//     var booking entity.Booking
//     id := c.Param("id")

//     if err := config.DB().First(&booking, id).Error; err != nil {
//         c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
//         return
//     }

//     if err := c.ShouldBindJSON(&booking); err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     if err := config.DB().Save(&booking).Error; err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     c.JSON(http.StatusOK, gin.H{"data": booking})
// }

package controller

import (
	"net/http"
	"strconv"
	"time"

	"github.com/KUNSALISA/PROJECT_SA_G11/config"
	"github.com/KUNSALISA/PROJECT_SA_G11/entity"
	"github.com/gin-gonic/gin"
)

// POST /bookings
func CreateBooking(c *gin.Context) {
    var booking entity.Booking
    if err := c.ShouldBindJSON(&booking); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // เพิ่มการตรวจสอบความถูกต้องของข้อมูล
    if booking.TotalPrice <= 0 || booking.BookingDate.IsZero() { // ตรวจสอบ TotalPrice เป็นค่าบวก
        c.JSON(http.StatusBadRequest, gin.H{"error": "BookingDate and TotalPrice are required and TotalPrice must be greater than zero"})
        return
    }

    if err := config.DB().Create(&booking).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"data": booking})
}

// GET /bookings
func GetBooking(c *gin.Context) {
    var bookings []entity.Booking

    // เพิ่มการแบ่งหน้า
    page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
    limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
    offset := (page - 1) * limit

    db := config.DB()
    results := db.Offset(offset).Limit(limit).Find(&bookings)
    if results.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, bookings)
}

// GET /bookings/:id
// GET /Member/:memberId/Bookings
func GetBookingID(c *gin.Context) {
    memberId := c.Param("memberId")

    var bookings []entity.Booking
    if err := config.DB().Where("member_id = ?", memberId).Find(&bookings).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    // คืนค่าราคา
    totalPrice := 0.0
    for _, booking := range bookings {
        totalPrice += booking.TotalPrice
    }

    c.JSON(http.StatusOK, gin.H{"memberId": memberId, "totalPrice": totalPrice, "bookings": bookings})
}


// DELETE /bookings/:id
func DeleteBooking(c *gin.Context) {
    id := c.Param("id")
    if tx := config.DB().Delete(&entity.Booking{}, id); tx.RowsAffected == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /bookings/:id
func UpdateBooking(c *gin.Context) {
    var booking entity.Booking
    id := c.Param("id")

    if err := config.DB().First(&booking, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }

    var input entity.Booking
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // อัปเดตฟิลด์ที่ได้รับจาก input
    if input.BookingDate != (time.Time{}) {
        booking.BookingDate = input.BookingDate
    }
    if input.TotalPrice > 0 { // ตรวจสอบให้ TotalPrice เป็นค่าบวก
        booking.TotalPrice = input.TotalPrice
    }

    if err := config.DB().Save(&booking).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": booking})
}
