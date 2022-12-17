const redis = require('redis')
const client = redis.createClient({ url: 'redis://127.0.0.1:6379' })

const user_default = {
  position: {
    lat: 0.0,
    lon: 0.0
  },
  flag: false
}

//redisとのコネクションを確立
module.exports.openRedis = async function () {
  await client.connect()
}

module.exports.getUsersKeys = async () => {
  return await client.hKeys('users')
}

module.exports.getUsers = async () => {
  const result = await client.hGetAll('users')
  let ret = {}
  for (let key in result) {
    ret[key] = JSON.parse(result[key])
  }
  return ret;
}

module.exports.getUser = async (id) => {
  const value = await client.hGet('users', id)
  return JSON.parse(value)
}

module.exports.addUser = (id) => {
  client.hSet('users', id, JSON.stringify(user_default))
}

module.exports.changeUser = (id, value) => {
  client.hSet('users', id, JSON.stringify(value))
}

module.exports.changeUserFlag = async (id, flag) => {
  try {
    const user = await this.getUser(id)
    const newUser = {
      position: user['position'],
      flag: flag
    }
    await this.changeUser(id, newUser)
  } catch (e) {
    console.error(e)
  }
}

module.exports.getUserFlag = async (id) => {
  return await this.getUser(id).flag.catch(e => console.error(e))
}

module.exports.deleteUser = async (id) => {
  await client.hDel('users', id)
}

module.exports.deleteAllUser = async () => {
  const usersKeys = await this.getUsersKeys()
  if (usersKeys.length > 0) {
    await client.hDel('users', ...usersKeys)
  }
}
