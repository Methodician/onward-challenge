import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputFormComponent } from './components/input-form/input-form.component';
import { ResultsComponent } from './components/results/results.component';

const routes: Routes = [
  {
    path: '',
    component: InputFormComponent,
  },
  {
    path: 'results',
    component: ResultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
