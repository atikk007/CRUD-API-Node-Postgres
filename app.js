const client = require('./connection.js')
client.connect();

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// ejs template view engine
app.set('view engine', 'ejs');

// static file middelware
app.use(express.static('public'));

// using morgan middleware
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.render('index');
})

// Get All movies
app.get('/movies', (req, res) => {
    client.query(`Select * from movies`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})

// Get Movies By Id
app.get('/movies/:id', (req, res) => {

    client.query(`Select * from movies where movie_id=${req.params.id}`, (err, result) => {
        if (!err) {
            console.log(req)
            res.send(result.rows);
        } else {
            console.log(`error is ${err} ${req.params.id}`);
        }
    });
    client.end;
})

// Add movies to database 
app.post('/movies', (req, res) => {
    const movie = req.body;
    let insertQuery = `insert into movies(movie_id, movie_name, movie_genre, imdb_ratings) 
                       values(${movie.id}, '${movie.name}', '${movie.genre}', '${movie.imdb}')`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Insertion was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})

// updates in database 
app.put('/movies/:id', (req, res) => {
    let movie = req.body;
    let updateQuery = `update movies
                       set movie_name = '${movie.name}',
                       movie_genre = '${movie.genre}',
                       imdb_ratings = '${movie.imdb}'
                       where movie_id = ${req.params.id}`

    client.query(updateQuery, (err, result) => {
        if (!err) {
            res.send('Update was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})

// Delete from database

app.delete('/movies/:id', (req, res) => {
    let insertQuery = `delete from movies where movie_id=${req.params.id}`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Deletion was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})

const port = 3000;
app.use((req, res) => {
    res.status(404).render('404');
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})