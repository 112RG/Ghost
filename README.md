![ghost Bot](http://i.imgur.com/ohS1PwH.png)   
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/kanadeko/ghost/master/LICENSE)
[![Code Climate](https://codeclimate.com/github/kanadeko/ghost/badges/gpa.svg)](https://codeclimate.com/github/kanadeko/ghost)
[![Issue Count](https://codeclimate.com/github/kanadeko/ghost/badges/issue_count.svg)](https://codeclimate.com/github/kanadeko/ghost)

ghost is an easy to use self bot that is shifting more and more into a framework while preserving its ease of use. It sits on top of [discord.js](https://github.com/hydrabolt/discord.js/). NodeJS version 6+ is ***REQUIRED*** [Installing Node.js](https://nodejs.org/en/download/package-manager/)

[> Check this video to see how it works!](https://my.mixtape.moe/pwcrem.webm)

## Version 4.0 is out!
### What's new:
1. Rewrote pretty much everything since ghost is shifting into a framework.
2. Each command has it's own file now, meaning you can add commands to your bot by simply dropping a .js file into the ./commands/ folder.
3. Removed json files for configuration and value storing. Everything is handled by [knex](https://knexjs.org) and sqlite now.
4. Added a new configuration setting to redirect unknown commands to a specific module. Check `config.js` for further instructions and sample.

## Installing:

---
#### Upgrading:

1. **This is super important:** This update breaks a few things, including the loss of all your stickers. As a super experimental stuff, you *__could__* try to run `!s migrate` and if you're lucky enough, it will migrate your stickers to the new system.  
2. Update your `config.js` file with the new added values. Check them out on the `config.sample.js` file. (**Note the change from `config.json` to `config.js`**)
3. Delete `node_modules/` folder
4. `npm install`

#### Clean install:
1. Clone the repo with `git clone https://github.com/kanadeko/ghost`
2. Run `npm install`
3. Copy config.sample.js to config.js and fill the required data.
4. To get your personal token, bring up the Developer Tools on the discord website and type `localStorage.token`. That should print your personal token to use with this bot.
5. Run the bot with `node ghost.js`

---

## Overview of the config.sample.json file:
```javascript
let config = {

  // This is your Discord personal token
  token: '',

  // Prefix on which the bot will be hooked to
  prefix: '!',

  // Your MyAnimeList username
  MALusername: '',

  // Unrecognized commands
  commandError: {
    // Should we attempt to redirect every unrecognized command to a module?
    sendToModule: true,
    // Which module?
    module: 's',
    // Which function?
    function: 'run'
    /*
      In this case, any unrecognized command will be redirected to the
      stickers module to see if it exists as a sticker and if it does, send it.
    */
  },

  // Border color for embeds, defaults to ghost one
  embedColor: 15473237
}
```

---

## Modules:
This new update brings every command in the form of separate modules. Inside each module you can make up the stuff you want, and you can execute it by calling the module name without the extension. There's a sample module ready for you to duplicate called `base.js`.

Example of a simple module with no dependencies that returns the server's member count on which you send the command:
```javascript
exports.run = function(msg, args) {
  msg.delete()
  msg.channel.sendMessage('', {
    'embed': {
      'title': msg.guild.name,
      'description': `Member Count: ${msg.guild.memberCount}`,
      'color': 15473237
    }
  })
}
```

Pretty easy stuff.
If you want me to include a module you've made, send a PR with your stuff and I'll look at it.

---

## Bundled modules

Each module has detailed instructions inside their own files. Take a look at them for further details on how to use.

- `anime <name of the anime>`  
  Shows the first occurence of the searched anime on kitsu.io and returns a summary of it

- `emote [emote]`  
  Shows information about a custom emote.

- `eval [expression]`  
  A module to eval expressions. Dangerous stuff, don't use unless pretty sure of what you're doing.
  
- `eyes`  
  A module that edits a message to add the effect of animated eyes. You probably should update the emoji name if you're not on Pilar's server.

- `getcommand [module]`  
  Sends the specified module's source to the chat. Ex: `!getcommand base` would print `base.js` contents to chat.

- `gifspeed [url]`  
  Removes delay between frames of the given gif url and uploads it.

- `mal`  
  Prints information about your MyAnimeList username.

- `manga <name of the manga>`  
  Shows the first occurence of the searched manga on kitsu.io and returns a summary of it

- `members`  
  Shows the server's member count.

- `ping`  
  Simple tool to check delay between your bot and Discord.

- `playing [message]`  
  Change your `playing` status on Discord to the specified string. (Note you wont be able to see it due to a Discord limitation).

- `purge [number of messages]`  
  Grabs the supplied amount of messages from chat and deletes those that are yours.

- `reboot`  
  Reboots the ghost. (Only works if using pm2|forever).

- `reload`  
  Reloads all the modules (Useful when developing).

- `react [message]`  
  React to the last message with regional characters. a-z 0-9, no spaces.

- `regional [message]`  
  Sends a message using regional character emojis.

- `s [name] | [add|del|ren]`  
  A module to manage stickers like Telegram does. Upload a sticker with a given name, and then make ghost paste it when you trigger the command.

- `smug`  
  Displays smug looking anime girls with patronizing looks on their faces.

- `stats`  
  Displays an embed with statistics.

- `status [online|idle|dnd|offline]`  
  The status you want to appear as whenever you're offline, since using ghost will make discord think you're always online.

- `tag [name] | [add|del|ren]`  
  Saves the given text into a tag for later usage. For example `tag add ghost https://github.com/kanadeko/ghost` would print `https://github.com/kanadeko/ghost` every time I do `tag ghost`

- `tl`  
  Tries to translate the last message to english. 

- `uptime`  
  Displays how long the bot has been running.
