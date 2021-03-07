package resolver

import (
	"app/config"
	"app/model"
	"context"
)

type Resolver struct{}

type queryResolver struct{ *Resolver }
type mutationResolver struct{ *Resolver }

func New() *Resolver {
	return &Resolver{}
}

func (r *Resolver) Mutation() *mutationResolver {
	return &mutationResolver{r}
}

func (r *Resolver) Query() queryResolver {
	return queryResolver{r}
}

func (r *mutationResolver) CreateWorry(ctx context.Context, input model.CreateWorryInput) (*model.Worry, error) {
	db := config.DB()

	id, err := config.ShortID().Generate()
	if err != nil {
		return &model.Worry{}, err
	}

	worry := model.Worry{
		ID:         id,
		UserID:     input.UserID,
		Title:      input.Title,
		CategoryID: input.CategoryID,
	}
	if input.Notes != nil {
		worry.Notes = *input.Notes
	}

	if err := db.Create(&worry).Error; err != nil {
		return &model.Worry{}, err
	}

	return &worry, nil
}
