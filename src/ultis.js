function randomID(length) {
    const id = []
    for (let i = 0 ; i<length ;i++) id.push(Math.floor(Math.random() * 10)) 
    return id.join('')
}

export {randomID}