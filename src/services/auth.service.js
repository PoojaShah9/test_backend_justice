/**
 * external libs
 */
const jwt = require("jsonwebtoken");
const config = require("jsconfig");
const bcrypt = require("bcrypt");

/**
 * internal models
 */
const IdentificationModel = require("../db/models/modifiers/identification.model");

/**
 * internal utils
 */
const { Auth, Login } = require("../exceptions/auth.exception");
const logger = console;

/**
 * internal services
 */
const EntityService = require("./entity.service");

class AuthService {
  static async register(data) {
    return await EntityService.create(data);
  }

  static async login(data) {
    const identification = await IdentificationModel.findOne({
      email: data.email,
    });

    if (!identification) {
      throw Auth.unknownUser(email);
    }

    if (!identification.can_login) {
      throw Auth.forbidden();
    }

    // const isValidPassword = await identification.validPassword(identification._doc.password);
    const isValidPassword = await bcrypt.compare(
      data.password,
      identification._doc.secret
    );

    if (!isValidPassword) {
      throw Login.attempt();
    }
    // I am not sure what is value of token_type
    const token_type = "User";

    const access_token = jwt.sign(
      { email: identification._doc.email },
      config.env.appKey,
      {
        expiresIn: "10m",
      }
    );
    const refresh_token = jwt.sign(
      { email: identification._doc.email },
      config.env.refreshKey,
      {
        expiresIn: config.env.lifetimeResetToken,
      }
    );

    return { token_type, access_token, refresh_token };
  }

  static async refreshToken(data) {
    const old_refresh_token = data.refresh_token;
    try {
      const { email } = jwt.verify(old_refresh_token, config.env.refreshKey);
      const identification = await IdentificationModel.findOne({ email });

      if (Boolean(identification) === false) {
        throw Auth.unknownUser(email);
      }

      logger.debug(
        "Auth Service::refreshtoken has been processed with success status"
      );
      const access_token = jwt.sign(
        { email: identification._doc.email },
        config.env.appKey,
        {
          expiresIn: "10m",
        }
      );
      const refresh_token = jwt.sign(
        { email: identification._doc.email },
        config.env.refreshKey,
        {
          expiresIn: config.env.lifetimeResetToken,
        }
      );

      return { access_token, refresh_token };

    } catch (e) {
      logger.error("Auth Service::refreshtoken error message", e.toString());
      logger.debug(
        "Auth Service::refreshtoken has been processed with fail status"
      );
      throw Auth.unauthorized();
    }
  }
}

module.exports = AuthService;
