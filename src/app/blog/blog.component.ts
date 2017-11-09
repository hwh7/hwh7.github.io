import { Component, ElementRef, ViewChild, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Event, Router, NavigationEnd } from '@angular/router';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';

import { ArticleStore } from './articlestore';
import { Article } from './article';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) { }
    transform(value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

    @ViewChild('container') container: ElementRef;

    articles: Array<Article>;
    article: Article;
    idx: number;
    metaDesc: HTMLMetaElement;

    private style = `
    <style>
    pre {
        background-color: #eff0f1;
        padding: 10px;
        white-space: pre-wrap;
        word-break: break-all;
    }

    img {
        margin-top: 10px;
        width: 100%;
    }

    p {
        margin: 5px 0px;
    }

    h1 {
        font-size: 1.5em;
    }

    a {
        color: #6f80d8;
        text-decoration: none;
    }

    a:visited {
    }

    </style>
    `;

    public content: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private title: Title,
        private meta: Meta,
        private elementRef: ElementRef,
    ) {
        router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.articles = (new ArticleStore()).articles;
                let title = this.route.snapshot.params['title'];

                if (title) {
                    title = title.replace(/-/g, ' ');
                    this.idx = this.articles.findIndex(x => x.title === title);
                    this.article = this.articles[this.idx];

                    this.title.setTitle(`hwh's blog: ${this.article.title}`);
                    if (this.metaDesc) {
                        this.meta.updateTag({ name: 'Description', content: this.article.content.substring(0, 50) });
                    } else {
                        this.metaDesc = this.meta.addTag({ name: 'Description', content: this.article.content.substring(0, 50) });
                    }
                } else {
                    this.idx = 0;
                    this.article = this.articles[this.idx];

                    this.title.setTitle(`hwh's blog`);
                    this.meta.removeTagElement(this.metaDesc);
                    this.metaDesc = undefined;
                }

                this.content = this.style + this.article.content;

                window.scrollTo(0, 0);
            }
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        let s = document.createElement("script") as HTMLElement;
        s.setAttribute('type', 'text/javascript');
        s.setAttribute('src', 'https://utteranc.es/client.js');
        s.setAttribute('repo', 'hwh7/hwh7.github.io');
        s.setAttribute('issue-term', 'url');
        this.container.nativeElement.appendChild(s);
    }

    goToPrevArticle() {
        this.idx--;
    }

    goToNextArticle() {
        this.idx++;
    }
}
