package auth

import (
	"app/config"
	"app/models"
	"context"
	"errors"
	"log"
	"net/http"
	"strings"
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

func createUser(email string, password string, name string) (id string, err error) {
	db := config.DB()
	passwordEncrypt, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	user := models.User{Email: email, Password: string(passwordEncrypt), Name: name}
	if err := db.Create(&user).Error; err != nil {
		return "", err
	}
	return user.ID, nil
}

func createToken(id string, name string) (map[string]string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["user_id"] = id
	claims["name"] = name
	// FIXME: セキュリティを強固にする場合は、期限を短くする必要がある
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	t, err := token.SignedString([]byte("secret"))
	if err != nil {
		return nil, err
	}

	refreshToken := jwt.New(jwt.SigningMethodHS256)
	rtClaims := refreshToken.Claims.(jwt.MapClaims)
	rtClaims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	rt, err := refreshToken.SignedString([]byte("secret"))
	if err != nil {
		return nil, err
	}

	return map[string]string{
		"access_token":  t,
		"refresh_token": rt,
	}, nil
}

func GetUserFromToken(tokenstring string) (string, error) {
	token, err := jwt.ParseWithClaims(tokenstring, jwt.MapClaims{}, func(token *jwt.Token) (interface{}, error) {
		log.Println(token.Claims.(jwt.MapClaims)["user_id"])
		return []byte("secret"), nil
	})
	log.Println(token.Claims.(jwt.MapClaims)["user_id"])
	userID, ok := token.Claims.(jwt.MapClaims)["user_id"].(string)
	if !ok {
		log.Println(err)
		return "", errors.New("GetUserIDFromToken error: type conversion in claims")
	}

	return userID, nil
}

func PassTokenToResolver(c echo.Context) context.Context {
	token := strings.ReplaceAll(c.Request().Header.Get("Authorization"), "Bearer ", "")
	ctx := context.WithValue(context.Background(), "token", token)
	return ctx
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

		id, err := createUser(email, password, name)
		if err != nil {
			return err
		}

		token, err := createToken(id, name)
		if err != nil {
			return err
		}

		return c.JSON(http.StatusOK, token)
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

		dbUser := getUser(email)

		if err := bcrypt.CompareHashAndPassword([]byte(dbUser.Password), []byte(password)); err != nil {
			return echo.ErrUnauthorized
		}

		token, err := createToken(dbUser.ID, dbUser.Name)
		if err != nil {
			return err
		}

		return c.JSON(http.StatusOK, token)
	}
}
