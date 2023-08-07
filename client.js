var subjectObject = {
    "Select":{},
    "block A":{
      "Plant A": ["UOP","CFFP-P","CFFP-A","EFFP","React.JS"] ,
      "PLant B": {
        "Express.js": ['Routing and HTTP Methods', 'Middleware', 'Cookies', 'REST APIs', 'Scaffolding', 'Database Connectivity', 'Templating'],
        "Node.js": ['REPL', 'package manager', 'callbacks', 'event loop', 'os', 'path', 'query string', 'cryptography', 'debugger', 'URL', 'DNS', 'Net', 'UDP', 'process', 'child processes', 'buffers', 'streams', 'file systems', 'global objects', 'web modules']
      },
      "Plant C":{
        "MongoDB" : ['Documents', 'Collections', 'Compass', 'Replica Sets', 'Sharding', 'Indexes', 'Aggregation Pipelines', 'MongoDB Cloud'],
        "MySQL" : ['Create TABLE', 'Insert Data Into Table', 'Select Query', 'Table Constraints', 'And oR and NOT Operator', 'IN Operator', 'LIKE Operator', 'MySQL Aggregate Functions'],
      },
      "Plant D":{
        "Electron JS": ['Main and Renderer Process', 'Browser Window', 'Quote Widget', 'IPC', 'Application Menu', 'Context Menu', 'Accelerators', 'Shell Module', 'Tray Module', 'CRUD File'],
        "React-Native": ['React Native CLI', 'Ejecting Expo', 'State Hook', 'Styles & Style Sheet', 'List, ScrollView & RefreshControl', 'Alert & Toast Message'],
        "NativeScript": []
      }
    },
    "block b":{}
    }
    
    
    window.onload = function () {
      var first = document.getElementById('block');
      var second = document.getElementById('plant');
      var third = document.getElementById('area');
    
      for (var x in subjectObject) {
        first.options[first.options.length] = new Option(x);
      }
    
      first.onchange = function () {
        // Clear existing options
        second.length = 1;
        third.length = 1;
    
        second.style.display = 'block';
        third.style.display = 'none';
    
        for (var y in subjectObject[this.value]) {
          second.options[second.options.length] = new Option(y);
        }
      };
    
      second.onchange = function () {
        third.length = 1;
    
        third.style.display = 'block';
    
        var x = subjectObject[first.value][this.value];
      for (let i = 0; i < x.length; i++) {
        third.options[third.options.length] = new Option(x[i]);
      }
      };
    };

    function retrieveDate() {
        const selectedMonth = document.getElementById('month').value;
        const selectedBlock = document.getElementById('block').value;
        const selectedPlant = document.getElementById('plant').value;
        const selectedArea = document.getElementById('area').value;
         // Get the selected month from the dropdown
        const url = `/retrievedate?month=${selectedMonth}&block=${selectedBlock}&plant=${selectedPlant}&area=${selectedArea}`; // Add the selected month as a query parameter
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const dataTable = document.getElementById('dataBody');
        dataTable.innerHTML = ''; // Clear existing data from the table
    
        // Loop through the data and create rows in the table
        data.forEach((row) => {
          const newRow = dataTable.insertRow();
          newRow.insertCell().textContent = row.area;
          newRow.insertCell().textContent = row.areaspec;
          newRow.insertCell().textContent = row.min_near;
          newRow.insertCell().textContent = row.max_near;
          newRow.insertCell().textContent = row.min_onem;
          newRow.insertCell().textContent = row.max_onem;
        });
      })
          .catch(error => console.error('Error retrieving data:', error));
      }