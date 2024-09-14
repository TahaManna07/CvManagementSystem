import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CvService } from '../services/cv.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cv-edit',
  templateUrl: './cv-edit.component.html',
  styleUrls: ['./cv-edit.component.css']
})
export class CvEditComponent implements OnInit {
  cvForm!: FormGroup;
  cvId!: number;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cvService: CvService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cvId = Number(this.route.snapshot.paramMap.get('id'));
    this.initializeForm();
    this.loadCvDetails();
  }

  initializeForm() {
    this.cvForm = this.fb.group({
      full_name: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      technical_skills: [''],
      candidate_profile: ['']
    });
  }

  loadCvDetails() {
    this.cvService.getCvById(this.cvId).subscribe((response: any) => {
      if (response) {
        this.cvForm.patchValue(response);
      }
    });
  }
  save() {
    if (this.cvForm.valid) {
      this.cvService.updateCv(this.cvId, this.cvForm.value).subscribe(() => {
        this.snackBar.open('Les données ont été modifiées avec succès!', 'Fermer', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-container']
        });
        setTimeout(() => {
          this.router.navigate(['/list-cvs']); // Redirection vers la liste des CVs
        }, 3000); // Délai pour afficher le snackbar
      });
    }
  }

}
