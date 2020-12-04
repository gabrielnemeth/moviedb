import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MediaService } from '../../services/media.service';
import { Person } from '../../interfaces/person';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss'],
})
export class PersonDetailComponent implements OnInit {
  public mediaItem$: Observable<Person>;

  constructor(
    private route: ActivatedRoute,
    private movieService: MediaService
  ) {}

  ngOnInit(): void {
    const mediaItemId = this.route.snapshot.paramMap.get('id') || '';
    this.mediaItem$ = this.movieService.getPersonById(mediaItemId);
  }

  public getStyle(
    imagePath: string | null
  ): {
    [klass: string]: any;
  } {
    return {
      'background-image': `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${imagePath})`,
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
      'background-color': 'black',
    };
  }

  public getYear(date: string): string {
    return new Date(date).getFullYear().toString();
  }
}
