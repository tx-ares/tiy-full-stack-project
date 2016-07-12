let Router = require('express').Router;
const apiRouter = Router()

// let User = require('../db/schema.js').User
// let Post = require('../db/schema.js').Post

//Node's syntax for inporting variables from different file.
let Tweet = require('../db/schema.js').Tweet

//Read Many tweets
apiRouter.get('/tweets', function(request, response){

  //Here we will query for all tweet objects with no restriction, and run a callback function. 
  //This is much like a .then when requesting JSON in backbone.  
  Tweet.find({} , function(err, results){
      if(err){
        console.log(err)
        response.json({
          message: err
        })
      }

      response.json(results)
  })

})

//Post A tweet
apiRouter.post('/tweets', function(request, response){
  //Create a new instance of our Tweet constructor built with out request's body.
  let newTweet = new Tweet(request.body)
  //Save it to the database.
  newTweet.save(function(err){
    if(err){
    console.log(err)
      response.json({
       message: err
      })
    }
    else {
      //Send a copy of the tweet back to the client so they get confirmation that it successfully posted. 
      response.json(newTweet)
    }

  })
})

//Read One



//The .get method is from Express, a JavaScript server library.
// In English this says, if the path matches '/users' and is a get request, run the callback function.)
apiRouter.get('/users', function(req, res){
  User.find({}, function(err, results){
    res.json(results)
  })
})



//read one
apiRouter.get('/posts/:_id', function(req, res){
  Post.findOne(req.params, function(err, result){
    res.json(result)
  })
})

//create one
apiRouter.post('/posts', function(req, res){
  let newPost = new Post(req.body)
  newPost.save(function(err){
    if(err) return res.json({message: 'error saving'})
      res.json(newPost)
  })
})

//update one
apiRouter.put('/posts/:_id', function(req,res) {
  Post.findOne(req.params, function(err,record) {
    for (var prop in req.body) {
      record[prop] = req.body[prop]
    }
    record.save(function(err){
      if(err) return res.json({message: 'error saving'})
      res.json(record)
    })
  })
})

//delete one
apiRouter.delete('/posts/:_id', (req,res) => {
  Post.remove(req.params,(err) => {
    res.status(204).json({msg: "record successfully deleted",
      _id: req.params._id})
  })
})

module.exports = apiRouter