# Social Network API [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

The goal of this project was to build an API for a social network that would allow users to share their thoughts, add friends, and react to the thoughts of others. The API uses a MongoDB database, the Mongoose ODM, and Express.js for routing.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Questions](#questions)

## Installation

The user must install express and mongoose in order to use the API. To install, download or copy the project and run `npm i` from the main directory. Then, run `npm start` to start the application.

## Usage

Run the project by entering `npm start` into the terminal. From there, the user will need an API client in order to perform CRUD operations. The possible routes are:

GET:

- http://localhost:3001/api/users/ (Get all users)
- http://localhost:3001/api/users/:id (Get a single user by id)
- http://localhost:3001/api/thoughts/ (Get all thoughts)
- http://localhost:3001/api/thoughts/:id (Return a single thought by id)

POST:

- http://localhost:3001/api/users/ (Create a new user)
  Format:

```
{
	"username": "jellyKid",
	"email": "jelly@email.com"
}
```

- http://localhost:3001/api/thoughts/ (Create a new thought)
  Format:

```
{
	"thoughtText": "Went for a walk today! Loving the sunshine",
	"username": "jellyKid"
}
```

- http://localhost:3001/api/users/:userId/friends/:friendId (Add a friend by id)
  Format: No JSON

- http://localhost:3001/api/thoughts/:thoughtId/reaction (Add a reaction to a thought)
  Format:

```
{
	"reactionBody": "I disagree!",
	"username": "jellyKid"
}
```

PUT:

- http://localhost:3001/api/users/:id (Update a user by id)
- http://localhost:3001/api/thoughts/:id (Update a thought by id)

DELETE:

- http://localhost:3001/api/thoughts/:id (DELETE a thought by id)
- http://localhost:3001/api/users/:id (DELETE a user by id)
- http://localhost:3001/api/thoughts/:thoughtId/reaction/:reactionId (DELETE a reaction)
- http://localhost:3001/api/users/:userId/friends/:friendId (Remove a friend)

A walkthrough demonstrating how to use these routes can be found [here](https://drive.google.com/file/d/1SwvmAKtISXHYczMnDX4SBWjEmcSZtscD/view?usp=sharing).

## License

This work is available under the [MIT License](https://opensource.org/licenses/MIT).

## Questions

If you have any questions, contact me directly at [julia.bernst@gmail.com](mailto:julia.bernst@gmail.com). You can find more of my work at my [Github](https://github.com/jubernst/).
