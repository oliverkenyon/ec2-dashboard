const express = require('express')
const cors = require('cors')
const app = express()

// Splitting into a separate file allows the API interface to be cleaner and more readable,
// and allows easy unit testing of the logic, without http listeners etc
const dataSource = require('./datasource')

app.use(cors());

const port = 3000

app.get('/api/v1/instances', (req, res) => {

    const instanceCount = 50000
    const searchTerm = req.query.searchValue

    instancesList = dataSource. generateFakeData(instanceCount, searchTerm)
    res.send(JSON.stringify(instancesList))
})

app.listen(port, () => console.log(`Fake EC2 API listening on port ${port}!`))
module.exports = { app }
