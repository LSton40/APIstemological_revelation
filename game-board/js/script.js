const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = window.innerWidth/3
canvas.height = window.innerHeight/5

// Objects
function PegHole(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
}
PegHole.prototype.draw = function () {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
}
Object.prototype.update = function () {
    this.draw()

}
// Implementation
let pegHoles = [];
function init() {
    const radius = 5;
    const color = '#black';
    // Top row
    for (let i = 0; i < 19; i++) {
        const x = 70 + 10 * i;
        const y = 20;

        pegHoles.push(new PegHole(x, y, radius, color))
    }
    // for (let i = 0; i < 19; i++) {
    //     const x = radius * (10 + 2 * i);
    //     const y = radius * 4;

    //     pegHoles.push(new PegHole(x, y, radius, color))
    // }
    // Right column
    for (let i = 0; i < 17; i++) {
        const x = 250;
        const y = 30 + 10 * i;

        pegHoles.push(new PegHole(x, y, radius, color))
    }
    // Bottom row
    for (let i = 0; i < 19; i++) {
        const x = 70 + 10 * i;
        const y = 200;

        pegHoles.push(new PegHole(x, y, radius, color))
    }
    // Left column
    for (let i = 0; i < 17; i++) {
        const x = 70;
        const y = 30 + 10 * i;

        pegHoles.push(new PegHole(x, y, radius, color))
    }
    // Top finish line
    for (let i = 0; i < 3; i++) {
        const x = 100;
        const y = 30 + 10 * i;

        pegHoles.push(new PegHole(x, y, radius, color))
    }
    for (let i = 0; i < 2; i++) {
        const x = 110 + 10 * i;
        const y = 50;

        pegHoles.push(new PegHole(x, y, radius, color))
    }
    // Bottom finish line
    for (let i = 0; i < 3; i++) {
        const x = 220;
        const y = 170 + 10 * i;

        pegHoles.push(new PegHole(x, y, radius, color))
    }
    for (let i = 0; i < 2; i++) {
        const x = 200 + 10 * i;
        const y = 170;

        pegHoles.push(new PegHole(x, y, radius, color))
    }
    // Right finish line
    for (let i = 0; i < 3; i++) {
        const x = 220 + 10 * i;
        const y = 50;

        pegHoles.push(new PegHole(x, y, radius, color))
    }
    for (let i = 0; i < 2; i++) {
        const x = 220;
        const y = 60 + 10 * i;

        pegHoles.push(new PegHole(x, y, radius, color))
    }
    // Left finish line
    for (let i = 0; i < 3; i++) {
        const x = 80 + 10 * i;
        const y = 170;

        pegHoles.push(new PegHole(x, y, radius, color))
    }
    for (let i = 0; i < 2; i++) {
        const x = 100;
        const y = 150 + 10 * i;

        pegHoles.push(new PegHole(x, y, radius, color))
    }
    // Top spawn
    for (let i = 0; i < 5; i++) {
        const x = 150;
        const y = 30 + 10 * i;

        pegHoles.push(new PegHole(x, y, radius, color))
    }
     // Bottom spawn
     for (let i = 0; i < 5; i++) {
        const x = 170;
        const y = 150 + 10 * i;

        pegHoles.push(new PegHole(x, y, radius, color))
    }
    // Right spawn
    for (let i = 0; i < 5; i++) {
        const x = 200 + 10 * i;
        const y = 100;

        pegHoles.push(new PegHole(x, y, radius, color))
    }
    // Left spawn
    for (let i = 0; i < 5; i++) {
        const x = 80 + 10 * i;
        const y = 120;

        pegHoles.push(new PegHole(x, y, radius, color))
    }
}
// Animation Loop
function animate() {
    requestAnimationFrame(animate) // Create an animation loop
    c.clearRect(0, 0, canvas.width, canvas.height) // Erase whole canvas
    pegHoles.forEach(pegHole => {
        pegHole.update()
    })
}


init()
animate()