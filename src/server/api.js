const express = require('express')
const faker = require('faker')
const cors = require('cors');

const app = express()
app.use(cors());

const port = 3000

const randomName = faker.name.findName();

let instancesList = []

const instanceCount = 10
for (let index = 0; index < instanceCount; index++) {
    instancesList.push({
        'id': 'id123',
        'type': 't2-medium',
        'state': 'RUNNING',
        'az': 'us-east-1b',
        'public-ip': '56.78.18.123',
        'private-ips': ['192.168.1.23', '10.1.15.23']
    })
}
 
app.get('/api/v1/instances', (req, res) => res.send(JSON.stringify(instancesList)))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))