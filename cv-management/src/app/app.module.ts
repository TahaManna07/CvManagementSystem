import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UploadCvComponent } from './upload-cv/upload-cv.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatCard, MatCardContent, MatCardModule} from "@angular/material/card";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow,
  MatRowDef,
  MatTable, MatTableModule
} from "@angular/material/table";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {CvListComponent} from "./cv-list/cv-list.component";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatProgressSpinner, MatProgressSpinnerModule, MatSpinner} from "@angular/material/progress-spinner";
import { AboutComponent } from './about/about.component';
import {MatToolbar, MatToolbarModule, MatToolbarRow} from "@angular/material/toolbar";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import { CvEditComponent } from './cv-edit/cv-edit.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ChartComponent } from './chart/chart.component';
import {BarChartModule, NgxChartsModule} from "@swimlane/ngx-charts";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadCvComponent,
    CvListComponent,
    AboutComponent,
    CvEditComponent,
    ChartComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatCardContent,
    MatFormField,
    MatTableModule,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatInput,
    MatSortModule,
    MatHeaderCellDef,
    MatCellDef,
    MatButton,
    MatPaginatorModule,
    MatRowDef,
    MatHeaderRowDef,
    MatRow,
    MatHeaderRow,
    MatLabel,
    MatIconModule,
    MatInputModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatDrawerContainer,
    MatDrawer,
    MatToolbarRow,
    MatDrawerContent,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgxChartsModule,
    BarChartModule,

    // Ajoutez ceci

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
