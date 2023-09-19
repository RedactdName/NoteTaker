
// dependencies 
const path = require('path');
const fs = require('fs')
const router = require('express').Router();
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const { v4: uuidv4 } = require('uuid')

const getNotes = () => { return readFile('db/db.json', 'utf-8').then(rawNotes => [].concat(JSON.parse(rawNotes))) }

// GET /api/notes reads the db.json file and returns all saved notes as JSON.
router.get('/api/notes', (req, res) => {
  getNotes().then(notes => res.json(notes))
});

// POST a new note to save on the request body, 
router.post('/api/notes', (req, res) => {
  getNotes().then(oldNotes => {
    // creating body for note
    let newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4()
    };

    let noteArray = [...oldNotes, newNote]
    console.log(noteArray)

    writeFile('db/db.json', JSON.stringify(noteArray)).then(() => res.json({ msg: 'Okay' }))

  })


});
// delete old notes
router.delete('/api/notes/:id', (req, res) => {
  getNotes().then(oldNotes => {
    const noteArray = oldNotes.filter(note => note.id !== req.params.id)

    console.log(noteArray)


    writeFile('db/db.json', JSON.stringify(noteArray)).then(() => res.json({ msg: 'Okay' }))

  })


});


module.exports = router