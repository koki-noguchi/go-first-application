package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"app/graph/generated"
	"app/models"
	"context"
	"fmt"
)

func (r *worryResolver) User(ctx context.Context, obj *models.Worry) (*models.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Worry returns generated.WorryResolver implementation.
func (r *Resolver) Worry() generated.WorryResolver { return &worryResolver{r} }

type worryResolver struct{ *Resolver }
