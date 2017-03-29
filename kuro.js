const config = require('./config.js')
const Discord = require('discord.js')
const knex = require('knex')(config.database)
const chalk = require('chalk')
const fs = require('fs')


let filesDirectory = __dirname + '/files'
fs.existsSync(filesDirectory) || fs.mkdirSync(filesDirectory)

// Initializing the ultimate tan
const ghost = new Discord.Client()

// When ready
ghost.once('ready', () => {

	// Create database if it doesn't exist
	fs.exists('db', (exists) => exists || fs.writeFile('db', ''))

	// Getting the database ready
	ghost.db = knex

	// Making config available on every module
	ghost.config = config

	ghost.loadCommands()

	ghost.log('ghost is ready!', 'green')
})

ghost.on('message', function(msg){

	// Ignore if the message is not ours
	if (msg.author.id !== ghost.user.id) return

	// Ignore if the message doesn't start with our prefix
	if (!msg.content.startsWith(config.prefix)) return

	// Ignore if empty command
	if (msg.content.length === config.prefix.length) return

	// Get all the arguments
	let tmp = msg.content.substring(config.prefix.length, msg.length).split(' ')
	let args = []

	for(let i = 1; i < tmp.length; i++)
		args.push(tmp[i])

	// Store the command separately
	let cmd = tmp[0]

	if(ghost.modules.hasOwnProperty(cmd)) return ghost.modules[cmd].run(msg, args)
	if(config.commandError.sendToModule === true)
		return ghost.modules[config.commandError.module][config.commandError.function](msg, cmd)

	return msg.delete()

})

ghost.on('disconnect', () => { ghost.error('CLIENT: Disconnected!') })
ghost.on('reconnect', () => { ghost.log('CLIENT: Reconnecting...', 'green') })

ghost.loadCommands = function(){
	
	ghost.modules = {}

	// Load up all the modules
	fs.readdirSync('./commands/').forEach(function(file) {
		let name = file.slice(0, -3)

		delete require.cache[require.resolve('./commands/' + file)]

		try{
			ghost.modules[name] = require('./commands/' + file)
			if(ghost.modules[name].hasOwnProperty('init'))
				ghost.modules[name].init(ghost)

			ghost.log(`Module ${name} is ready`)
		}catch(e){
			ghost.error(`Error in module ${name}:\n${e.stack}`)
		}
		
	})

}

ghost.edit = function(msg, content, timeout = 3000){
	if(timeout === 0) return msg.edit(content).catch(console.error)

	msg.edit(content).then(() => {
		setTimeout(() => msg.delete().catch(console.error), timeout)
	})
}

ghost.log = function(msg, color){
	if(color === undefined) console.log('[ghost]: ' + msg)
	else console.log(chalk[color]('[ghost]: ' + msg))
}

ghost.error = function(msg){
	console.log(chalk.red('[ghost]: ' + msg))
}

ghost.log('Starting...', 'green')
ghost.login(config.token)

process.on('unhandledRejection', err => {
	ghost.error(`Uncaught Promise Error:\n${err.stack}`)
})