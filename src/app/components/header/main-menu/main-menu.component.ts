import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html'
})
export class MainMenuComponent implements OnInit {
  pageTitle = 'CRM';


  constructor(private router: Router) { }

  ngOnInit() {
  }
}
