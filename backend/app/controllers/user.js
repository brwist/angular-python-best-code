const errs = require('restify-errors');
const db = require('../index');
const { Op } = require("sequelize");

const addUser = async (req, res, next) => {

    const require_fields = ['name','address','phone_number'];
    const validated = require_fields.every((param) => param in req.params);
    if (!validated) {
      return next(new errs.InvalidArgumentError(`please ensure all required fiels are provided: ${require_fields.join(", ")}`))
    }
  
    await db.User.create(req.params)
      .then( user => { 
        delete(user.id)
        res.send({status: true, message: 'User added successfully.', data: user});
      })
      .catch( err => {
        console.log(err);
        return next(new errs.InvalidContentError("unable to add new user"));
      })
    
}

const getUsers = async (req, res, next) => {

    let search  = req.query.search;
    if(search) {
      var users = await db.User.findAll({
        where: {
          name:{
            [Op.like]:'%'+search+'%'
          }
        }
      });
    } else {
      var users = await db.User.findAll();
    }
    res.send({status: true, message: 'Users listed successfully.', data: users});
    
}

module.exports = {
  addUser,
  getUsers
}
