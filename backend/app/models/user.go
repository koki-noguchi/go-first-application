package models

type User struct {
	ID   string
	Name string `validate:"required,max=15"`
}

func (t *User) BeforeSave() error {
	return validator.Struct(t)
}
