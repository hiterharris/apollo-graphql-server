const { ApolloServer, gql } = require('apollo-server');

const books = [
    {
        id: 1,
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        id: 2,
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const authors = [
    {
        id: 1,
        name: 'Kate Chopin',
    },
    {
        id: 2,
        name: 'Paul Auster',
    }
];

const users = [
    {
        id: 1,
        name: 'Hiter',
    },
    {
        id: 2,
        name: 'Noor',
    }
];

const typeDefs = gql`

  type Book {
    id: ID!
    title: String
    author: String
  }

  type Author {
      id: ID!
      name: String
  }

  type User {
    id: ID!
    name: String
  }
  
  type Query {
    books: [Book]
    authors: [Author]
    users: [User]
    user(id: ID!): User
  }
  
`;

const resolvers = {
    Query: {
      books: () => books,
      authors: () => authors,
      users: () => users,
      user(parent, args, context, info) {
          return users.find(user => user.id == args.id);
      }
    },
  };
  
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
