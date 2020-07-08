const express = require('express');
const postRouter = require('./posts/postRouter')
const userRouter = require('./users/userRouter')
const chalk = require('chalk');
const server = express();


server.use(express.json())
server.use(logger)

server.use ('/api/user', userRouter)
server.use ('/api/user/:id/post', postRouter)
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {

  let log = new Date()
  
  
  console.log(chalk.blue`${req.method} ${req.url} ${Math.floor(Date.now() /10000)} 
  ${log.getMonth()}/${log.getDate()}/${log.getHours()}`)
  next()
}

module.exports = server;
