export  const rule = {
    name: makeid(10),
    desc: makeid(10),
    type: 1,
    id:"",
    status: 0,
    createdAt: 0,
    updatedAt: 0,
}

function makeid(length) {
    let result = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
