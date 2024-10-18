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
    ],

    // testing horizontal scrolling on the table
    "Wide Dataset": [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        age: 30,
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, Anytown, USA",
        occupation: "Software Developer",
        company: "Tech Corp",
        yearsOfExperience: 5,
        education: "Bachelor's in Computer Science",
        skills: "JavaScript, React, Node.js",
        hobbies: "Reading, Hiking, Photography",
        favoriteColor: "Blue",
        petName: "Max",
        birthdate: "1993-05-15",
        height: "5'11\"",
        weight: "180 lbs",
        eyeColor: "Brown",
        bloodType: "A+",
        socialSecurityNumber: "123-45-6789",
        creditCardNumber: "**** **** **** 1234",
        bankAccountNumber: "9876543210",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        age: 28,
        email: "jane.smith@example.com",
        phone: "+1 (555) 987-6543",
        address: "456 Elm St, Another City, USA",
        occupation: "Data Scientist",
        company: "Data Insights Inc.",
        yearsOfExperience: 3,
        education: "Master's in Data Science",
        skills: "Python, R, Machine Learning",
        hobbies: "Yoga, Cooking, Painting",
        favoriteColor: "Green",
        petName: "Bella",
        birthdate: "1995-09-22",
        height: "5'6\"",
        weight: "135 lbs",
        eyeColor: "Blue",
        bloodType: "O-",
        socialSecurityNumber: "987-65-4321",
        creditCardNumber: "**** **** **** 5678",
        bankAccountNumber: "1234567890",
      },
      {
        id: 3,
        firstName: "Bob",
        lastName: "Johnson",
        age: 35,
        email: "bob.johnson@example.com",
        phone: "+1 (555) 246-8135",
        address: "789 Oak Rd, Somewhere Else, USA",
        occupation: "Marketing Manager",
        company: "Brand Builders LLC",
        yearsOfExperience: 8,
        education: "MBA in Marketing",
        skills: "SEO, Content Marketing, Social Media Management",
        hobbies: "Golfing, Traveling, Wine Tasting",
        favoriteColor: "Red",
        petName: "Charlie",
        birthdate: "1988-12-03",
        height: "6'0\"",
        weight: "190 lbs",
        eyeColor: "Green",
        bloodType: "B+",
        socialSecurityNumber: "456-78-9012",
        creditCardNumber: "**** **** **** 9012",
        bankAccountNumber: "5678901234",
      }
    ],
    "Simple Bar Chart Data": [
      { category: "A", value: 10 },
      { category: "B", value: 20 },
      { category: "C", value: 15 },
      { category: "D", value: 25 },
      { category: "E", value: 18 }
    ],

    "Simple Bar Chart Data 2": [
      { category: 1, value: 10 },
      { category: 2, value: 20 },
      { category: 3, value: 15 },
      { category: 4, value: 25 },
      { category: 5, value: 18 }
    ]
  };