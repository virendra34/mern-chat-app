const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// setup cross origin
app.use(require('cors')());
// bring in the routes
app.use(require('./routes/api'));

// setup error handler
const errorHandlers = require('./handlers/errorHandlers');
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongooseErrors);
if(process.env.APP_ENV === 'DEVELOPMENT'){
    app.use(errorHandlers.developmentErrors);
}else{
    app.use(errorHandlers.productionErrors);
}

module.exports = app;