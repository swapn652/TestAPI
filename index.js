// First we import the express module and then create an instance of express
const express = require('express')
const app = express()
const testRoute = require('./routes/testRoute')

// We then use the express.json() method to parse the json data
app.use(express.json())
// we use the app.use() method to use the testRoute
app.use('/db', testRoute)

// We then create a route for the root of our application
app.get('/', (req, res)=>{
    res.send('Hello World')
})

//We then listen on port 3000
app.listen(3000, ()=>{
    console.log('Server running on port 3000...')
})