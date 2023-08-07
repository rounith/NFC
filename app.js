const express = require('express');
const bodyParser = require('body-parser');
const { createPool } = require('mysql');
const app = express();

// Configuration for the MySQL connection pool
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Universe@123',
  database: 'demo',
  connectionLimit: 10,
};

// Create the MySQL connection pool
const pool = createPool(dbConfig);

app.use(bodyParser.urlencoded({ extended: true }));
// Serve the static HTML file
app.use(express.static(__dirname));

let block;
//Login 
// Endpoint for login authentication
app.post('/login', (req, res) => {
  const {empid, password} = req.body;
  block=req.body.block;
  
  // Query the database to fetch the user's credentials
  const selectQuery = 'SELECT * FROM users WHERE empid = ? and block= ? ';

  pool.query(selectQuery, [empid,block], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Internal server error');
    } else if (results.length === 0) {
      res.status(401).send('User not found');
    } else {
      const user = results[0];
      if(user.empid=='admin' && user.password=='admin@nfc')
       res.redirect('/retrieve.html')
      else if (user.password === password) {
        // Login successful, redirect to user.html
        res.redirect('/user.html');
      } else {
        res.status(401).send('Invalid password or block');
      }
    }
  });
});

// Register

app.post('/register', (req, res) => {
  const { empid, password, confirmPass, block } = req.body;

  if (password !== confirmPass) {
    return res.status(400).send('Passwords do not match.');
  }

  // Insert query with additional fields for first, second, and third
  const insertQuery = 'INSERT INTO demo.users (empid, password,block) VALUES (?, ?, ?)';
  // Execute the query with data, including the values from the drop-downs
  pool.query(insertQuery, [empid, password,block], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
    } else {
      console.log('Data inserted successfully.');
      res.send('Data inserted successfully.');
    }
  });
});


// Handle the form submission
app.post('/insert', (req, res) => {
  const { emp, name, plant, area, areaspec,near,onem,currentDate } = req.body;
  console.log(req.body);
  // Insert query with additional fields for first, second, and third
  const insertQuery = 'INSERT INTO demo.radiationlevels (emp, name,block, plant, area, areaspec,near,onem,currentDate) VALUES (?, ?,?, ?, ?, ?,?,?,?)';
  
  // Execute the query with data, including the values from the drop-downs
  pool.query(insertQuery, [emp, name,block, plant, area, areaspec,near,onem,currentDate], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
    } else {
      console.log('Data inserted successfully.');
      res.send('Data inserted successfully.');
    } 
  }); 
  //console.log(block)
});


app.use(express.json());

// Endpoint for retrieving data
app.get('/retrieve', (req, res) => {
  // Retrieve query
  const retrieveQuery = 'SELECT emp, name, block, plant, area, areaspec FROM demo.radiationlevels';
  // Execute the query
  pool.query(retrieveQuery, (err, result) => {
    if (err) {
      console.error('Error retrieving data:', err);
      res.status(500).send('Error retrieving data');
    } else {
      console.log('Data retrieved successfully');

      res.json(result);
    }
  });
});

function retrieveData() {
  fetch('/retrieve')
  .then(response => response.json())
  .then(data => {
    const dataList = document.getElementById('dataList');
    dataList.innerHTML = ''; // Clear the existing data list
    data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `Employee: ${item.emp}, Name: ${item.name}, Block: ${item.block} , plant: ${item.plant} , area: ${item.area} , areaspec: ${item.areaspec}`;
      dataList.appendChild(li);
    });
  })
  .catch(error => console.error('Error retrieving data:', error));
}
// Endpoint for retrieving data based on the selected month
// Endpoint for retrieving the minimum and maximum values of "near" and "onem" for the selected month
app.get('/retrievedate', (req, res) => {
  const selectedMonth = req.query.month;
  const selectedBlock = req.query.block;
  const selectedPlant = req.query.plant;
  const selectedArea=req.query.area;
  // Get the selected month from the query parameter

  // Construct the SQL query to calculate the minimum and maximum values of "near" and "onem" for the chosen month
  const retrieveQuery = `
  SELECT
  area,
  areaspec,
  MIN(near) AS min_near,
  MAX(near) AS max_near,
  MIN(onem) AS min_onem,
  MAX(onem) AS max_onem FROM demo.radiationlevels 
  WHERE MONTH(currentDate) = ? AND block = ? AND plant = ? AND area = ? 
  GROUP BY area, areaspec`;

  // Execute the query with the selected month as a parameter
  pool.query(retrieveQuery, [selectedMonth,selectedBlock,selectedPlant,selectedArea], (err, result) => {
    if (err) {
      console.error('Error retrieving data:', err);
      res.status(500).send('Error retrieving data');
    } else {
      console.log('Data retrieved successfully.');
      //console.log(result);
      res.json(result); // Return the first row containing the calculated values
    }
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
