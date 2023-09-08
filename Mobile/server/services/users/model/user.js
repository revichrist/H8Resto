const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongoConnection");
const { hashPassword } = require("../helpers/bcrypt");

class User {
  static userCollection() {
    return getDB().collection("users");
  }

  static async findAll() {
    try {
      const users = await this.userCollection().find().toArray();

      return users;
    } catch (error) {
      throw error;
    }
  }

  static async findOne(id) {
    try {
      const user = await this.userCollection().findOne({
        _id: new ObjectId(id),
      });

      if (!user) {
        throw { name: "DataNotFound" };
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async create(payload) {
    try {
      // if (!payload.email || !payload.password) {
      //   throw { name: "AllFieldRequired" };
      // }
      payload.password = hashPassword(payload.password)

      await this.userCollection().insertOne(payload)
      
    } catch (error) {
      throw error;
    }
  }

  static async destroy(id){
    try {
      const user = await this.findOne(id)
      
      await this.userCollection().deleteOne({
        _id: new ObjectId(id)
      })

    } catch (error) {
      throw(error)
    }
  }


}

module.exports = { User };
