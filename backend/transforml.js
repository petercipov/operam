const fs = require('fs');
const xml2js = require('xml2js');
const common = require('./common')

function synset(rawObject, parentId, synsetMap) {
    const words = rawObject['$'].words
    const nodeId = parentId ? parentId + ' > ' + words : words
    if (synsetMap[nodeId] !== undefined) {
       return
    }
    synsetMap[nodeId] = 0

    common.parentIds(nodeId).forEach(id => {
        synsetMap[id] += 1
    })

    if (rawObject.synset) {
        rawObject.synset.forEach(element => {
            synset(element, nodeId, synsetMap)
        });
    }
}

var raw = fs.readFileSync('./structure_released.xml', { encoding: 'utf-8' })
xml2js.parseString(raw, (err, result) => {
    const synsetMap = {}
    synset(result.ImageNetStructure.synset[0], undefined, synsetMap)
    console.log(JSON.stringify(synsetMap, null, 2))
})
