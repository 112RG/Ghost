let ghost
let _table = 'playing'
let _msg

exports.init = function(bot){
	ghost = bot

	// Create the table where we will be storing this module's data
	ghost.db.schema.createTableIfNotExists(_table, function (table) {
		table.increments()
		table.string('game')
	}).then(function () {
		ghost.db.table(_table).then(function(row){
			if(row.length > 0){
				// Seems like data is stored. We should apply the status now
				ghost.log('Setting game status to: ' + row[0].game)
				if(row[0].game === '')
					return ghost.user.setGame(null)
				return ghost.user.setGame(row[0].game)
			}

			// Populate it
			ghost.db.table(_table).insert({
				game: ''
			}).then(function() {})
		})
	}).catch(function(error) { ghost.error(error) })
}

exports.run = function(msg, args) {

	_msg = msg

	if(args.length === 0){
		ghost.user.setGame(null)
		this.save('')
		return
	}

	let text = args.join(' ')
	ghost.user.setGame(text)
	this.save(text)
}

exports.save = function(value){
	ghost.db.table(_table).where('id', 1).update({
		game: value
	}).then(function(){
		if(value === '') return ghost.edit(_msg, 'You succesfully removed your playing status.')
		return ghost.edit(_msg, 'Succesfully changed your playing status.')
	}).catch(function(error) { ghost.error(error) })
}
