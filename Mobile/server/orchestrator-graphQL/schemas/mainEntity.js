const HOST = process.env.HOST_MAIN_ENTITY || "http://localhost:4002";
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
type Category{
  name: String
}

type Ingredients{
  name: String
}

type Food{
  id: ID!
  name: String
  description: String
  price: Int
  imgUrl: String
  authorId: String
  categoryId: Int
  Category: Category
  Ingredients: [Ingredients]
  User: User
}

input IngredientsInput{
  name: String
}

input FoodInput{
  name: String
  description: String
  price: Int
  imgUrl: String
  categoryId: Int
  Ingredients: [IngredientsInput]
}

type MutationResponse{
  message: String
}

type Query{
  getAllFoods: [Food]
  getOneFood(id: Int!): Food
}

type Mutation{
  deleteFood(id: Int): MutationResponse
  createFood(input: FoodInput): MutationResponse
  editFood(id: ID!, input: FoodInput): MutationResponse
}
`;

const resolvers = {
  Query: {
    getAllFoods: async () => {
      const cache = await redis.get("food/fetchAll");

      if (cache) {
        const data = JSON.parse(cache);

        return data;
      }

      const { data } = await axios({
        method: "GET",
        url: `${HOST}/food`,
      });

      redis.set("food/fetchAll", JSON.stringify(data));
      return data;
    },

    getOneFood: async (_, { id }) => {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${HOST}/food/` + id,
        });

        const { data: userData } = await axios({
          method: "GET",
          url: `${process.env.HOST_USER}/user/` + data.authorId,
        });

        data.User = userData;

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    deleteFood: async (_, { id }) => {
      const { data } = await axios({
        method: "DELETE",
        url: `${HOST}/food/` + id,
      });

      await redis.del("food/fetchAll");
      return data;
    },

    createFood: async (_, payload) => {
        const Ingredients = payload.input.Ingredients.map((el) => el.name);
        payload.input.authorId = "64e30557aa96fe1f5e39436c";
        payload.input.Ingredients = Ingredients;

        const { data } = await axios({
          method: "POST",
          url: `${HOST}/food`,
          data: payload.input,
        });

        await redis.del("food/fetchAll");

        return data;
    },

    editFood: async (_, { id, input }) => {
      const { data } = await axios({
        method: "PUT",
        url: `${HOST}/food/${id}`,
        data: input,
      });

      await redis.del("food/fetchAll");

      return data;
    },
  },
};

module.exports = {
  mainEntityTypeDefs: typeDefs,
  mainEntityResolvers: resolvers,
};
