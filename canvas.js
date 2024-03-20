const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const strokeColorInput = document.getElementById('stroke-color');
const strokeWidthInput = document.getElementById('stroke-width');
const clearButton = document.getElementById('clear-canvas');
const saveButton = document.getElementById('save-image');

let isDrawing = false;
let startX, startY;

// // Set canvas dimensions
// canvas.width = window.innerWidth - 200;
// canvas.height = window.innerHeight - 200;
// canvas.setAttribute("width", window.innerWidth);
// canvas.setAttribute("height", window.innerHeight);
// canvas.setAttribute("width", 1024);
// canvas.setAttribute("height", 768);

ctx.arc(100, 100, 50, 0, Math.PI * 2, false);

// Set initial stroke color and width
ctx.strokeStyle = strokeColorInput.value;
ctx.lineWidth = strokeWidthInput.value;

// set canvas bacground-color
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Handle mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

// Handle touch events
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

// Update stroke color
strokeColorInput.addEventListener('change', () => {
    ctx.strokeStyle = strokeColorInput.value;
});

// Update stroke width
strokeWidthInput.addEventListener('input', () => {
    ctx.lineWidth = strokeWidthInput.value;
});

// Clear canvas
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save image
saveButton.addEventListener('click', saveImage);

function startDrawing(event) {
    isDrawing = true;
    ctx.beginPath();
    startX = event.clientX - canvas.offsetLeft;
    startY = event.clientY - canvas.offsetTop;
    event.preventDefault();
}

function draw(event) {
    if (!isDrawing) return;

    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;

    ctx.moveTo(startX, startY);
    ctx.lineTo(x, y);
    ctx.stroke();

    startX = x;
    startY = y;
}

function stopDrawing() {
    isDrawing = false;
    ctx.closePath();
}

function saveImage() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "";
    link.click();
}