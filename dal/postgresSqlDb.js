const DbConnectionAbstract = require("./dbConnectionAbstract");
const { Client } = require("pg");
const schemaName = "login_form";
var passwordCryptoGenerator = require("../modules/handlers/cryptoJSHandler");
let client;

class PostgresSqlDb extends DbConnectionAbstract {
  constructor() {
    super();
    client = new Client({
      user: "vwwfzdtcierely",
      host: "ec2-34-197-171-33.compute-1.amazonaws.com",
      database: "due86t7qrrlvk",
      password:
        "8d58e2c51eec6bb245938bef948fc3416fa46723f4b9cd0a220b74aa5cad9b4d",
      port: 5432,
      ssl: true
    });
  }

  connenct() {
    client.connect();
  }

  getUsers() {
    let query = "select * from " + schemaName + ".users";

    return new Promise(function(resolve, reject) {
      client.query(query, function(err, result) {
        if (result.rowCount == 0) {
          return resolve([]);
        } else if (err) {
          console.log(err.stack);
          return reject(err);
        } else {
          return resolve(result.rows);
        }
      });
    });
  }

  isUserAuthenticate(userName, userPassword) {
    let query = `select email, password  from ${schemaName}.users where email='${userName}'`;
    return new Promise(function(resolve, reject) {
      client.query(query, function(err, result) {
        if (err) {
          console.log(err.stack);
          return reject(err);
        } else {
          if (result.rowCount > 0) {
            var decryptPassword = passwordCryptoGenerator.decryptPassword(
              result.rows[0].password
            );
            if (decryptPassword == userPassword) {
              console.log(`${result.rows[0].email} connected!`);
              return resolve(true);
            }
          }
        }
        console.log(`worng password or username`);
        return resolve(false);
      });
    });
  }

  getUserByEmail(userName) {
    let query = `select email, password  from ${schemaName}.users where email='${userName}'`;
    return new Promise(function(resolve, reject) {
      client.query(query, function(err, result) {
        if (err) {
          console.log(err.stack);
          return reject(err);
        } else {
          if (result.rowCount > 0) {
            var decryptPassword = passwordCryptoGenerator.decryptPassword(
              result.rows[0].password
            );

            return resolve(decryptPassword);
          }
        }
        console.log(`worng password or username`);
        return resolve(false);
      });
    });
  }

  addNewUser(userName, userPassword) {
    var encryptedPass = passwordCryptoGenerator.encryptPassword(userPassword);

    let userPromise = this.getUsers();

    return new Promise(function(resolve, reject) {
      userPromise.then(result => {
        let isUserExist = false;

        if (result.length > 0) {
          result.forEach(user => {
            if (user.email == userName) {
              isUserExist = true;
            }
          });

          if (isUserExist) {
            console.log(`user aleady exist!`);
            resolve(false);
          } else {
            let query = `INSERT INTO ${schemaName}.users (email, password) VALUES ('${userName}', '${encryptedPass}');`;

            client.query(query, function(err, result) {
              if (err) {
                console.log(err.stack);
              }
            });
            resolve(true);
          }
        }
      });
    });
  }

  fetchData(userName) {
    let query = `select *  from ${schemaName}.user_location where email='${userName}'`;

    return new Promise(function(resolve, reject) {
      client.query(query, function(err, result) {
        if (err) {
          console.log(err.stack);
          return reject(err);
        } else {
          let allData = [];

          for (let j = 0; j < result.rowCount; j++) {
            var item = result.rows[j];
            allData.push({
              email: item.email,
              data1: item.data1,
              data2: item.data2,
              lat: item.lat,
              long: item.long
            });
          }
          return resolve(allData);
        }
      });
    });
  }
}

module.exports = PostgresSqlDb;
