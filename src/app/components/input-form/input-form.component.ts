import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { submitBucketInput } from 'src/app/ngrx/calculator.actions';

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

  constructor(private store: Store, private fb: FormBuilder) {
    this.inputForm.valueChanges.subscribe(console.log);
  }

  onSubmit() {
    console.log('submitted');
    if (this.inputForm.invalid) {
      return;
    }

    this.store.dispatch(submitBucketInput(this.inputForm.getRawValue()));
  }
}
