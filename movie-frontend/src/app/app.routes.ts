import { Routes } from '@angular/router';

export const routes: Routes = [
    {"path":"","loadComponent":()=>import("./movie/components/get-movies/get-movies").then(m=>m.GetMovies)},
    {"path":"get-movies","loadComponent":()=>import("./movie/components/get-movies/get-movies").then(m=>m.GetMovies)},
    {"path":"add-movie","loadComponent":()=>import("./movie/components/add-movie/add-movie").then(m=>m.AddMovie)},
    {"path":"update-movie/:id","loadComponent":()=>import("./movie/components/update-movie/update-movie").then(m=>m.UpdateMovie)},
    {"path":"delete-movie/:id","loadComponent":()=>import("./movie/components/delete-movie/delete-movie").then(m=>m.DeleteMovie)}
];
