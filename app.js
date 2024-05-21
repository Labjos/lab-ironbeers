const { error } = require('console');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
app.get('/', (req, res, next) => {
  res.render('layout');
});

app.get('/views/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then((beers) => {
      console.debug(beers);
      res.render('beers', { beers })
    });
    
});

// ...


// Add the route handlers here:
app.get('/views/random-beer', (req, res) => {
  punkAPI.getRandom().then(beers => {
    
    res.render('random-beers', beers[0]);

    });
  
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
