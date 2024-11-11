import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone:true,
  imports:[RouterOutlet, HeaderComponent]
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
  }
}
