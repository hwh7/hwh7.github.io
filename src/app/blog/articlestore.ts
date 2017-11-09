import { Article } from './article';

export class ArticleStore {
    constructor() {
    }

    public articles: Array<Article> = [
        new Article('',
            ``,
            new Date(2018, 3, 1)),
        ];
}
