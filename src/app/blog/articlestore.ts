import { Article } from './article';

export class ArticleStore {
    constructor() {
    }

    public articles: Array<Article> = [
        new Article('Angular로 만든 웹앱을 Github pages로 배포하기',
            `
            요즘 <a href="https://pages.github.com/">Github pages</a>를 이용해서 블로그를 만드는 게 유행입니다. 개발 이력이 남아있는 Github 계정과 함께 관리할 수 있는 이점도 있고, <a href="https://jekyllrb-ko.github.io/">Jekyll</a> 같은 정적 블로그 생성툴을 이용하면 쉽게 블로그를 만들고 배포할 수 있다는 것도 한몫하는 거 같습니다. Github pages는 블로그 뿐만 아니라 정적 웹사이트 구축에 이용할 수도 있습니다. 이번 글에서는 요즘 핫한 <a href="https://angular.io/">Angular</a>를 이용해서 정적 웹사이트를 만들고 배포하는 방법을 알아보겠습니다. 개인적으로 Angular는 Github을 이용한 정적 웹사이트 구축에 몇 가지 이점이 있다고 생각합니다.
<ol>
    <li>Angular는 웹페이지를 웹 브라우저가 그리는 클라이언트 사이드 렌더링을 이용한다.
    <p>서버가 웹페이지를 그리는 방식이 서버 사이드 렌더링, 웹브라우저가 웹페이지를 그리는 방식이 클라이언트 사이드 렌더링입니다. 서버 사이드 렌더링을 이용할 경우엔 HTML, CSS를 동적으로 생성해줄 서버가 필수이기 때문에 정적 웹사이트 구축이 불가능합니다. 반면 클라이언트 사이드 렌더링을 하는 Angular는 서버가 필요없기 때문에 정적 웹사이트 구축에 적합하죠.</p>
</li>
    <li>Angular는 <a href="https://en.wikipedia.org/wiki/Single-page_application">SPA (Single Page Application)</a> 개발을 위해 만들어진 프레임워크이다.
    <p>서버가 없는 정적 웹사이트는 모든 것이 웹 브라우저에서 모든 것이 이루어져야 한다. SPA도 서버에서 필요한 데이터를 주고받는 경우를 제외하고는 모든 것을 웹 브라우저에서 일어난다.</p>
</li>
    <li>Github pages로  쉽게 배포할 수 있는 <a href="https://www.npmjs.com/package/angular-cli-ghpages">angular-cli-ghpages</a> 패키지가 존재한다.</li>
</ol>
<h1> Angular CLI 설치하기</h1>
Angular는 Angular CLI라고 하는 툴을 이용해서 프로젝트를 생성/관리합니다. npm을 이용해서 간단하게 설치할 수 있습니다.
<pre>npm install -g @angular/cli</pre>
<h1>새로운 Angular project 생성 & 테스트</h1>
<pre>ng new blog
cd blog
ng serve</pre>
ng serve를 실행한 후에는 <a href="http://localhost:4200/">http://localhost:4200/</a>에 접속해서 현재 개발 중인 웹사이트를 테스트해볼 수 있습니다.
<img src="/assets/1/localhost.png">
브라우저창에서 접속한 화면
<h1>angular-cli-ghpages 설치하기</h1>
<pre>npm i angular-cli-ghpages --save
git add *
git commit -s -m "add angular-cli-ghpages"</pre>
<h1>Github pages에 배포하기</h1>
<pre>git remote add origin git@github.com:[GITHUB_ID]/[GITHUB_ID].github.io.git
ngh -b master</pre>
<h1>Github pages에 배포된 결과 확인하기</h1>
https://[GITHUB_ID].github.io 에 접속하셔서, 아래와 같은 그림이 보이면 정상적으로 배포가 된 상황입니다.
<img src="/assets/1/hwh7-github-io.png">
브라우저창에서 접속한 화면 (<a href="http://localhost:4200/">http://localhost:4200/</a>으로 접속한 경우와 똑같은 화면이 잘 나오고 있는 걸 볼 수 있습니다)
<h1>소스코드를 동일한 Github Repository에 저장하기</h1>
아래와 같은 명령으로 Angular 프로젝트 소스코드를 동일한 저장소에 저장할 수 있습니다. 소스코드를 공개하고 싶지 않은 경우엔 건너뛰시면 됩니다.
<pre id="empty-setup-push-repo-echo" class="f5"><span class="user-select-contain">git checkout -b source
git push -u origin source</span></pre>
지금 보고 계시는 글도 Angular로 만들어서 Github에 배포한 거란 걸 혹시 눈치채셨나요? 앞으로도 Angular 를 비롯해서 웹/앱 서비스 구축과 관련된 글로 찾아뵙겠습니다. 글에 잘못된 점이 있거나 궁금한 점이 있으신 분은 댓글을 이용해주세요. :)
`,
            new Date(2018, 3, 8)),
        ];
}
