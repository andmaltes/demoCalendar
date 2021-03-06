import { Reminder } from './../../../../redux/interface';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import * as moment from 'moment';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent {
  reminderForm: FormGroup;
  color = '#131d9f';
  /*2019/05/14
    Demo of cities. It should be pulled from a backend application with the proper
    filtering.

  */
  cityList = ['Bogota,CO', 'Lima,PE', 'Miami Beach,US', 'New York,US'];
  selectedCity: string;
  /*
  2019/05/10
Updates forms color value
Andrés Maltés
*/
  changeColor(event: string) {
    this.reminderForm.controls.color.setValue(event);
  } /*
  2019/05/09
Reading the data injected by the parent component and initializating the form
with it
Andrés Maltés
*/
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ReminderComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    if (data.reminder) {
      this.color = data.reminder.color;
      this.reminderForm = this.formBuilder.group({
        date: [data.reminder.date, Validators.required],
        reminder: [
          data.reminder.reminder,
          [Validators.required, Validators.maxLength(30)]
        ],
        city: [data.reminder.city, Validators.required],
        color: [this.color, Validators.required]
      });
    } else {
      this.reminderForm = this.formBuilder.group({
        date: [data.date, Validators.required],
        reminder: ['', [Validators.required, Validators.maxLength(30)]],
        city: ['', Validators.required],
        color: [this.color, Validators.required]
      });
    }
  }
  /*
  2019/05/08
Closes the window and send the information back to the calendar component
Andrés Maltés
*/
  save() {
    const reminder: Reminder = {
      date: moment(this.reminderForm.controls.date.value),
      reminder: this.reminderForm.controls.reminder.value,
      city: this.reminderForm.controls.city.value,
      color: this.reminderForm.controls.color.value
    } as Reminder;

    this.dialogRef.close(reminder);
  }
  close() {
    this.dialogRef.close();
  }

  cityClick(event: any) {
    this.selectedCity = event.option.value;
  }
  /*2019/05/15
Force the selection of any of the cities
*/
  checkCity() {
    if (
      !this.selectedCity ||
      this.selectedCity !== this.reminderForm.controls['city'].value
    ) {
      this.reminderForm.controls['city'].setValue(null);
      this.selectedCity = '';
    }
  }
}
