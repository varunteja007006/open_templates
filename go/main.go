package main

import (
	"context"

	"github.com/open_templates/go/app"
)

func main() {
	app := app.New()

	err := app.Start(context.TODO())
	if err != nil {
		panic(err)
	}
}
