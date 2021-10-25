const { messageFilter, commandRegex, contentEntries, getRandomPhraseEntry } = require('../utils')

module.exports = [
	messageFilter('[йую]{1,2}ри'),
	...contentEntries('Yuri'),
	getRandomPhraseEntry('привет(?:ик){0,1}|здра(?:вствуй|сь{0,1})(?:те){0,1}', [
		'Приветствую',
		'Здравствуй!',
		'...Привет! 👉👈',
	]),
	getRandomPhraseEntry('как (?:у тебя ){0,1}дела', [
		'Хорошо, спасибо!',
		'Неплохо, а у тебя?',
		'Всё отлично, хоть и не без проблем',
	]),
	// Complex
	[
		commandRegex('(?:налей |дайте ){0,1}(?:ча[йю])(?: пожалуйста){0,1}'),
		async (ctx, next) => {
			const askedBefore = ctx.utils.get(ctx.senderId + 'askedBefore') ?? 0
			if (askedBefore) {
				ctx.reply('Разве я не наливала тебе уже? Хорошо...')
			} else {
				ctx.utils.set(ctx.senderId + 'askedBefore', askedBefore + 1)
				ctx.reply('Хорошо, сейчас...')
			}
			const senderName = await ctx.utils.getSenderName(ctx, 'dat')
			await ctx.utils.serviceMessage(ctx, `// Юри налила ${senderName} чаю`)
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
	getRandomPhraseEntry('(?:хорошая|лучшая|красивая|прекрасная|крутая|булочка|мила[яшка]{0,4})', [
		'>_<',
		'Ты тоже, кхе~',
		'Эмм... Спасибо!',
	]),
	getRandomPhraseEntry('(?:сука|сдохни|иди нахуй)', [
		'Ч... Что?',
		'Пошёл т-ты!',
		'Пожалуйста, будь вежливее...',
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
	]),
	getRandomPhraseEntry('(?:спасибо|благодарю)', [
		'Всегда пожалуйста.',
	]),
	// Utils
	getRandomPhraseEntry('совет[ыик]{0,2}', [
		'Я не знаю что могу тебе посоветовать, можешь спросить у Сайори',
		'Я не знаю что тебе советовать, можешь спросить что-нибудь у Сайори',
	]),
]
