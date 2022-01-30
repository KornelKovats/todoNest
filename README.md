<<<<<<< HEAD
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# NodeJS Developer - Exercise 1 

## Exercise description

Create a RESTful API that provides access to a collection called "todos" that contains just the following fields:

- `id`: String. Unique identifier of the todo (can't be set)
- `text`: String. Can only contain english letters. (must be set)
- `priority`: Number. Integer in the range from 1 to 5. (default value is 3)
- `done`: Boolean. (default value is false)

The API must accept JSON request body, and must provide JSON response body.

## Endpoints

### GET /todos

List all of the todos as an array of the todo objects.

### POST /todos

Creates a new todo, sets the given fields from the request body. Returns the new todo object.

### GET /todos/:id

Returns the todo object.

### PUT /todos/:id

Updates the given fields in the todo. Returns the new todo object.

### DELETE /todos/:id

Removes a todo from the collection.

# App
```
npm install
npm run start:dev
```
Test:
```
npm test
```