import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./header/navbar/header/header.component";

@Component({
  imports: [RouterModule, HeaderComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Malafaty';
    
}




