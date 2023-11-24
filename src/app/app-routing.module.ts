import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { FormComponent } from './form/form.component';
import { AuthGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'userList', component: UserListComponent ,canActivate: [AuthGuard]},
  { path: '',component: FormComponent },
  { path: 'form',component: FormComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
