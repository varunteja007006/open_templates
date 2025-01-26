package model

import (
	"time"
)

type Order struct {
	OrderID     uint64     `json:"order_id"`
	CustomerID  uint64     `json:"customer_id"`
	LineItems   []LineItem `json:"line_items"`
	CreatedAt   *time.Time `json:"created_at"`
	ShippedAt   *time.Time `json:"shipped_at"`
	CompletedAt *time.Time `json:"completed_at"`
}

type LineItem struct {
	ProductID uint `json:"product_id"`
	Quantity  uint `json:"quantity"`
	Price     uint `json:"price"`
}
