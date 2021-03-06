const utils = require('./utils');
const expect = require('expect');

describe('Utils', () => {

  describe('#add', () => {
    it('should add two numbers', () => {
      var res = utils.add(33,11);
      expect(res).toBe(44).toBeA('number');
    });
    
    it('should async add to numbers', (done) => {
      utils.asyncAdd(4,3, (sum) => {
        expect(sum).toBe(7).toBeA('number');
        done();
      });
    });  
  });
  
  it('should square a number', () => {
    var res = utils.square(5);
    expect(res).toBe(25).toBeA('number');
  });
  
  it('should async square a number', (done) => {
    utils.asyncSquare(5, (square) => {
      expect(square).toBe(25).toBeA('number');
      done();
    });
  });
  
  it('should verify first and last names are set', () => {
    var user = {
      age: 23,
      location: 'New York'
    }
    utils.setName(user, 'Amauris Ferreira');
    expect(user).toInclude({
      firstName: 'Amauris',
      lastName: 'Ferreira'
    }).toBeA('object');
  });
});