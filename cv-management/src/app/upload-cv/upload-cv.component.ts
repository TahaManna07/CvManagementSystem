import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-cv',
  templateUrl: './upload-cv.component.html',
  styleUrls: ['./upload-cv.component.css']
})
export class UploadCvComponent {
  selectedFile: File | null = null;
  extractedData: any = null;
  error: string | null = null;
  loading: boolean = false;  // Ajout de l'état de chargement

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      this.loading = true;  // Commence le chargement
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.http.post<any>('http://localhost:5000/', formData).subscribe(
        response => {
          this.extractedData = response;
          this.error = null;
          this.loading = false;  // Terminer le chargement
        },
        error => {
          console.error('Erreur lors de l\'upload du fichier', error);
          this.error = 'Erreur lors de l\'upload du fichier';
          this.extractedData = null;
          this.loading = false;  // Terminer le chargement
        }
      );
    }
  }
}
