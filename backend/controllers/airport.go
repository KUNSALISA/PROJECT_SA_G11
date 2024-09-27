package controllers

import (
	"net/http"

	"github.com/KUNSALISA/PROJECT_SA_G11/config"
	"github.com/KUNSALISA/PROJECT_SA_G11/entity"
	"github.com/gin-gonic/gin"
)

func GetAirports(c *gin.Context) {
	var airports []entity.Airport

	if err := config.DB().Find(&airports).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

		c.JSON(http.StatusOK, gin.H{"data": airports})
	}

func GetAirportByID(c *gin.Context) {
	var airport entity.Airport
	id := c.Param("id")

	if err := config.DB().First(&airport, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Airport not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": airport})
}
