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

func createUser(email string, password string, name string) error {
	db := config.DB()
	passwordEncrypt, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	user := models.User{Email: email, Password: string(passwordEncrypt), Name: name}
	if err := db.Create(&user).Error; err != nil {
		return err
	}
	return nil
}

func generateToken(email string) (t string, err error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["name"] = email
	claims["admin"] = true
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	t, err = token.SignedString([]byte("secret"))
	if err != nil {
		return "", err
	}
	return t, nil
}

func SignUp() echo.HandlerFunc {
	return func(c echo.Context) error {
		u := new(models.User)
		if err := c.Bind(u); err != nil {
			return err
		}
		email := u.Email
		password := u.Password
		name := u.Name

		if err := createUser(email, password, name); err != nil {
			return err
		}

		token, err := generateToken(email)
		if err != nil {
			return err
		}

		return c.JSON(http.StatusOK, map[string]string{
			"token": token,
		})
	}
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

		token, err := generateToken(email)
		if err != nil {
			return err
		}

		return c.JSON(http.StatusOK, map[string]string{
			"token": token,
		})
	}
}
