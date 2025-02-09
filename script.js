
let position = window.innerHeight;
let speed = 1; // Ajuste a velocidade aqui
let animationFrame;
let scrolling = false;
let darkMode = true;
let mirrored = false;
let textElement;
let fontSize = 24;

function load(){
	textElement = document.getElementById("scrollText");
}

function scrollText() {

	if (scrolling) {
		position -= speed;
		textElement.style.top = position + "px";
		if (position + textElement.offsetHeight < 0) {
			position = window.innerHeight;
		}
		animationFrame = requestAnimationFrame(scrollText);
	}
}

function toggleScroll() {
	let toggleButton = document.getElementById("toggleScroll");
	scrolling = !scrolling;
	if (scrolling) {
		scrollText();
		toggleButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
	} else {
		cancelAnimationFrame(animationFrame);
		toggleButton.innerHTML = '<i class="fa-solid fa-play"></i>';
		toggleButton.classList.remove("btn-danger");
		toggleButton.classList.add("btn-primary");
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

function increaseSpeed() {
	speed += 0.5;
}

function decreaseSpeed() {
	if (speed > 0.5) {
		speed -= 0.5;
	}
}

function toggleTheme() {
	darkMode = !darkMode;
	document.body.style.backgroundColor = darkMode ? "#000" : "#fff";
	document.body.style.color = darkMode ? "#fff" : "#000";
}

function toggleMirror() {
	//let textElement = document.getElementById("scrollText");
	mirrored = !mirrored;
	textElement.style.transform = mirrored ? "scaleX(-1)" : "scaleX(1)";
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
	}
}

function increaseFontSize() {
	fontSize += 2;
	textElement.style.fontSize = fontSize + "px";
}

function decreaseFontSize() {
	if (fontSize > 12) {
		fontSize -= 2;
		textElement.style.fontSize = fontSize + "px";
	}
}