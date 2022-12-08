import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputFormComponent } from './components/input-form/input-form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CalculatorEffects } from './ngrx/calculator.effects';
import {
  calculatorFeatureKey,
  calculatorReducer,
} from './ngrx/calculator.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HeaderComponent } from './components/header/header.component';
import { headerFeatureKey, headerReducer } from './ngrx/header.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultsComponent } from './components/results/results.component';

const reducers: ActionReducerMap<any> = {
  [calculatorFeatureKey]: calculatorReducer,
  [headerFeatureKey]: headerReducer,
};
@NgModule({
  declarations: [AppComponent, InputFormComponent, HeaderComponent, ResultsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([CalculatorEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
