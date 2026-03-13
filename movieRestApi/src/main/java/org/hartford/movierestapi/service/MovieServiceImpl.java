package org.hartford.movierestapi.service;

import org.hartford.movierestapi.model.Movie;
import org.hartford.movierestapi.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieServiceImpl implements MovieService {
    private final MovieRepository movieRepository;

    public MovieServiceImpl(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @Override
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @Override
    public Optional<Movie> getMovieById(Long id) {
        return movieRepository.findById(id);
    }

    @Override
    public Movie createMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    @Override
    public Movie updateMovie(Long id, Movie movieDetails) {
        Movie movie = movieRepository.findById(id).orElseThrow();
        movie.setTitle(movieDetails.getTitle());
        movie.setDirector(movieDetails.getDirector());
        movie.setYear(movieDetails.getYear());
        movie.setGenre(movieDetails.getGenre());
        return movieRepository.save(movie);
    }

    @Override
    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }

    @Override
    public List<Movie> getMoviesByTitle(String title) {
        return movieRepository.findByTitle(title);
    }

    @Override
    public List<Movie> getMoviesByDirector(String director) {
        return movieRepository.findByDirector(director);
    }

    @Override
    public List<Movie> getMoviesByYear(Integer year) {
        return movieRepository.findByYear(year);
    }

    @Override
    public List<Movie> getMoviesByGenre(String genre) {
        return movieRepository.findByGenre(genre);
    }

    @Override
    public List<Movie> getMoviesByYearRange(Integer startYear, Integer endYear) {
        return movieRepository.findByYearBetween(startYear, endYear);
    }

    @Override
    public List<Movie> getAllMoviesSortedByTitle() {
        return movieRepository.findAllByOrderByTitleAsc();
    }

    @Override
    public List<Movie> getAllMoviesSortedByYear() {
        return movieRepository.findAllByOrderByYearDesc();
    }

    @Override
    public List<Movie> getAllMoviesSortedByDirector() {
        return movieRepository.findAllByOrderByDirectorAsc();
    }
}
