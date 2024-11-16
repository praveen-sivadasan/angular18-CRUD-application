import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface UserFormData {
  user: User
}

@Component({
  selector: 'app-upsert-user-form',
  templateUrl: './upsert-user-form.component.html',
  styleUrls: ['./upsert-user-form.component.scss']
})
export class UpsertUserFormComponent {

  public userForm = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl('', [
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(
    public dialogRef: MatDialogRef<UpsertUserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserFormData) {
    if(data?.user) {
      this.userForm.get('id').setValue(data.user.id);
      this.userForm.get('firstName').setValue(data.user.firstName);
      this.userForm.get('lastName').setValue(data.user.lastName);
    }
  }

  public saveUser() {
    this.dialogRef.close(this.userForm.value);
  }
}
