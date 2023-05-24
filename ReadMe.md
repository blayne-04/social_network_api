# Social Network API
## Description
This application contains all the backend functionality needed for a social network, includes the ability to get, post, put, delete thoughts and users as well as post and delete reactions to thoughts as well as add/remove users from a friend list

# Getting Started
## Dependencies
* MongoDB
* Node JS
* Insomnia or similar HTTP/API Client 
* IDE 
## Execution

Run npm start in the CLI

## Routes
All Json included will be directly below its corresponding route(s)
### Users
* GET all users http://localhost:3001/api/users
* GET user by id http://localhost:3001/api/users/{userId}
* POST create user http://localhost:3001/api/users
* PUT update user http://localhost:3001/api/users/{userId}
```json
	{
    "username": "Sally7",
    "email": "sally@gmail.com"
  }
```
* DEL delete user by id http://localhost:3001/api/users/{userId}
### Thoughts
* GET all thoughts http://localhost:3001/api/thoughts
* GET thought by id http://localhost:3001/api/thoughts/{thoughtId}
* POST create thought http://localhost:3001/api/thoughts
```json
{
  "text": "AnyThoughtHere",
  "username": "AnyUsernameHere",
  "userID": "references user _id"
}
```
* PUT update thought http://localhost:3001/api/thoughts/{thoughtId}
```json 
{
  "thoughtText": "AnyThoughtHere",
  "username": "AnyUsernameHere",
  "userID": "references user _id"
}
```
* DEL thought http://localhost:3001/api/thoughts/{thoughtId}
### Reactions
* POST new reaction http://localhost:3001/api/thoughts/{thoughtId}/reactions
```json
{
  "reactionBody": "anyMessage",
  "username": "anyUsername"
}
```
* DEL reaction http://localhost:3001/api/thoughts/646af0e6f8eeb4dc9d4bbee9/reactions
```json
{
	"reactionID": "reference to reaction _id"
}
```
### Friends
* POST http://localhost:3001/api/users/{userId}/friends/{friendId}
* DEL  http://localhost:3001/api/users/{userId}/friends/{friendId}

## Contributors
Blayne Fuller

## Help
If you have any questions about the usage of this application feel free to contact me at befuller2004@gmail.com

## Tutorial Video
[Tutorial](https://github.com/blayne-04/social_network_api/assets/107909315/978161ca-5b5e-41d2-932f-29f6ebdc0001)
