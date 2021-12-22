const { addUser, getUsers } = require("../controllers/user");
  
  const routes = (server) => {
    server.get("/", (req, res, next) => {
      res.send();
      return next();
    })
  
    server.post("/addUser", addUser);
    server.get("/getUsers", getUsers);
  }
  
  module.exports = routes;