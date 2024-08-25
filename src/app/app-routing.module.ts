import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-404-page/error-page';

const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('./features/courses/courses.module').then(m => m.CoursesModule)
  },
  {
    path: 'instances',
    loadChildren: () => import('./features/instances/instances.module').then(m => m.InstancesModule)
  },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
