let ghost
let _table = 'status'

exports.init = function(bot){
	ghost = bot

	// Create the table where we will be storing this module's data
	ghost.db.schema.createTableIfNotExists(_table, function (table) {
		table.increments()
		table.string('status')
	}).then(function () {
		ghost.db.table(_table).then(function(row){
			if(row.length > 0){
				// Seems like data is stored. We should apply the status now
				ghost.log('Setting offline status to: ' + row[0].status)
				ghost.user.setStatus(row[0].status)
				return
			}

			// Populate it
			ghost.db.table(_table).insert({
				status: 'online'
			}).then(function() {})
		})
	}).catch(function(error) { ghost.error(error) })
}

exports.run = function(msg, args) {
	if(args.length === 0) return ghost.edit(msg, 'Your offline status is: ' + msg.client.status)

	if(args[0] !== 'idle' && args[0] !== 'online' && args[0] !== 'dnd' && args[0] !== 'invisible')
		return ghost.edit(msg, 'Wrong option. You need to specify idle|online|dnd|invisible')

	ghost.db.table(_table).where('id', 1).update({
		status: args[0]
	}).then(() => {
		ghost.user.setStatus(args[0])
		return ghost.edit(msg, 'Next time you are offline your status will be set to: ' + args[0])
	}).catch(function(error) { ghost.error(error) })

}