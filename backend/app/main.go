package main

import (
	"app/auth"
	"app/config"
	"app/graph"
	"app/graph/generated"
	jwt "app/middleware"

	"net/http"
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
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	e.GET("/", func(c echo.Context) error {
		return c.NoContent(http.StatusOK)
	})

	// FIXME: ログインと登録は認証前のみPOSTできるようにする
	e.POST("/login", auth.Login())
	e.POST("/signup", auth.SignUp())
	// graphqlは認証済みユーザーのみ叩ける
	e.POST("/graphql", func(c echo.Context) error {
		ctx := auth.PassTokenToResolver(c)
		config := generated.Config{
			Resolvers: &graph.Resolver{},
		}
		h := handler.GraphQL(generated.NewExecutableSchema(config))
		h.ServeHTTP(c.Response(), c.Request().WithContext(ctx))

		return nil
	}, jwt.IsLoggedIn)

	e.HideBanner = true
	e.HidePort = true
	e.Logger.Fatal(e.Start(":3000"))
}
