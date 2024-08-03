const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body,validationResult } = require('express-validator');
const Note = require('../models/Note');

//Route1 : get all notes of a login user using GET: "/api/notes/getuser" login required
router.get('/fetchallnotes',fetchuser,async (req,res) => {
    try {
        const notes = await Note.find({user:req.user.id});
        res.json(notes);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error");
    }
})

//Route2 : add a new notes , login required POST :"/api/notes/addnote" login required
router.post('/addnote',fetchuser,[
    body('title','title must be atleast 3 characters').isLength({min:3}),
    body('description','description must be atleast 5 characters').isLength({min:5})
],async (req,res) => {
    
    try {

    const {title,description,tag} = req.body;

 //if there any errors return it
 const errors = validationResult(req);
 if(!errors.isEmpty()){
  return res.status(400).json({errors:errors.array()});
 }

    
 const note = new Note({
    title,description,tag,user:req.user.id
 })
 const savedNote = await note.save();
 res.json(savedNote);

 } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server Error");
 }

})

//Route3 : update a new notes , login required PUT :"/api/notes/updatenote" login required
router.put('/updatenote/:id',fetchuser,async (req,res) => {
    
    try {
        const {title,description,tag} = req.body;

        //create new note object
        const newNote = {};

        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //find the note to be updated
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
        res.json({note});


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error ");
    }
    

})

// route:4  deleting a existing note , login required DELETE :"/api/notes/deletenote" login required 
router.delete('/deletenote/:id',fetchuser,async (req,res) => {

    try {
        

        //find the note to be deleted
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}

        //allow deletion if the note is same users
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({note:"The Note is successfully Deleted !"});


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error ");
    }


})


module.exports = router