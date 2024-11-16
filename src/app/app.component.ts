import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UpsertUserFormComponent } from './component/upsert-user-form/upsert-user-form.component';

interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  actions: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public users: UserDto[];
  public userTableColumns = ['firstName', 'lastName', 'actions'];

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.users = this.getUsers();
  }

  public removeUser(user: UserDto) {
    this.userService.deleteUser(user.id);
    this.users = this.getUsers();
  }

  public showEditUserForm(user: UserDto) {
    this.dialog.open(UpsertUserFormComponent, {
      data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        } as User,
      },
    }).afterClosed().subscribe((result: User) => {
      if (result) {
        // update user
        this.userService.updateUser(result);
        this.users = this.getUsers();
      }
    });
  }

  private getUsers(): UserDto[] {
    return this.userService.getUsers().map((user) => {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        actions: ''
      };
    });
  }

  public showAddUserForm() {
    this.dialog.open(UpsertUserFormComponent).afterClosed().subscribe((result: User) => {
      if (result) {
        // add user
        this.userService.addUser(result);
        this.users = this.getUsers();
      }
    });
  }
}
