var codes = new Array();
var urls = new Array();
var hints = new Array();

function createSearchQMs(file) {
	let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
				let allText = rawFile.responseText;
				myFunc(allText);
            }
        }
    }
    rawFile.send(null);
}

function myFunc(text) {
	let lines = text.split('\n');
	for (let i=0; i < lines.length - 1; i++) { // -1 to avoid extra undefined line
		let parts = lines[i].split('\'');
		codes[i] = parts[1];
		urls[i] = parts[3];
		hints[i] = parts[4].split('#')[1];
		let qms = document.getElementById("qms");
		let newP = document.createElement("p");
			newP.id = "p" + i;
		let newInput = document.createElement("input");
			newInput.id = "code" + i;
			newInput.type = "button";
			newInput.value = codes[i];
			newInput.onclick = function() {createInput(i)};
		newP.appendChild(newInput);
		qms.appendChild(newP);
	}
}

function createInput(id) {
	// Delete all search boxes
	let sbs = document.getElementsByClassName("sb");
	for (let i = 0; i < sbs.length; i++) {
		sbs[i].parentNode.removeChild(sbs[i]);
	}
	// Clean big blue p bg
	let psbs = document.getElementsByClassName("psb");
	for (let i = 0; i < psbs.length; i++) {
		psbs[i].classList.remove("psb");
	}
	// Create corresponding search box
	let par = document.getElementById("p"+id);
		par.className = "psb";
	let sb = document.createElement("input");
		sb.id = "sb" + id;
		sb.className = "sb";
		sb.type = "text";
		sb.placeholder = hints[id];
		sb.onkeydown = function() {
			if (event.keyCode === 13) {
				search(id);
			}
		};
	par.appendChild(sb);
	// Focus the search box
	document.getElementById("sb"+id).focus();
}

function search(id) {
	let sb = document.getElementById("sb"+id);
	url = urls[id].replace("{}", sb.value);
	window.location.assign(url);
}
