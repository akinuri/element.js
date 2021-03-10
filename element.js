if (typeof elem == "undefined") {
    
    var elem = function (tagName, attributes, children, isHTML) {
        
        let parent;
        
        if (typeof tagName == "string") {
            parent = document.createElement(tagName);
        } else if (tagName instanceof HTMLElement) {
            parent = tagName;
        }
        
        if (attributes) {
            
            for (let attribute in attributes) {
                
                if (attribute.startsWith("on")) {
                    
                    let callback = attributes[attribute];
                    
                    if (typeof callback == "string") {
                        parent.setAttribute(attribute, callback);
                    }
                    else if (typeof callback == "function") {
                        
                        let eventMatch = attribute.match(/^on([a-zA-Z]+)/);
                        if (eventMatch) {
                            let event = eventMatch[1];
                            // TODO: make sure it's a valid event?
                            parent.addEventListener(event, callback);
                            parent.eventListeners = parent.eventListeners || {};
                            parent.eventListeners[event] = parent.eventListeners[event] || [];
                            parent.eventListeners[event].push(callback);
                        }
                        
                    }
                    
                } else {
                    parent.setAttribute(attribute, attributes[attribute]);
                }
                
            }
            
        }
        
        var isHTML = isHTML || null;
        
        if (children || children == 0) {
            elem.append(parent, children, isHTML);
        }
        
        return parent;
    };

    elem.append = function (parent, children, isHTML) {
        
        if (parent instanceof HTMLTextAreaElement || parent instanceof HTMLInputElement) {
            
            if (children instanceof Text || typeof children == "string" || typeof children == "number") {
                parent.value = children;
            }
            else if (children instanceof Array) {
                children.forEach(function (child) {
                    elem.append(parent, child);
                });
            }
            else if (typeof children == "function") {
                elem.append(parent, children());
            }
            
        } else {
            
            if (children instanceof HTMLElement || children instanceof Text) {
                parent.appendChild(children);
            }
            else if (typeof children == "string" || typeof children == "number") {
                if (isHTML) {
                    parent.innerHTML += children;
                } else {
                    parent.appendChild(document.createTextNode(children));
                }
            }
            else if (children instanceof Array) {
                children.forEach(function (child) {
                    elem.append(parent, child);
                });
            }
            else if (typeof children == "function") {
                elem.append(parent, children());
            }
            
        }
    };
    
} else {
    
    if (typeof elem == "function" && typeof elem.hasOwnProperty("append")) {
        console.warn("elem() is already initialized.");
    } else {
        console.warn("elem name is already in use by some other script.");
    }
    
}