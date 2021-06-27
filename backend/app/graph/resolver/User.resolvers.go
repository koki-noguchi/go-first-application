package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"app/graph/generated"
	"app/models"
	"context"
)

func (r *userResolver) Worries(ctx context.Context, obj *models.User) ([]*models.Worry, error) {
	results := make([]*models.Worry, len(obj.Worry))
	for i, worry := range obj.Worry {
		results[i] = &models.Worry{
			ID:     worry.ID,
			Title:  worry.Title,
			Notes:  worry.Notes,
			UserID: worry.UserID,
		}
	}

	return results, nil
}

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type userResolver struct{ *Resolver }
