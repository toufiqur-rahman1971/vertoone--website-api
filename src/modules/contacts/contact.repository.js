const Contact = require('./contact.model');

class ContactRepository {
  async create(data) {
    return Contact.create(data);
  }
}

module.exports = ContactRepository;
