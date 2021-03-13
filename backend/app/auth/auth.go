package auth

import (
	"app/config"
	"app/models"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

func getUser(email string) models.User {
	db := config.DB()
	user := models.User{}
	db.First(&user, "email=?", email)
	return user
}

func Login() echo.HandlerFunc {
	return func(c echo.Context) error {
		u := new(models.User)
		if err := c.Bind(u); err != nil {
			return err
		}
		email := u.Email
		password := u.Password

		dbPassword := getUser(email).Password

		if err := bcrypt.CompareHashAndPassword([]byte(dbPassword), []byte(password)); err != nil {
			return echo.ErrUnauthorized
		}

		token := jwt.New(jwt.SigningMethodHS256)
		claims := token.Claims.(jwt.MapClaims)
		claims["name"] = u.Email
		claims["admin"] = true
		claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

		t, err := token.SignedString([]byte("secret"))
		if err != nil {
			return err
		}

		return c.JSON(http.StatusOK, map[string]string{
			"token": t,
		})
	}
}
