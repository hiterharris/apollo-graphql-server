const { ApolloServer, gql } = require('apollo-server');

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

  type User {
    id: ID!
    name: String
    email: String,
    username: String
    password: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    addUser(name: String, email: String, username: String, password: String): User
  }
  
`;

const resolvers = {
    Query: {
      users: () => users,
      user(parent, args) {
          return users.find(user => user.id == args.id);
      },
    },
    Mutation: {
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
