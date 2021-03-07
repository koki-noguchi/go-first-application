package resolver

import (
	"app/model"
	"context"
)

type worryResolver struct{ *Resolver }

func (r *Resolver) Worry() worryResolver {
	return worryResolver{r}
}

func (r *worryResolver) ID(ctx context.Context, obj *model.Worry) (string, error) {
	if obj == nil {
		return "", nil
	}

	return obj.ID, nil
}
