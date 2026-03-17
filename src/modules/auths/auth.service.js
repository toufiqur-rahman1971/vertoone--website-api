const jwt = require('jsonwebtoken');
const config = require('../../shared/config');
const AppError = require('../../shared/utils/app-error');
const { toUserResponse } = require('./auth.dto');

class AuthService {
  constructor(repository) {
    this.repository = repository;
  }

  async login(payload) {
    const { email, password } = payload;

    const user = await this.repository.findByEmail(email, true);

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const passwordMatches = await user.comparePassword(password);

    if (!passwordMatches) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.expiresIn
      }
    );

    return {
      token,
      user: toUserResponse(user)
    };
  }

  async createUser(payload) {
    const existingUser = await this.repository.findByEmail(payload.email);

    if (existingUser) {
      throw new AppError('Email already in use', 409);
    }

    const user = await this.repository.create(payload);
    return toUserResponse(user);
  }

  async listUsers(pagination) {
    const [users, total] = await Promise.all([
      this.repository.findAll(pagination),
      this.repository.count()
    ]);

    return {
      users: users.map(toUserResponse),
      meta: {
        total,
        page: pagination.page,
        limit: pagination.limit
      }
    };
  }

  async getProfile(userId) {
    const user = await this.repository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return toUserResponse(user);
  }
}

module.exports = AuthService;
