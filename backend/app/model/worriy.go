package model

import "time"

type Worry struct {
	ID         string
	UserID     int
	Title      string `validate:"required,max=50"`
	Notes      string `validate:"required,max=500"`
	CategoryID int
	CreatedAt  time.Time
	UpdatedAt  time.Time
}

func (t *Worry) BeforeSave() error {
	return validator.Struct(t)
}
