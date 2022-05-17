import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sistema de Cadastro';

  constructor(private auth: AuthService) {}

  async logout() {
    await this.auth.logout();
  }
}
