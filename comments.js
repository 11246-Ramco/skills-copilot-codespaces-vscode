//Create web server
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const comments = require('./comments.json')
const port = 3001

app.use(cors())
app.use(bodyParser.json())

//Get all comments
app.get('/comments', (req, res) => {
  res.json(comments)
})

//Add a comment
app.post('/comments', (req, res) => {
  const newComment = req.body
  newComment.id = comments.length + 1
  comments.push(newComment)
  fs.writeFileSync(
    path.join(__dirname, 'comments.json'),
    JSON.stringify(comments, null, 2)
  )
  res.json(newComment)
})

//Delete a comment
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id
  const index = comments.findIndex(comment => comment.id === parseInt(id))
  if (index > -1) {
    comments.splice(index, 1)
    fs.writeFileSync(
      path.join(__dirname, 'comments.json'),
      JSON.stringify(comments, null, 2)
    )
  }
  res.json(comments)
})

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})