/*
 * Config section
 *
 */
const { notStrictEqual } = require('assert');
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const app = express()
const port = 3000

app.use(expressLayouts)
app.use(express.static(path.join(__dirname, "assets")))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/*
 * Controller section
 *
 */

app.get('/', (req, res) => {
    let dataObject = {  name : null,
                        staticString : "The most static string in the land version 2" }
    if (req.query.name != null){
        dataObject.name = req.query.name;
    }
    
    res.render('index', dataObject)
});


app.get('/secret', (req, res) => res.send(`You're not meant to see this!!! ${req.url} <br>`))
app.get('/nevergonnagiveyouup', (req, res) => {
    let imageTag = `<img src="${"img/astley.jpg"}" alt="Never gonna give you up!">`;
    res.send(`<marquee>${imageTag}</marquee> <h1>${__dirname}</h1>`);
})
app.get('/google', (req, res) => res.redirect(`http://www.google.com`))
//express.bind

app.get('/foo', (req, res) => {
    res.redirect(`/bar`)
})

app.get('/bar', (req, res) => {
    res.redirect(`/foo`)
})

app.use(function (req, res, next) {
    res.status(404).send("Foar oh foar!")
  })

/*
 * View section
 *
 */



/*
 * Server launch
 *
 */

app.listen(port, () => console.log('Server started at http://localhost:' + port));