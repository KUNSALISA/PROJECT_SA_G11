package controllers

import (
	"net/http"

	"github.com/KUNSALISA/PROJECT_SA_G11/config"
	"github.com/KUNSALISA/PROJECT_SA_G11/entity"
	"github.com/gin-gonic/gin"
)

// ดึงข้อมูลคำขอทั้งหมด
func GetRequests(c *gin.Context) {
	var requests []entity.Request
	if err := config.DB().Find(&requests).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": requests})
}

// ดึงข้อมูลคำขอตาม ID
func GetRequestByID(c *gin.Context) {
	id := c.Param("id")
	var request entity.Request
	if err := config.DB().First(&request, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, request)
}

// สร้างคำขอใหม่
func CreateRequest(c *gin.Context) {
	var request entity.Request
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	if err := config.DB().Create(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": request})
}

// อัปเดตคำขอตาม ID
func UpdateRequest(c *gin.Context) {
	id := c.Param("id")
	var request entity.Request

	// ดึงข้อมูลคำขอตาม ID ก่อนอัปเดต
	if err := config.DB().First(&request, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Request not found"})
		return
	}

	// ผูกข้อมูล JSON กับออบเจ็กต์ request
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	// บันทึกการอัปเดต
	if err := config.DB().Save(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": request})
}

// ลบคำขอตาม ID
func DeleteRequest(c *gin.Context) {
	id := c.Param("id")
	if tx := config.DB().Delete(&entity.Request{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Request not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Request deleted"})
}
