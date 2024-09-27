// package controller

// import (
//     "net/http"
//     "example.com/paymentSystem/entity"
//     "example.com/paymentSystem/config"
//     "github.com/gin-gonic/gin"
// )

// // POST /Benefits
// func CreateBenefits(c *gin.Context) {
//     var benefit entity.Benefits
//     if err := c.ShouldBindJSON(&benefit); err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     if err := config.DB().Create(&benefit).Error; err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     c.JSON(http.StatusCreated, gin.H{"data": benefit})
// }

// // GET /Benefits
// func GetBenefits(c *gin.Context) {
//     var benefits []entity.Benefits

//     db := config.DB()
//     results := db.Find(&benefits)
//     if results.Error != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
//         return
//     }

//     c.JSON(http.StatusOK, benefits)
// }

// // GET /Benefits/:id
// func GetBenefitsID(c *gin.Context) {
//     var benefit entity.Benefits
//     id := c.Param("id")

//     if err := config.DB().First(&benefit, id).Error; err != nil {
//         c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
//         return
//     }

//     c.JSON(http.StatusOK, gin.H{"data": benefit})
// }

// // DELETE /Benefits/:id
// func DeleteBenefits(c *gin.Context) {
//     id := c.Param("id")
//     if tx := config.DB().Delete(&entity.Benefits{}, id); tx.RowsAffected == 0 {
//         c.JSON(http.StatusNotFound, gin.H{"error": "Benefits not found"})
//         return
//     }

//     c.JSON(http.StatusOK, gin.H{"data": id})
// }

// // PATCH /Benefits/:id
// func UpdateBenefits(c *gin.Context) {
//     var benefit entity.Benefits
//     id := c.Param("id")

//     if err := config.DB().First(&benefit, id).Error; err != nil {
//         c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
//         return
//     }

//     if err := c.ShouldBindJSON(&benefit); err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     if err := config.DB().Save(&benefit).Error; err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     c.JSON(http.StatusOK, gin.H{"data": benefit})
// }

package controller

import (
	"net/http"
	"strconv"

	"github.com/KUNSALISA/PROJECT_SA_G11/config"
	"github.com/KUNSALISA/PROJECT_SA_G11/entity"
	"github.com/gin-gonic/gin"
)

// POST /Benefits
func CreateBenefits(c *gin.Context) {
	var benefit entity.Benefits
	if err := c.ShouldBindJSON(&benefit); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// เพิ่มการตรวจสอบความถูกต้องของข้อมูล
	if benefit.BenefitsName == "" || benefit.Code == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "BenefitsName and Code are required"})
		return
	}

	if err := config.DB().Create(&benefit).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": benefit})
}

// GET /Benefits
func GetBenefits(c *gin.Context) {
	var benefits []entity.Benefits

	// เพิ่มการแบ่งหน้า
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	offset := (page - 1) * limit

	db := config.DB()
	results := db.Offset(offset).Limit(limit).Find(&benefits)
	if results.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, benefits)
}

// GET /Benefits/:id
func GetBenefitsID(c *gin.Context) {
	var benefit entity.Benefits
	id := c.Param("id")

	if err := config.DB().First(&benefit, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": benefit})
}

// DELETE /Benefits/:id
func DeleteBenefits(c *gin.Context) {
	id := c.Param("id")
	if tx := config.DB().Delete(&entity.Benefits{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Benefits not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Benefits/:id
func UpdateBenefits(c *gin.Context) {
	var benefit entity.Benefits
	id := c.Param("id")

	if err := config.DB().First(&benefit, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	var input entity.Benefits
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// อัปเดตฟิลด์ที่ได้รับจาก input
	if input.BenefitsName != "" {
		benefit.BenefitsName = input.BenefitsName
	}
	if input.FlyingFrom != "" {
		benefit.FlyingFrom = input.FlyingFrom
	}
	if input.GoingTo != "" {
		benefit.GoingTo = input.GoingTo
	}
	if input.PointRequired != 0 {
		benefit.PointRequired = input.PointRequired
	}
	if input.Quantity != 0 {
		benefit.Quantity = input.Quantity
	}
	if input.Code != "" {
		benefit.Code = input.Code
	}
	if input.Trip != "" {
		benefit.Trip = input.Trip
	}
	if input.Type != "" {
		benefit.Type = input.Type
	}

	if err := config.DB().Save(&benefit).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": benefit})
}
