package org.hartford.movierestapi.service;

import org.hartford.movierestapi.model.Movie;

import java.util.List;
import java.util.Optional;

public interface MovieService {
    List<Movie> getAllMovies();
    Optional<Movie> getMovieById(Long id);
    Movie createMovie(Movie movie);
    Movie updateMovie(Long id, Movie movieDetails);
    void deleteMovie(Long id);
    List<Movie> getMoviesByTitle(String title);
    List<Movie> getMoviesByDirector(String director);
    List<Movie> getMoviesByYear(Integer year);
    List<Movie> getMoviesByGenre(String genre);
    List<Movie> getMoviesByYearRange(Integer startYear, Integer endYear);
    List<Movie> getAllMoviesSortedByTitle();
    List<Movie> getAllMoviesSortedByYear();
    List<Movie> getAllMoviesSortedByDirector();
}
