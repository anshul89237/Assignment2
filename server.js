const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Person = require('./models/Person');

const app = express();

mongoose.connect('mongodb://localhost:27017/personDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');


app.get('/person', async (req, res) => {
  const people = await Person.find();
  res.render('list', { people });
});


app.get('/person/new', (req, res) => {
  res.render('create');
});


app.post('/person', async (req, res) => {
  const { name, age, gender, mobile } = req.body;
  await Person.create({ name, age, gender, mobile });
  res.redirect('/person');
});


app.get('/person/:id/edit', async (req, res) => {
  const person = await Person.findById(req.params.id);
  res.render('edit', { person });
});


app.put('/person/:id', async (req, res) => {
  const { name, age, gender, mobile } = req.body;
  await Person.findByIdAndUpdate(req.params.id, { name, age, gender, mobile });
  res.redirect('/person');
});


app.get('/person/:id/delete', async (req, res) => {
  const person = await Person.findById(req.params.id);
  res.render('delete', { person });
});


app.delete('/person/:id', async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.redirect('/person');
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
