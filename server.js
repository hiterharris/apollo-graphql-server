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

const beerList = [
  {
    id: 1,
    title: 'Budweiser 12 pack',
    price: '$9.99',
    image: 'https://cdn.shopify.com/s/files/1/0091/7002/6592/products/df22f1c8-cb24-4419-b5d2-a4d9de6f104d_2.f0353169110c83a9de825a2c3f660d09_1296x.jpg?v=1569264543',
  },
  {
    id: 2,
    title: 'Corana 12 pack',
    price: '$15.09',
    image: 'https://images.heb.com/is/image/HEBGrocery/002117757',
  },
];

const wineList = [
  {
    id: 1,
    title: 'Wine 1',
    price: '$0',
    image: 'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=%5B589%2C331%5D&w=1178&h=785&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2017%2F09%2F2014-domaine-parent-bourgogne-pinot-noir-wine-masters-FT-MAG1017.jpg',
  },
];

const tobaccoList = [
  {
    id: 1,
    title: 'Tobacco 1',
    price: '$0',
    image: 'https://lede-admin.coloradosun.com/wp-content/uploads/sites/15/2019/04/IMG_20190430_145752-2.jpg',
  },
];

const vapeList = [
  {
    id: 1,
    title: 'Vape 1',
    price: '$0',
    image: 'https://assets.vaping.com/media/catalog/product/h/y/hyype-bar-range.png?scale.option=ignore&canvas.width=602&canvas.height=465&scale.width=465&scale.height=465&canvas.opacity=0',
  },
];

const productCardData = [
  {
    id: 1,
    title: 'Beer',
    image: 'https://cdn.shopify.com/s/files/1/0091/7002/6592/products/df22f1c8-cb24-4419-b5d2-a4d9de6f104d_2.f0353169110c83a9de825a2c3f660d09_1296x.jpg?v=1569264543',
    data: beerList,
  },
  {
    id: 2,
    title: 'Wine',
    image: 'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=%5B589%2C331%5D&w=1178&h=785&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2017%2F09%2F2014-domaine-parent-bourgogne-pinot-noir-wine-masters-FT-MAG1017.jpg',
    data: wineList,
  },
  {
    id: 3,
    title: 'Tobacco',
    image: 'https://lede-admin.coloradosun.com/wp-content/uploads/sites/15/2019/04/IMG_20190430_145752-2.jpg',
    data: tobaccoList,
  },
  {
    id: 4,
    title: 'Vapes',
    image: 'https://assets.vaping.com/media/catalog/product/h/y/hyype-bar-range.png?scale.option=ignore&canvas.width=602&canvas.height=465&scale.width=465&scale.height=465&canvas.opacity=0',
    data: vapeList,
  },
];

const typeDefs = gql`

  type User {
    id: ID!
    name: String
    email: String,
    username: String
    password: String
  }

  type Beer {
    id: ID!
    title: String
    price: String
    image: String
  }

  type Product {
    id: ID!
    title: String
    image: String
    data: [Beer]
  }

  type Query {
    users: [User]
    user(id: ID!): User
    products: [Product]
    beerList: [Beer]
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
      products: () => productCardData,
      beerList: () => beerList,
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
