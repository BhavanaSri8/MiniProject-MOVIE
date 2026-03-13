import { Component, inject, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { Router } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-get-movies',
  imports: [AsyncPipe, CommonModule, FormsModule],
  templateUrl: './get-movies.html',
  styleUrl: './get-movies.css',
})
export class GetMovies implements OnInit, OnDestroy {
  public movieService: MovieService = inject(MovieService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private subscription!: Subscription;
  public hoveredMovieId: number | null = null;
  public addButtonHovered: boolean = false;
  public hoveredButtonId: string | null = null;
  public searchQuery: string = '';
  public isLoading: boolean = true;
  public sortBy: string = 'id';
  public sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit() {
    this.movieService.loadMovies();
    
    this.subscription = this.movieService.movies$.subscribe((movies) => {
      if (movies.length >= 0) {
        setTimeout(() => {
          this.isLoading = false;
          this.cdr.markForCheck(); 
        }, 1000);
      }
    });

    setTimeout(() => {
      if (this.isLoading) {
        console.warn('Loading timeout - hiding loading screen');
        this.isLoading = false;
        this.cdr.markForCheck(); 
      }
    }, 10000);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onRowMouseEnter(id: number): void {
    this.hoveredMovieId = id;
  }

  onRowMouseLeave(): void {
    this.hoveredMovieId = null;
  }

  deleteMovie(id: number): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(id);
    }
  }

  updateMovie(id: number): void {
    this.router.navigate(['/update-movie', id]);
  }

  navigateToAddMovie(): void {
    this.router.navigate(['/add-movie']);
  }

  filterMovies(movies: any[]): any[] {
    let filtered = movies;
    
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(query) ||
        movie.director.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query) ||
        movie.year.toString().includes(query)
      );
    }

    return filtered.sort((a, b) => {
      let aVal = a[this.sortBy];
      let bVal = b[this.sortBy];
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
        return this.sortDirection === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (this.sortDirection === 'asc') {
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      } else {
        return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
      }
    });
  }

  sortBy$(column: string): void {
    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortDirection = 'asc';
    }
    this.cdr.markForCheck();
  }

  getSortIndicator(column: string): string {
    if (this.sortBy !== column) return '';
    return this.sortDirection === 'asc' ? ' ↑' : ' ↓';
  }
}
