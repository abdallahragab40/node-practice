const fs = require("fs");
const chalk = require("chalk");

addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.find(note => note.title === title);

  if (!duplicateNotes) {
    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);
    console.log(chalk.bgBlue.bold("New note added"));
  } else {
    console.log(chalk.red.bold("Title already taken!"));
  }
};

removeNote = title => {
  const notes = loadNotes();
  const noteFounded = notes.filter(note => note.title === title);

  if (noteFounded.length !== 0) {
    notes.pop({
      title: title
    });
    saveNotes(notes);
    console.log(chalk.bgRed.bold("Note is deleted!"));
  } else {
    console.log(chalk.green.bold("Note is not founded!"));
  }
};

listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue.bold("Your Notes : "));
  notes.forEach(note => {
    console.log(note.title);
  });
};

readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);
  if (note) {
    console.log(chalk.blue.bold(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.bold("Note is not founded!"));
  }
};

loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
};

saveNotes = notes => {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJson);
};

module.exports = { addNote, removeNote, listNotes, readNote };
