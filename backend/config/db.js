const oracledb = require("oracledb");

const dbConfig = {
  user: "system",
  password: "dona",
  connectString: "localhost:1521/XE"
};

async function getConnection() {
  return await oracledb.getConnection(dbConfig);
}

module.exports = getConnection;