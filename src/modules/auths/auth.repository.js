const User = require('./auth.model');

class AuthRepository {
  async create(data) {
    return User.create(data);
  }

  async findByEmail(email, includePassword = false) {
    const query = User.findOne({ email: email.toLowerCase() });
    if (includePassword) {
      query.select('+password');
    }
    return query;
  }

  async findById(id) {
    return User.findById(id).select('-password');
  }

  async findAll({ skip, limit }) {
    return User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  async count() {
    return User.countDocuments();
  }
}

module.exports = AuthRepository;
