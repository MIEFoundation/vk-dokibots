const { VK, WallAttachment } = require('vk-io')
const owner_id = -168965593

const vk = new VK({
	apiHeaders: { 'User-Agent': 'MIEFoudation/Webhook (+https://vk.com/@miefoundation-tech)' },
	token: process.env.SERVICE
})
const storage = new Map()

class GroupUtils {
	static async getRandomPost (query) {
		const { count } = await vk.api.wall.search({ owner_id, query, count: 0 })
		const offset = (Math.random() * count) | 0
		const { items: [ payload ] } = await vk.api.wall.search({ owner_id, query, count: 1, offset })
		return new WallAttachment({ payload })
	}
	static get (groupId, name) {
		return (storage.get(groupId) ?? {})[name]
	}
	static set (groupId, name, value) {
		const obj = storage.get(groupId) ?? {}
		obj[name] = value
		return storage.set(groupId, obj)
	}
}

async function utils (ctx, next) {
	ctx.utils = GroupUtils
	next()
}

module.exports = [ utils ]
// module.exports = []
