const debug = require('debug')('systemic:slack');
const { createReadStream, existsSync } = require('fs');
const { WebClient } = require('@slack/web-api');

module.exports = () => {
  let slackClient;
  const start = async ({ config }) => {
    const { token, default_slack_room } = config;

    if (!token) {
      throw new Error('Slack API token is not set, please check configuration.');
    }

    slackClient = new WebClient(token);

    const { iconEmoji, botName } = config;

    const sendMessage = (text, room) => slackClient.chat.postMessage({
      channel: room || default_slack_room, text, icon_emoji: iconEmoji, username: botName,
    });

    const sendFile = async (title, filepath, room) => {
      debug(`Sending ${filepath} to slack.`);

      if (!existsSync(filepath)) {
        debug(`File ${filepath} not exists or i can't access it`);
        throw new Error(`File ${filepath} not exists or i can't access it`);
      }

      const result = await slackClient.files.upload({
        filepath,
        title,
        channels: room || default_slack_room,
        file: createReadStream(filepath),
        icon_emoji: iconEmoji,
        username: botName,
      });

      debug(`File uploaded: ${result.file.id}`);
      return result;
    };

    return { sendMessage, sendFile, slackClient };
  };

  return { start };
};
