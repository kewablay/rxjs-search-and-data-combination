import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponentComponent } from "./search-component/search-component.component";
import { DataCombinationComponent } from "./data-combination/data-combination.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchComponentComponent, DataCombinationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  
}