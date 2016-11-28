var express = require('express');
var router = express.Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Place = require('../../models/place');
var Day = require('../../models/day');
var Promise = require('bluebird');





//GET ALL DAYS
router.get('/', (req, res, next) => {
    Day.findAll({
            include: [
                {
                model: Hotel
            }, {
                model: Restaurant
            }, {
                model: Activity
            }]
        })
        .then(function (days) {
            days = days.sort(function(a,b){
                return a.number-b.number > 0;
            });
            console.log(days);
            res.json(days);
        })
});


//GET DAY BY NUMBER
router.get('/:id', (req, res, next) => {
    Day.findById(req.params.id)
        .then(function (days) {
            res.json(days);
        })

});

//CREATE DAY
router.post('/', (req, res, next) => {
    Day.findAndCountAll()
        .then(function (result) {
            Day.create({
                    number: result.count + 1
                })
                .then(function (newday) {
                    res.send(newday);
                })
        })


});

//DELETE DAY
router.delete('/:id', (req, res, next) => {


});

//GET HOTELS BY DAY
router.get('/:id/hotel', (req, res, next) => {

    Day.findById(req.params.id)
        .then(function (day) {

            Hotel.findById(day.hotelId)
                .then(function (hotel) {
                    res.send(hotel);
                })
        });
});

//GET RESTAURANTS BY DAY
router.get('/:id/restaurants', (req, res, next) => {

    Day.findById(req.params.id)
        .then(function (day) {

        })
});

//GET ACTIVITIES BY DAY
router.get('/:id/activities', (req, res, next) => {

    Day.findById(req.params.id)
        .then(function (day) {

        })
});






//ADD Hotel
router.post('/:id/hotel', (req, res, next) => {
    console.log('dayId:', req.params.id);
    Day.findById(req.params.id)
        .then(function (day) {
            console.log('hotelId:', req.body.id);
            day.hotelId = req.body.id;
            day.save();
        });
});

//ADD Restaurant
router.post('/:id/restaurant', (req, res, next) => {
      Day.findById(req.params.id)
        .then(function (day) {
            day.addRestaurant(req.body.id);
            day.save();
        });
});

//ADD Activity
router.post('/:id/activity', (req, res, next) => {
    Day.findById(req.params.id)
        .then(function (day) {
            day.addActivity(req.body.id);
            day.save();
        });

});

//REMOVE Hotel
router.delete('/:id/Hotel', (req, res, next) => {


});

//REMOVE Restaurant
router.delete('/:id/Restaurant', (req, res, next) => {


});

//REMOVE Activity
router.delete('/:id/Activity', (req, res, next) => {


});

module.exports = router;