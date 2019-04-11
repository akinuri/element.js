# element.js

An alternative (to document.createElement) way to dynamically create HTML.

There are several ways to dynamically create HTML. One of them is using multiline strings:

```javascript
var html = `<ul id="mylist">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>`;
```
Another way is to use `+` seperated strings:

```javascript
var html = '<ul id="mylist">'+
'    <li>Item 1</li>'+
'    <li>Item 2</li>'+
'    <li>Item 3</li>'+
'</ul>';
```

One can also use the DOM API to create HTML:

```javascript
var html = document.createElement("ul");
ul.id = "mylist";
var li_1 = document.createElement("li");
li_1.textContent = "Item 1";
var li_2 = document.createElement("li");
//...
html.appendChild(li_1);
//...
```

None of these methods works for me. I needed a more easier, compact, manageable method to dynamically create HTML. Enter `element.js`.

## Syntax

```javascript
elem(tagName, attributes, children, isHTML)
```
* `tagName` : tag name of the element
* `attributes` : object with `property : value` pairs
* `children` : child(ren) element(s); can be a `string`, an `element`, or an `array` of `strings` and/or `elements`
* `isHTML` (optional) : if the `children` is a string, but contains (or is) HTML, this should be set to `true`

## Usage

```javascript
var html = elem("ul", {"id":"mylist"}, [
    elem("li", null, "Item 1"),
    elem("li", null, "Item 2"),
    elem("li", null, "Item 3"),
]);
```

The above code produces the following HTML:

```html
<ul id="mylist">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```

With this method, one can easily manipulate all parts of HTML, and nest as many as one desires.

# html2js.js

I've written `element.js` back in February 24, 2018. Since then, I've been constantly using it. Lately, I've realized that I need another method to convert HTML to JS, and by JS, I mean HTML's `element.js` equivalent.

Sometimes I create a layout (HTML) and fill the values manually, but these values needs to be entered dynamically. To see the end result, I have to do this process manually, first. Once the HTML is complete, then I have to convert it to JS (`elment.js`). To help with this process, I've written another function  (April 10, 2019) to convert HTML to it's JS (`elment.js`) equivalent.

For example, let's say I have the following HTML (from StackOverflow):

```html
<div class="-main">
    <a href="#" class="left-sidebar-toggle p0 ai-center jc-center js-left-sidebar-toggle">
        <span class="ps-relative"></span>
    </a>
    <a href="https://stackoverflow.com" class="-logo js-gps-track">
        <span class="-img _glyph">Stack Overflow</span>
    </a>
</div>
```

If I do `html2js(document.querySelector(".-main"))`, I'll get the following:

```javascript
"elem("div", {"class":"-main"}, [
    elem("a", {"href":"#","class":"left-sidebar-toggle p0 ai-center jc-center js-left-sidebar-toggle"}, [
        elem("span", {"class":"ps-relative"}),
    ]),
    elem("a", {"href":"https://stackoverflow.com","class":"-logo js-gps-track"}, [
        elem("span", {"class":"-img _glyph"}, "Stack Overflow"),
    ]),
])"
```
Now, I can get rid of the quotes and use this to create HTML (again :).