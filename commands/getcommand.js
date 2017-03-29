let ghost
exports.init = function(bot){ ghost = bot }

exports.run = function(msg, args) {
	if(args.length === 0) return ghost.edit(msg, 'You need to provide a file', 1000)

	try{
		require('fs').readFile(`./commands/${args}.js`, 'utf-8', function read(err, data) {
			if (err) ghost.error(err)
			msg.edit(`**__Overview of ${args}.js__**\n\`\`\`javascript\n${data}\n\`\`\``)
		})
	}catch(e){
		ghost.error(e)
		return ghost.edit(msg, 'Error \n' + e)
	}

}