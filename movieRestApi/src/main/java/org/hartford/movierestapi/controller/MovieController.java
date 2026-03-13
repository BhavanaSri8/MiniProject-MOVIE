package org.hartford.movierestapi.controller;

import org.hartford.movierestapi.model.Movie;
import org.hartford.movierestapi.service.MovieService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:4200")
public class MovieController {
    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        return movieService.getMovieById(id)
                .map(movie -> new ResponseEntity<>(movie, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Movie> createMovie(@RequestBody Movie movie) {
        return new ResponseEntity<>(movieService.createMovie(movie), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Movie> updateMovie(@PathVariable Long id, @RequestBody Movie movie) {
        try {
            return new ResponseEntity<>(movieService.updateMovie(id, movie), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
        movieService.deleteMovie(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search/title")
    public ResponseEntity<List<Movie>> getMoviesByTitle(@RequestParam String title) {
        return new ResponseEntity<>(movieService.getMoviesByTitle(title), HttpStatus.OK);
    }

    @GetMapping("/search/director")
    public ResponseEntity<List<Movie>> getMoviesByDirector(@RequestParam String director) {
        return new ResponseEntity<>(movieService.getMoviesByDirector(director), HttpStatus.OK);
    }

    @GetMapping("/search/year")
    public ResponseEntity<List<Movie>> getMoviesByYear(@RequestParam Integer year) {
        return new ResponseEntity<>(movieService.getMoviesByYear(year), HttpStatus.OK);
    }

    @GetMapping("/search/genre")
    public ResponseEntity<List<Movie>> getMoviesByGenre(@RequestParam String genre) {
        return new ResponseEntity<>(movieService.getMoviesByGenre(genre), HttpStatus.OK);
    }

    @GetMapping("/search/year-range")
    public ResponseEntity<List<Movie>> getMoviesByYearRange(@RequestParam Integer startYear, @RequestParam Integer endYear) {
        return new ResponseEntity<>(movieService.getMoviesByYearRange(startYear, endYear), HttpStatus.OK);
    }

    @GetMapping("/sorted/title")
    public ResponseEntity<List<Movie>> getAllMoviesSortedByTitle() {
        return new ResponseEntity<>(movieService.getAllMoviesSortedByTitle(), HttpStatus.OK);
    }

    @GetMapping("/sorted/year")
    public ResponseEntity<List<Movie>> getAllMoviesSortedByYear() {
        return new ResponseEntity<>(movieService.getAllMoviesSortedByYear(), HttpStatus.OK);
    }

    @GetMapping("/sorted/director")
    public ResponseEntity<List<Movie>> getAllMoviesSortedByDirector() {
        return new ResponseEntity<>(movieService.getAllMoviesSortedByDirector(), HttpStatus.OK);
    }
}
