package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"app/config"
	"app/graph/generated"
	"app/graph/model"
	"app/models"
	"context"
	"fmt"
)

func (r *mutationResolver) CreateWorry(ctx context.Context, input model.NewWorry) (*models.Worry, error) {
	db := config.DB()

	worry := &models.Worry{
		UserID: input.UserID,
		Title:  input.Title,
		Notes:  input.Notes,
	}

	if err := db.Create(&worry).Error; err != nil {
		return &models.Worry{}, err
	}

	return worry, nil
}

func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*models.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Worries(ctx context.Context) ([]*models.Worry, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Users(ctx context.Context) ([]*models.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Worry(ctx context.Context, id int) (*models.Worry, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) User(ctx context.Context, id int) (*models.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *userResolver) Worries(ctx context.Context, obj *models.User) ([]*models.Worry, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *worryResolver) User(ctx context.Context, obj *models.Worry) (*models.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

// Worry returns generated.WorryResolver implementation.
func (r *Resolver) Worry() generated.WorryResolver { return &worryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
type worryResolver struct{ *Resolver }
