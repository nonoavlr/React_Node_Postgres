const express = require('express');
const router = express.Router()
const db = require('../db')


async function DQL(query){
    //1. CONEXÃO COM O BANCO
    await db.connect().then(() =>{
        console.log('Conexão realizada com sucesso')
    }).catch(res => {
        console.log('Erro ao se conectar ao banco.', res)
    });

    console.log(query);
    
    //2. QUERIES
    let results = await db.query(`${query}`);


    return results;
}


router.post('/', async (req, res) => {
    let query = req.body.query;
    let results = undefined;

    if(query) {results = await DQL(query)}

    res.send({results})
})

module.exports = router;