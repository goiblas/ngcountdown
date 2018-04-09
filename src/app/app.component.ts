import { Component } from '@angular/core';

@Component({
  selector: 'ng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  now = Date.now() + 60 * 60 * 1000;
  end = Date.now() + 60 * 60 * 1000 + 12 * 1000;

  onCompleted() {
    console.log('completado');
  }
}
