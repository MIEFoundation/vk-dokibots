function commandRegex (...args) {
	args = args.map(v => v !== null ? v : '$')
	return new RegExp('^' + args.join('[ ,]+'), 'i')
}

const contextRegex = commandRegex('ты' + '[, ]*')

function messageFilter (name) {
	const nameRegex = commandRegex(name + '[, ]*')
	return [
		() => true,
		(ctx, next) => {
			if (ctx.hasReplyMessage && ctx.replyMessage.senderId === ctx.groupId) {
				if (ctx.hasText && contextRegex.test(ctx.text)) {
					ctx.text = ctx.text.slice(contextRegex.exec(ctx.text)[0].length)
				}
				return next()
			}
			if (ctx.hasText && nameRegex.test(ctx.text)) {
				ctx.text = ctx.text.slice(nameRegex.exec(ctx.text)[0].length)
				return next()
			}
		}
	]
}

const ContentEntryToRegex = {
	media: '(?:фан){0,1}арт',
	fun: '(?:мем(?:ы+|ас){0,1})|(?:сме(?:хохуечки|шня[вф]ка))'
}

function contentEntries (name) {
	return Object.entries(ContentEntryToRegex)
		.map(([tag, regex]) => [
			commandRegex(regex),
			(ctx, next) => ctx.utils.getRandomPost(`#${tag} #${name}`)
				.then(attachment => ctx.reply({ attachment }))
		])
}

function getRandomPhraseEntry (question, phrases) {
	return [
		Array.isArray(question) ? commandRegex(...question) : commandRegex(question),
		(ctx, next) => ctx.reply(phrases[(Math.random() * phrases.length) | 0])
	]
}

module.exports = {
	commandRegex,
	messageFilter,
	contentEntries,
	getRandomPhraseEntry,
}
