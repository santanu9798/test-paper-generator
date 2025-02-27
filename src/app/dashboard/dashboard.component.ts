import { Component } from '@angular/core';
import {HeaderComponent} from '../core/header/header.component';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {SidebarComponent} from '../core/sidebar/sidebar.component';
import {FooterComponent} from '../core/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    HeaderComponent,
    MatSidenavContainer,
    SidebarComponent,
    MatSidenavContent,
    MatSidenav,
    FooterComponent
  ],
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {}
