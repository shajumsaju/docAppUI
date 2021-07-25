import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAppoinmentComponent } from './slot/add-appoinment/add-appoinment.component';
import { ListAppoinmentComponent } from './slot/list-appoinment/list-appoinment.component';


const routes: Routes = [

  /* for listing */
  {path:'list',component:ListAppoinmentComponent},
  /* for intial loading  */
  {path:'',component:ListAppoinmentComponent},
  /* for adding  */
  {path:'add',component:AddAppoinmentComponent},
  /* wild card routing */
  {path:'**',component:ListAppoinmentComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
