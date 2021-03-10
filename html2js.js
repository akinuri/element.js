String.prototype.quote = function () {
    console.info("[Info] String.prototype has been extended with a method: quote(quoteChar = '\"')");
    return function quote(quoteChar = "\"") {
        quoteChar = quoteChar || "\"";
        return quoteChar + this + quoteChar;
    }
}();

// Par(sed) (E)lement
function Parlement(element) {
    this.nodeName    = null;
    this.attributes  = {};
    this.children    = [];
    this.textContent = null; // for text nodes
    this.parse(element);
}

Parlement.prototype.parse = function parseElement(element) {
    this.nodeName = element.nodeName.toLowerCase();
    var self = this;
    Array.from(element.attributes).forEach(function (attr) {
        self.attributes[attr.name] = attr.value;
    });
    if (element.childNodes.length) {
        if (element.childNodes.length == 1 && element.childNodes[0].nodeName == "#text") {
            self.textContent = element.childNodes[0].textContent;
        } else {
            Array.from(element.childNodes).forEach(function (node) {
                if (node.nodeName == "#text") {
                    if (node.textContent.trim() != "") {
                        self.children.push(node.textContent);
                    }
                } else {
                    self.children.push(new Parlement(node));
                }
            });
        }
    }
};

Parlement.eol = function EOL(count) {
    return "\r\n".repeat(count || 1);
};

Parlement.tab = function TAB(count, type) {
    var type = type || "\t"; 
    if (typeof count == "undefined") count = 1;
    return type.repeat(count);
};

Parlement.parsed2js = function parsed2js(parsed, level) {
    var level = level || 0;
    var js = {
        left : "elem(",
        children : "",
        right  : ")",
    };
    js.left += parsed.nodeName.quote();
    if (parsed.attributes && Object.keys(parsed.attributes).length) {
        js.left += ", " + JSON.stringify(parsed.attributes);
    }
    else if (parsed.textContent != null || parsed.children.length) {
        js.left += ", null";
    }
    if (parsed.textContent != null) {
        js.children += ", " + parsed.textContent.quote();
    }
    else if (parsed.children.length) {
        if (parsed.children.length == 1 && typeof parsed.children[0] == "string") {
            js.children += ", " + parsed.children[0].quote();
        } else {
            js.left += ", " + "[" + Parlement.eol();
            parsed.children.forEach(function (child) {
                if (typeof child == "string") {
                    js.children += Parlement.tab(level+1) + child.quote() + "," + Parlement.eol();
                } else {
                    js.children += Parlement.tab(level+1) + Parlement.parsed2js(child, level+1) + Parlement.eol();
                }
            });
            js.right = Parlement.tab(level) + "]" + js.right;
        }
    }
    if (level != 0) {
        js.right += ",";
    }
    return js.left + js.children + js.right;
};

Parlement.prototype.toJS = function () {
    return Parlement.parsed2js(this);
};

function html2js(element) {
    return (new Parlement(element)).toJS();
}