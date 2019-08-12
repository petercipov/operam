const imagenet = require('./imagenet')
const webapi = require('./webapi')

async function boot() {
    const i = await imagenet.buildImageNet()
    const api = await webapi.buildWebApi(i)

    return api.listen(4000)
}


boot()