package models

type User struct {
	ID       int
	Email    string `validate:"required,email"`
	Password string `validate:"required,min=8,max=72,excludesall=!()#@{}"`
	Name     string `validate:"required,max=15"`
}

func (t *User) BeforeSave() error {
	return validator.Struct(t)
}
