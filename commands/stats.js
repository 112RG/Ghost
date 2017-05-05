let ghost
exports.init = function(bot){ ghost = bot }

exports.run = function(msg, args) {
	
	let pjson = require('../package.json')
	
	let version = 'v' + pjson.version.toString()
	let uptime = secondsToString(process.uptime()).toString()
	let modules = Object.keys(ghost.modules).length.toString() //0 // ghost.utils.moduleCount.toString()
	let memory = `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`

	// Showing the amount of stickers to demonstrate accessing other module's information
	let stickers = ghost.modules.s.stickerCount().toString()
	let tags = ghost.modules.tag.tagsCount().toString()

	msg.edit('', {
		'embed': {
			'type': 'rich',
			'description': '[Ghost Stats](https://github.com/112madgamer/Ghost) Fork of [ghost bot](https://github.com/kanadeko/ghost)',
			'color': ghost.config.embedColor,
			'fields': [
				{ 'name': '❯ Version', 'value': version, 'inline': true },
				{ 'name': '❯ Ram usage', 'value': memory, 'inline': true },
				{ 'name': '❯ Modules', 'value': modules, 'inline': true },
				{ 'name': '❯ Stickers', 'value': stickers, 'inline': true },
				{ 'name': '❯ Tags', 'value': tags, 'inline': true }
			],
			'thumbnail': {
				'url': 'https://i.imgur.com/tDeRnmd.png'
			},
			'footer':{
				'text': 'Uptime: ' + uptime
			}
		}
	})

}

function secondsToString(seconds){
	seconds = Math.trunc(seconds)
	let numdays = Math.floor((seconds % 31536000) / 86400)
	let numhours = Math.floor(((seconds % 31536000) % 86400) / 3600)
	let numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60)
	let numseconds = (((seconds % 31536000) % 86400) % 3600) % 60
	return numdays + ' days ' + numhours + ' hours ' + numminutes + ' minutes ' + numseconds + ' seconds'
}