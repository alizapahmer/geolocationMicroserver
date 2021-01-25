const express = require('express');
const mongoose= require('mongoose');
const app= express();
const port=8080;
const geolocationRoutes = require('./routes/geolocationRoutes')
const healthCheckMongodb = require('health-check-mongodb'); 
app.use(express.urlencoded({extended: true}));
mongoose.set('useFindAndModify', false);
app.set('view engine', 'ejs');

//connection link to database
const dbURI = 'mongodb+srv://aliza_aron:PASSWORD@cluster0.tt8n8.mongodb.net/geolocation?retryWrites=true&w=majority';

//connect to Database
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology:true})
	.then((result)=>console.log("connected to db"))
	.catch((err)=>console.log("Warning Database is not connected"));

app.listen(port);
console.log("listening to the port")
//geolocation routes
app.use(geolocationRoutes)


//API #3, health API, uses npm health check to monitor database connection 
app.get('/health',(req,res)=>{
  healthCheckMongodb.do({
    url:dbURI
  })
  .then(response => {
    if (response.health == false){ 
      res.sendStatus(500) 
    }
    else{
    res.sendStatus(200)
    }
  })
})
