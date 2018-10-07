/* eslint-disable camelcase */
const twilio = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
  );
  
  const service = twilio.notify.services(process.env.NOTIFY_SID_KEY);
  
  module.exports = function(body, user) {
    const binding = JSON.stringify({
      binding_type: 'sms',
      address: `+1${user.eContact}`,
      identity: user.id
    });
    service.notifications
      .create({
        body,
        toBinding: binding
      })
      .catch((err) => {
        console.error(err);
      });
  };