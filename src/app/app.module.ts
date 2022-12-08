import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputFormComponent } from './components/input-form/input-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
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

const reducers: ActionReducerMap<any> = {
  [calculatorFeatureKey]: calculatorReducer,
  [headerFeatureKey]: headerReducer,
};
@NgModule({
  declarations: [AppComponent, InputFormComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([CalculatorEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
