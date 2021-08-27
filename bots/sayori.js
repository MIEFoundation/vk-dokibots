const { commandRegex, getFanartEntry, getRandomPhraseEntry } = require('../utils')
const nameRegex = 'са[йоеё]{1,2}ри'

module.exports = [
	getFanartEntry(nameRegex, 'Sayori'),
	getRandomPhraseEntry(nameRegex, '(?:совет)', [])
]
