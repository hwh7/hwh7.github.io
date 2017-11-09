import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Node } from './node';

@Component({
    selector: 'app-dataformatter',
    templateUrl: './dataformatter.component.html',
    styleUrls: ['./dataformatter.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DataFormatterComponent implements OnInit {

    public sample = `
    {'glossary': {'title': 'example glossary', 'GlossDiv': {'title': 'S', 'GlossList': {'GlossEntry': {'ID': 'SGML', 'SortAs': 'SGML', 'GlossTerm': 'Standard Generalized Markup Language', 'Acronym': 'SGML', 'Abbrev': 'ISO 8879:1986', 'GlossDef': {'para': 'A meta-markup language, used to create markup languages such as DocBook.', 'GlossSeeAlso': ['GML', 'XML']}, 'GlossSee': 'markup'}}}}}
    `;

    public sample2 = `
    {'a': {'b': ['c', 'd'], 
    'e': (1, 2, [a,b,c,('q', 'w', 'e')]) }}
    `;

    public sample3 = `
    {'a1': {'a2': 'val ue', 'a3': 'val ue'},
     'a4': ['a2', 'val ue'],
     'y': ('x', 'y'),
     'z': [(1, 2), ('x', 'y')],
     'x': (1, 2)}
    `;

    public input = '';
    public output: string = '';

    private separator = [':', ','];
    private indent1 = ' '.repeat(4);
    private indent2 = ' '.repeat(4);
    private indent3 = ' '.repeat(4);
    private indent4 = ' '.repeat(4);

    constructor() { }

    ngOnInit() {
    }

    printNode(node: Node): string {
        // console.log(node);

        let passIndent = false;
        let out = '';
        if (node.children.length == 0) {
            out += this.indent1.repeat(node.indent);
            for (let i = 0; i < node.content.length; i++) {
                let elem = node.content[i].trim();
                out += elem;

                if (elem[elem.length - 1] === ',') {
                    out += '\n';
                    out += this.indent4.repeat(node.indent);
                } else if (i < node.content.length - 1) {
                    out += ' ';
                } else {
                    out += '\n';
                }
            }
        } else {
            for (let i = 0, j = 0; i < node.content.length; i++) {
                let elem = node.content[i].trim();

                if (!passIndent) {
                    out += this.indent2.repeat(node.indent);
                } else {
                    passIndent = !passIndent;
                }

                out += elem;

                if (i == node.content.length - 1)
                    out += '\n';

                if (elem[elem.length - 1] === ',') {
                    out += '\n';
                    continue;
                } else if (this.separator.indexOf(elem[elem.length - 1]) > -1) {
                    out += ' ';
                    passIndent = true;
                    continue;
                }

                if (j < node.children.length) {
                    out += '\n';
                    out += this.printNode(node.children[j]);
                }

                j++;
            }
        }

        return out;
    }

    convert() {
        let starter = ['[', '{', '('];
        let ender = [']', '}', ')'];

        let input = '';
        for (let char of this.input)
            if (char !== '\n')
                input += char;

        let out = '';
        let currentIndent = 0;

        let root = new Node(null);
        root.p = root;
        root.indent = 0;

        let currentNode = root;

        let parsingString = false;
        for (let i = 0; i < input.length; i++) {
            let char = input.charAt(i);

            if (char === '\'') {
                parsingString = !parsingString;
            }

            if (!parsingString && starter.indexOf(char) > -1) {
                let newNode = new Node(currentNode);
                currentIndent++;
                newNode.indent = currentIndent;
                currentNode.children.push(newNode);
                currentNode.content[currentNode.content.length - 1] += char;

                currentNode = newNode;
            } else if (!parsingString && ender.indexOf(char) > -1) {
                currentNode = currentNode.p;

                currentNode.content.push('');
                currentNode.content[currentNode.content.length - 1] += char;
                currentIndent--;
            } else if (!parsingString && this.separator.indexOf(char) > -1) {
                currentNode.content[currentNode.content.length - 1] += char;
                currentNode.content.push('');
            } else {
                currentNode.content[currentNode.content.length - 1] += char;
            }
        }

        out = this.printNode(root);

        this.output = out;
    }
}
