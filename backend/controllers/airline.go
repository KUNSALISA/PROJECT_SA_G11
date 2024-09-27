package controller

import (
	"net/http"

	"github.com/KUNSALISA/PROJECT_SA_G11/config"
	"github.com/KUNSALISA/PROJECT_SA_G11/entity"
	"github.com/gin-gonic/gin"
)

func GetAirline(c *gin.Context) {
	var airlines []entity.Airline

	if err := config.DB().Find(&airlines).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": airlines})
}


func GetAirlineByID(c *gin.Context) {
	var airline entity.Airline
	id := c.Param("id")

	if err := config.DB().First(&airline, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Airline not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": airline})
}
