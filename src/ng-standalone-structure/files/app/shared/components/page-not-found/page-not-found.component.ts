import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: "app-page-not-found",
  templateUrl: "./page-not-found.component.html",
  styleUrl: "./page-not-found.component.scss",
  standalone: true,
  imports: [RouterLink],
})
export class PageNotFoundComponent {
  constructor(private router: Router) {}
  onRouteHomePage() {
    this.router.navigate(["/"]);
  }
}
