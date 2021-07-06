package middleware

import (
	"context"
	"log"
	"os"
	"strings"

	firebase "firebase.google.com/go"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"google.golang.org/api/option"
)

var IsLoggedIn = middleware.JWTWithConfig(middleware.JWTConfig{
	SigningKey: []byte("secret"),
})

func AuthMiddleware(c echo.Context) {
	err := godotenv.Load(".env")
	if err != nil {
		panic("Error loading .env file")
	}

	opt := option.WithCredentialsFile(os.Getenv("GOOGLE_APPLICATION_CREDENTIALS"))
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}

	// Access auth service from the default app
	client, err := app.Auth(context.Background())
	if err != nil {
		log.Fatalf("error getting Auth client: %v\n", err)
	}

	authHeader := c.Request().Header.Get("Authorization")
	idToken := strings.Replace(authHeader, "Bearer ", "", 1)
	token, err := client.VerifyIDToken(context.Background(), idToken)

	if err != nil {
		log.Fatalf("error verifying ID token: %v\n", err)
		return
	}

	log.Printf("Verified ID token: %v\n", token)
	return
}
