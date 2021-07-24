import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from "../login/login.service";
import { interval } from 'rxjs';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  headerColor_bk_white=false;
  movies=[];
  isLoaded = false;
  isError = false;
  count=0;
  selected={
    title:'Abcd',
    genres:'asdf',
    description:'absc'
  }
  pic: string;
  pageCount: number;
  searchForm: any;
  searchValue: any;
  clicked = false;
  search;
  isSearched = true;
  secondsCounter = interval(2500);
  constructor(private apiservice:LoginService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchCtrl: ['', [Validators.pattern('[A-Za-z0-9]*'), Validators.minLength(3)]],
    })
    this.movieList()
  }

  @HostListener('window:scroll', ['$event'])

onWindowScroll(e) {
  
    if (window.pageYOffset > 50) {
      this.headerColor_bk_white = true;
      
    } else {
      this.headerColor_bk_white = false;
    }
  }

  get f() { return this.searchForm.controls; }

  movieList(){
    this.apiservice.getMovies().subscribe(
      result=>{
        this.isLoaded = true
        console.log(result['results'])
        this.pageCount = Math.ceil(result['count']/10);
        console.log(this.pageCount)
        this.count=1
        this.processList(result);
      },error=>{
        this.isError=true;
        this.isLoaded=true;
      }
    )
  }
  processList(result) {
    this.movies = result['results']
        for(var i=0;i<10;i++){
          this.movies[i].titlee= 'https://ui-avatars.com/api/?name='+this.movies[i].title+'&rounded=true&background=random'
        }
        this.selected = this.movies[0]
  }
  reloadCurrentPage() {
    window.location.reload();
  }
  selectedMovie(i){
    this.selected = this.movies[i];
    this.pic = 'https://ui-avatars.com/api/?name='+this.selected.title+'&background=random'
  }

  nextPage(){
    this.count++;
    this.movies=[];
    this.apiservice.getMoviespage(this.count).subscribe(
      result=>{
        this.isLoaded = true
        console.log(result['results'])
        this.processList(result);
      },error=>{
        this.isError=true;
        this.isLoaded=true;
      }
    )
  }

  beforPage(){
    this.count--;
    this.movies=[]
    this.apiservice.getMoviespage(this.count).subscribe(
      result=>{
        this.isLoaded = true
        console.log(result['results'])
        this.processList(result);
      },error=>{
        this.isError=true;
        this.isLoaded=true;
      }
    )
  }

  // movieSearch(){
  //   secondsCounter.
  // }

  movieSearch(){
    var filter = []
    this.search = this.searchForm.controls['searchCtrl'].value
    console.log(this.search)
    for(var i=0;i<this.movies.length;i++){
      if(this.movies[i].title.toLowerCase().indexOf(this.search) === 0){
        filter.push(this.movies[i])
      }
    }
    if(filter.length == 0 ){
      this.isSearched=false
    }
    else{
      this.movies = filter
    }
    console.log(filter)
    this.searchForm.reset();
    this.clicked=false;
  }
}
