package models

import "time"

type Worry struct {
	ID        int
	UserID    int
	Title     string `validate:"required,max=50"`
	Notes     string `validate:"required,max=500"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

func (t *Worry) BeforeSave() error {
	return validator.Struct(t)
}
