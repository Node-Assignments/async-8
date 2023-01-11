const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

let data = [{ id: 0, name: 'express', age: 30, gender: 'male' }, { id: 1, name: 'kiwi', age: 20, gender: 'female' }]
let count = 2
app.get('/', getData)

async function getData(req, res) {
    await res.send(data)
}

app.post('/', postData)

async function postData(req, res) {
    if (req.body.name && typeof req.body.age === 'number' && req.body.gender.toLowerCase() === "male" || req.body.gender.toLowerCase() === "female") {
        let body = req.body
        body.id = count
        count++
        data.push(body)
        await res.send(data)
    }
    else {
        await res.status(406).send("Unvalid")
    }
}

app.put('/', putData)

async function putData(req, res) {
    if (req.body.id <= count && req.body.id >= 0) {
        if (req.body.name) {
            data.forEach((element) => {
                if (req.body.id === element.id) element.name = req.body.name
            })
        }
        if (req.body?.gender?.toLowerCase() === "male" || req.body?.gender?.toLowerCase() === "female") {
            data.forEach((element) => {
                if (req.body.id === element.id) element.gender = req.body.gender
            })
        }
        if (req.body.age && typeof req.body.age === 'number') {
            data.forEach((element) => {
                if (req.body.id === element.id) element.age = req.body.age
            })
        }
    }
    else {
        await res.status(406).send("Unvalid ID")
    }
    await res.send(data)
}

app.delete('/', deleteData)

async function deleteData(req, res) {
    if (req.body.id <= count && req.body.id >= 0) {
        data.splice(req.body.id, 1)
        count--;
        await res.send(data)
    }
    else {
        await res.status(406).send("Unvalid")
    }
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})