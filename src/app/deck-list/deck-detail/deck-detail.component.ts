import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Observable, of } from "rxjs";

import { YugiohApiService } from "src/app/service/yugioh-api.service";

@Component({
  selector: "app-deck-detail",
  templateUrl: "./deck-detail.component.html",
  styleUrls: ["./deck-detail.component.css"],
})
export class DeckDetailComponent implements OnInit {
  // Table Data
  displayedColumns: string[] = [
    "card_images",
    "name",
    "type",
    "archetype",
    "desc",
    "atk",
    "def",
    "level",
    "attribute",
  ];
  dataSource: any = null;
  // End of Table Data

  constructor(
    private service: YugiohApiService,
    private dialogRef: MatDialogRef<DeckDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.opt == "view") {
      this.getDetailDataView();
    } else {
      this.getDetailDataIndex();
    }
  }

  getDetailDataIndex() {
    this.service.getCardInfo(this.data.name).subscribe({
      next: (response: any) => {
        this.dataSource = new MatTableDataSource(response.data);
      },
    });
  }

  getDetailDataView() {
    this.service.getCardInfo(this.data.element.cardName).subscribe({
      next: (response: any) => {
        this.dataSource = new MatTableDataSource(response.data);
      },
    });
  }
}
