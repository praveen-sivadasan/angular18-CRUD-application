import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private persons: User[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Clerk'
    }
  ];

  public getUsers(): User[] {
    return this.persons;
  }

  public addUser(user: User) {
    user.id = this.persons.length + 1;
    this.persons.push(user);
  }

  public updateUser(user: User) {
    const index = this.persons.findIndex(u => user.id === u.id);
    this.persons[index] = user;
  }

  public deleteUser(id: number) {
    this.persons = this.persons.filter(u => u.id !== id);
  }
}
