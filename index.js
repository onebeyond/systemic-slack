const debug = require('debug')('systemic:slack');
const { createReadStream, existsSync } = require('fs');
const { WebClient } = require('@slack/web-api');

module.exports = () => {
  let slackClient;
  const start = async ({ config }) => {
    const token = process.env.SLACK_TOKEN;

    if (!token) {
      throw new Error('Slack API token is not set, please check configuration.');
    }

    slackClient = new WebClient(token);

    const { iconEmoji, botName } = config;

    const sendMessage = (text, room) => slackClient.chat.postMessage({
      channel: room || process.env.SLACK_ROOM, text, icon_emoji: iconEmoji, username: botName,
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
        channels: room || process.env.SLACK_ROOM,
        file: createReadStream(filepath),
        icon_emoji: iconEmoji,
        username: botName,
      });

      debug(`File uploaded: ${result.file.id}`);
      return result;
    };

    return { sendMessage, sendFile };
  };

  return { start };
};
