const express = require("express");
const { Note } = require("../model");
const store = require("../store");

const router = express.Router();

// HTTP GET: 모든 노트를 반환(다수)
router.get("/", (req, res) => {
  res.json(Array.from(store.notes, ([_, value]) => value));
});

// HTTP GET: 특정 id의 노트를 반환(단일)
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const note = store.notes.get(id);

  if (note === undefined) {
    res.status(404).json({
      msg: `노트(ID: ${id})를 찾을 수 없습니다`,
    });
    return;
  }

  res.json(note);
});

// HTTP POST: 새로운 노트를 생성
router.post("/", (req, res) => {
  const { title, body, pinned, backgroundColor } = req.body;

  const note = new Note(title, body, {
    pinned: pinned !== undefined ? pinned : false,
    backgroundColor:
      backgroundColor !== undefined ? backgroundColor : "#FFFFFF",
  });

  store.notes.set(note.id, note);
  console.log(store.notes.get(note.id));

  res.status(201).json(note);
});

// HTTP PUT: 기존 노트 수정
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, body, pinned, backgroundColor } = req.body;

  if (!store.notes.has(id)) {
    res.status(404).json({
      msg: `노트(ID: ${id})를 찾을 수 없습니다.`,
    });
    return;
  }

  const targetNote = store.notes.get(id);

  targetNote.title = title !== undefined ? title : targetNote.title;
  targetNote.body = body !== undefined ? body : targetNote.body;
  targetNote.pinned = pinned !== undefined ? pinned : targetNote.pinned;
  targetNote.backgroundColor =
    backgroundColor !== undefined
      ? backgroundColor
      : targetNote.backgroundColor;
  targetNote.updatedAt = Math.floor(Date.now() / 1000);

  res.json(targetNote);
});

// HTTP DELETE: 기존 노트 삭제
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (!store.notes.has(id)) {
    res.status(404).json({
      msg: `노트(ID: ${id})를 찾을 수 없습니다.`,
    });
    return;
  }

  store.notes.delete(id);

  res.json({
    msg: `노트(ID: ${id}를 삭제하였습니다)`,
  });
});

module.exports = router;

