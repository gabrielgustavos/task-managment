import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToggleStandaloneComponent } from './toggle-standalone.component';
import { ToggleComponent } from './toggle.component';

@NgModule({
  declarations: [ToggleComponent, ToggleStandaloneComponent],
    exports: [ToggleComponent, ToggleStandaloneComponent],
    imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ToggleModule {}
