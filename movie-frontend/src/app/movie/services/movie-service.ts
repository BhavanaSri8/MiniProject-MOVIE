import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

export interface Movie {
  id?: number;
  title: string;
  director: string;
  year: number;
  genre: string;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private httpClient: HttpClient = inject(HttpClient);
  private moviesSubject: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  public movies$ = this.moviesSubject.asObservable();

  constructor() {
    this.loadMovies();
  }

  loadMovies(): void {
    this.httpClient.get<Movie[]>('http://localhost:8080/api/movies').subscribe({
      next: (movies) => {
        this.moviesSubject.next(movies);
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
        this.moviesSubject.next([]);
      }
    });
  }

  addMovie(movie: { id?: number; title: string; director: string; year: number; genre: string }): void {
    this.httpClient.post<Movie>('http://localhost:8080/api/movies', movie).subscribe({
      next: (m) => {
        console.log('Movie added successfully:', m);
        setTimeout(() => {
          this.loadMovies();
        }, 100);
      },
      error: (error) => {
        console.error('Failed to add movie', error);
      },
      complete: () => {
        console.log('Add movie request completed');
      }
    });
  }

  updateMovie(id: number, movie: { id?: number; title: string; director: string; year: number; genre: string }): void {
    this.httpClient.put<Movie>(`http://localhost:8080/api/movies/${id}`, movie).subscribe({
      next: (m) => {
        console.log('Movie updated successfully:', m);
        setTimeout(() => {
          this.loadMovies();
        }, 100);
      },
      error: (error) => {
        console.error('Failed to update movie', error);
      },
      complete: () => {
        console.log('Update movie request completed');
      }
    });
  }

  deleteMovie(id: number): void {
    this.httpClient.delete<void>(`http://localhost:8080/api/movies/${id}`).subscribe({
      next: () => {
        console.log(`Movie with id ${id} removed successfully.`);
        setTimeout(() => {
          this.loadMovies();
        }, 100);
      },
      error: (error) => {
        console.error('Error removing movie:', error);
      }
    });
  }

  getMovieById(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(`http://localhost:8080/api/movies/${id}`);
  }
}
