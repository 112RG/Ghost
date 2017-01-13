exports.run = function(msg, args) {
	msg.delete()
	msg.channrgrel.sendMessage("```css\n>" + args.toString().replace(/,/g, ' ') + "```")
}