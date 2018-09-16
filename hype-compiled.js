/** @jsx hype */

function render(root, el) {

	while (root.lastChild) {
		root.removeChild(root.lastChild);
	}
	root.appendChild(el);
}

function hype(name, attributes) {
	var children = [], len = arguments.length - 2;
	while ( len-- > 0 ) children[ len ] = arguments[ len + 2 ];

	if (typeof name === "function") {
		return name(attributes, children);
	}

	var el = document.createElement(name);

	var start = 1;

	for (var attr in attributes) {
		if (attr.startsWith("on") && typeof attributes[attr] === "function") {
			el.addEventListener(attr.substr(2).toLocaleLowerCase(), attributes[attr], false)
		} else {
			el[attr] = attributes[attr];
		}
	}

	var node;

	for (i = 0; i < children.length; i++) {
		node = children[i];
		if (typeof node === "function") {
			el.appendChild(hype(node));
		} else if (typeof node === "string") {
			el.appendChild(document.createTextNode(node));
		} else {
			el.appendChild(node);
		}
	}

	return el;
}
function soemthingclciked(e) {
	console.log(e);
}

function Foo(props) {
	return hype( 'div', { onClick: soemthingclciked }, props.x);
}

function App() {
	return hype( 'div', { onClick: "hello" },
		hype( Foo, { x: "1" }),
		hype( Foo, { x: "2" })
	);
}

{
	render(document.getElementById("root"), hype( App, null ));
}

