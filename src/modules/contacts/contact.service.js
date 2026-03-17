const handlebars = require('handlebars');
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
      const escape = handlebars.escapeExpression;
      const safeName = escape(`${contact.firstName} ${contact.lastName}`);
      const safeSubject = escape(contact.subject);
      const safeMessage = escape(contact.message);

      await this.emailService.sendEmail({
        to: config.email.adminNotificationEmail,
        subject: `New contact request: ${contact.subject}`,
        html: `<p>${safeName} sent a message.</p><p><strong>Subject:</strong> ${safeSubject}</p><p>${safeMessage}</p>`
      });
    }

    return contact;
  }
}

module.exports = ContactService;
