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

//if someone goes to /songs
// router.get('/songs', function(req, res){
//     res.sendfile('./views/newSongForm.html');
// });
//--routes starting with /songs--//
router.route('/songs/:song_name')

    //route to add a song
    .post(function(req, res){
        var songInfo = req.body;
        var newSong = new song();
        newSong.name = req.params.song_name;
        newSong.rating = songInfo.rating;

        newSong.save(function(err){
            if(err)
                res.send(err);
            else {
                res.json({message: 'New Song Added!'});
            }
        });
    });
    
router.route('/songs')
    //route to get the list of all the songs
    .get(function(req, res){
        //var newSong = new song();
        song.find(function(err, songs){
            if(err)
                res.send(err);

                res.json(songs);
        });
    });

//--REGISTER OUR ROUTES --//
//all our routes will be prefixed with /song
app.use('/home', router);

//------------------------------- Start the server --------------//
app.listen(port);
console.log('Server running at :' + port);
