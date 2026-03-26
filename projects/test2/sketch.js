const knittingVariants = [
    {
        background: "#f7f3ee",
        yarn: "#f3c9bc",
        accentA: "#10ffcb",
        accentB: "#b5f8fe",
        accentC: "#95adb6",
        widthOffset: 0,
        heightOffset: 0,
        curveOffset: 0,
        label: "open weave",
    },
    {
        background: "#f6f7f2",
        yarn: "#e8cdb9",
        accentA: "#f46b45",
        accentB: "#9dd9d2",
        accentC: "#4f6d7a",
        widthOffset: -2,
        heightOffset: 6,
        curveOffset: 6,
        label: "tight tension",
    },
    {
        background: "#f3f0fa",
        yarn: "#f2d0d3",
        accentA: "#6ef3a5",
        accentB: "#8ed2ff",
        accentC: "#7c83fd",
        widthOffset: 3,
        heightOffset: -4,
        curveOffset: -8,
        label: "cool slip",
    },
    {
        background: "#f9f4ec",
        yarn: "#edcfbf",
        accentA: "#ff9f1c",
        accentB: "#2ec4b6",
        accentC: "#5c677d",
        widthOffset: 1,
        heightOffset: 10,
        curveOffset: 12,
        label: "warm knot",
    },
    {
        background: "#eef4f3",
        yarn: "#f6d8cc",
        accentA: "#00d1b2",
        accentB: "#72ddf7",
        accentC: "#8093f1",
        widthOffset: -4,
        heightOffset: -8,
        curveOffset: 4,
        label: "loose repeat",
    },
    {
        background: "#f6f1f1",
        yarn: "#e9c7b2",
        accentA: "#ff6f59",
        accentB: "#7bdff2",
        accentC: "#6d597a",
        widthOffset: 4,
        heightOffset: 4,
        curveOffset: -4,
        label: "dense loop",
    },
];

function drawKnitHalf(p, variant, tileWidth, tileHeight, width, height, mirrored) {
    const gridCountX = Math.max(2, Math.ceil(width / tileWidth / 2));
    const gridCountY = Math.max(2, Math.ceil(height / tileHeight));
    const curveSpan = 48 + tileWidth / 2 + variant.curveOffset;

    p.push();
    if (mirrored) {
        p.translate(width, height - tileHeight / 4);
        p.rotate(p.PI);
    }

    for (let gridY = 0; gridY < gridCountY; gridY += 1) {
        for (let gridX = 0; gridX < gridCountX; gridX += 1) {
            const posX = gridX * tileWidth;
            const posY = gridY * tileHeight;

            p.push();
            p.translate(posX, posY);
            p.stroke(variant.yarn);
            p.strokeWeight(2);
            p.noFill();
            p.line(0, 0, tileWidth, -tileHeight / 4);
            p.line(0, 5, tileWidth, -tileHeight / 4 + 5);
            p.curve(0, 0, tileWidth / 4, tileHeight, curveSpan, 0, curveSpan + tileWidth / 2, 0);
            p.translate(0, tileWidth);
            p.curve(0, 0, tileWidth / 4, 0, curveSpan, tileHeight, curveSpan + tileWidth / 2, 0);

            if (gridX % 7 === 0) {
                p.stroke(variant.accentA);
                p.line(10, 0, 15, tileHeight);
                p.line(30, 0, 35, tileHeight);
            } else if (gridY % 2 === 0) {
                p.stroke(variant.accentB);
                p.line(20, 0, 25, tileHeight / 2);
            } else {
                p.stroke(variant.accentC);
                p.line(10, 0, 15, tileHeight / 2);
            }
            p.pop();
        }
    }

    p.pop();
}

function createKnittingTile(container, variant) {
    return new p5((p) => {
        p.setup = function () {
            const canvas = p.createCanvas(200, 200);
            canvas.parent(container);
            canvas.addClass("knitting-canvas-instance");
            p.noFill();
        };

        p.draw = function () {
            const inside =
                p.mouseX >= 0 &&
                p.mouseX <= p.width &&
                p.mouseY >= 0 &&
                p.mouseY <= p.height;

            const localMouseX = inside ? p.mouseX : p.width * 0.55;
            const localMouseY = inside ? p.mouseY : p.height * 0.45;
            const tileWidth = p.int(p.map(localMouseX, 0, p.width, 18, 42)) + variant.widthOffset;
            const tileHeight = p.int(p.map(localMouseY, 0, p.height, 20, 78)) + variant.heightOffset;

            p.background(variant.background);
            drawKnitHalf(
                p,
                variant,
                p.constrain(tileWidth, 16, 46),
                p.constrain(tileHeight, 18, 84),
                p.width,
                p.height,
                false
            );
            drawKnitHalf(
                p,
                variant,
                p.constrain(tileWidth, 16, 46),
                p.constrain(tileHeight, 18, 84),
                p.width,
                p.height,
                true
            );
        };
    }, container);
}

window.addEventListener("DOMContentLoaded", () => {
    const tiles = document.querySelectorAll("[data-knitting-tile]");
    tiles.forEach((tile, index) => {
        const canvasHost = tile.querySelector(".knitting-canvas");
        const caption = tile.querySelector(".knitting-caption");
        const variant = knittingVariants[index % knittingVariants.length];
        if (caption) {
            caption.textContent = variant.label;
        }
        createKnittingTile(canvasHost, variant);
    });
});
