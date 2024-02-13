import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServiceUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

    // public login(user: { password: string; email: string }): Observable<User> {
    //     return this.http.post<User>(`${this.apiServiceUrl}/users/login`, user);
    // }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServiceUrl}/user/all`);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServiceUrl}/user/add`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServiceUrl}/user/update`, user);
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServiceUrl}/user/delete/${userId}`
    );
  }

}
