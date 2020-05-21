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

## Message format
Message content can be formated using MarkDown syntax [Markdown cheatseet](https://www.markdownguide.org/cheat-sheet/)
