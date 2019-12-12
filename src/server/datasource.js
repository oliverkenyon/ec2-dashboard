const faker = require('faker')

const generateFakeData = (instanceCount, searchTerm) => {
    let instancesList = []

    let instanceTypes = ['a1.medium', 'a1.large', 't3.micro', 't3.small', 't2.micro', 't2.nano', 'm4.large']
    let instanceStates = ['pending', 'rebooting', 'running', 'shutting-down', 'stopping', 'stopped', 'terminated']
    let availabilityZones = ['us-east-1a', 'us-east-1b', 'eu-west-1a', 'ec-west-1b']
    
    for (let index = 0; index < instanceCount; index++) {
        instancesList.push({
            'name': faker.name.findName(),
            'id': 'i-' + faker.random.alphaNumeric(10), 
            'type': faker.random.arrayElement(instanceTypes),
            'state': faker.random.arrayElement(instanceStates),
            'az': faker.random.arrayElement(availabilityZones),
            'ips': {
                'public': faker.internet.ip(),
                'private': [faker.internet.ip(), faker.internet.ip()]
            }
        })
    }

    if (searchTerm) {
        instancesList = instancesList.filter(instance => matchInstance(instance, searchTerm))
    }

    return instancesList
}

const matchInstance = (instance, searchValue) => {
    // Search semantics would normally be checked with product owner, might 
    // for example be better using starts with instead of includes - but I take
    // the simple approach here
    if (instance.name.includes(searchValue)) {
        return true
    }

    if (instance.ips.public.includes(searchValue)) {
        return true
    }

    if (instance.ips.private.some(ip => ip.includes(searchValue))) {
        return true
    }

    return false
}

module.exports = { generateFakeData, matchInstance }