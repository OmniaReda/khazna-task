import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { companyRegistration } from './companyRegistration/companyRegistration.component';
import { dataOfEmployee } from './dataOfEmployee/dataOfEmployee.component'

const routes: Routes = [
  { path: '',  pathMatch:'full', redirectTo: '/companyRegistration' },
  { path: 'dataOfEmployee', component: dataOfEmployee},
  { path: 'companyRegistration',  component: companyRegistration },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static components = [ companyRegistration, dataOfEmployee ];

 }
