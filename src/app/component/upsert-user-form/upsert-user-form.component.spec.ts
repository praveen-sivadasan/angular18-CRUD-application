import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertUserFormComponent } from './upsert-user-form.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MockModule } from 'ng-mocks';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

describe('UpsertUserFormComponent', () => {
  let component: UpsertUserFormComponent;
  let fixture: ComponentFixture<UpsertUserFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpsertUserFormComponent],
      imports: [
        MockModule(ReactiveFormsModule),
        MockModule(MatDialogModule),
        MockModule(MatFormFieldModule),
        MockModule(MatInputModule)
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: MatDialogRef,
          useValue: {}
        },
      ]
    });
    fixture = TestBed.createComponent(UpsertUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
