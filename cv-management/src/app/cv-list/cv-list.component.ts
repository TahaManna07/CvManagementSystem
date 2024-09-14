import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CvService } from '../services/cv.service';

@Component({
  selector: 'app-cv-list',
  templateUrl: './cv-list.component.html',
  styleUrls: ['./cv-list.component.css']
})
export class CvListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['full_name', 'email_address', 'phone_number', 'technical_skills', 'candidate_profile', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  selectedCV: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cvService: CvService) {}

  ngOnInit(): void {
    this.cvService.getCVs().subscribe((response: any) => {
      this.dataSource.data = response.cvs;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewCVDetails(cv: any) {
    this.selectedCV = cv;
  }

  deleteCV(cvId: number) {
    if (confirm('Are you sure to delete this CV?')) {
      this.cvService.deleteCV(cvId).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(cv => cv.id !== cvId);
      });
    }
  }

  downloadPDF(cvId: number) {
    const url = `http://localhost:5000/cv/${cvId}/pdf`;
    window.open(url, '_blank');
  }
}
