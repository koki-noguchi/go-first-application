package graph

import (
	"app/graph/model"
	"app/models"
	"encoding/base64"
	"errors"
	"fmt"
	"strconv"
	"strings"

	"github.com/jinzhu/gorm"
)

type direction string

var desc direction = "desc"

func pageDB(db *gorm.DB, col string, dir direction, page model.PaginationInput) (*gorm.DB, error) {
	var limit int

	if page.First == nil {
		limit = 11
	} else {
		limit = *page.First + 1
	}

	if page.After != nil {
		resources1, resources2, err := decodeCursor(*page.After)
		if err != nil {
			return db, err
		}

		if resources2 != nil {
			switch dir {
			// ascは今回実装しないため一旦コメントアウト
			// case asc:
			// 	db = db.Where(
			// 		fmt.Sprintf("(%s > ?) OR (%s = ? AND id > ?)", col, col),
			// 		resources1.ID,
			// 		resources2.ID,
			// 	)
			case desc:
				db = db.Where(
					fmt.Sprintf("(%s < ?) OR (%s = ? AND id < ?)", col, col),
					resources1.ID,
					resources2.ID,
				)
			}
		} else {
			switch dir {
			// ascは今回実装しないため一旦コメントアウト
			// case asc:
			// 	db = db.Where(fmt.Sprintf("%s > ?", col), resources1.ID)
			case desc:
				db = db.Where(fmt.Sprintf("%s < ?", col), resources1.ID)
			}
		}
	}
	switch dir {
	// ascは今回実装しないため一旦コメントアウト
	// case asc:
	// 	db = db.Order(fmt.Sprintf("%s IS NULL ASC, id ASC", col))
	case desc:
		db = db.Order(fmt.Sprintf("%s DESC, id DESC", col))
	}

	return db.Limit(limit), nil
}

type cursorResource struct {
	Name string
	ID   int
}

func createCursor(first cursorResource, second *cursorResource) string {
	var cursor []byte
	if second != nil {
		cursor = []byte(fmt.Sprintf("%s:%d:%s:%d", first.Name, first.ID, second.Name, second.ID))
	} else {
		cursor = []byte(fmt.Sprintf("%s:%d", first.Name, first.ID))
	}

	return base64.StdEncoding.EncodeToString(cursor)
}

func decodeCursor(cursor string) (cursorResource, *cursorResource, error) {
	bytes, err := base64.StdEncoding.DecodeString(cursor)
	if err != nil {
		return cursorResource{}, nil, err
	}

	vals := strings.Split(string(bytes), ":")

	switch len(vals) {
	case 2:
		id, err := strconv.Atoi(vals[1])
		if err != nil {
			return cursorResource{}, nil, errors.New("invalid_cursor")
		}
		return cursorResource{Name: vals[0], ID: id}, nil, nil
	case 4:
		id, err := strconv.Atoi(vals[1])
		if err != nil {
			return cursorResource{}, nil, errors.New("invalid_cursor")
		}
		id2, err := strconv.Atoi(vals[3])
		if err != nil {
			return cursorResource{}, nil, errors.New("invalid_cursor")
		}
		return cursorResource{Name: vals[0], ID: id}, &cursorResource{Name: vals[2], ID: id2}, nil
	default:
		return cursorResource{}, nil, errors.New("invalid_cursor")
	}
}

func convertToConnection(worries []*models.Worry, orderBy model.WorryOrderField, page model.PaginationInput) *model.WorryConnection {
	if len(worries) == 0 {
		return &model.WorryConnection{PageInfo: &model.PageInfo{}}
	}

	pageInfo := model.PageInfo{}
	if page.First != nil {
		if len(worries) >= *page.First+1 {
			pageInfo.HasNextPage = true
			worries = worries[:len(worries)-1]
		}
	}

	switch orderBy {
	case model.WorryOrderFieldLatest:
		worryEdges := make([]*model.WorryEdge, len(worries))

		for i, worry := range worries {
			cursor := createCursor(
				cursorResource{Name: "worry", ID: worry.ID},
				nil,
			)
			worryEdges[i] = &model.WorryEdge{
				Cursor: cursor,
				Node:   worry,
			}
		}

		pageInfo.EndCursor = worryEdges[len(worries)-1].Cursor
		return &model.WorryConnection{PageInfo: &pageInfo, Edges: worryEdges}
	}

	return &model.WorryConnection{PageInfo: &model.PageInfo{}}
}
