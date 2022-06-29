import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class YugiohApiService {
  readonly apiUrl = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
  constructor(private http: HttpClient) {}

  // Yugioh API
  getDeckList(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl);
  }

  getCardInfo(name: number | string): Observable<any> {
    return this.http.get<any>(this.apiUrl + `?name=${name}`);
  }
}
