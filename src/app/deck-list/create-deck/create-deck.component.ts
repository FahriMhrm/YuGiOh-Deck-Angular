import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs";

import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

import { MatDialog } from "@angular/material/dialog";

import { DeckService } from "src/app/service/deck.service";
import { ViewDeckComponent } from "../view-deck/view-deck.component";

@Component({
  selector: "app-create-deck",
  templateUrl: "./create-deck.component.html",
  styleUrls: ["./create-deck.component.css"],
})
export class CreateDeckComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  deckForm!: FormGroup;

  // Table Data
  displayedColumns: string[] = ["deckName", "options"];
  dataSource: any = null;
  // End of Table Data

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: DeckService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.deckForm = this.formBuilder.group({
      deckName: ["", Validators.required],
    });

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
    this.service.getDeck().subscribe({
      next: (response: any) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  create() {
    if (this.deckForm.valid) {
      this.service.addDeck(this.deckForm.value).subscribe({
        next: (res) => {
          this._snackBar.open("Deck berhasil ditambahkan", "Close", {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.deckForm.reset();
          this.getAllData();
        },
        error: (res) => {
          console.log(res);
          this._snackBar.open("Deck gagal ditambahkan", "Close", {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        },
      });
    }
  }

  delete(element: any) {
    if (confirm("Yakin ingin menghapus data?")) {
      this.service.deleteDeck(element.id).subscribe((result) => {
        this._snackBar.open("Data berhasil dihapus", "Close", {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getAllData();
      });
    }
  }

  viewDialog(element: any) {
    let dialogRef = this.dialog.open(ViewDeckComponent, {
      data: element,
      width: "100%",
    });
  }
}
