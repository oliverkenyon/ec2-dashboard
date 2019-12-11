const express = require('express')
const faker = require('faker')
const cors = require('cors');

const app = express()
app.use(cors());

const port = 3000

let instancesList = []

let instanceTypes = ['a1.medium', 'a1.large', 't3.micro', 't3.small', 't2.micro', 't2.nano', 'm4.large']
let instanceStates = ['pending', 'rebooting', 'running', 'shutting-down', 'stopping', 'stopped', 'terminated']
let availabilityZones = ['us-east-1a', 'us-east-1b', 'eu-west-1a', 'ec-west-1b']

const instanceCount = 50000
for (let index = 0; index < instanceCount; index++) {
    instancesList.push({
        'name': faker.name.findName(),
        'id': 'i-' + faker.random.alphaNumeric(10), 
        'type': faker.random.arrayElement(instanceTypes),
        'state': faker.random.arrayElement(instanceStates),
        'az': faker.random.arrayElement(availabilityZones),
        'public-ip': faker.internet.ip(),
        'private-ips': [faker.internet.ip(), faker.internet.ip()]
    })
}
 
app.get('/api/v1/instances', (req, res) => res.send(JSON.stringify(instancesList)))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))