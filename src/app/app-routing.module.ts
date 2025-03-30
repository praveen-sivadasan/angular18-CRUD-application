import { RouterModule, Routes } from '@angular/router';
import { SimpleMatTableComponent } from './component/simple-mat-table/simple-mat-table.component';
import { NgModule } from '@angular/core';
import { simpleMatResolver } from './resolvers/simple-mat.resolver';
import { ReactiveFormTableComponent } from './component/reactive-form-table/reactive-form-table.component';

const routes: Routes = [
  {path: '', redirectTo: '/simple-mat-table', pathMatch: 'full'},
  {path: 'simple-mat-table', component: SimpleMatTableComponent, resolve: {data: simpleMatResolver}},
  {path: 'reactive-form-table', component: ReactiveFormTableComponent, resolve: {data: simpleMatResolver}}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
