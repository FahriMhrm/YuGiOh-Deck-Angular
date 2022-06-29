import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";

import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { LiveAnnouncer } from "@angular/cdk/a11y";

import { MatDialog } from "@angular/material/dialog";

import { YugiohApiService } from "../service/yugioh-api.service";
import { DeckDetailComponent } from "./deck-detail/deck-detail.component";
import { AddCardComponent } from "./add-card/add-card.component";

@Component({
  selector: "app-deck-list",
  templateUrl: "./deck-list.component.html",
  styleUrls: ["./deck-list.component.css"],
})
export class DeckListComponent implements OnInit {
  // Table Data
  displayedColumns: string[] = ["card_images", "name", "type", "detail"];
  dataSource: any = null;
  // End of Table Data

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: YugiohApiService,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.getAllData();
  }

  // Table Filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // End Of Table Filter

  // Sorting Table
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce("Sorting cleared");
    }
  }
  // End of sorting table

  getAllData() {
    this.service.getDeckList().subscribe({
      next: (response: any) => {
        this.dataSource = new MatTableDataSource(response.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  detailDialog(element: any) {
    let dialogRef = this.dialog.open(DeckDetailComponent, {
      data: element,
      width: "100%",
    });
  }

  addToDialog(element: any) {
    let dialogRef = this.dialog.open(AddCardComponent, {
      data: element,
      width: "100%",
    });
  }
}
