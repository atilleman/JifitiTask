import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/services/users-service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { User } from 'src/app/model/users';
import { UserList } from 'src/app/model/usersList';
import { GetUserListPipe } from 'src/app/pipes/get-user-list.pipe';

@Component({
  selector: 'app-users-List',
  templateUrl: './users-List.component.html',
  styleUrls: ['./users-List.component.scss']
})

export class UsersListComponent implements OnInit  {

  @ViewChild(AddEditUserComponent) taskCardComponent: AddEditUserComponent;
  displayedColumns: string[] = ['full_name', 'email', 'phone', 'actions'];
  dataSource: MatTableDataSource<any>;
  editedUser: UserList[] = [];
  allUsers:  User[] = [];

  constructor(public usersService: UsersService, public dialog: MatDialog, private userList: GetUserListPipe) { }

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    this.allUsers = await this.usersService.getUsersList().map(item => {
      this.editedUser.push(this.userList.transform(item));
      return item;
    });
    if (this.editedUser.length > 0) {
      this.dataSource = new MatTableDataSource(this.editedUser);
    }
  }

  openEditDialog(user: UserList): void {
    const myData = this.allUsers.filter(item => item.email == user.email);
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      data: myData[0],
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      const updatedUser = this.userList.transform(result);
      let indexToUpdate = this.editedUser.findIndex(item => item.email === updatedUser.email);
      this.allUsers[indexToUpdate] = result;
      this.editedUser[indexToUpdate] = updatedUser;
      this.dataSource = new MatTableDataSource(this.editedUser);
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEditUserComponent, {disableClose: true});

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        this.allUsers.push(result);
        const updatedUser = this.userList.transform(result);
        this.editedUser.push(updatedUser);
        this.dataSource = new MatTableDataSource(this.editedUser);
      }
    });
  }
}
