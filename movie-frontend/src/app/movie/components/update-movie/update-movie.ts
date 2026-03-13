import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-update-movie',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-movie.html',
  styleUrl: './update-movie.css'
})
export class UpdateMovie implements OnInit {
  private movieService = inject(MovieService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  id: number = 0;
  title: string = '';
  director: string = '';
  year: number | null = null;
  genre: string = '';
  errors: { [key: string]: string } = {};
  isSubmitting: boolean = false;
  isSubmitButtonHovered: boolean = false;
  isCancelButtonHovered: boolean = false;
  focusedField: string | null = null;
  isLoading: boolean = true;
  successMessage: string = '';
  messageType: 'success' | 'error' = 'success';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id') || '0');
      this.loadMovie();
      
      setTimeout(() => {
        if (this.isLoading) {
          console.warn('Loading timeout - hiding loading screen');
          this.isLoading = false;
          this.cdr.markForCheck();
        }
      }, 10000);
    });
  }

  loadMovie(): void {
    this.movieService.getMovieById(this.id).pipe(
      timeout(5000)
    ).subscribe({
      next: (movie) => {
        this.title = movie.title;
        this.director = movie.director;
        this.year = movie.year;
        this.genre = movie.genre;
        this.isLoading = false;
        this.cdr.markForCheck(); 
      },
      error: (error) => {
        console.error('Error loading movie:', error);
        const errorMessage = error.name === 'TimeoutError' 
          ? 'Connection timeout. Please ensure the backend server is running on http://localhost:8080'
          : 'Error loading movie. Please ensure the backend server is running.';
        this.successMessage = errorMessage;
        this.messageType = 'error';
        this.isLoading = false;
        this.cdr.markForCheck(); 
      }
    });
  }

  validateForm(): boolean {
    this.errors = {};

    if (!this.title.trim()) {
      this.errors['title'] = 'Title is required';
    }
    if (!this.director.trim()) {
      this.errors['director'] = 'Director is required';
    }
    if (!this.year || this.year < 1800 || this.year > new Date().getFullYear()) {
      this.errors['year'] = 'Year must be between 1800 and current year';
    }
    if (!this.genre.trim()) {
      this.errors['genre'] = 'Genre is required';
    }

    return Object.keys(this.errors).length === 0;
  }

  submitForm(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;
    const updatedMovie = {
      title: this.title,
      director: this.director,
      year: this.year!,
      genre: this.genre
    };

    this.movieService.updateMovie(this.id, updatedMovie);
    this.successMessage = 'Movie updated successfully!';
    this.messageType = 'success';
    
    setTimeout(() => {
      this.router.navigate(['/get-movies']);
    }, 2000);
  }

  navigateBack(): void {
    this.router.navigate(['/get-movies']);
  }
}
