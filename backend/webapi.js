const express = require('express')


function buildWebApi(imageNet) {
    const webapi = express()
    webapi.use(express.static('../web/build'))
    webapi.get('/tree', async (req, res) => {
        const tree = await imageNet.constructTree(req.query.search )
        res.setHeader('Content-type', 'application/json')
        res.send(JSON.stringify(tree))
    })

    return webapi
}

exports.buildWebApi = buildWebApi
