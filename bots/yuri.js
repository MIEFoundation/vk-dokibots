const { commandRegex, getFanartEntry, getRandomPhraseEntry } = require('../utils')
const nameRegex = '[йую]{1,2}ри'

module.exports = [
	getFanartEntry(nameRegex, 'Yuri'),
	getRandomPhraseEntry(nameRegex, '(?:верни |отдай ){0,1}ручк[аиу]', [
		'Какая ручка? Твоя? O_O',
		'Твоя ручка? Не знаю где она >.<',
		'Ручка? Где? (*////*)',
		'... >_>',
	]),
]
