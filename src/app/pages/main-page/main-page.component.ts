import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Personaje } from 'src/app/interfaces/Personaje';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  personajes: Personaje[] | undefined;
  personajesCopy: Personaje[] | undefined;
  constructor(
    public http: HttpClient
  ) {
    this.getData();
  }

  ngOnInit(): void {
  }

  async getData() {
    await this.http.get<any>(environment.apiUrl + "/character")
      .subscribe((res) => {
        this.personajes = res.results.map(({ char_id, name, image, gender, status, episode }: Personaje) => {
          return {
            char_id: char_id,
            name: name,
            image: image,
            gender: gender,
            status: status,
            episode: episode,
          };
        })
        this.personajesCopy = this.personajes;
      });

  }

  filter(e: any) {
    const search: string = e.target.value;
    console.log(e.target.value);
    this.personajes = this.personajesCopy?.filter(({ name }: Personaje) => {
      return name.toLowerCase().includes(search.toLowerCase());
    });
  }
}
