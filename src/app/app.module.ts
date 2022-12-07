import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputFormComponent } from './components/input-form/input-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CalculatorEffects } from './ngrx/calculator.effects';
import {
  calculatorFeatureKey,
  calculatorReducer,
} from './ngrx/calculator.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const reducers: ActionReducerMap<any> = {
  [calculatorFeatureKey]: calculatorReducer,
};
@NgModule({
  declarations: [AppComponent, InputFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([CalculatorEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
