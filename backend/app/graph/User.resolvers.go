package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"app/config"
	"app/graph/generated"
	"app/models"
	"context"
)

func (r *userResolver) Worries(ctx context.Context, obj *models.User) ([]*models.Worry, error) {
	db := config.DB()
	var worries []*models.Worry

	if err := db.Where("user_id = ?", obj.ID).Find(&worries).Error; err != nil {
		return nil, err
	}

	results := make([]*models.Worry, len(worries))
	for i, worry := range worries {
		results[i] = &models.Worry{
			ID: worry.ID,
			Title: worry.Title,
			Notes: worry.Notes,
			UserID: worry.UserID,
		}
	}

	return results, nil
}

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type userResolver struct{ *Resolver }
