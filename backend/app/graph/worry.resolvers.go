package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"app/config"
	"app/graph/generated"
	"app/models"
	"context"
)

func (r *worryResolver) User(ctx context.Context, obj *models.Worry) (*models.User, error) {
	db := config.DB()

	var user models.User
	if err := db.Where("id = ?", obj.UserID).First(&user).Error; err != nil {
		return nil, err
	}

	return &models.User{
		ID:   user.ID,
		Name: user.Name,
	}, nil
}

// Worry returns generated.WorryResolver implementation.
func (r *Resolver) Worry() generated.WorryResolver { return &worryResolver{r} }

type worryResolver struct{ *Resolver }
