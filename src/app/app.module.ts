import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CoursesModule } from './features/courses/courses.module';
import { InstancesModule } from './features/instances/instances.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { withFetch } from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoursesModule,
    InstancesModule,
    HttpClientModule,
    FontAwesomeModule,
    MatTooltipModule,
    CoursesModule,
    InstancesModule,
    MatDialogModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    {
      provide: MatDialogRef,
      useValue: {
        close: (dialogResult: any) => { }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
