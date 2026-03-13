# 🎬 Movie Management Application

This repository contains a **full-stack Movie Management Application** with a **Spring Boot RESTful backend** and an **Angular frontend**.

---

---

## 🚀 Features

- Add new movies
- Update movie details
- Delete movies
- View all movies
- Responsive UI using **Tailwind CSS**
- RESTful API integration

---

## ⚙️ Technologies Used

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Maven

### Frontend
- Angular
- TypeScript
- Tailwind CSS
- RxJS Observables

---


---

### Movie CRUD Operations

| Method | Endpoint | Description |
|------|------|------|
| GET | `/api/movies` | Retrieve all movies |
| GET | `/api/movies/{id}` | Retrieve a movie by ID |
| POST | `/api/movies` | Create a new movie |
| PUT | `/api/movies/{id}` | Update an existing movie |
| DELETE | `/api/movies/{id}` | Delete a movie |

---

### Search Movies

| Method | Endpoint | Description |
|------|------|------|
| GET | `/api/movies/search/title?title=MovieTitle` | Search movies by title |
| GET | `/api/movies/search/director?director=DirectorName` | Search movies by director |
| GET | `/api/movies/search/year?year=2020` | Search movies by year |
| GET | `/api/movies/search/genre?genre=Action` | Search movies by genre |
| GET | `/api/movies/search/year-range?startYear=2000&endYear=2020` | Search movies within a year range |

---

### Sorting Movies

| Method | Endpoint | Description |
|------|------|------|
| GET | `/api/movies/sorted/title` | Get movies sorted by title |
| GET | `/api/movies/sorted/year` | Get movies sorted by year |
| GET | `/api/movies/sorted/director` | Get movies sorted by director |

---

