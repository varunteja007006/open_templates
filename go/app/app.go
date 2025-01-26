package app

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/redis/go-redis/v9"
)

type App struct {
	router http.Handler
	rdb    *redis.Client
	config Config
}

func New(config Config) *App {
	app := &App{
		rdb: redis.NewClient(&redis.Options{
			Addr:     config.RedisAddress,
			Password: "", // no password (default)
			DB:       0,  // use default DB
		}),
	}

	app.loadRoutes()

	return app
}

func (a *App) Start(ctx context.Context) error {
	server := &http.Server{
		Addr: fmt.Sprintf(":%d", 4040),
		// Addr:    fmt.Sprintf(":%d", a.config.ServerPort ), // Bug need to fix
		Handler: a.router,
	}

	fmt.Println("Listening on", server.Addr)

	err := a.rdb.Ping(ctx).Err()
	if err != nil {
		return err
	}

	defer func() {
		if err := a.rdb.Close(); err != nil {
			println(err)
		}
	}()

	fmt.Println("Connected to Redis\nStarting the server...")

	ch := make(chan error, 1)

	go func() {
		err = server.ListenAndServe()
		if err != nil {
			ch <- err
		}
		close(ch)
	}()

	select {
	case err = <-ch:
		return err
	case <-ctx.Done():
		timeout, cancel := context.WithTimeout(context.Background(), time.Second*10)
		defer cancel()

		return server.Shutdown(timeout)
	}

}
