let globalSpeed = 0.5;
let currentSpeed = 0;
let fontSize = 18;
let fontStep = 6;
let speedStep = 0.5;
let googleDocID = "";
let mode = 1;

let position = window.innerHeight;
let animationFrame;
let scrolling = false;

function scrollText() {
	if (scrolling) {
        let textElement = document.getElementById("scrollText");
        currentSpeed = globalSpeed;
		position -= currentSpeed;
		textElement.style.top = position + "px";
		if (position + textElement.offsetHeight < 0) {
			position = window.innerHeight;
		}
		animationFrame = requestAnimationFrame(scrollText);
	}
}

function startScroll() {
	if (!scrolling) {
		scrolling = true;
		scrollText();
	}
}

function stopScroll() {
	scrolling = false;
	cancelAnimationFrame(animationFrame);
}

function openModal(){
    document.getElementById("btnModal").click();
}


async function fetchGoogleDoc() {
	// SUBSTITUA PELO SEU ID DO GOOGLE DOCS
    const docLink = document.getElementById("txtLink").value;
    console.log(docLink);
    let tmpLink = docLink.replace("https://docs.google.com/document/d/","");
    console.log(tmpLink);
	const docId = tmpLink.substring(0,tmpLink.indexOf("/"));
    console.log(docId);
	const url = `https://docs.google.com/document/d/${docId}/export?format=txt`;

	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error("Erro ao carregar o documento");

		const text = await response.text();

		// Exibir o conteúdo formatado na página
		document.getElementById("scrollText").innerHTML = text.replace(/\n/g, "<br>");
	} catch (error) {
		alert("Erro ao carregar o documento.");
		console.error(error);
	}
}

function changeMode(){

}
function increaseFont(){
	fontSize += fontStep;
	document.getElementById("scrollText").style = `font-size:${fontSize}px;`;
}
function decreaseFont(){
	fontSize -= fontStep;
	document.getElementById("scrollText").style = `font-size:${fontSize}px;`;
}

function increaseSpeed(){
	globalSpeed += speedStep;
}
function decreaseSpeed(){
	globalSpeed -= speedStep;
    if (globalSpeed <= 0){
        globalSpeed = 0;
    }
}

