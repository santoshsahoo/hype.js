/** @jsx hype */

function render(root, el) {
	while (root.lastChild) {
		root.removeChild(root.lastChild);
	}
	root.appendChild(el);
}

function hype(name, attributes, ...children) {
	if (typeof name === "function") {
		return name(attributes, children);
	}

	var el = document.createElement(name);

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
	return <div onClick={soemthingclciked}>{props.x}</div>;
}

function App() {
	return <div onClick="hello">
		<Foo x="1" />
		<Foo x="2" />
	</div>;
}

{
	render(document.getElementById("root"), <App />);
}
