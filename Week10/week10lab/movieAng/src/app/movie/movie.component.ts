import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  moviesDB: any[] = [];
  actorsDB: any[] = [];

  title: String = "";
  year: number = 0;

  section: number = 1;
  deleteYear: number = 0;

  selectedActor: any;
  selectedMovie: any;

  constructor(private dbService: DatabaseService) { }

  onGetMovies(){
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }

  onGetActors(){
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    })
  }

  onSaveMovie(){
    let movieData: any = {
      title: this.title,
      year: this.year
    };
    this.dbService.createMovie(movieData).subscribe(result => {
      this.onGetMovies();
    });
  }

  onDeleteMovie(item){
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }

  onDeleteMovieBeforeYear(){
    this.dbService.deleteMovieBeforeYear(this.deleteYear).subscribe(result => {
      this.onGetMovies();
    });
  }

  onAddActorToMovie(){
    this.dbService.addActorToMovie(this.selectedMovie._id, this.selectedActor._id).subscribe(result => {
      this.onGetMovies();
    });
  }

  ngOnInit() {
    this.onGetMovies();
    this.onGetActors();
  }

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }

  resetValues() {
    this.title = "";
    this.year = 0;
  }

  selectActor(actor){
    this.selectedActor = actor;
  }

  selectMovie(movie){
    this.selectedMovie = movie;
  }
}
