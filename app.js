require('dotenv').config()

const assert = require('assert')
const Bot = require('./bot')

const bots = new Map()

async function start () {
	assert.ok(process.env.TOKEN, 'TOKEN must not be empty')
	assert.ok(process.env.SERVICE, 'SERVICE must not be empty')
	const tokens = process.env.TOKEN
		.split('\n')
		.filter(String)
		.map(v => v.split('=', 2))
		.map(v => (v[1] = v[1].split(','), v))
    tokens.forEach(v => assert.ok(v.length === 2, 'TOKEN must be a pair(-s) of name=token'))
	
	const common = require('./bots/_common.js')
	for (const [name, [group_id, token]] of tokens) {
		console.log(`Creating ${name} bot`)
		const bot = new Bot(group_id, token)
		common.forEach(v => bot.on(v))
		require(`./bots/${name}.js`).forEach(v => bot.hear(...v))
		bots.set(name, bot)
	}

	console.log('Loaded!')
	for (const bot of bots.values()) {
		await bot.start()
	}
	console.log('Polling!')
}

async function stop () {
	console.group('Stop')
	const promises = []
	for (const bot of bots.values()) {
		promises.push(bot.stop())
	}
	await Promise.allSettled(promises)
	console.groupEnd('Stop')
	process.exit(0)
}

async function main () {
	console.group('Start')
	try {
		await start()
		console.groupEnd('Start')
		console.log('Ready!')
	} catch (e) {
		console.groupEnd('Start')
		console.error('Error starting', e)
		process.exit(1)
	}
	process.on('SIGINT', stop)
	process.on('SIGTERM', stop)
}

main()
