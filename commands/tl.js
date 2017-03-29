let ghost
exports.init = function(bot){ ghost = bot }

exports.run = function(msg, args) {
	msg.channel.fetchMessages({limit: 2})
		.then((messages) => {
			messages = messages.array()
			require('google-translate-api')(messages[1].content, {to: 'en'}).then(res => {
				msg.edit(`Translated from \`${res.from.language.iso}\` | ${res.text}`)
			}).catch(err => {
				ghost.log(err)
				msg.delete()
			})
		})
		.catch(e => ghost.error(e))
}