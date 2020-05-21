# systemic-slack
systemic-slack

Simple systemic component to send messages or files in Slack to any room.

## Environment variables
* SLACK_TOKEN - Slack API token [Slack Token Page](https://api.slack.com/tokens)  
* SLACK_ROOM  - *optional* Default room ID to send messages

## Methods
#### sendMessage( *message*, *room* )
* message - Message to send, can be formatted using markdown.
* room *(optional)* - Send to given roomID instead of environment defined

#### sendFile( *title*, *filepath*, *room* )
* title - Title of file
* filepath - Path of desired file
* room *(optional)* - Send to given roomID instead of environment defined

## Usage
```js
const System = require('systemic')
const slack = require('systemic-slack')

new System()
    .configure({
        slack: {
          botName: 'My awesome service', // Set the name shown on message
          iconEmoji: 'smile' // 😀 Shows avatar with desired emoji
        }
    })
    .add('logger', console)
    .add('slack', slack()).dependsOn('config')
    .start((err, components) => {
        components.sendMessage('My test message');
        components.sendFile('My file', '/tmp/test');
    })
```

## Message format
Message content can be formated using MarkDown syntax [Markdown cheatseet](https://www.markdownguide.org/cheat-sheet/)
