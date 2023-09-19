// Bringing in express package
const express = require('express');
const path = require('path')
// app use express
const app = express();

// creating environment variable port
const PORT = process.env.PORT || 3001;


//creates a route for every file in the public folder 
app.use(express.static('public'));
//middle wear created req.body, handle data parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// // routes to route files
// require('./Develop/public/routes/apiRoutes')(app);
const htmlRoutes = require('./routes/htmlRoutes');
app.use(htmlRoutes);
const apiRoutes = require('./routes/apiRoutes');
app.use(apiRoutes);

// app listener - starts the server
app.listen(PORT, () => {
  console.log(`Server available at localhost${PORT}`);
});