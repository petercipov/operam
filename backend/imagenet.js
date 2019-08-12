const StreamZip = require('node-stream-zip');
const common = require('./common')

async function loadData() {
    const zip = new StreamZip({
        file: './data.zip',
        storeEntries: true
    });

    return new Promise((resolve, reject) => {
        zip.on('ready', () => {
            var raw = ''
            zip.stream('data.json', (err, stm) => {
                stm.on('data', (data) => {
                    raw += data.toString()
                })
                stm.on('err', (err) => reject(err))
                stm.on('end', () => {
                    try {
                        zip.close()
                        resolve(JSON.parse(raw))
                    } catch (err) {
                        reject(err)
                    }
                })
            });
        });
    })
}

class ImageNet {
    constructor(data) {
        this.data = data
    }

    constructTree(search) {
        var tree = { children:[] }

        console.log('searching for ' + search);

        const keys = Object
            .keys(this.data)
            .filter(key => key.includes(search || ''))
            .forEach(key => {
                this.insert(tree, key)
            })

        return tree.children
    }
    insert(node, key) {
        const chunks = common.idChunks(key)
        
        for (var position = 0; position < chunks.length; position++) {
            const chunkKey = common.chunks2Key(chunks, position)

            const children = node.children.filter(child => child.name === chunks[position])
            if (children.length === 0) {
                const newNode = this.createNode(chunkKey)
                node.children.push(newNode) 
                node = newNode
            } else {
                node = children[0]
            }
        }
    }

    createNode(key) {
        const idChunks = common.idChunks(key)
        const name = common.name(idChunks)

        return {
            key,
            name,
            size: this.data[key],
            children: []
        }
    }
}

async function buildImageNet() {
    return loadData()
    .then(data => new ImageNet(data))
}

exports.buildImageNet = buildImageNet
