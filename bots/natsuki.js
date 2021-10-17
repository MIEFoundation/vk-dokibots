const { commandRegex, messageFilter, contentEntries, getRandomPhraseEntry } = require('../utils')

module.exports = [
	messageFilter('на[цтс]{1,2}(?:уки){0,1}'),
	...contentEntries('Natsuki'),
	// Complex
	[
		commandRegex('(?:можно|дай)', 'кекс[ыовки]{0,3}([,]{0,1} пожалу+йста){0,1}'),
		async (ctx, next) => {
			const askedBefore = ctx.utils.get(ctx.senderId + 'askedBefore') ?? 0
			if (askedBefore) {
				return ctx.reply('Не много ли тебе?')
			}
			if (!ctx.$match[1] || askedBefore > 0) return next()
			if (ctx.isUser && Math.random() > 0.5) return next()
			ctx.utils.set(ctx.senderId + 'askedBefore', askedBefore++)
			ctx.reply('Ладно, держи свой кекс!')
			const senderName = await ctx.utils.getSenderName(ctx, 'dat')
			ctx.utils.serviceMessage(ctx, `// Нацуки передала ${senderName} кекс`)
		}
	],
	getRandomPhraseEntry(['дай', 'кекс[ыовки]{0,3}'], [
		'Нет!',
		'Не дам, бака!',
		'Кексы не дам!',
	]),
	// Reacts
	getRandomPhraseEntry(null, [
		'Что?',
		'Да-да?',
		'Что сказать-то хотел?',
	]),
	getRandomPhraseEntry('мила[яшка]{0,4}', [
		'Я не милая >_<',
		'Не называй меня милой!',
	]),
	getRandomPhraseEntry('(?:ше[яю]|сверну(?:ть){0,1})', [
		'Ха-ха, очень смешно.',
		'Ну очень блять смешно',
		'За такое в ебало бьют',
	]),
	getRandomPhraseEntry('(?:сука|сдохни|иди нахуй)', [
		'Пошёл нахуй!',
		'Пидораса забыли спросить.',
		'Нахуй пошёл!',
	]),
	getRandomPhraseEntry('кекс[ыик]{0,3}', [
		'Что "кекс"? Договаривай',
		'Кекс. И что?',
		'???',
	]),
	// Utils
	getRandomPhraseEntry('рецепт[ы]{0,1}', [
		'Рецепт чего?',
		'???',
	]),
	getRandomPhraseEntry(['рецепт[ы]{0,1}', 'кекс[аов]{0,2}'], [
		`На 10 небольших кексов нужно:
- Пол-стакана сливочного масла
- Пол-стакана сахара
- 2 яйца
- Стакан муки
- 1 ст. ложка разрыхлителя
- 2 ст. ложки изюма
- 5 ст. ложек орехов
- Сахарный сироп или мёд - по вкусу

1. Смешай сливочное масло, яйца, сахар и разрыхлитель. Не забудь хорошо перемешать всё!
2. Потом постепенно сыпь туда муку. Добавь измельчённые орехи, а также изюм.
3. Тесто залей по формочкам, выпекай при температуре 180С в течении 20 минут.
4. Следи за ними, а то подгорят! Свежеиспеченные кексы полей сиропом или мёдом.`
	]),
]
