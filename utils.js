function commandRegex (...args) {
	return new RegExp('^' + args.join('[ ,]+'), 'i')
}

function getFanartEntry (name, tag) {
	return [
		commandRegex(name, '(?:фан){0,1}арт'),
		(ctx, next) => ctx.utils.getRandomPost(`#media #${tag}`)
			.then(attachment => ctx.reply({ attachment }))
			.then(next)
	]
}

function getRandomPhraseEntry (name, question, phrases) {
	return [
		commandRegex(name, ...(Array.isArray(question) ? question : [question])),
		(ctx, next) => (ctx.reply(phrases[(Math.random() * phrases.length) | 0]), next())
	]
}

module.exports = {
	commandRegex,
	getFanartEntry,
	getRandomPhraseEntry,
}
