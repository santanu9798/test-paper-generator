import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Question} from '../dashboard/view-questions/view-questions.component';

@Component({
  selector: 'app-edit-question-dialog',
  templateUrl: './edit-question-dialog.component.html',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    FormsModule,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatLabel
  ],
  styleUrls: ['./edit-question-dialog.component.scss']
})
export class EditQuestionDialogComponent {
  optionsString: string;

  constructor(
    public dialogRef: MatDialogRef<EditQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Question
  ) {
    this.optionsString = this.data.options.join(', ');
  }

  updateOptions(): void {
    this.data.options = this.optionsString.split(',').map(opt => opt.trim());
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.updateOptions(); // Ensure options are updated before saving
    this.dialogRef.close(this.data);
  }
}
