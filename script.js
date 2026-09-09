const canvas = document.getElementById("universoCanvas");
const ctx = canvas.getContext("2d");

function redimensionar() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
redimensionar();
window.addEventListener("resize", redimensionar);

const estrellas = [];
const numEstrellas = 150;

// Generar partículas en un espacio 3D
for (let i = 0; i < numEstrellas; i++) {
    estrellas.push({
        x: (Math.random() - 0.5) * window.innerWidth * 2,
        y: (Math.random() - 0.5) * window.innerHeight * 2,
        z: Math.random() * window.innerWidth,
        tamano: Math.random() * 2 + 1,
        color: Math.random() > 0.4 ? "#ffd700" : "#ffffff"
    });
}

function animar() {
    ctx.fillStyle = "rgba(5, 2, 10, 0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    estrellas.forEach(e => {
        e.z -= 2; // Velocidad de avance hacia la pantalla

        if (e.z <= 0) {
            e.z = canvas.width;
            e.x = (Math.random() - 0.5) * canvas.width * 2;
            e.y = (Math.random() - 0.5) * canvas.height * 2;
        }

        const k = 200 / e.z;
        const px = e.x * k + cx;
        const py = e.y * k + cy;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
            const size = Math.max(0.1, (1 - e.z / canvas.width) * 3.5);
            ctx.fillStyle = e.color;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    requestAnimationFrame(animar);
}

animar();