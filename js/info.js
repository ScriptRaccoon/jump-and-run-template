const infoElement = document.getElementById("info");

export function hideInfo() {
    infoElement.style.display = "none";
}

export function writeInfo(txt) {
    infoElement.style.display = "block";
    infoElement.innerHTML = txt;
}
