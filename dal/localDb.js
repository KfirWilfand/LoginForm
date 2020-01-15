const DbConnectionAbstract = require("./dbConnectionAbstract");
var passwordCryptoGenerator=require("../modules/handlers/cryptoJSHandler");
class LocalDb extends DbConnectionAbstract {


  constructor() {
    super();
    this.users = {
      kfir333: { fullName: "kfir", password: "1234" },
      david123: { fullName: "david", password: "1234" },
      run100100: { fullName: "run", password: "1234" }
    };
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

    var decryptedPass=passwordCryptoGenerator.decryptPassword(user.password);
    
    if(decryptedPass === userPassword) return user
    else return "Passwoard is worng!";
  }

  addNewUser(userName, userPassword){

    var encryptedPass=passwordCryptoGenerator.encryptPassword(userPassword);

    this.getUsers()[userName] = { fullName: userName, password: encryptedPass }
  }
}

module.exports = LocalDb;
