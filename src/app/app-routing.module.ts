import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './features/courses/course-list/course-list.component';
import { CourseCreateComponent } from './features/courses/course-create/course-create.component';
import { CourseDetailComponent } from './features/courses/course-detail/course-detail.component';
import { InstanceListComponent } from './features/instances/instance-list/instance-list.component';
import { InstanceCreateComponent } from './features/instances/instance-create/instance-create.component';
import { InstanceDetailComponent } from './features/instances/instance-detail/instance-detail.component';

const routes: Routes = [
  { path: 'courses', component: CourseListComponent },
  { path: 'create/new', component: CourseCreateComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'instances', component: InstanceListComponent },
  { path: 'instances/create', component: InstanceCreateComponent },
  { path: 'instances/:year/:semester/:id', component: InstanceDetailComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
