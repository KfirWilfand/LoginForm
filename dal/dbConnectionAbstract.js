class DbConnectionAbstract {
  constructor() {
    if (new.target === DbConnectionAbstract) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
  }

  connenct() {}
  getUsers() {}
  isUserAuthenticate(userName, userPassword) {}
  getUserByEmail(userName) {}
  addNewUser(userName, userPassword) {}
  fetchData() {}
}

module.exports = DbConnectionAbstract;
