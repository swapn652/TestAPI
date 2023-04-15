// This is a test route to test the database connection
// We then import the express module and then create an instance of express
const express = require('express')
const router = express.Router()
// We then import the database connection
const getTestDB  = require('../db/testdb')

//we then create an object to hold the database connection
const db = getTestDB()

// We then create a route to read the database
router.get('/readData', (req, res)=>{
    //We send the json response, if an error occurs we send the error message
    try{
        res.status(200).json(db)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/writeData', (req, res)=>{
    // We then create a new object to hold the data
    const newData = {
        id: db.length + 1,
        name: req.body.name
    }
    // We then push the new data to the database
    db.push(newData)
    // We then send the response
    res.status(201).json({"success": true, "message": "successfully added data", newData})
})

router.put('/updateData/:id', (req, res)=>{
    // We then create a new object to hold the data
    const newData = {
        //we are reading the id from the url, and then updating the name from the body
        id: req.params.id,
        name: req.body.name
    }
     // We create a variable to hold the success status
     let success = false

     //we loop through the database to find the id, and then update the data
     for(let i=0; i<db.length; i++){
        if(db[i].id == newData.id){
            db[i] = newData
            success = true
            res.status(201).json({"success": success, "message": "successfully added data", newData})
        }
    }

    //else show that the id was not found
    if(success===false)
        res.status(404).json({"success": success, "message": "id not found"})
})
    
router.delete('/deleteData/:id', (req, res)=>{
    // we read the id from the url
    const id = req.params.id

    //we create a variable to hold the success status
    let success = false

    //we loop through the database to find the id, and then delete the data
    for(let i=0; i<db.length; i++){
        if(db[i].id == id){
            //we use the splice method to delete the data
            db.splice(i, 1)
            success=true
            res.status(201).json({"success": success, "message": "successfully deleted data"})
        }
    }

    //else show that the id was not found
    if(success==false)
        res.status(404).json({"success": success, "message": "id not found"})
})

// We then export the router
module.exports = router