const config = require('../../shared/config');

class ContactService {
  constructor(repository, emailService) {
    this.repository = repository;
    this.emailService = emailService;
  }

  async createContact(payload) {
    const contact = await this.repository.create(payload);

    await this.emailService.sendEmail({
      to: contact.email,
      subject: 'Thanks for contacting Vertoone',
      template: 'contact-confirmation.html',
      context: {
        firstName: contact.firstName,
        subject: contact.subject
      }
    });

    if (config.email.adminNotificationEmail) {
      await this.emailService.sendEmail({
        to: config.email.adminNotificationEmail,
        subject: `New contact request: ${contact.subject}`,
        html: `<p>${contact.firstName} ${contact.lastName} sent a message.</p><p>${contact.message}</p>`
      });
    }

    return contact;
  }
}

module.exports = ContactService;
