import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpsertUserFormComponent } from '../component/upsert-user-form/upsert-user-form.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { UpsertUserFormModule } from '../component/upsert-user-form/upsert-user-form.module';
import { ActivatedRoute } from '@angular/router';

interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  actions: string;
}

@Component({
  selector: 'app-simple-mat-table',
  templateUrl: './simple-mat-table.component.html',
  styleUrls: ['./simple-mat-table.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    MatDialogModule,
    UpsertUserFormModule,
    ]
})
export class SimpleMatTableComponent implements OnInit {

  public users: UserDto[];
  public userTableColumns = ['firstName', 'lastName', 'actions'];

  constructor(private readonly userService: UserService,
              private readonly dialog: MatDialog,
              private readonly activatedRoute: ActivatedRoute,
              private readonly cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({data}) => {
      this.users = (data.users || []).map((user: User) => {
       return {
         id: user.id,
         firstName: user.firstName,
         lastName: user.lastName,
         actions: ''
       };
      });
    });
  }

  public removeUser(user: UserDto) {
    this.userService.deleteUser(user.id);
    this.users = this.users.filter(u => u.id !== user.id);
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

        const updatedUser = this.users.find(u => u.id === result.id);
        updatedUser.firstName = result.firstName;
        updatedUser.lastName = result.lastName;
        updatedUser.actions = '';
      }
    });
  }

  public showAddUserForm() {
    this.dialog.open(UpsertUserFormComponent).afterClosed().subscribe((result: User) => {
      if (result) {
        // add user
        this.userService.addUser(result);
        this.users.push({
          id: result.id,
          firstName: result.firstName,
          lastName: result.lastName,
          actions: ''
        });
        this.cdr.detectChanges();
      }
    });
  }
}
