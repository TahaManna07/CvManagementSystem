import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvListComponent } from './cv-list/cv-list.component';
import { UploadCvComponent } from './upload-cv/upload-cv.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CvEditComponent } from './cv-edit/cv-edit.component';
import {ChartComponent} from "./chart/chart.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'upload', component: UploadCvComponent },
  { path: 'list-cvs', component: CvListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'cvs/edit/:id', component: CvEditComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirection par défaut vers la page d'accueil
  { path: 'chart', component : ChartComponent } ,
// Gestion des routes non trouvées

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
