const dataSource = require('./datasource.js')

describe('API Data Source', () => {
  
  const testInstance = {
    name: 'test instance 123',
    ips: { public: 'public ip 456', private: ['private ip 789'] }
  }

  const sanityCheckInstance = (instance) => {
    // Would have more assertions here in a real scenario
    expect(instance.name).toBeTruthy()
    expect(instance.id).toHaveLength(12)
  }

  it('should return list without search parameter', () => {

    const instanceCount = 2;
    
    const actual = dataSource.generateFakeData(instanceCount)
    expect(actual).toHaveLength(instanceCount)
    sanityCheckInstance(actual[0])
    sanityCheckInstance(actual[1])
  });

  it('should return list with empty search parameter', () => {

    const instanceCount = 1;

    const actual = dataSource.generateFakeData(instanceCount)
    expect(actual).toHaveLength(instanceCount)
    sanityCheckInstance(actual[0])
  });

  it('should return filtered list with non empty search parameter', () => {
    // This is actually a test that can fail intermittently in its current state
    // because the name and ip addresses are non-deterministic with Faker. 
    // I would never intentially commit such a test in a real life situation!
    // In a more realistic scenario we'd be mocking out the AWS API client
    // so would have known data. A true end-to-end test would presumably
    // require an AWS account in a known state.
    const instanceCount = 1000;
    
    const actual = dataSource.generateFakeData(instanceCount, "1")
    expect(actual.length).toBeGreaterThanOrEqual(1)
    sanityCheckInstance(actual[0])

  });

  it('should not match if the search string is not present in the name or ip addresses', () => {
    expect(dataSource.matchInstance(testInstance, 'no match')).toBeFalsy();
  });

  it('should match any name containing the search string ', () => {
    expect(dataSource.matchInstance(testInstance, 'test instance')).toBeTruthy();
    expect(dataSource.matchInstance(testInstance, 'est instan')).toBeTruthy();
  });

  it('should match any public ip containing the search string ', () => {
    expect(dataSource.matchInstance(testInstance, 'public ip 456')).toBeTruthy();
    expect(dataSource.matchInstance(testInstance, 'public')).toBeTruthy();
    expect(dataSource.matchInstance(testInstance, 456)).toBeTruthy();
  });

  it('should match any private ip containing the search string ', () => {
    expect(dataSource.matchInstance(testInstance, 'private ip 789')).toBeTruthy();
    expect(dataSource.matchInstance(testInstance, 'private')).toBeTruthy();
    expect(dataSource.matchInstance(testInstance, 789)).toBeTruthy();
  });
});
