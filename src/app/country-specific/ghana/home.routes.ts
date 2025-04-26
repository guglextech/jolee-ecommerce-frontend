import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./pages/index/index.component";

export const HomepageInRoutes: Routes = [
   {
      path: "",
      component : IndexComponent
   }
]