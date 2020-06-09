const express = require('express');
const Posts = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
 
  Posts.get()
  .then( posts =>{
    res.status(200).json(posts)
  })
});

router.get('/:id',validatePostId, (req, res) => {
  res.status(200).json(req.posts)
  // do your magic!
  // Posts.getById(req.params.id)
  // .then(posts =>{
  //   if (post) {
  //     res.status(200).json(posts)
  //   } else{
  //     res.status(404).json({message: 'posts not found'})
  //   }
  // })
  // .catch(error => { 
  //   //log error to server
  //   console.log(error)
  //   res.status(500).json({
  //     message: 'Error retrieving the posts'
  //   })

  // })
});

router.delete('/:id',validatePostId, requireBody, (req, res) => {
  // do your magic!
  Posts.remove(req.params.id)
  .then(count =>{
    if (count > 0 ) {
    res.status(200).json({message: 'The posts has been nuked'})
  } else{
    res.status(404).json({message: 'The posts could not be found'})
  }
  })
.catch(error => {
  console.log(error)
  res.status(500).json({
    message: 'error removing posts',
  })
})
});
router.put('/:id',validatePostId,  (req, res) => {
  // do your magic!
  Posts.update(req.params.id, req.body)
  .then( hub => {
    if (hub) {
      res.status(200).json(hub)
    } else {
      res.status(404).json({ message: 'The post could not be found'})
    }
  })
  .catch(error =>{
    console.log(error)
    res.status(500).json({
      message: 'error updating hub'
    })
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!

  const {id} = req.params

  Posts.getById(id)
  .then(posts =>{
    if (posts) {
      req.posts = posts
      next()
    }else{
      res.status(404).json({message: 'post id not found'})
    }
  })
  .catch(err =>{
    res.status(500).json({message: 'failed', error})
  })
}

function requireBody(req, res, next){
  if(!req.body || req.body === {}){
    res.status(400).json({message: 'please include body'})
  }else{
    next()
  }
  
}



module.exports = router;
