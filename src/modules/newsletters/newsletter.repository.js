const Newsletter = require('./newsletter.model');

class NewsletterRepository {
  async create(data) {
    return Newsletter.create(data);
  }

  async findByEmail(email) {
    return Newsletter.findOne({ email: email.toLowerCase() });
  }
}

module.exports = NewsletterRepository;
