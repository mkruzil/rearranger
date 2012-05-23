/*

HTML Table Row Rearranger

Rearranges HTML table rows using up and down buttons.

Copyright (c) 2012 Mike Kruzil

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

(function () {

    "use strict";

    function isElement(obj) {
        return obj !== undefined && obj !== null && obj.nodeType === 1;
    }

    function move(tbody, tr, direction) {
        if (isElement(tbody) && isElement(tr)) {
            return function () {
                var child = {};
                var nextSibling = tr.nextSibling;
                var previousSibling = tr.previousSibling;
                if (direction === 1 && nextSibling) {
                    child = tbody.removeChild(nextSibling);
                    tbody.insertBefore(child, tr);
                } else if (direction === -1 && previousSibling && previousSibling.rowIndex !== 0) {
                    child = tbody.removeChild(previousSibling);
                    tbody.insertBefore(child, nextSibling);
                }
            };
        }
    }

    function setActions(tbody) {
        var rows = {};
        var tr = {};
        var spans = {};
        var rowsLength = 0;
        var i;
        if (isElement(tbody)) {
            rows = tbody.rows;
            rowsLength = rows.length;
            for (i = 0; i < rowsLength; i++) {
                tr = rows.item(i);
                spans = tr.getElementsByTagName("SPAN");
                if (spans && spans.length === 2) {
                    spans.item(0).onclick = move(tbody, tr, -1);
                    spans.item(1).onclick = move(tbody, tr, 1);
                }
            }
        }
    }

    function stripTextNodes(element) {
        var node = {};
        var nodeType = 3; //TEXT_NODE
        var i = 0;
        if (isElement(element) && element.hasChildNodes()) {
            i = element.childNodes.length;
            while (--i >= 0) {
                node = element.childNodes.item(i);
                if (node.nodeType === nodeType) {
                    element.removeChild(node);
                }
            }
        }
    }

    function init(id) {
        var table = window.document.getElementById(id);
        var tbody = {};
        if (table) {
            tbody = table.tBodies.item(0);
            if (tbody) {
                stripTextNodes(tbody);
                setActions(tbody);
            }
        }
    }

    init("rearranger");
}());