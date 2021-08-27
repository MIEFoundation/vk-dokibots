const { VK } = require('vk-io')
const { HearManager } = require('@vk-io/hear')
const { SessionManager } = require('@vk-io/session')

class Bot {
	constructor (token) {
		this.vk = new VK({
			apiHeaders: { 'User-Agent': 'MIEFoudation/Webhook (+https://vk.com/@miefoundation-tech)' },
			token
		})
		this.hearManager = new HearManager()
		this.sessionManager = new SessionManager()
		this.initialized = false
	}
	
	defaultMiddleware (ctx, next) {
		ctx.bot = this
		next()
	}

	on (func) {
		this.vk.updates.on("message", func)
		return this
	}

	hear (...args) {
		this.hearManager.hear(...args)
		return this
	}

	start () {
		if (!this.initialized) {
			this.on(this.defaultMiddleware)
				.on(this.sessionManager.middleware)
				.on(this.hearManager.middleware)
			this.initialized = true
		}
		return this.vk.updates.start()
	}
	stop () { return this.vk.updates.stop() }
}

module.exports = Bot
