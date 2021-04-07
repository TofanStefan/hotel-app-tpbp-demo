const Sequelize = require('sequelize');
const sequelize = new Sequelize('d3mhhn0okh3ghg', 'gybjvokskuzgly', '170105cdc457ce70f184827644def1167175026d2ff68ba37365cfbc43211e21', {
    host: 'ec2-54-155-226-153.eu-west-1.compute.amazonaws.com',
    dialect: 'postgres',
    comparatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

db.User = require("./models/user.model.js")(sequelize, Sequelize);
db.Role = require("./models/role.model.js")(sequelize, Sequelize);
db.Room = require("./models/room.model.js")(sequelize, Sequelize);
db.Reservation = require("./models/reservation.model.js")(sequelize, Sequelize);

db.User.belongsTo(db.Role);
db.Reservation.belongsTo(db.User);
db.Reservation.belongsTo(db.Room);
module.exports = db;