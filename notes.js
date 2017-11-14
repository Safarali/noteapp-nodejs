const fs = require('fs');

let fetchNotes = () => {
    try {
        let notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

let saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

let addNote = (title, body) => {
    let notes = fetchNotes();
    let note = {
        title,
        body
    }

    let duplicateNotes = notes.filter(note => note.title === title);

    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

let getAll = () => {
    return fetchNotes();
};

let getNote = (title) => {
    let notes = fetchNotes();
    for(let note of notes){
        if(note.title === title){
            return note;
        }
    }
};

let removeNote = (title) => {
    let notes = fetchNotes();
    let filteredNotes = notes.filter(note => note.title !== title);
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length;
};

let logNote = (note) => {
    console.log('-----');
    console.log(`${note.body}`);
    console.log(`${note.title}`);
    console.log('-----');
}
module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
}
