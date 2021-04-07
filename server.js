if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require("express");
const cors = require("cors");
const db = require("./index");
const app = express();

const corsOptions = {
    origin: true
}
app.use('/img', express.static('public/img'))
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const data = require("./config/hardcoded.js");
db.sequelize.sync({ force: false })
    .then(() => {
        data.HardcodedDb();
    });


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
//handle production
app.use(express.static(__dirname + '/public/'))


require('./routes/user.routes.js')(app);
require('./routes/room.routes.js')(app);
require('./routes/reservation.routes')(app);
app.get("*", (req, res) => res.sendFile(__dirname + '/public/index.html'));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port  ${PORT}.`);
});