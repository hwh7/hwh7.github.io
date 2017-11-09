export class Article {
    public title: string;
    public addr: string;
    public content: string;
    public writtenTime: Date;
    public strWrittenTime: string;

    constructor(title: string, content: string, writtenTime: Date) {
        this.title = title;
        this.addr = title.replace(/ /g, '-');
        this.content = content;
        this.writtenTime = writtenTime;
        this.strWrittenTime = writtenTime.getFullYear() + '년 ' + (writtenTime.getMonth() + 1) + '월 ' + writtenTime.getDate() + '일';
    }
}