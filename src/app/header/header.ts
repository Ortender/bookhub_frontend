import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  public router : Router = inject(Router);

}
