const express = require('express');
const chalk = require('chalk');

const userDb = require('./userDb')

const router = express.Router();


router.post('/', validateUser, (req, res) => {
  // do your magic!
  userDb.insert(req.body)
  .then(user=>{
    res.status(200).json({ data:user})
    
  })
  // .catch(err=>{
  //   res.status(400).json({msg: 'Please provide user name'})
  // })
});

router.post('/:id/posts',validatePost, (req, res) => {
  // do your magic!
  res.status(200).json(req.user)
  console.log(posts)
});

router.get('/', (req, res) => {
  // do your magic!
  userDb.get()
  .then(user =>{
    res.status(200).json({data:user})
    console.log(user)
  })
  .catch(err=>{
    res.status(500).json({msg: 'Unable to retrive users from the DB.'})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  userDb.getById(req.params.id)
  .then(user=>{
    if(user){
      res.status(200).json(user)
    } else{
      res.status(404).json({ message: "The user with the specified ID does not exist."})
    }
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  const  {id} = req.params
  userDb.getUserPosts(id)
  .then(post =>{
    res.status(200).json({data:post})
  })
  .catch(err =>{
    res.status(500).json({ errorMessage: "we could not get the user posts" });
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  userDb.remove(req.params.id)
  .then(id=>{
   res.status(200).json({user:'user deleted'})
  
    })
    .catch(err =>{
      res.status(500).json({message:'Message not removed.....muhahahahaahahaha'})
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
  const changes = req.body
  userDb.update(req.params.id, changes)
  .then(user=>{
    res.status(200).json({msg: 'user updated'})
  })
 
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!

  const {id} = req.params

  userDb.getById(req.params.id)
  .then(user =>{
    if (user) {
      req.user = user
      
      
    }else{
      res.status(404).json({message: 'post id not found'})
    }
  })
  .catch(err =>{
    res.status(500).json({message: 'failed', error})
  })
  next()
}

function validateUser(req, res, next) {
  // do your magic!
  if(req.body === 0){
    res.status(400).json({msg: 'missing user data'})
  } else if(!req.body.name){
    res.status(400).json({ message: "missing required name field"})
  }else{
    next()
  }

  }


function validatePost(req, res, next) {
  // do your magic!

  if(req.body === 0){
    res.status(400).json({msg: 'missing post data'})
  } else if(!req.body.text){
    res.status(400).json({ message: "missing required text field"})
  }else{
    
    next()
  }
}

module.exports = router;
