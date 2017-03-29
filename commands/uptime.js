let ghost
exports.init = function(bot){ ghost = bot }

exports.run = function(msg, args) {
	msg.edit('', {
        'embed': {
            'title': 'ghostbot',
            'description': `Uptime: ${msg, secondsToString(process.uptime())}`,
            'color': ghost.config.embedColor
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