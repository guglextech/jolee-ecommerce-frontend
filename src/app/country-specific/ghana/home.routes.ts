import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./pages/index/index.component";
import { CartComponent } from "./pages/cart/cart.component";

export const HomepageInRoutes: Routes = [
   {
      path: "",
      component : IndexComponent
   },
   {
      path: "cart",
      component : CartComponent
   }
]