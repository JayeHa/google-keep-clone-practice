const { v4: uuidv4 } = require("uuid");

class Note {
  constructor(title, body, option) {
    this.id = uuidv4();
    this.title = title;
    this.body = body;
    this.pinned = option.pinned;
    this.backgroundColor = option.backgroundColor;
    this.createdAt = Math.floor(Date.now() / 1000); // unix epoch time
    this.updatedAt = Math.floor(Date.now() / 1000);
  }
}

module.export = Note;

