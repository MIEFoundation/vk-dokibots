const { commandRegex, messageFilter, contentEntries, getRandomPhraseEntry } = require('../utils')

module.exports = [
	messageFilter('(?:са[йоеё]{1,2}ри|са[йя]{1,2})'),
	...contentEntries('Sayori'),
	// Reacts
	getRandomPhraseEntry(null, [
		'Агась?',
		'Меня звали?',
		'Я тут!',
	]),
	getRandomPhraseEntry('(?:хорошая|лучшая|красивая|прекрасная)', [
		'Спасибо, ты тоже!',
		'Кхе-кхе, спасибо!',
		'Оу, не за что!',
		'',
	]),
	getRandomPhraseEntry('(?:верёвка|ты ошибка|сука|сдохни|иди нахуй)', [
		'...Злюка >_>',
		'Пошёл ты!',
		'Ну ты и дурак.',
	]),
	// Utils
	getRandomPhraseEntry('комплимент', [
		'Ты выглядишь блестяще!',
		'Ты просто кексик!~',
		'Я рада тому, что ты у меня есть~',
		'Зая моя!~',
		'Ты моё солнышко~',
	]),
	getRandomPhraseEntry('совет[ыик]{0,2}', [
		'Бутерброд лучше есть колбасой вниз, так вкуснее будет!',
		'Не забывай предохранятся... то-есть сохранятся! >_<',
	]),
]
