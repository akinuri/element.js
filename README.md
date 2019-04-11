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

```javascript
<ul id="mylist">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```






