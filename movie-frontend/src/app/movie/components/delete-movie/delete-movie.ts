import { Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-movie',
  template: '<p>Deleting...</p>'
})
export class DeleteMovie implements OnInit {
  private movieService = inject(MovieService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = parseInt(params.get('id') || '0');
      if (confirm('Are you sure you want to delete this movie?')) {
        this.movieService.deleteMovie(id);
        setTimeout(() => {
          this.router.navigate(['/get-movies']);
        }, 500);
      } else {
        this.router.navigate(['/get-movies']);
      }
    });
  }
}
