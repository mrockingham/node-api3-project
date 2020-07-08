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

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  
  res.status(200).json(req.posts)
  
  
//   postDb.getById(req.params.id)
//   .then(post=>{
//     if(post){
//       res.status(200).json(post)
//     } else{
//       res.status(404).json({ message: "The post with the specified ID does not exist."})
//     }
//   })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  postDb.remove(req.params.id)
  .then(id=>{
    if(id){
      res.status(200).json({user:req})
    } else{
      res.status(400).json({message: " The user with the specified ID does not exist"})
    }
    })
    .catch(err =>{
      res.status(500).json({message:'Message not removed.....muhahahahaahahaha'})
  })
  
});

router.put('/:id', (req, res) => {
  // do your magic!
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
