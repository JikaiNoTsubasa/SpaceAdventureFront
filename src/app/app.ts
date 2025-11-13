import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DateLoadingBar } from './comps/date-loading-bar/date-loading-bar';

@Component({
  selector: 'app-root',
  imports: [ DateLoadingBar ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'SpaceAdventureFront';
  today = new Date();

  ngOnInit(){
    /*
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'scripts/display_test.js';
    document.body.appendChild(script);
    */
  }
}
