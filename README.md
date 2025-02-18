GraphQL Game Review API

Introduction

This is a GraphQL API for managing video game reviews. The API allows users to retrieve information about games, reviews, and authors while also enabling CRUD operations for games.

Features

Fetch a list of games, reviews, and authors.

Get details of a specific game, review, or author.

Add, update, and delete games.

Establish relationships between games, reviews, and authors.

Technologies Used

Node.js: Server runtime

TypeScript: Strongly typed JavaScript

GraphQL: API query language

Apollo Server: GraphQL server implementation

Express: Web framework

Schema

The GraphQL schema for the API is as follows:

type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }

    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }

    type Query {
        reviews: [Review]
        review(id: ID!): Review
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }

    type Mutation {
        addGame(game: AddGameInput!): Game
        deleteGame(id: ID!): [Game]
        updateGame(id: ID!, edits: EditGameInput!): Game
    }

    input AddGameInput {
        title: String!
        platform: [String!]!
    }

    input EditGameInput {
        title: String
        platform: [String!]
    }

Installation

Clone the repository:
git clone https://github.com/U82146510/node-grapql.git
cd graphql-game-api
Install dependencies:
npm install
Start the server:
npm run dev

The server runs on http://localhost:3000/graphql by default.

Usage

You can test the API using GraphQL Playground or Postman. Example queries:

Fetch all games

query {
  games {
    id
    title
    platform
  }
}

Add a new game

mutation {
  addGame(game: { title: "The Legend of Zelda", platform: ["Nintendo"] }) {
    id
    title
    platform
  }
}

Delete a game

mutation {
  deleteGame(id: "1") {
    id
    title
  }
}
