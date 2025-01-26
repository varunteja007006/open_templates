package main

import (
	"context"

	"os"
	"os/signal"

	"github.com/open_templates/go/app"
)

func main() {
	app := app.New(app.LoadConfig())

	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt)
	defer cancel()

	err := app.Start(ctx)
	if err != nil {
		panic(err)
	}

	// cancel() // You can achieve the same with defer
}
