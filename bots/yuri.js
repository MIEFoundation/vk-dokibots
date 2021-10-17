const { messageFilter, commandRegex, contentEntries, getRandomPhraseEntry } = require('../utils')

module.exports = [
	messageFilter('[йую]{1,2}ри'),
	...contentEntries('Yuri'),
	// Complex
	[
		commandRegex('(?:налей |дайте ){0,1}(?:ча[йю])(?: пожалуйста){0,1}'),
		(ctx, next) => {
			const askedBefore = ctx.utils.get(ctx.groupId, ctx.senderId + 'askedBefore') ?? 0
			if (askedBefore) {
				ctx.reply('Разве я не наливала тебе уже? Хорошо...')
			} else {
				ctx.utils.set(ctx.groupId, ctx.senderId + 'askedBefore', askedBefore + 1)
				ctx.reply('Хорошо, сейчас...')
			}
			ctx.utils.serviceMessage(ctx, `// Юри налила @${ctx.isFromUser ? 'id' : 'club'}${Math.abs(ctx.senderId)} чаю`)
		}
	],
	getRandomPhraseEntry('(?:вино|вина[, ]?|налей вино)(?: пожалуйста){0,1}', [
		'Я не могу тебе налить вина, извини.',
		'Мне не разрешают наливать, прости.',
	]),
	getRandomPhraseEntry('(?:кекс[ыик]{0,3}|дай кекс[ыовки]{0,3})', [
		'За кексами тебе лучше к Нацуки',
		'Попроси у Нацуки',
	]),
	// Reacts
	getRandomPhraseEntry(null, [
		'Слушаю...',
		'Что-что?',
		'Хочешь что-то сказать?',
	]),
	getRandomPhraseEntry('мила[яшка]{0,4}', [
		'>_<',
		'Эмм... Спасибо',
	]),
	getRandomPhraseEntry('(?:отдай ){0,1}нож[ы]{0,1}', [
		'Какой нож? >_>',
		'... O_O',
	]),
	getRandomPhraseEntry('(?:верни |отдай ){0,1}ручк[аиу]', [
		'Какая ручка? Твоя? O_O',
		'Твоя ручка? Не знаю где она >.<',
		'Ручка? Где? (*////*)',
		'... >_>',
	]),
	getRandomPhraseEntry('чай', [
		'Чай?',
		'Что "чай"?',
		'???',
	])
	// Utils
]
