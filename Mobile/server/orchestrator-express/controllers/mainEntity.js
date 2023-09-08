const Redis = require("ioredis");
const axios = require("axios");
const MAIN_ENTITY_URL = process.env.MAIN_ENTITY_URL || "http://localhost:4002"
const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  db: 0,
});

class MainEntity {
  static async fetchAll(request, response, next) {
    try {
      let cache = await redis.get("food/fetchAll");
      
      if (cache) {
        const data = JSON.parse(cache);
        
        return response.status(200).json(data);
      }
      
      const {data} = await axios({
        method: 'GET',
        url: `${MAIN_ENTITY_URL}/food`
      })

      redis.set("food/fetchAll", JSON.stringify(data))
      console.log('Successfully added to redis!')
      response.status(200).json(data)
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { MainEntity };
