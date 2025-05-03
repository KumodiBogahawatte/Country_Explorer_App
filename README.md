[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)

# Countries Explorer

A React application that allows users to explore countries around the world using the REST Countries API.

## Live Demo
[View the live application](https://your-deployment-url.netlify.app)

## Features
- View details about countries including name, capital, region, population, flag, and languages
- Search for countries by name
- Filter countries by region
- Mark countries as favorites (requires login)
- Responsive design for all screen sizes

## Technologies Used
- React (with functional components and hooks)
- React Router for navigation
- Bootstrap for styling
- Context API for state management
- Jest and React Testing Library for testing

## Installation and Setup
1. Clone the repository:
git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-IT22053282.git
cd countries-explorer

2. Install dependencies:
npm install

3. Start the development server:
npm start

4. To run tests:
npm test

5. To build for production:
npm run build


## API Integration
This project uses the REST Countries API with the following endpoints:
- GET /all - to get all countries
- GET /name/{name} - to search countries by name
- GET /region/{region} - to filter countries by region
- GET /alpha/{code} - to get detailed information about a specific country

## Challenges and Solutions
1. **Challenge**: Handling API response structure changes
- **Solution**: Created custom data processing functions to normalize API data

2. **Challenge**: Managing user session state across the application
- **Solution**: Implemented React Context API with localStorage for persistence

3. **Challenge**: Creating a responsive design that works well on mobile
- **Solution**: Utilized Bootstrap's responsive grid system and custom media queries

## Future Improvements
- Add more advanced filtering options
- Implement a backend for actual user authentication
- Add ability to create and share custom country collections

# Build the application
npm run build

# Deploy to Netlify (if using Netlify CLI)
netlify deploy --prod

