require('dotenv').config();
const { App } = require('@slack/bolt');

const { version } = require('./package.json');

const TOKEN_OAUTH = process.env.SLACK_OAUTH_TOKEN;
const TOKEN_SIGNING = process.env.SLACK_SIGNING_SECRET;

const app = new App({
  signingSecret: TOKEN_SIGNING,
  token: TOKEN_OAUTH,
});

(async () => {
  await app.start(process.env.PORT || 3000);

  app.event('app_mention'), async ({ context, event }) => {
    try {
      await app.client.chat.postMessage({
        token: context.botToken,
        channel: event.channel,
        text: `Hola <@${event.user}>, Gracias por mensionarme`
      });
    } catch (error) {
      console.log(error);
    }
    console.log(event.channel);
  }

  console.log('⚡️ Bolt app is running!');
})();