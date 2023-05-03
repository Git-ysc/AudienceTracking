import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AudTrackingUI';

  ngOnInit (){
    this.toggleActive('monitoring');
  }

  toggleActive(id: string) {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item: Element) => {
      if (item.getAttribute("id") === id) {
        item.classList.add("activeNavigation");
      } else {
        item.classList.remove("activeNavigation");
      }
    });
  }

}
