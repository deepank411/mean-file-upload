//----------------------Base Set Up--------------------------//

//--calling the packages we need--//

var express = require('express'); //call express
var app = express(); //defining our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/my_db'); // connecting to our database

var song = require('./models/songs');
//configuiration of our app to use body parser
//this will help to get data during post
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; //setting our port

//-------------Routes for our API -----------------------------//

var router = express.Router();

router.get('/', function(req, res){
    res.json({ message: 'Hurray! Its Working.'});
});

//--routes starting with /songs--//
router.route('/songs')
    //route to get the list of all the songs
    .get(function(req, res){
        //var newSong = new song();
        song.find(function(err, newSong){
            if(err)
                res.send(err);
            else
                res.json(newSong);
        });
    })

    .post(function(req, res){
        var songInfo = req.body;
        var newSong = new song();
        newSong.name = songInfo.name;
        newSong.rating = songInfo.rating;

        newSong.save(function(err){
            if(err)
                res.send(err);
            else {
                res.json({message: 'New Song Added!'});
            }
        });
    });

//--routes that end with "/songs/id"--//
router.route('/songs/:song_id')

    .get(function(req, res){
        song.findById(req.params.song_id, function(err, newSong){
            if(err)
                res.send(err);
            else if(newSong != null)
                res.json(newSong);
            else {
                res.json({message: 'No such song found'});
            }
        });
    })

    .put(function(req, res){
        song.findById(req.params.song_id, function(err, newSong){
            if(err)
                res.send(err);
            else {
                newSong.name = req.body.name ; //updating the name of the song

                newSong.save(function(err){
                    if(err)
                        res.send(err);

                    else {
                        res.json({message: 'Song Updated!'});
                    }
                });
            }
        });
    })

    .delete(function(req, res){
        song.remove({
            _id : req.params.song_id
        }, function(err, newSong){
            if(err)
                res.send(err);
         else {
                res.json({message: 'Song Successfully Deleted!'});
            }
        });

    });


//--REGISTER OUR ROUTES --//
app.use('/', router);
//------------------------------- Start the server --------------//
app.listen(port);
console.log('Server running at :' + port);
