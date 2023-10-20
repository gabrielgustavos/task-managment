import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { TreeFormGroup } from './tree.form';

const fb = new FormBuilder();

export class BoardFormGroup extends TreeFormGroup {
  get name(): FormControl {
    return this.get('name') as FormControl;
  }

  constructor() {
    super({
      name: fb.control('', [Validators.required]),
      columns: fb.array([]),
    });
  }

  get columns(): FormArray {
    return this.get('columns') as FormArray;
  }

  createColumn(): FormControl {
    return fb.control('', [Validators.required]);
  }
}
