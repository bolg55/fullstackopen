const express = require('express');
const app = express();
const PORT = 3001;

let data = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];
// Middleware
app.use(express.json());

// Utility functions

const generateId = () => {
  const maxId = data.length > 0 ? Math.max(...data.map((n) => n.id)) : 0;
  return maxId + 1;
};

// Root route
app.get('/', (req, res) => {
  res.send('<h1>Works, Kell!</h1>');
});

// Info route
app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${data.length} people</p>
    <p>${new Date()}</p>`);
});

// GET ALL data from API as JSON object
app.get('/api/persons', (req, res) => {
  res.json(data);
});

// GET ONE data by ID from API as JSON object. Return 404 if doesn't exist
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = data.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

// DELETE by ID from API.
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  data = data.filter((person) => person.id !== id);

  res.status(204).end();
});

// ADD NEW user and phone.
app.post('/api/persons', (req, res) => {
  const body = req.body;
  // Check if name or number are empty. If true, send error
  if (!body.name || !body.number) {
    return res
      .status(400)
      .json({
        error: `${!body.name ? 'name' : 'number'} is missing and required.`,
      });
  }
  // Check if name already exists in phonebook. If exists >> send error
  if (data.find((n) => n.name === body.name)) {
    return res
      .status(400)
      .json({ error: `${body.name} already exists in phonebook` });
  }
  // If name doesn't exist && name / number not empty
  // create new person Object and add to copy of existing data array.
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  data = data.concat(person);

  res.json(person);
});

// Express server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
