package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"app/auth"
	"app/config"
	"app/graph/generated"
	"app/graph/model"
	"app/models"
	"context"
	"fmt"
)

func (r *mutationResolver) CreateWorry(ctx context.Context, input model.NewWorry) (*models.Worry, error) {
	token := ctx.Value("token").(string)
	userID, err := auth.GetUserFromToken(token)
	if err != nil {
		return &models.Worry{}, err
	}
	db := config.DB()

	worry := &models.Worry{
		UserID: userID,
		Title:  input.Title,
		Notes:  input.Notes,
	}

	if err := db.Create(&worry).Error; err != nil {
		return &models.Worry{}, err
	}

	return worry, nil
}

func (r *mutationResolver) UpdateWorry(ctx context.Context, input *model.UpdateWorryInput) (*models.Worry, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) Worries(ctx context.Context, orderBy model.WorryOrderField, page model.PaginationInput) (*model.WorryConnection, error) {
	db := config.DB()

	var err error
	db, err = pageDB(db, "id", desc, page)
	if err != nil {
		return &model.WorryConnection{PageInfo: &model.PageInfo{}}, err
	}

	var worries []*models.Worry
	if err := db.Find(&worries).Error; err != nil {
		return &model.WorryConnection{PageInfo: &model.PageInfo{}}, err
	}

	return convertToConnection(worries, orderBy, page), nil
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

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
