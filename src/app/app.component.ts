import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-personal-blog-angular';
  showMenu: boolean = false;

  toggleMenu() {
  this.showMenu = !this.showMenu;
  }

}
