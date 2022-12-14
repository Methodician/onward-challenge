import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { submitBucketInput } from 'src/app/ngrx/calculator.actions';
import { setHeaderText } from 'src/app/ngrx/header.actions';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
})
export class InputFormComponent {
  inputForm = this.fb.nonNullable.group({
    bucketA: [0, [Validators.min(1), Validators.max(99)]],
    bucketB: [0, [Validators.min(1), Validators.max(99)]],
    targetVolume: [0, [Validators.min(1), Validators.max(99)]],
  });

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.store.dispatch(setHeaderText({ headerText: 'Water Jug Problem' }));
  }

  onSubmit() {
    this.store.dispatch(submitBucketInput(this.inputForm.getRawValue()));
  }
}
