export class Node {
    public p: Node;
    public children = [];
    public content = [''];
    public indent: number;

    constructor(private parent: Node) {
        this.p = parent;
    }
}