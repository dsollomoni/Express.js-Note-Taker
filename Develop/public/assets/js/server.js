const fs = require('fs')
const express = require('express');
const path = require('path');

const app = express()
const PORT = process.env.PORT || 5000;
app.use(express.json())
app.use("/notes",(req, res) => {
    res.sendFile( "notes.html", {root: "Develop/public"})
    })
app.use("/",express.static("./Develop/public"))

app.get('/api/notes', async (req, res) => {
    let notes = "hello"
    await fs.readFile("Develop/db/db.json", "utf8",  (err,data)=> {
        if (err)console.error(err)
        else {
            notes = data
            res.send(JSON.stringify(notes))
        }
    })
    
})

app.post('/api/notes', async (req, res) => {
    const notes = require("../../../db/db.json")
    notes.push(req.body)
    console.log(notes)
    fs.writeFile("Develop/db/db.json", JSON.stringify(notes), (err) => {
        if (err) return console.error(err)
        else console.log("Notes Saved!")
        res.status(200)
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
  });
  