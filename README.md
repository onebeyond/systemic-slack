# systemic-slack
systemic-slack

Simple systemic component to send messages or files in Slack to any room.

## Environment variables
* SLACK_TOKEN - Slack API token [Slack Token Page](https://api.slack.com/tokens)  

## Usage
```js
const System = require('systemic')
const slack = require('systemic-slack')

new System()
    .configure({
        slack: {
          token: process.env.SLACK_TOKEN
        }
    })
    .add('logger', console)
    .add('slack', slack()).dependsOn('config')
    .start((err, components) => {
        /// do anything with components.slack
    })
```

## How to send a message

Use the client method `chat.postMessage`, documentation is available [here](https://api.slack.com/methods/chat.postMessage)
```js
await components.slack.chat.postMessage({
  channel: 'CXXXXXX', // channel ID
  text, // Text to send
});
```

## How to send a file

Use the client method `files.upload`, documentation is available [here](https://api.slack.com/methods/files.upload)
```js
const {createReadStream} = require('fs');
slackClient.files.upload({
  filepath,
  title,
  channels: [ 'CXXXXXXX' ],
  file: createReadStream(filepath),
});
```


## Message format
Message content can be formated using MarkDown syntax [Markdown cheatseet](https://www.markdownguide.org/cheat-sheet/)
