import { Injectable } from '@angular/core';
import { UsersData } from '../data/usersData';
import { User } from '../model/users';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  updatedUserList: User[] = [];

  constructor() {}

  getUsersList(): User[] {

    UsersData.map(item => { 
      const updatedUser: User = {
        email: item.email,
        phone: item.phone,
        first_name: item.first_name,
        last_name: item.last_name
      }
      this.updatedUserList.push(updatedUser);
    })

    return this.updatedUserList;
  }
}

