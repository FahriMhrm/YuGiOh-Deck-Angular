import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Observable, of } from "rxjs";

import { YugiohApiService } from "src/app/service/yugioh-api.service";
import { DeckService } from "src/app/service/deck.service";

@Component({
  selector: "app-add-card",
  templateUrl: "./add-card.component.html",
  styleUrls: ["./add-card.component.css"],
})
export class AddCardComponent implements OnInit {
  deckList$!: Observable<any[]>;
  deckForm!: FormGroup;

  constructor(
    private yugiohService: YugiohApiService,
    private deckService: DeckService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.deckList$ = this.deckService.getDeck();
    this.deckForm = this.formBuilder.group({
      cardName: [this.data.name],
      cardImage: [this.data.card_images[0].image_url],
      cardType: [this.data.type],
      cardCount: [""],
      deckListId: [],
    });
  }

  create() {
    if (this.deckForm.valid) {
      this.deckService.addCard(this.deckForm.value).subscribe({
        next: (ress) => {
          console.log(ress);
          this.deckForm.reset();
          this.dialogRef.close("save");
        },
        error: (ress) => {
          console.log(ress);
        },
      });
    }
  }
}
