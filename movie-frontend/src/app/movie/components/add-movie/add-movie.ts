import { Component, inject } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-movie',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-movie.html',
  styleUrl: './add-movie.css'
})
export class AddMovie {
  private movieService = inject(MovieService);
  private router = inject(Router);

  title: string = '';
  director: string = '';
  year: number | null = null;
  genre: string = '';
  errors: { [key: string]: string } = {};
  successMessage: string = '';
  messageType: 'success' | 'error' = 'success';
  isSubmitting: boolean = false;
  isSubmitButtonHovered: boolean = false;
  isCancelButtonHovered: boolean = false;
  focusedField: string | null = null;

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
    const newMovie = {
      title: this.title,
      director: this.director,
      year: this.year!,
      genre: this.genre
    };

    this.movieService.addMovie(newMovie);
    this.successMessage = 'Movie added successfully!';
    this.messageType = 'success';
    
    setTimeout(() => {
      this.router.navigate(['/get-movies']);
    }, 2000);
  }

  navigateBack(): void {
    this.router.navigate(['/get-movies']);
  }
}
