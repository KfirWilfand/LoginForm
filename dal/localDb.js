const DbConnectionAbstract = require("./dbConnectionAbstract");

class LocalDb extends DbConnectionAbstract {
  users = {
    kfir333: { fullName: "kfir", password: "1234" },
    david123: { fullName: "david", password: "1234" },
    run100100: { fullName: "run", password: "1234" }
  };

  constructor() {
    super();
  }

  connenct() {}

  getUsers() {
    return this.users;
  }

  isUserExist(userName){
    const users = this.getUsers();
    return users.hasOwnProperty(userName) 
  }

  isUserAuthenticate(userName, userPassword) {
    const users = this.getUsers();

    if (!this.isUserExist) return "User name is NOT exist";
    const user = users[userName]

    if(user.password === userPassword) return user
    else return "Passwoard is worng!";
  }

  addNewUser(userName, userPassword){
    this.getUsers()[userName] = { fullName: userName, password: userPassword }
  }
}

module.exports = LocalDb;
