function idChunks(nodeId) {
    return nodeId.split(' > ')
}

function name(chunks) {
    return chunks.length > 0 
        ? chunks[chunks.length -1]
        : undefined
}

function chunks2Key(chunks, upTo) {
    var key = ''
    for (var i=0; i <= upTo; i++) {
        if (i === 0) {
            key += chunks[0]
        } else {
            key += ' > ' + chunks[i]
        }
    }
    return key
}

function parentIds(nodeId) {
    const chunks = idChunks(nodeId)

    const ids = []
    for (var i=0; i < chunks.length-1; i++) {
        if (i === 0) {
            ids.push(chunks[0])
        } else {
            ids.push(ids[i-1] + ' > ' + chunks[i])
        }
    }

    return ids
}

exports.parentIds = parentIds
exports.idChunks = idChunks
exports.name = name
exports.chunks2Key = chunks2Key
