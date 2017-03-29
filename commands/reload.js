let ghost
exports.init = function(bot){ ghost = bot }
exports.run = function(msg, args) {
    msg.delete()
	ghost.loadCommands()
}