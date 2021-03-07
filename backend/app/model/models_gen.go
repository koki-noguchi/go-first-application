package model

type CreateWorryInput struct {
	UserID     int     `json:"user_id"`
	Title      string  `json:"title"`
	Notes      *string `json:"notes"`
	CategoryID int     `json:"category_id"`
}
