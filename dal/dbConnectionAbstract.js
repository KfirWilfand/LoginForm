class DbConnectionAbstract {
  constructor() {
    if (new.target === DbConnectionAbstract) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
  }

  connenct() {}
  getUsers() {}
  isUserAuthenticate(userName, userPassword) {}
}

module.exports = DbConnectionAbstract;
