var subjectObject = {
  "Select":{},
  "block A":{
    "Plant A": {
      "UOP": ["Tags", "Links", "Images", "Tables", "Lists", "colors", "Attributes", "Classes", "input", "Iframes", "Div/Span", "Metatags", "Headings", "Favions"],
      "CFFP-P": ["padding", "Margins", "Borders", "Display", 'Icons', "Units", 'z-index', 'Pseudo-class', "Pseudo-element", "!important", "Text-Effect", "Mart-Function", "Transitions", "Aminations", "Transform", "Variables", "Flexbox", 'Grid', 'Masking', 'Media Query'],
      "CFFP-A": ['Accordion', 'Tooltips', 'Toasts', 'Navs & tabs', 'Carousel', 'Collapse', 'Alerts', 'Badge', 'Card', 'List group', 'Navbar', 'Pagination', 'Progress', 'Scrollspy', 'Spinners', ],
      "EFFP": ["Variables", "Operators", "Functions", "Conditions", "Loops", "Array", "Object", "DOM", "Local-Storage", "API", "ES6"],
      "React.JS": ['Components', 'JSX', 'State', 'Props', 'Lists & Keys', 'Styling', 'Life Cycle Method', 'Hooks', 'Form Handling', 'Data Handling', 'Custom Hooks', 'Contet', 'portals', 'Routing', 'State Management', 'Patterns', 'Anti-Patterns']
    },
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
    var fourth = document.getElementById('areaspec');
  
    for (var x in subjectObject) {
      first.options[first.options.length] = new Option(x);
    }
  
    first.onchange = function () {
      // Clear existing options
      second.length = 1;
      third.length = 1;
      fourth.length = 1;
  
      second.style.display = 'block';
      third.style.display = 'none';
      fourth.style.display = 'none';
  
      for (var y in subjectObject[this.value]) {
        second.options[second.options.length] = new Option(y);
      }
    };
  
    second.onchange = function () {
      third.length = 1;
      fourth.length = 1;
  
      third.style.display = 'block';
      fourth.style.display = 'none';
  
      var z = subjectObject[first.value][this.value];
      for (var key in z) {
        third.options[third.options.length] = new Option(key);
      }
    };
  
    third.onchange = function () {
      fourth.length = 1;
  
      fourth.style.display = 'block';
  
      var x = subjectObject[first.value][second.value][this.value];
      for (let i = 0; i < x.length; i++) {
        fourth.options[fourth.options.length] = new Option(x[i]);
      }
    };
  };
  function setDate() {
    const currentDateInput = document.getElementById('currentDate');
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Add leading zero if needed
    const day = ('0' + currentDate.getDate()).slice(-2); // Add leading zero if needed
    const formattedDate = `${year}-${month}-${day}`;
    currentDateInput.value = formattedDate;
  }

  