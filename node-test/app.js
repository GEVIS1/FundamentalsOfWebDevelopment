/*
 * Config section
 *
 */
const express = require('express')
const app = express()
const port = 3000

app.set("view engine", "ejs");


/*
 * Controller section
 *
 */


app.get('/', (req, res) => {
    let input = "";
    if (req.query.name != null){
        input = req.query.name;
    }

    res.send(`Hello World! <br> You gave me some input: ${input}`)});

app.get('/secret', (req, res) => res.send(`You're not meant to see this!!! ${req.url} <br>`))
app.get('/nevergonnagiveyouup', (res) => res.send(`<marquee>${imageTag}</marquee>`))
app.get('/google', (res) => res.redirect(`http://www.google.com`))

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