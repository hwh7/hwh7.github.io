import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router"; 

import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav'

import { GtmService } from './gtm.service'; 

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    @ViewChild('sidenav') sidenav: MatSidenav;

    title = 'app';

    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;

    constructor(
        private router: Router, 
        private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        private gtmService: GtmService) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                // Each time we receive a NavigationEnd event, 
                // trigger an event called 'app.pageview' 
                // and pass along the current url 
                this.gtmService.trigger('app.pageview', {
                    'appUrl': event.urlAfterRedirects
                });
            }
        });
    }

    goToPage(addr: string) {
        this.router.navigateByUrl(addr);
        this.sidenav.toggle();
    }

    goToMain() {
        if (!this.sidenav.opened)
            this.router.navigateByUrl('/');
    }
}
