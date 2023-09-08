const { User } = require("../model/user");

class UserController {
  static async fetchUsers(request, response, next) {
    try {
      const result = await User.findAll();

      console.log(result, 7);

      response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async fetchOneUser(request, response, next) {
    try {
      const { id } = request.params;

      const user = await User.findOne(id);

      response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async createUser(request, response, next) {
    try {
      const { email, password, username, role, phoneNumber, address } =
        request.body;
      await User.create({
        email,
        password,
        username,
        role,
        phoneNumber,
        address,
      });

      response.status(201).json({
        message: "New user has been created",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(request, response, next) {
    try {
      const { id } = request.params;

      const user = await User.destroy(id);

      response.status(200).json({
        message: "User has been deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { UserController };
