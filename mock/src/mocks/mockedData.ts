type Dataset = Array<{ [key: string]: any }>;

export const datasets: { [key: string]: Dataset } = {
  
  "Empty Dataset": [],
 
  "Single Row Dataset": [
    { id: 1, name: "John Doe", age: 30 }
  ],
  
  "Basic Dataset": [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Smith", age: 25 },
    { id: 3, name: "Bob Johnson", age: 45 }
  ],
  
    // Tests horizontal scrolling for many columns
    "Many Columns Dataset": [
      { id: 1, name: "John", age: 30, city: "New York", job: "Engineer", salary: 75000, startDate: "2020-01-15" },
      { id: 2, name: "Jane", age: 28, city: "Boston", job: "Designer", salary: 65000, startDate: "2019-03-01" },
      { id: 3, name: "Bob", age: 35, city: "Chicago", job: "Manager", salary: 85000, startDate: "2018-11-01" }
    ],  
  
    // Tests vertical scrolling for many rows
    "Many Rows Dataset": Array.from({ length: 1000 }, (_, index) => ({
      id: index + 1,
      name: `Person ${index + 1}`,
      age: Math.floor(Math.random() * 50) + 20
    })),  
  
    // Tests handling of different data types (string, number, boolean, array) and null values
    "Mixed Data Types": [
      { id: 1, name: "John", age: 30, isStudent: false, grades: [85, 90, 78] },
      { id: 2, name: "Jane", age: 25, isStudent: true, grades: [92, 88, 95] },
      { id: 3, name: "Bob", age: null, isStudent: false, grades: [] }
    ],  
  
    // Tests handling of long text content in cells
    "Long Text Dataset": [
      { id: 1, name: "John Doe", description: "This is a very long description that should definitely cause the cell to expand or require some kind of truncation in the table view. We'll use this to test how our table handles long text content." },
      { id: 2, name: "Jane Smith", description: "Another long description here. This one is also quite lengthy and will help us ensure that our table can handle cells with a lot of text content gracefully." }
    ],  
  
      // Tests handling of special characters and non-ASCII text
    "Special Characters Dataset": [
      { id: 1, name: "John O'Neill", city: "Nüremberg" },
      { id: 2, name: "Zoë Müller", city: "São Paulo" },
      { id: 3, name: "François Léger", city: "Århus" }
    ]
    
  };