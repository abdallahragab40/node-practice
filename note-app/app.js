const yargs = require("yargs");
const notes = require("./notes");

// Create add command
yargs.command({
  command: "add",
  describe: "add a note",
  builder: {
    title: {
      describe: "title of a note",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "body of note",
      type: "string",
      demandOption: true
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  }
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "remove a note",
  builder: {
    title: {
      describe: "title of a note",
      type: "string",
      demandOption: true
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  }
});

// Create list command

yargs.command({
  command: "list",
  describe: "list notes",
  handler() {
    notes.listNotes();
  }
});

// Create read command
yargs.command({
  command: "read",
  describe: "read a note",
  builder: {
    title: {
      describe: "title of a note",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.readNote(argv.title);
  }
});

yargs.parse();
