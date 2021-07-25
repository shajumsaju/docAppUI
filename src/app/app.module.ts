import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddAppoinmentComponent } from './slot/add-appoinment/add-appoinment.component';
import { ListAppoinmentComponent } from './slot/list-appoinment/list-appoinment.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddAppoinmentComponent,
    ListAppoinmentComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    Ng2SmartTableModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
