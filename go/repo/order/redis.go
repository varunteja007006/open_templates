package order

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"

	"github.com/open_templates/go/model"
	"github.com/redis/go-redis/v9"
)

type RedisRepo struct {
	Client *redis.Client
}

func orderIDKey(id uint64) string {
	return fmt.Sprintf("order:%d", id)
}

func (r *RedisRepo) Insert(ctx context.Context, order model.Order) error {
	data, err := json.Marshal(order)

	if err != nil {
		return err
	}

	key := orderIDKey(order.OrderID)

	txn := r.Client.TxPipeline()

	res := txn.SetNX(ctx, key, string(data), 0)

	if err := res.Err(); err != nil {
		txn.Discard()
		return fmt.Errorf("failed to set order %d", err)
	}

	if err := txn.SAdd(ctx, "orders", key).Err(); err != nil {
		txn.Discard()
		return fmt.Errorf("failed to add order %d to set", err)
	}

	if _, err := txn.Exec(ctx); err != nil {
		return fmt.Errorf("failed to execute transaction: %w", err)
	}

	return nil
}

var ErrNotExist = errors.New("order does not exist")

func (r *RedisRepo) FindByID(ctx context.Context, id uint64) (model.Order, error) {
	key := orderIDKey(id)

	value, err := r.Client.Get(ctx, key).Result()

	if errors.Is(err, redis.Nil) {
		return model.Order{}, ErrNotExist
	}

	if err != nil {
		return model.Order{}, err
	}

	var order model.Order

	err = json.Unmarshal([]byte(value), &order)

	if err != nil {
		return model.Order{}, err
	}

	return order, nil
}

func (r *RedisRepo) DeleteByID(ctx context.Context, id uint64) error {
	key := orderIDKey(id)

	txn := r.Client.TxPipeline()

	err := txn.Del(ctx, key).Err()
	if errors.Is(err, redis.Nil) {
		txn.Discard()
		return ErrNotExist
	}

	if err != nil {
		txn.Discard()
		return err
	}

	if err := txn.SRem(ctx, "orders", key).Err(); err != nil {
		txn.Discard()
		return fmt.Errorf("failed to remove from set: %w", err)
	}

	if _, err := txn.Exec(ctx); err != nil {
		return fmt.Errorf("failed to execute transaction: %w", err)
	}

	return nil
}

func (r *RedisRepo) UpdateByID(ctx context.Context, order model.Order) error {
	data, err := json.Marshal(order)

	if err != nil {
		return err
	}

	key := orderIDKey(order.OrderID)

	err = r.Client.SetXX(ctx, key, string(data), 0).Err()

	if errors.Is(err, redis.Nil) {
		return ErrNotExist
	}

	if err != nil {
		return err
	}

	return nil
}

type FindAllPage struct {
	Size   uint64
	Offset uint64
}

type FindResult struct {
	Orders []model.Order
	Cursor uint64
}

func (r *RedisRepo) FindAll(ctx context.Context, page FindAllPage) (FindResult, error) {
	res := r.Client.SScan(ctx, "orders", page.Offset, "*", int64(page.Size))

	keys, cursor, err := res.Result()
	if err != nil {
		return FindResult{}, err
	}

	if len(keys) == 0 {
		return FindResult{
			Orders: []model.Order{},
			Cursor: cursor,
		}, nil
	}

	xs, err := r.Client.MGet(ctx, keys...).Result()
	if err != nil {
		return FindResult{}, err
	}

	orders := make([]model.Order, len(xs))

	for i, x := range xs {
		x := x.(string)
		var order model.Order

		if err := json.Unmarshal([]byte(x), &order); err != nil {
			return FindResult{}, err
		}

		orders[i] = order
	}

	return FindResult{
		Orders: orders,
		Cursor: cursor,
	}, nil
}
