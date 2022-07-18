import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

export interface itensMenu {
  name: string;
  link?: string;
  icon?: string;
  tooltip?: string;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLogged: boolean = false;
  emailLogged = this.authService.getUser();

  itensMenu: itensMenu[] = [
    {
      name: 'Perfil',
      link: '/profile',
      icon: 'person',
      tooltip: this.emailLogged as string
    },
    {
      name: 'Sair',
      link: '/login',
      icon: 'logout',
      tooltip: 'Sair do sistema'
    }
  ];


  

  constructor(private authService: AuthService, public router: Router,) { }

  ngOnInit(): void {
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
