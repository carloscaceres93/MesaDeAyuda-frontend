import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { environment } from 'src/environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


//Components
import { LayoutComponent } from './paginas/componentes/layout/layout.component';
import { HeaderComponent } from './paginas/componentes/layout/header/header.component';
import { SidebarComponent } from './paginas/componentes/layout/sidebar/sidebar.component';
import { SpinnerComponent } from './shared/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Error404Component } from './paginas/componentes/error404/error404.component';
import { ServerErrorsInterceptor } from './shared/server-errors.interceptor';
import { InicioSesionComponent } from './paginas/componentes/inicio-sesion/inicio-sesion.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

export function tokenGetter() {
  return sessionStorage.getItem(environment.NOMBRE_TOKEN);
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    InicioSesionComponent,
    SpinnerComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PerfectScrollbarModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.HOST.substring(7)],
        disallowedRoutes: [`http://${environment.HOST.substring(7)}/login`],
      },
    }),
  ],
  providers: [
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorsInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
