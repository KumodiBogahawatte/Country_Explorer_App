[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)


# 🌍 Countries Explorer

A responsive React application that allows users to explore information about countries around the world using the [REST Countries API](https://restcountries.com/). This project was developed as part of the SE3040 – Application Frameworks course at SLIIT.

## 🚀 Live Demo

👉 [View the live application on Netlify](https://countries-explorer-app.netlify.app/)

---

## 📌 Features

- 🔍 Search for countries by name
- 🌍 Filter countries by region
- 🇺🇳 View details of countries including:
  - Name
  - Capital
  - Region
  - Population
  - Languages
  - National Flag
- ❤️ Mark countries as favorites (requires login)
- 🔐 Manage user session with `localStorage`
- 💡 Responsive design suitable for all screen sizes
- ✅ Unit and integration testing with Jest and React Testing Library

---

## 🛠️ Technologies Used

- **Frontend Framework**: React (Functional Components + Hooks)
- **Routing**: React Router
- **Styling**: Bootstrap
- **State Management**: React Context API
- **Testing**: Jest, React Testing Library
- **Deployment**: Netlify
- **Version Control**: Git & GitHub

---

## 📂 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-IT22053282.git
   cd countries-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run tests**
   ```bash
   npm test
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Deploy to Netlify**
   ```bash
   netlify deploy --prod
   ```

---

## 🌐 REST Countries API Endpoints Used

This application integrates with the REST Countries API using the following endpoints:

- `GET /all` – Get all countries
- `GET /name/{name}` – Search countries by name
- `GET /region/{region}` – Filter countries by region
- `GET /alpha/{code}` – Get detailed country information by code

---

## 🧪 Testing

- Unit and integration tests are included using:
  - **Jest**: for unit tests
  - **React Testing Library**: for rendering and interaction tests
- Example tested components include:
  - SearchBar
  - CountryCard
  - CountryDetails
  - Favorites List

---

## 🔐 User Session Management

- Favorite countries are saved for logged-in users.
- Session is maintained using `localStorage`.
- Context API manages global state (favorites, authentication, etc.).

---

## 🧠 Challenges & Solutions

| Challenge | Solution |
|----------|----------|
| API response structure inconsistencies | Created a custom data processor to normalize data |
| State persistence after reloads | Used `localStorage` in combination with Context API |
| Responsive layout issues | Used Bootstrap's grid system and custom media queries |
| SPA routing on Netlify | Added a `_redirects` file to handle client-side routes correctly |

---

## 🔮 Future Improvements

- Implement backend-based user authentication
- Add filtering by language, currency, and subregion
- Let users create and share custom country collections
- Dark/light theme toggle
- Add pagination or lazy loading for country results

---

## 👨‍💻 Developer

- **Name**: Kumodi Bogahawatte
- **Index Number**: IT22053282
- **GitHub**: [https://github.com/SE1020-IT2070-OOP-DSA-25](https://github.com/SE1020-IT2070-OOP-DSA-25)

---

## ✅ Submission Checklist

- [x] GitHub repository with meaningful commits
- [x] Responsive frontend using React
- [x] Consumes at least 4 API endpoints
- [x] Fully functional search and filter
- [x] Unit and integration testing implemented
- [x] Netlify deployment live
- [x] README.md with all project details

---

## 📜 License

This project is intended for educational purposes only and is not licensed for commercial use.
