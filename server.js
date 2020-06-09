
const express = require('express');
const helmet = require('helmet')
const morgan = require('morgan')
const postRouter = require('./posts/postRouter')
const app = express();

app.use(express.json())

app.use(helmet())
// app.use(morgan('dev'))
app.use(logger)
// app.use(addName)
// app.use(lockout)

app.use('/api', postRouter)

app.get('/', (req, res) => {
  const nameInsert =(req.name) ? `${req.name}` : '';

  res.send(`<h2>Let's write some middleware!</h2>
            <h1>this is ${nameInsert}</h1>`);
});



//custom middleware

function logger(req, res, next) {
  let d = new Date()
  
  console.log(`${req.method} ${req.url} ${Math.floor(Date.now() /10000)} 
  ${d.getMonth()}/${d.getDate()}/${d.getHours()}
   Request`)
  next()
}

// function addName( req, res, next) {
//   req.name =req.name || 'Rufus'
//   next()
// }

// function lockout(req,res,next){
//   let d = new Date().getSeconds()
//   if (d % 2 != 0){
//     res.status(403).json({ message: 'api lockout in force'})
//   } else{
//     next()
//   }
  
// }

module.exports = app;
