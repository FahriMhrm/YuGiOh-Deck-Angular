import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Observable, of } from "rxjs";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

import { DeckService } from "src/app/service/deck.service";
import { DeckDetailComponent } from "../deck-detail/deck-detail.component";

@Component({
  selector: "app-view-deck",
  templateUrl: "./view-deck.component.html",
  styleUrls: ["./view-deck.component.css"],
})
export class ViewDeckComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  // Table Data
  displayedColumns: string[] = [
    "card_images",
    "name",
    "type",
    "count",
    "options",
  ];
  dataSource: any = null;
  // End of Table Data

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: DeckService,
    private dialogRef: MatDialogRef<ViewDeckComponent>,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
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
    this.service.getJoinDeck(this.data.id).subscribe({
      next: (response: any) => {
        this.dataSource = new MatTableDataSource(response);
      },
    });
  }

  delete(element: any) {
    if (confirm("Yakin ingin menghapus data?")) {
      this.service.deleteCard(element.id).subscribe((result) => {
        this._snackBar.open("Data berhasil dihapus", "Close", {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getAllData();
      });
    }
  }

  detailDialog(element: any) {
    let dialogRef = this.dialog.open(DeckDetailComponent, {
      data: { element, opt: "view" },
      width: "100%",
    });
  }
}
