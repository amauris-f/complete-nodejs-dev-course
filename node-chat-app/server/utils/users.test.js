const expect = require('expect');
const {Users} = require('./users.js');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name:'Mike',
      room:'Node Course'
    }, {
      id: '2',
      name:'John',
      room:'React Course'
    }, {
      id: '3',
      name:'Jen',
      room:'Node Course'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: 123,
      name: 'Amauris',
      room: 'The Office Fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
    expect(resUser).toInclude(user);
  });

  it('should return names for Node Course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Jen']);
  });
  
  it('should return names for React Course', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['John']);
  });

  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);
    expect(user.id).toBe('1');
    expect(users.users.length).toBe(2);
  });
  
  it('should not remove user', () => {
    var userId = '1141';
    var user = users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var userId = '1';
    var user = users.getUser(userId);
    expect(user.id).toBe('1');
    expect(users.users.length).toBe(3);
  });

  it('should not find user', () => {
    var userId = '1141';
    var user = users.getUser(userId);
    expect(user).toNotExist();
  });
});