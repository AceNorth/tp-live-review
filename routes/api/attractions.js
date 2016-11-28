var express = require('express');
var router = express.Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Place = require('../../models/place');
var Promise = require('bluebird');

router.get('/hotels', (req, res, next) => {

    Hotel.findAll({
        include : {
            model: Place
        }
    })
    .then(function(hotels){
         res.json(hotels);
    });

});

router.get('/restaurants', (req, res, next) => {

      Restaurant.findAll({
          include: {
              model: Place
          }
      })
    .then(function(restaurants){
         res.json(restaurants);
    });
});

router.get('/activities', (req, res, next) => {

      Activity.findAll({
          include: {
              model: Place
          }
      })
    .then(function(activities){
         res.json(activities);
    });

});

module.exports = router;

