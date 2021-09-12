import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SnipperComponent implements OnInit {

  color = 'warn';
  mode = 'determinate';
  value = 50;

  constructor() { }

  ngOnInit(): void {
  }

}
