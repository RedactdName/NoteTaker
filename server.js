// Dependencies
const express = require('express');

// app use express
const app = express();

// creating environment variable port
const PORT = process.env.PORT || 3001;


//creates a route for every file in the public folder 
app.use(express.static('public'));
//middle wear created req.body, handle data parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// routes to route files
require('./Develop/public/routes/apiRoutes')(app);
require('./Develop/public/routes/htmlRoutes')(app);


// app listener - starts the server
app.listen(PORT, () => {
  console.log(`Server available at localhost${PORT}`);
});