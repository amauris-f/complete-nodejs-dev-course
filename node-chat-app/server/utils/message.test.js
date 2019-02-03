var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
  it('should generate correct message object', () => {
    var from = "Test User";
    var text = "This is a test";
    var message = generateMessage(from, text);
    
    expect(message).toInclude({from, text});
    expect(message.createdAt).toBeA('number'); 
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Admin';
    var lat = 1;
    var long = 2;
    var message = generateLocationMessage(from, lat, long);
    expect(message).toInclude({
        from: from,
        url: 'https://www.google.com/maps?q=1,2'
    });
    expect(message.createdAt).toBeA('number'); 
  });
});