import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstanceListComponent } from './instance-list/instance-list.component';
import { InstanceCreateComponent } from './instance-create/instance-create.component';
import { InstanceDetailComponent } from './instance-detail/instance-detail.component';

const routes: Routes = [
  { path: '', component: InstanceListComponent },
  { path: 'create', component: InstanceCreateComponent },
  { path: ':year/:semester/:id', component: InstanceDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstanceRoutingModule { }
