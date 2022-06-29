import { Routes } from "@angular/router";
import { CreateDeckComponent } from "./deck-list/create-deck/create-deck.component";
import { DeckListComponent } from "./deck-list/deck-list.component";

import { FullComponent } from "./layouts/full/full.component";

export const AppRoutes: Routes = [
  {
    path: "",
    component: FullComponent,
    children: [
      {
        path: "",
        redirectTo: "/dashboard",
        pathMatch: "full",
      },
      {
        path: "deck-list",
        component: DeckListComponent,
      },
      {
        path: "create-deck",
        component: CreateDeckComponent,
      },
      {
        path: "",
        loadChildren: () =>
          import("./material-component/material.module").then(
            (m) => m.MaterialComponentsModule
          ),
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
      },
    ],
  },
];
