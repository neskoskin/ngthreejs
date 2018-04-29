import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MenubarComponent } from './menubar/menubar.component';
import { SceneComponent } from './scene/scene.component';
import { Image2dComponent } from './image2d/image2d.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthguardService } from './service/authguard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthguardService],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'image360', component: SceneComponent, canActivate: [AuthguardService], },
      { path: 'image2d', component: Image2dComponent, canActivate: [AuthguardService], },
    ]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    SceneComponent,
    Image2dComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
