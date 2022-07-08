import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLogged: boolean = false;

  constructor(private authService: AuthService, public router: Router,) { }

  ngOnInit(): void {
   /*  fromEvent(document, 'click').subscribe((e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('user')) {
        console.log(this.authService.getUser());
      }
    }) */

    this.authService.getUser() ? this.isLogged = true : this.isLogged = false;
  }

  logout() {
    this.authService
      .logout()
      .then(() => {
        console.log('logout');
        
        this.router.navigate(['/home']);
      })
      .catch(() => {
        console.log('Erro ao fazer logout');
      });
  }

  navigatorLogin() {
    this.router.navigate(['/login']);
  }
  

}
