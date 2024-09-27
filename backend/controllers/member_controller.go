// package controller

// import (
//     "net/http"
//     "example.com/paymentSystem/entity"
//     "example.com/paymentSystem/config"
//     "github.com/gin-gonic/gin"
// )

// // POST /Member
// func CreateMember(c *gin.Context) {
//     var member entity.Member
//     if err := c.ShouldBindJSON(&member); err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     // TODO: Hash the password before saving
//     // member.Password = HashPassword(member.Password)

//     if err := config.DB().Create(&member).Error; err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     c.JSON(http.StatusCreated, gin.H{"data": member})
// }

// // GET /Member
// func GetMember(c *gin.Context) {
//     var members []entity.Member

//     db := config.DB()
//     results := db.Find(&members)
//     if results.Error != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
//         return
//     }

//     c.JSON(http.StatusOK, members)
// }

// // GET /Member/:id
// func GetMemberID(c *gin.Context) {
//     var member entity.Member
//     id := c.Param("id")

//     if err := config.DB().First(&member, id).Error; err != nil {
//         c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
//         return
//     }

//     c.JSON(http.StatusOK, gin.H{"data": member})
// }

// // DELETE /Member/:id
// func DeleteMember(c *gin.Context) {
//     id := c.Param("id")
//     if tx := config.DB().Delete(&entity.Member{}, id); tx.RowsAffected == 0 {
//         c.JSON(http.StatusNotFound, gin.H{"error": "Member not found"})
//         return
//     }

//     c.JSON(http.StatusOK, gin.H{"data": id})
// }

// // PATCH /Member/:id
// func UpdateMember(c *gin.Context) {
//     var member entity.Member
//     id := c.Param("id")

//     if err := config.DB().First(&member, id).Error; err != nil {
//         c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
//         return
//     }

//     if err := c.ShouldBindJSON(&member); err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     // TODO: Hash the password if it's being updated
//     // member.Password = HashPassword(member.Password)

//     if err := config.DB().Save(&member).Error; err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     c.JSON(http.StatusOK, gin.H{"data": member})
// }

package controller

import (
	"net/http"
	"strconv"

	"github.com/KUNSALISA/PROJECT_SA_G11/config"
	"github.com/KUNSALISA/PROJECT_SA_G11/entity"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// HashPassword แฮชรหัสผ่านโดยใช้ bcrypt
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// CheckPasswordHash เปรียบเทียบรหัสผ่านกับ hash
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// POST /Member
func CreateMember(c *gin.Context) {
	var member entity.Member
	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// แฮชรหัสผ่านก่อนบันทึก
	hashedPassword, err := HashPassword(member.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}
	member.Password = hashedPassword

	if err := config.DB().Create(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ไม่ส่งรหัสผ่านกลับไปยัง client
	member.Password = ""
	c.JSON(http.StatusCreated, gin.H{"data": member})
}

// GET /Member
func GetMember(c *gin.Context) {
	var members []entity.Member

	// เพิ่มการแบ่งหน้า
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	offset := (page - 1) * limit

	db := config.DB()
	results := db.Offset(offset).Limit(limit).Find(&members)
	if results.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, members)
}

// GET /Member/:id
func GetMemberID(c *gin.Context) {
	var member entity.Member
	id := c.Param("id")

	if err := config.DB().First(&member, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	// ไม่ส่งรหัสผ่านกลับไปยัง client
	member.Password = ""
	c.JSON(http.StatusOK, gin.H{"data": member})
}

// DELETE /Member/:id
func DeleteMember(c *gin.Context) {
	id := c.Param("id")
	if tx := config.DB().Delete(&entity.Member{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Member not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Member/:id
func UpdateMember(c *gin.Context) {
	var member entity.Member
	id := c.Param("id")

	if err := config.DB().First(&member, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	var input entity.Member
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบว่ารหัสผ่านถูกส่งมาหรือไม่
	if input.Password != "" {
		hashedPassword, err := HashPassword(input.Password)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
			return
		}
		member.Password = hashedPassword
	}

	// อัปเดตฟิลด์อื่นๆ
	member.Email = input.Email
	member.FirstName = input.FirstName
	member.LastName = input.LastName
	member.Birthday = input.Birthday
	member.Gender = input.Gender
	member.TotalPoint = input.TotalPoint

	if err := config.DB().Save(&member).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ไม่ส่งรหัสผ่านกลับไปยัง client
	member.Password = ""
	c.JSON(http.StatusOK, gin.H{"data": member})
}
