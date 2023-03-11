
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-result-evaluation',
    templateUrl: './result-evaluation.component.html',
    styleUrls: ['./result-evaluation.component.scss']
})

export class ResultEvaluationComponent implements OnInit, OnDestroy {
    constructor(
      activatedRoute: ActivatedRoute,
      route: Router,
    ) { }

    ngOnInit() { }

    ngOnDestroy(): void {

    }
}
