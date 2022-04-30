const { VK } = require('vk-io')
const { HearManager } = require('@vk-io/hear')
const { SessionManager } = require('@vk-io/session')

class Bot {
	constructor (id, token) {
		this.vk = new VK({
			apiHeaders: { 'User-Agent': 'MIEFoudation/Webhook (+https://vk.com/@miefoundation-tech)' },
			token
		})
        this.groupId = id
		this.hearManager = new HearManager()
		this.sessionManager = new SessionManager()
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
		this.on(this.defaultMiddleware)
			.on(this.sessionManager.middleware)
			.on(this.hearManager.middleware)
		this.vk.api.groups.enableOnline({ group_id: this.groupId })
		return this.vk.updates.start()
	}
	stop () { return this.vk.updates.stop() }
}

module.exports = Bot
