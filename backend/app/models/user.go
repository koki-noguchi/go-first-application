package models

import "time"

type User struct {
	ID        string `json:"id" form:"id"`
	Name      string `json:"name" form:"name" validate:"required,max=15"`
	CreatedAt time.Time
	UpdatedAt time.Time
	Worry     []Worry
}

func (t *User) BeforeSave() error {
	return validator.Struct(t)
}
