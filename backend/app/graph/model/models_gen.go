// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type NewUser struct {
	Name string `json:"name"`
}

type NewWorry struct {
	Title  string `json:"title"`
	Notes  string `json:"notes"`
	UserID string `json:"user_id"`
}
