const NewsletterRepository = require('./newsletter.repository');
const NewsletterService = require('./newsletter.service');
const emailService = require('../../shared/services/email.service');
const asyncHandler = require('../../shared/utils/async-handler');
const { sendResponse } = require('../../shared/utils/response');

const newsletterService = new NewsletterService(new NewsletterRepository(), emailService);

const subscribe = asyncHandler(async (req, res) => {
  const subscription = await newsletterService.subscribe(req.body);
  return sendResponse(res, {
    statusCode: 201,
    message: 'Subscription successful',
    data: subscription
  });
});

module.exports = {
  subscribe
};
