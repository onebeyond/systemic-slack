const { WebClient } = require('@slack/web-api');

module.exports = () => {
  const start = async ({ config }) => {
    const { token, options } = config;

    if (!token) {
      throw new Error('Slack API token is not set, please check configuration.');
    }

    const slackClient = new WebClient(token, options || {});

    return slackClient;
  };

  return { start };
};
