
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-assessments',
    templateUrl: './assessments.component.html',
    styleUrls: ['./assessments.component.scss']
})

export class AssessmentsComponent implements OnInit, OnDestroy {
    constructor(
      activatedRoute: ActivatedRoute,
      route: Router,
    ) { }

    ngOnInit() { }

    ngOnDestroy(): void {

    }
}
