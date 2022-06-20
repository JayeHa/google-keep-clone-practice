const { v4: uuidv4 } = require("uuid");

class Note {
  constructor(title, body, option) {
    this.id = uuidv4();
    this.title = title;
    this.body = body;
    this.pinned = option.pinned;
    this.backgroundColor = option.backgroundColor;
    const currentTime = Math.floor(Date.now() / 1000);
    this.createdAt = currentTime;
    this.updatedAt = currentTime;
  }
}

module.exports = Note;

