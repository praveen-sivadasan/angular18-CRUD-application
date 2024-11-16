import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserNameComponent } from './component/user-name/user-name.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { UpsertUserFormModule } from './component/upsert-user-form/upsert-user-form.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    UserNameComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    UpsertUserFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
