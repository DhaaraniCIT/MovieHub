import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token= localStorage.getItem('token');
  
  constructor(private http:HttpClient) { }

  head= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization','Token '+this.token)
  .set('Accept', 'application/json');
  
  login(user){
    return this.http.post('https://demo.credy.in/api/v1/usermodule/login/',user)
  }

  getMovies(){
    return this.http.get('https://demo.credy.in/api/v1/maya/movies/',{ 'headers': this.head })
  }

  getMoviespage(no){
    return this.http.get('https://demo.credy.in/api/v1/maya/movies/?page='+no,{ 'headers': this.head })
  }

  getAvater(name){
    return this.http.get('https://ui-avatars.com/api/?name='+name+'&rounded=true&background=random');
  }

}
