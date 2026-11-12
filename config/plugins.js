module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  // Gmail SMTP (port 465 is blocked by Hetzner, 587 + STARTTLS works).
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.gmail.com'),
        port: env.int('SMTP_PORT', 587),
        secure: false,
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: env('SMTP_USERNAME'),
        defaultReplyTo: env('SMTP_USERNAME'),
      },
    },
  },
  ezforms: {
    config: {
      // reCAPTCHA v3; disabled when no secret is configured (local development).
      captchaProvider: env('RECAPTCHA_SECRET_KEY')
        ? {
            name: 'recaptcha',
            // The plugin reads `score` (its docs say `minimumScore`).
            config: { secretKey: env('RECAPTCHA_SECRET_KEY'), score: 0.5 },
          }
        : { name: 'none' },
      // Emails every submission to the recipients added in the admin (ezforms → Recipients).
      notificationProviders: [
        {
          name: 'email',
          enabled: Boolean(env('SMTP_USERNAME')),
          config: {
            subject: 'Nou missatge del formulari web',
            from: env('SMTP_USERNAME'),
          },
        },
      ],
    },
  },
});
