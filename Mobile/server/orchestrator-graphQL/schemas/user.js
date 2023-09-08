const HOST = process.env.HOST_USER || "http://localhost:4001";
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  db: 0,
});

const typeDefs = `#graphql
  type User{
    _id: ID
    email: String
    username: String
    role: String
    phoneNumber: String
    address: String
  }

  input UserInput{
    email: String
    password: String
    username: String
    role: String
    phoneNumber: String
    address: String
  }

  type UserMutationResponse{
    message: String
  }

  type Query{
    getAllUsers: [User]
    getOneUser(id: String): User
  }

  type Mutation{
    createUser(input: UserInput): UserMutationResponse 
    deleteUser(id: String): UserMutationResponse
  }
  
`;

const resolvers = {
  Query: {
    getAllUsers: async () => {
      const cache = await redis.get('user/fetchAll')

      if(cache){
        const data = JSON.parse(cache);
        
        return data
      }

      const {data} = await axios({
        method: 'GET',
        url: `${HOST}/user`
      })

      redis.set("user/fetchAll", JSON.stringify(data))
      return data
    },

    getOneUser: async (_, {id}) => {
      
      const {data} = await axios({
        method: 'GET',
        url: `${HOST}/user/`+id
      })

      return data
    }
  },

  Mutation: {
    createUser: async (_, payload) => {
      const {data} = await axios({
        method: 'POST',
        url: `${HOST}/user`,
        data: payload.input
      })

      await redis.del('user/fetchAll')

      return data
    },

    deleteUser: async (_, {id}) => {
      const {data:userData} = await axios({
        method: 'DELETE',
        url: `${HOST}/user/`+id
      })

      const {data: foodData} = await axios({
        method: 'DELETE',
        url: `${process.env.HOST_MAIN_ENTITY}/food/associate/${id}`
      })
      
      await redis.del(['user/fetchAll', 'food/fetchAll'])
      return userData
    }
  }
};

module.exports = {
  userTypeDefs: typeDefs,
  userResolvers: resolvers,
};
