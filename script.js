const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 0.99 ;
        this.speedX = (Math.random() - 0.5) * 10; // 随机水平速度
        this.speedY = (Math.random() - 0.5) * 10; // 随机垂直速度
        this.color = `hsl(340, 100%, 80%)`; // 随机颜色
        this.life = 100; // 粒子生命周期
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 2; // 每次更新减少生命值
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life / 100; // 根据生命值调整透明度
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1; // 重置透明度
    }
}

function createParticles(e) {
    const xPos = e.x;
    const yPos = e.y;

    for (let i = 0; i < 100; i++) { // 每次鼠标移动生成多个粒子
        particles.push(new Particle(xPos, yPos));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles = particles.filter(particle => {
        particle.update();
        return particle.life > 0; // 只保留生命值大于0的粒子
    });

    particles.forEach(particle => {
        particle.draw();
    });

    requestAnimationFrame(animate);
}

window.addEventListener('mousemove', createParticles);
animate();