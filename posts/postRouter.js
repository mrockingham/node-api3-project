const express = require('express');
const postDb = require('./postDb');
const { post } = require('../server');
const chalk = require('chalk');

const router = express.Router();

router.get('/',  (req, res) => {
  // do your magic!
  postDb.get()
  .then(post =>{
    res.status(200).json({data:post})
    console.log(Object.values(post))
  })
  .catch(err=>{
    res.status(500).json({msg: 'Unable to retrive post from the DB.'})
  })
});

router.get('/:id', validatePostId,  (req, res) => {
  // do your magic!
   postDb.getById(req.params.id)
  .then(post=>{
    if(post){
      res.status(200).json({data:post})
    } else{
      res.status(404).json({ message: "The post with the specified ID does not exist."})
    }
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  postDb.remove(req.params.id)
  .then(id=>{
      res.status(200).json({user:'deleted'})
    })
      
    .catch(err =>{
      res.status(500).json({message:'Message not removed.....muhahahahaahahaha'})
  })
  
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  const changes = req.body
  postDb.update(req.params.id, changes)
  .then(user=>{
    res.status(200).json({msg: 'post updated'})
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!

  const {id} = req.params

  postDb.getById(req.params.id)
  .then(posts =>{
    if (posts) {
      req.posts = posts
      
      
    }else{
      res.status(404).json({message: 'post id not found'})
    }
  })
  .catch(err =>{
    res.status(500).json({message: 'failed', error})
  })
  next()
}

module.exports = router;
