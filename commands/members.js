let ghost
exports.init = function(bot) { ghost = bot }

exports.run = function(msg) {
	msg.delete()
	msg.channel.send('', {
		embed: {
			title: msg.guild.name,
			description: `Member Count: ${msg.guild.memberCount}`,
			color: ghost.config.embedColor
		}
	})
}