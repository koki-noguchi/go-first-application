package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"app/auth"
	"app/config"
	"app/graph/generated"
	"app/graph/model"
	"app/models"
	"context"
	"errors"
	"fmt"
	"log"
)

func (r *mutationResolver) CreateWorry(ctx context.Context, input model.NewWorry) (*models.Worry, error) {
	token := ctx.Value("token").(string)
	userID, err := auth.GetUserFromToken(token)
	log.Println(userID)

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
	token := ctx.Value("token").(string)
	userID, err := auth.GetUserFromToken(token)
	if err != nil {
		return &models.Worry{}, err
	}

	db := config.DB()
	var worry models.Worry

	if err := db.Where("id = ?", input.ID).First(&worry).Error; err != nil {
		return &models.Worry{}, err
	}
	if userID != worry.UserID {
		return &models.Worry{}, errors.New("invalid user id")
	}

	params := map[string]interface{}{}
	params["title"] = input.Title
	params["notes"] = input.Notes

	if err := db.Model(&worry).Updates(params).Error; err != nil {
		return &models.Worry{}, err
	}

	return &worry, nil
}

func (r *mutationResolver) DeleteWorry(ctx context.Context, id int) (*models.Worry, error) {
	db := config.DB()
	var worry models.Worry

	if err := db.First(&worry, id).Error; err != nil {
		return nil, err
	}

	if err := db.Delete(&worry).Error; err != nil {
		return nil, err
	}
	return &worry, nil
}

func (r *queryResolver) Worries(ctx context.Context, orderBy model.WorryOrderField, page model.PaginationInput) (*model.WorryConnection, error) {
	db := config.DB()

	var err error
	db, err = pageDB(db, "id", desc, page)
	if err != nil {
		return &model.WorryConnection{PageInfo: &model.PageInfo{}}, err
	}

	var worries []*models.Worry
	if err := db.Preload("User").Find(&worries).Error; err != nil {
		return &model.WorryConnection{PageInfo: &model.PageInfo{}}, err
	}

	return convertToConnection(worries, orderBy, page), nil
}

func (r *queryResolver) Users(ctx context.Context) ([]*models.User, error) {
	db := config.DB()

	var users []*models.User
	if err := db.Preload("Worry").Find(&users).Error; err != nil {
		return nil, err
	}
	fmt.Println(users[0].Worry)

	return users, nil
}

func (r *queryResolver) Worry(ctx context.Context, id int) (*models.Worry, error) {
	db := config.DB()
	var worry models.Worry
	if err := db.Where("id = ?", id).First(&worry).Error; err != nil {
		return nil, err
	}

	return &models.Worry{
		ID:     worry.ID,
		Title:  worry.Title,
		Notes:  worry.Notes,
		UserID: worry.UserID,
	}, nil
}

func (r *queryResolver) User(ctx context.Context, id int) (*models.User, error) {
	db := config.DB()
	var user models.User
	if err := db.Where("id = ?", id).First(&user).Error; err != nil {
		return nil, err
	}

	return &models.User{
		ID:   user.ID,
		Name: user.Name,
	}, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
