package main

import (
	"app/auth"
	"app/config"
	"app/graph/generated"
	"app/graph/resolver"
	jwt "app/middleware"

	"os"

	"github.com/99designs/gqlgen/handler"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	if err := config.InitDB(); err != nil {
		panic(err.Error())
	}

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.Gzip())

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{os.Getenv("CORS_ALLOW_ORIGIN")},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))

	// graphqlは認証済みユーザーのみ叩ける
	e.POST("/graphql", func(c echo.Context) error {
		jwt.AuthMiddleware(c)
		ctx := auth.PassTokenToResolver(c)

		config := generated.Config{
			Resolvers: &resolver.Resolver{},
		}
		h := handler.GraphQL(generated.NewExecutableSchema(config))
		h.ServeHTTP(c.Response(), c.Request().WithContext(ctx))

		return nil
	})

	e.HideBanner = true
	e.HidePort = true
	e.Logger.Fatal(e.Start(":3000"))
}
