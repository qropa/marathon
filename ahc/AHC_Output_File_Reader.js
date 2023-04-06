// ==UserScript==
// @name         AHC Output File Reader
// @namespace    https://github.com/qropa/marathon/ahc
// @version      0.1
// @description  AHCのビジュアライザに出力結果を自動で貼り付けます。
// @author       ssaattoo
// @match        https://img.atcoder.jp/*
// @grant        none
// ==/UserScript==

const options = {
    type: 'openDirectory'
};

let selectedDirHandle = null;

async function fileselect () {
    selectedDirHandle = await window.showDirectoryPicker(options);
    outputupdate(selectedDirHandle);
}
async function outputupdate (dirHandle) {
    if (dirHandle == null) { return; }
    try {
        const seedValue = seed.value;
        const fileHandle = await dirHandle.getFileHandle(`${seedValue}.out`);
        const file = await fileHandle.getFile();
        const text = await file.text();
        output.value = text;
    } catch(err) {
        output.value = '';
    }
    updateOutput();
    try {
        const seedValue = seed.value;
        const errorfileHandle = await dirHandle.getFileHandle(`${seedValue}.res`);
        const errorfile = await errorfileHandle.getFile();
        const errortext = await errorfile.text();
        textBox.value = errortext;
    } catch(err) {
        textBox.value = '';
    }
}

const textBox = document.createElement('textarea');
textBox.readOnly = true;
textBox.style.width = '600px';
textBox.style.height = '160px';
textBox.style.position = "absolute";
textBox.style.left = "750px";
textBox.style.top = "185px";
const container = document.querySelector('body');
container.appendChild(textBox);

var seed = document.getElementById("seed");
var output = document.getElementById("output");
let btn = document.createElement("button");
btn.innerHTML = "Select Directory";
btn.addEventListener('click', fileselect);
output.parentNode.insertBefore(btn, output.previousElementSibling);
seed.addEventListener("change", () => outputupdate(selectedDirHandle));
