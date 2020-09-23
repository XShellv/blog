const Redis = require('ioredis');
// 编写的 Store 类，必须要有 get() set() destory() 这三个方法
class RedisStore {
    constructor() {
        this.redis = new Redis();
    }
    async get(key) {
        const data = await this.redis.get(`ssid:${key}`);
        console.log(data)
        return JSON.parse(data);
    }
    async set(key, sess, maxAge) {
        await this.redis.set(
            `ssid:${key}`,
            JSON.stringify(sess),
            'EX',
            maxAge / 1000
        );
    }
    async destroy(key) {
        return await this.redis.del(`ssid:${key}`);
    }
}

module.exports = RedisStore;