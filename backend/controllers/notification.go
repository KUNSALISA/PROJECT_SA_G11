package controllers

import (
	"net/http"

	"github.com/KUNSALISA/PROJECT_SA_G11/config"
	"github.com/KUNSALISA/PROJECT_SA_G11/entity"
	"github.com/gin-gonic/gin"
)

func GetNotifications(c *gin.Context) {
	var notifications []entity.Notification
	if err := config.DB().Find(&notifications).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": notifications})
}

func GetNotificationByID(c *gin.Context) {
	id := c.Param("id")
	var notification entity.Notification
	if err := config.DB().First(&notification, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, notification)
}

func CreateNotification(c *gin.Context) {
	var notification entity.Notification
	if err := c.ShouldBindJSON(&notification); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	if err := config.DB().Create(&notification).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": notification})
}

func UpdateNotification(c *gin.Context) {
	id := c.Param("id")
	var notification entity.Notification
	if err := config.DB().First(&notification, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Notification not found"})
		return
	}
	if err := c.ShouldBindJSON(&notification); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	if err := config.DB().Save(&notification).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": notification})
}

func DeleteNotification(c *gin.Context) {
	id := c.Param("id")
	if tx := config.DB().Delete(&entity.Notification{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Notification not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Notification deleted"})
}
