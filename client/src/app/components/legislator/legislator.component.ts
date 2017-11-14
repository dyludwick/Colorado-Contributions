import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-legislator',
  templateUrl: './legislator.component.html',
  styleUrls: ['./legislator.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LegislatorComponent implements OnInit {
  candidate: Legislator[];
  industries: Industry[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DataService
  ) { }

  ngOnInit() {
    this.candidate = this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.service.getLegislators().subscribe((data) => {
          return data.legislators.filter((legislator) => {
            if (params.get('cid') == legislator.cid) {
              return legislator;
            }
          });
        });
      });
      console.log(this.candidate);
  }

}

interface Legislator {
  cid: string,
  firstlast: string,
  party: string,
  gender: string,
  elected: string
}

interface Industry {
  code: string,
  name: string,
  indivs: string,
  pacs: string,
  total: string
}
