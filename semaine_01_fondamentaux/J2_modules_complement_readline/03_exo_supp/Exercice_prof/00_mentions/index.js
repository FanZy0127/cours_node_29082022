require("dotenv").config();

const {MENTION_PASSABLE, MENTION_BIEN, MENTION_TRESBIEN, MENTION_ASSEZBIEN} = process.env;

const students = [
  { name: 'ALAN', note: '11', address: 'Paris', mention : null },
  { name: 'ALICE', note: '17', address: 'Paris', mention : null },
  { name: 'SOHPHIE', note: '20', address: 'Paris', mention : null },
  { name: 'SONIA', note: '17', address: 'Toulon', mention : null },
  { name: 'ANTOINE', note: '18', address: 'Aubenas', mention : null },
  { name: 'BERNARD', note: '19', address: 'Paris', mention : null },
  { name: 'ALAN', note: '14', address: 'Aubenas', mention : null },
  { name: 'SONIA', note: '18', address: 'Paris', mention : null },
  { name: 'CLARISSE', note: '17', address: 'Marseille', mention : null }
];

for(const student of students){
  const note = parseInt(student.note);
  if(note >= 12 && note < 14){
    student.mention = MENTION_ASSEZBIEN
  }
  else if(note >= 14 && note < 16){
    student.mention = MENTION_BIEN
  }
  else if(note >= 16){
    student.mention = MENTION_TRESBIEN
  }
  else if(note >= 10 && note < 12){
    student.mention = MENTION_PASSABLE
  }
  else{
    student.mention = 'pas de mention'
  }
}

console.table(students) 