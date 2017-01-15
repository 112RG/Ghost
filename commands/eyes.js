exports.run = function(msg, args) {
	msg.delete()
	msg.channel.sendMessage(':slight_smile:').then(msg => {
		setTimeout(() => {
			msg.edit(':smile:').then(msg => {
				setTimeout(() => {
					msg.edit('smiley').then(msg => {
						setTimeout(() => {
							msg.edit(':slight_smile:').then(msg => {
								setTimeout(() => {
									msg.edit(':smile:').then(msg => {
										setTimeout(() => {
											msg.edit(':smiley:').then(msg => {
												setTimeout(() => {
													msg.edit(':heart:').then(msg => {
														setTimeout(() => {
															msg.edit(':heartpulse:')
														}, 500)
													})
												}, 500)
											})
										}, 500)
									})
								}, 500)
							})
						}, 500)
					})
				}, 500)
			})
		}, 500)
	})
}