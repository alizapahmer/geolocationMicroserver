//Routes File that handles all the GET and POST requests

const express= require('express');
//const { distance_post } = require('../controllers/geolocationController');
const router = express.Router();
const geolocationController= require('../controllers/geolocationController');


router.get('/popularsearch', geolocationController.popular_search);
router.get('/findDest/source=:source?&destination=:dest?',geolocationController.find_dest);
router.post('/travelTime',geolocationController.travel_time_post);
router.get('/travelTime',geolocationController.travelTime);
router.get('/distance', geolocationController.distance_get);
router.post('/distance',geolocationController.distance_post);

module.exports = router;   

