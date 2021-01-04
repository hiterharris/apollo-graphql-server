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

const users = [
    {
        id: 1,
        name: 'Hiter',
        email: 'hiter@gmail.com',
        username: 'hiter',
        password: 'pass',
    },
    {
        id: 2,
        name: 'Noor',
        email: 'noor@gmail.com',
        username: 'noor',
        password: 'pass02',
    }
];

const typeDefs = gql`

  type Book {
    id: ID!
    title: String
    author: String
  }

  type User {
    id: ID!
    name: String
    email: String,
    username: String
    password: String
  }
  
  type Query {
    books: [Book]
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    addBook(title: String, author: String): Book
    addUser(name: String, email: String, username: String, password: String): User
  }
  
`;

const resolvers = {
    Query: {
      books: () => books,
      users: () => users,
      user(parent, args) {
          return users.find(user => user.id == args.id);
      }
    },
    Mutation: {
      addBook: (parent, args) => {
        const newBook = {
          id: books.length + 1,
          title: args.title,
          author: args.author
        };
        books.push(newBook);
        return newBook;
      },
      addUser: (parent, args) => {
        const newUser = {
          id: users.length + 1,
          name: args.name,
          email: args.email,
          username: args.username,
          password: args.password
        };
        users.push(newUser);
        return newUser;
      }
    }
  };
  
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
