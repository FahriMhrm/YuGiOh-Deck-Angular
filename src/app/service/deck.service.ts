import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DeckService {
  readonly apiUrl = "https://localhost:7271/api";
  constructor(private http: HttpClient) {}

  // DeckList API
  getDeck(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl + "/decks");
  }

  getDeckId(id: number | string): Observable<any> {
    return this.http.get(this.apiUrl + `/decks/${id}`);
  }

  addDeck(data: any) {
    return this.http.post(this.apiUrl + "/decks", data);
  }

  updateDeck(id: number | string, data: any) {
    return this.http.put(this.apiUrl + `/decks/${id}`, data);
  }

  deleteDeck(id: number | string) {
    return this.http.delete(this.apiUrl + `/decks/${id}`);
  }

  // CardList API
  getCard(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl + "/cards");
  }

  getCardId(id: number | string): Observable<any> {
    return this.http.get(this.apiUrl + `/cards/${id}`);
  }

  getJoinDeck(id: number | string): Observable<any[]> {
    return this.http.get<any>(this.apiUrl + `/cards/joindeck/${id}`);
  }

  addCard(data: any) {
    return this.http.post(this.apiUrl + "/cards", data);
  }

  updateCard(id: number | string, data: any) {
    return this.http.put(this.apiUrl + `/cards/${id}`, data);
  }

  deleteCard(id: number | string) {
    return this.http.delete(this.apiUrl + `/cards/${id}`);
  }
}
