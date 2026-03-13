package org.hartford.movierestapi.repository;

import org.hartford.movierestapi.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByTitle(String title);
    List<Movie> findByDirector(String director);
    List<Movie> findByYear(Integer year);
    List<Movie> findByGenre(String genre);
    List<Movie> findByYearBetween(Integer startYear, Integer endYear);
    List<Movie> findAllByOrderByTitleAsc();
    List<Movie> findAllByOrderByYearDesc();
    List<Movie> findAllByOrderByDirectorAsc();
}
