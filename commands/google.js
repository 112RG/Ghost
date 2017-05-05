let ghost
exports.init = function(bot) { ghost = bot }

exports.run = function(msg, args) {
	msg.delete()
	msg.channel.sendMessage('', {
		embed: {
			type: 'rich',
			title: 'Google Search',
			description: '[' + args.toString().replace(/,/g, ' ') + '](https://www.google.com/search?hl=en_US&q=' + args.toString().replace(/,/g, '+') + ')',
			color: ghost.config.embedColor
		}
	})
}
