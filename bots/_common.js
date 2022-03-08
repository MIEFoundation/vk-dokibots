const { VK, WallAttachment } = require('vk-io')
const owner_id = -168965593

const vk = new VK({
	apiHeaders: { 'User-Agent': 'MIEFoudation/Webhook (+https://vk.com/@miefoundation-tech)' },
	token: process.env.SERVICE
})
const storage = new Map()

class GroupUtils {
	constructor () {
		this.groupId = 0
	}
	async init (api) {
		const [ {id} ] = await api.groups.getById({})
		this.groupId = id
		console.log(`Init GroupUtils with ID ${this.groupId}`)
	}
	get (name) {
		return (storage.get(this.groupId) ?? {})[name]
	}
	set (name, value) {
		const obj = storage.get(this.groupId) ?? {}
		obj[name] = value
		return storage.set(this.groupId, obj)
	}
	async serviceMessage (ctx, message) {
		const randomId = Math.random() * 0xffff_ffff_ffff_ffff
		for (let i = 0; i < 3; i++) {
			try {
				await vk.api.messages.send({
					peer_id: 2000000000 + 5,
					random_id: randomId,
					message
				})
				break
			} catch (e) {
				console.error('Failed to send message', e)
			}
		}
	}
	async getGroupData (id) {
		const [ group ] = await vk.api.groups.getById({
			group_id: id,
		//	fields: 'members_count'
		})
		return group
	}
	async getUserData (id, nCase = 'nom') {
		const [ user ] = await vk.api.users.get({
			user_ids: id,
		//	fields: 'sex',
			name_case: nCase
		})
		return user
	}
	async getSenderName (ctx, nCase = 'nom') {
		if (ctx.isUser) {
			const user = await this.getUserData(ctx.senderId, nCase)
			return `@id${user.id} (${user.first_name})`
		} else {
			const group = await this.getGroupData(-ctx.senderId)
			return `@club${group.id} (${group.name.match(/\S+/)[0]})`
		}
	}
	async getRandomPost (query) {
		const { count } = await vk.api.wall.search({ owner_id, query, count: 0 })
		const offset = (Math.random() * count) | 0
		const { items: [ payload ] } = await vk.api.wall.search({ owner_id, query, count: 1, offset })
		return new WallAttachment({ payload })
	}
}

const groupCache = new WeakMap()

async function utils (ctx, next) {
	if (groupCache.has(ctx.api)) {
		ctx.utils = groupCache.get(ctx.api)
	} else {
		ctx.utils = new GroupUtils()
		await ctx.utils.init(ctx.api)
		groupCache.set(ctx.api, ctx.utils)
	}
	ctx.groupId = ctx.utils.groupId
	next()
}

module.exports = [ utils ]
// module.exports = []
