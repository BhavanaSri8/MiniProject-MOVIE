# Movie REST API

A Spring Boot REST API application for managing movies. This application provides endpoints to perform CRUD operations (Create, Read, Update, Delete) on movie records stored in a MySQL database.

## Overview

The Movie REST API is built with Spring Boot and provides a clean, RESTful interface for managing movie data. It includes a well-organized architecture with separation of concerns through controllers, services, repositories, and models.

## Technology Stack

- **Java Version**: 17
- **Spring Boot**: 4.0.2
- **Framework**: Spring MVC
- **Database**: MySQL
- **ORM**: Hibernate JPA
- **Build Tool**: Maven

## Project Structure

```
movieRestApi/
├── src/
│   ├── main/
│   │   ├── java/org/hartford/movierestapi/
│   │   │   ├── MovieRestApiApplication.java    # Main Spring Boot application
│   │   │   ├── controller/
│   │   │   │   └── MovieController.java        # REST API endpoints
│   │   │   ├── service/
│   │   │   │   ├── MovieService.java           # Service interface
│   │   │   │   └── MovieServiceImpl.java        # Service implementation
│   │   │   ├── repository/
│   │   │   │   └── MovieRepository.java        # Data access layer
│   │   │   └── model/
│   │   │       └── Movie.java                  # Movie entity model
│   │   └── resources/
│   │       ├── application.properties          # Application configuration
│   │       ├── static/                         # Static files
│   │       └── templates/                      # HTML templates
│   └── test/
│       └── java/org/hartford/movierestapi/
│           └── MovieRestApiApplicationTests.java
├── pom.xml                                      # Maven configuration
├── mvnw & mvnw.cmd                             # Maven wrapper
└── README.md                                    # This file
```

## Prerequisites

Before running this application, ensure you have the following installed:

- Java 17 or higher
- Maven 3.6.0 or higher
- MySQL Server 5.7 or higher
- A MySQL database client (optional)

## Setup Instructions

### 1. Clone or Download the Project

```bash
# If cloning from a repository
git clone <repository-url>
cd movieRestApi
```

### 2. Create Database

Create a MySQL database for the application:

```sql
CREATE DATABASE song_db;
```

### 3. Configure Database Connection

Edit `src/main/resources/application.properties` with your MySQL credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/song_db
spring.datasource.username=root
spring.datasource.password=your_password
```

### 4. Build the Project

Using Maven:

```bash
# Windows
mvnw.cmd clean install

# Linux/Mac
./mvnw clean install
```

### 5. Run the Application

Using Maven:

```bash
# Windows
mvnw.cmd spring-boot:run

# Linux/Mac
./mvnw spring-boot:run
```

Or run the JAR file:

```bash
java -jar target/movieRestApi-0.0.1-SNAPSHOT.jar
```

The application will start on `http://localhost:8080`

## API Endpoints

All endpoints are prefixed with `/api/movies`

### 1. Get All Movies
```
GET /api/movies
```
Returns a list of all movies in the database.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Inception",
    "director": "Christopher Nolan",
    "year": 2010,
    "genre": "Science Fiction"
  },
  ...
]
```

### 2. Get Movie by ID
```
GET /api/movies/{id}
```
Returns a specific movie by its ID.

**Path Parameters:**
- `id` (Long): The unique identifier of the movie

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Inception",
  "director": "Christopher Nolan",
  "year": 2010,
  "genre": "Science Fiction"
}
```

**Response (404 Not Found):** If the movie with the given ID doesn't exist.

### 3. Create a New Movie
```
POST /api/movies
Content-Type: application/json
```
Creates a new movie in the database.

**Request Body:**
```json
{
  "title": "The Dark Knight",
  "director": "Christopher Nolan",
  "year": 2008,
  "genre": "Action"
}
```

**Response (201 Created):**
```json
{
  "id": 2,
  "title": "The Dark Knight",
  "director": "Christopher Nolan",
  "year": 2008,
  "genre": "Action"
}
```

### 4. Update a Movie
```
PUT /api/movies/{id}
Content-Type: application/json
```
Updates an existing movie.

**Path Parameters:**
- `id` (Long): The unique identifier of the movie

**Request Body:**
```json
{
  "title": "The Dark Knight Rises",
  "director": "Christopher Nolan",
  "year": 2012,
  "genre": "Action"
}
```

**Response (200 OK):**
```json
{
  "id": 2,
  "title": "The Dark Knight Rises",
  "director": "Christopher Nolan",
  "year": 2012,
  "genre": "Action"
}
```

**Response (404 Not Found):** If the movie with the given ID doesn't exist.

### 5. Delete a Movie
```
DELETE /api/movies/{id}
```
Deletes a movie from the database.

**Path Parameters:**
- `id` (Long): The unique identifier of the movie

**Response (204 No Content):** Movie successfully deleted.

## Movie Entity

The `Movie` class represents a movie record with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| id | Long | Unique identifier (auto-generated) |
| title | String | Movie title |
| director | String | Director name |
| year | Integer | Release year |
| genre | String | Movie genre |

## Database Configuration

The application uses Hibernate ORM with automatic schema generation. The `spring.jpa.hibernate.ddl-auto` property is set to `update`, which means:

- The `movies` table is automatically created if it doesn't exist
- Existing columns are updated if the entity changes
- No data is dropped on restart

## Key Features

- ✅ RESTful API design
- ✅ Complete CRUD operations
- ✅ Proper HTTP status codes
- ✅ Exception handling
- ✅ MySQL database integration
- ✅ Spring Data JPA for data persistence
- ✅ Dependency injection via constructor
- ✅ Clean code architecture

## Dependencies

Key dependencies included in the project:

- `spring-boot-starter-data-jpa` - For database operations
- `spring-boot-starter-webmvc` - For REST API endpoints
- `spring-boot-devtools` - For development support
- `mysql-connector-j` - MySQL JDBC driver

## Troubleshooting

### Database Connection Error
- Ensure MySQL server is running
- Verify database credentials in `application.properties`
- Check if the database `song_db` exists

### Port Already in Use
- By default, the application runs on port 8080
- To change the port, add to `application.properties`:
  ```properties
  server.port=8081
  ```

### Hibernate DDL Auto Issues
- If tables are not being created, ensure `spring.jpa.hibernate.ddl-auto=update` or `create`
- Check MySQL user permissions

## Testing

Run the test suite with:

```bash
# Windows
mvnw.cmd test

# Linux/Mac
./mvnw test
```

## Development Notes

- The application uses constructor-based dependency injection for better testability
- All endpoints return appropriate HTTP status codes
- SQL formatting is enabled for better readability in logs

## Future Enhancements

- Add authentication and authorization
- Implement pagination for large result sets
- Add input validation and error messages
- Create a frontend UI
- Add comprehensive unit and integration tests
- Implement caching mechanisms
- Add API documentation with Swagger/OpenAPI

## License

This project is part of Hartford Java Assignments.

## Contact & Support

For issues or questions, please contact the development team.

---

**Last Updated:** March 3, 2026

