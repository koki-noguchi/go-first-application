package main

import (
	"app/config"
	"app/graph"
	"app/graph/generated"
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

	e.POST("/graphql", func(c echo.Context) error {
		config := generated.Config{
			Resolvers: &graph.Resolver{},
		}
		h := handler.GraphQL(generated.NewExecutableSchema(config))
		h.ServeHTTP(c.Response(), c.Request())

		return nil
	})

	e.HideBanner = true
	e.HidePort = true
	e.Logger.Fatal(e.Start(":3000"))
}
