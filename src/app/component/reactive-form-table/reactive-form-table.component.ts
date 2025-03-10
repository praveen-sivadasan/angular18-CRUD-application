import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpsertUserFormComponent } from '../component/upsert-user-form/upsert-user-form.component';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { UpsertUserFormModule } from '../component/upsert-user-form/upsert-user-form.module';
import { ActivatedRoute } from '@angular/router';

interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  actions: string;
}

@Component({
  selector: 'app-reactive-form-table',
  templateUrl: './reactive-form-table.component.html',
  styleUrls: ['./reactive-form-table.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    UpsertUserFormModule,
    ReactiveFormsModule,
    ]
})
export class ReactiveFormTableComponent implements OnInit {

  protected usersFormArray: FormArray;

  constructor(private readonly userService: UserService,
              private readonly dialog: MatDialog,
              private readonly activatedRoute: ActivatedRoute,
              private readonly cdr: ChangeDetectorRef,
              private readonly fb:FormBuilder) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({data}) => {
      this.usersFormArray = this.fb.array(
        (data.users || []).map((user: User) => {
          return this.fb.group({
            id: new FormControl(user.id, Validators.required),
            firstName: new FormControl(user.firstName, Validators.required),
            lastName: new FormControl(user.lastName, Validators.required),
          });
        })
      );
    });
  }

  showEditUserForm(id: number) {
    const userControl: AbstractControl = this.usersFormArray.controls.find(u => u.get('id').value === id);
    this.dialog.open(UpsertUserFormComponent, {
      data: {
        user: {
          id: userControl.get('id').value,
          firstName: userControl.get('firstName').value,
          lastName: userControl.get('lastName').value,
        } as User,
      },
      height: '400px',
    }).afterClosed().subscribe((result: User) => {
      if (result) {
        // update user
        this.userService.updateUser(result);

        // Update the form array user
        userControl.get('firstName').setValue(result.firstName);
        userControl.get('lastName').setValue(result.lastName);

        this.cdr.detectChanges();
      }
    });
  }

  removeUser(id: number) {

  }

  showAddUserForm() {

  }
}
