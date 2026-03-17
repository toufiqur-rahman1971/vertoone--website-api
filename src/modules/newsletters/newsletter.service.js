const AppError = require('../../shared/utils/app-error');

class NewsletterService {
  constructor(repository, emailService) {
    this.repository = repository;
    this.emailService = emailService;
  }

  async subscribe(payload) {
    const existing = await this.repository.findByEmail(payload.email);

    if (existing) {
      throw new AppError('Email already subscribed', 409);
    }

    const subscription = await this.repository.create(payload);

    await this.emailService.sendEmail({
      to: subscription.email,
      subject: 'Welcome to the Vertoone newsletter',
      template: 'newsletter-welcome.html',
      context: { email: subscription.email }
    });

    return subscription;
  }
}

module.exports = NewsletterService;
