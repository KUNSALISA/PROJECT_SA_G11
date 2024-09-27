package controllers

import (
	"net/http"

	"github.com/KUNSALISA/PROJECT_SA_G11/config"
	"github.com/KUNSALISA/PROJECT_SA_G11/entity"
	"github.com/gin-gonic/gin"
)

func GetTypeOfFlight(c *gin.Context) {
	var types []entity.TypeOfFlight
	if err := config.DB().Find(&types).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": types})
}

func GetTypeOfFlightByID(c *gin.Context) {
	var types entity.TypeOfFlight
	id := c.Param("id")

	if err := config.DB().First(&types, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "TypeOfFlight not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": types})
}
