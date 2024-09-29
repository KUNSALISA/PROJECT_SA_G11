package controllers

import (
	"net/http"
	"github.com/KUNSALISA/PROJECT_SA_G11/config"
	"github.com/KUNSALISA/PROJECT_SA_G11/entity"
	"github.com/gin-gonic/gin" 
)

func GetAllPoint(c *gin.Context) {
	var Point []entity.Point_Calculator

	if err := config.DB().Preload("Airline").Find(&Point).Error; err != nil{
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Point})
}

func GetPointByID(c *gin.Context) {
	var Point entity.Point_Calculator
	id := c.Param("id")

	// ดึงข้อมูลจากฐานข้อมูลตาม ID
	if err := config.DB().First(&Point, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Point_Calculator not found"})
		return
	}

	// ส่งข้อมูลกลับไปในรูป JSON
	c.JSON(http.StatusOK, gin.H{"data": Point})
}

func DeletePoint(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM Point_Calculator WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}
