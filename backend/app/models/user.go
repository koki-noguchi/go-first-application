package models

type User struct {
	ID       int    `json:"id" form:"id"`
	Email    string `json:"email" form:"email" validate:"required,email"`
	Password string `json:"password" form:"password" validate:"required,min=8,max=72,excludesall=!()#@{}"`
	Name     string `json:"name" form:"name" validate:"required,max=15"`
	Worry    []Worry
}

func (t *User) BeforeSave() error {
	return validator.Struct(t)
}
