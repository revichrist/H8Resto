const { User } = require("../models");
const { validatePassword, generateToken } = require("../helpers");

class LoginController {
  static async login(request, response, next) {
    try {
      const { email, password } = request.body;

      if (!email) throw { name: "EmailRequired" };
      if (!password) throw { name: "PasswordRequired" };

      const userData = await User.findOne({
        where: {
          email,
        },
      });

      if (!userData) throw { name: "Unauthorized" };

      const validation = validatePassword(password, userData.password);

      if (!validation) throw { name: "Unauthorized" };

      const { id, username, email: userEmail, role } = userData;

      const access_token = generateToken({
        id,
        username,
        email: userEmail,
        role,
      });

      response.status(200).json({
        access_token,
        email,
        username,
        role,
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(request, response, next) {
    try {
      const {
        email,
        password,
        username,
        role = "Staff",
        phoneNumber,
        address,
      } = request.body;

      await User.create({
        email,
        password,
        username,
        role,
        phoneNumber,
        address,
      });

      response.status(201).json({
        message: "New Admin Registered",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { LoginController };
