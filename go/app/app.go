package app

import (
	"context"
	"net/http"
)

type App struct {
	router http.Handler
}

func New() *App {
	app := &App{
		router: loadRoutes(),
	}

	return app
}

func (a *App) Start(ctx context.Context) error {
	server := &http.Server{
		Addr:    ":4040",
		Handler: a.router,
	}

	err := server.ListenAndServe()
	if err != nil {
		return err
	}

	return nil
}
