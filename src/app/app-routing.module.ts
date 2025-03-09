import { RouterModule, Routes } from '@angular/router';
import { SimpleMatTableComponent } from './component/simple-mat-table/simple-mat-table.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path: '', redirectTo: '/simple-mat-table', pathMatch: 'full'},
  {path: 'simple-mat-table', component: SimpleMatTableComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
