
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-result-evaluation',
    templateUrl: './result-evaluation.component.html',
    styleUrls: ['./result-evaluation.component.scss']
})

export class ResultEvaluationComponent implements OnInit, OnDestroy {
   /**
     * to store all nav links
    */
    navLinks: any[];
    /**
     * to store selected link value
    */
    activeLink: string;

    constructor(
      activatedRoute: ActivatedRoute,
      private router: Router,
    ) { 
      this.navLinks = [
        {
            label: 'Pending',
            path: '/pendingForEvaluation/1',
            index: 0
        }, {
            label: 'All',
            path: '/all/1',
            index: 1
        }
    ];
    this.activeLink= "/all/1";
    }

    ngOnInit() { }

    navigateToLink(selectedLink: string) {
      this.activeLink = selectedLink;
      this.router.navigate(['workspace/content/resultEvaluation'+ selectedLink]);
    }

    ngOnDestroy(): void {

    }
}
