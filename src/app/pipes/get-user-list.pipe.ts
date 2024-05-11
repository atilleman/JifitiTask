import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../model/users';
import { UserList } from '../model/usersList';

@Pipe({
  name: 'getUserList'
})
export class GetUserListPipe implements PipeTransform {

  transform(user: User): UserList {
    const userList: UserList = {
      email: user.email,
      phone: user.phone,
      full_name: user.first_name + ' ' + user.last_name
    }
    return userList;
  }
}
