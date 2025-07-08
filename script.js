document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DA ANIMAÇÃO DO CANVAS (PLEXUS) ---
    const canvas = document.getElementById('plexus-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let particlesArray;
        const mouse = { x: null, y: null, radius: (canvas.height / 100) * (canvas.width / 100) };
        window.addEventListener('mousemove', (event) => { mouse.x = event.x; mouse.y = event.y; });
        class Particle {
            constructor(x, y, directionX, directionY, size, color) { this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size; this.color = color; }
            draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle = 'rgba(251, 191, 36, 0.5)'; ctx.fill(); }
            update() {
                if (this.x > canvas.width || this.x < 0) { this.directionX = -this.directionX; }
                if (this.y > canvas.height || this.y < 0) { this.directionY = -this.directionY; }
                let dx = mouse.x - this.x; let dy = mouse.y - this.y; let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius + this.size) {
                    if (mouse.x < this.x && this.x < canvas.width - this.size * 10) { this.x += 3; }
                    if (mouse.x > this.x && this.x > this.size * 10) { this.x -= 3; }
                    if (mouse.y < this.y && this.y < canvas.height - this.size * 10) { this.y += 3; }
                    if (mouse.y > this.y && this.y > this.size * 10) { this.y -= 3; }
                }
                this.x += this.directionX; this.y += this.directionY; this.draw();
            }
        }
        function initCanvas() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * .4) - 0.2;
                let directionY = (Math.random() * .4) - 0.2;
                particlesArray.push(new Particle(x, y, directionX, directionY, size, '#FBBF24'));
            }
        }
        function animateCanvas() {
            requestAnimationFrame(animateCanvas);
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); }
            connect();
        }
        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = 'rgba(148, 163, 184,' + opacityValue + ')';
                        ctx.lineWidth = 1;
                        ctx.beginPath(); ctx.moveTo(particlesArray[a].x, particlesArray[a].y); ctx.lineTo(particlesArray[b].x, particlesArray[b].y); ctx.stroke();
                    }
                }
            }
        }
        window.addEventListener('resize', () => { canvas.width = innerWidth; canvas.height = innerHeight; mouse.radius = (canvas.height / 100) * (canvas.width / 100); initCanvas(); });
        window.addEventListener('mouseout', () => { mouse.x = undefined; mouse.y = undefined; });
        initCanvas();
        animateCanvas();
    }

    // --- LÓGICA DE CONTEÚDO DINÂMICO ---
    const sectorSolutions = {
        solar: [
            { image: 'https://sunshield.com.br/wp-content/uploads/2025/06/sun-shield-18-1024x681.webp', icon: 'shield-check', title: 'Vigilância Patrimonial', description: 'Equipes especializadas na proteção de grandes perímetros e ativos de alto valor, com rondas estratégicas e presença constante em UFV\'s.' },
            { image: 'https://sunshield.com.br/wp-content/uploads/2024/12/monitoramento-1024x681.webp', icon: 'video', title: 'Monitoramento Remoto', description: 'Supervisão contínua com câmeras de alta definição e sistemas inteligentes para detecção rápida de anomalias ou riscos em usinas.' },
            { image: 'https://i.postimg.cc/HnKHPdhp/newone.jpg', icon: 'git-branch', title: 'Controle de Acesso', description: 'Gestão rigorosa da entrada e saída de veículos e técnicos para garantir a integridade da planta e prevenir acessos não autorizados.' }
        ],
        industrial: [
            { image: 'https://sunshield.com.br/wp-content/uploads/2025/06/sun-shield-41-1024x681.webp', icon: 'shield-check', title: 'Vigilância Especializada', description: 'Proteção robusta para parques industriais, atuando de forma preventiva para neutralizar riscos e garantir a integridade dos ativos.' },
            { image: 'https://sunshield.com.br/wp-content/uploads/2025/06/sun-shield-37-1024x681.webp', icon: 'video', title: 'Segurança Eletrônica', description: 'Sistema de CFTV com monitoramento inteligente para cobrir todas as áreas críticas do complexo, da produção ao armazenamento.' },
            { image: 'https://premiermonitoramento.com.br/wp-content/uploads/2022/09/controle-acesso-souzlaima-1.jpeg', icon: 'users', title: 'Serviços de Portaria', description: 'Controle de acesso para gerenciar o fluxo de funcionários, fornecedores e veículos, otimizando a segurança e a logística industrial.' }
        ],
        corporate: [
            { image: 'https://sunshield.com.br/wp-content/uploads/2024/12/SS-4-1024x585.webp', icon: 'shield-check', title: 'Vigilância Corporativa', description: 'Presença de vigilantes qualificados para garantir a segurança de edifícios comerciais, atuando de forma discreta e eficiente.' },
            { image: 'https://sunshield.com.br/wp-content/uploads/2024/12/monitoramento-1024x681.webp', icon: 'alarm-clock-check', title: 'Monitoramento 24h', description: 'Nossa central acompanha todas as câmeras e sistemas de alarme 24 horas por dia, assegurando uma resposta imediata a qualquer incidente.' },
            { image: 'https://sunshield.com.br/wp-content/uploads/2025/06/sun-shield-35-1024x681.webp', icon: 'user-check', title: 'Controle de Acesso', description: 'Soluções para gerenciar o fluxo de entrada e saída de pessoas em ambientes corporativos, combinando segurança e organização.' }
        ]
    };

    const panelButtons = document.querySelectorAll('.panel-cta');
    const solutionSection = document.getElementById('solution-section');

    function updateSolutions(sector) {
        const solutions = sectorSolutions[sector];
        if (!solutions) return;

        solutions.forEach((solution, index) => {
            const card = document.querySelector(`#solution-section .solution-card:nth-child(${index + 1})`);
            if (card) {
                const imgEl = card.querySelector('.solution-image');
                const iconEl = card.querySelector('.solution-icon');
                const titleEl = card.querySelector('.solution-title');
                const descEl = card.querySelector('.solution-content p');

                if (imgEl) imgEl.src = solution.image;
                if (iconEl) iconEl.innerHTML = `<i data-lucide="${solution.icon}"></i>`;
                if (titleEl) titleEl.textContent = solution.title;
                if (descEl) descEl.textContent = solution.description;
            }
        });
        lucide.createIcons();
    }

    panelButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const sector = event.currentTarget.dataset.sector;
            if (sector) {
                updateSolutions(sector);
            }
            solutionSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- LÓGICA DA CÂMERA INTERATIVA (NOVA ABORDAGEM) ---
    const pupil = document.getElementById('camera-pupil');

    if (pupil) {
        // Posição central original da pupila no SVG
        const PUPIL_CENTER_X = 100;
        const PUPIL_CENTER_Y = 115;
        // O raio máximo que a pupila pode se mover do centro
        const MAX_OFFSET = 7; // Um pouco menor que o raio da íris

        window.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                const camera = document.getElementById('security-camera');
                const rect = camera.getBoundingClientRect();
                
                // Centro da câmera na tela
                const cameraCenterX = rect.left + rect.width / 2;
                const cameraCenterY = rect.top + rect.height / 2;

                // Vetor da câmera para o mouse
                const vectorX = e.clientX - cameraCenterX;
                const vectorY = e.clientY - cameraCenterY;

                // Normaliza o vetor (transforma em um vetor de comprimento 1)
                const length = Math.sqrt(vectorX * vectorX + vectorY * vectorY);
                const unitVectorX = vectorX / length;
                const unitVectorY = vectorY / length;

                // Calcula o novo deslocamento (offset) da pupila
                const offsetX = MAX_OFFSET * unitVectorX;
                const offsetY = MAX_OFFSET * unitVectorY;

                // Define a nova posição da pupila, baseada no centro original mais o deslocamento
                // Garante que o movimento não seja NaN se o mouse estiver exatamente no centro
                if (!isNaN(offsetX) && !isNaN(offsetY)) {
                    pupil.setAttribute('cx', PUPIL_CENTER_X + offsetX);
                    pupil.setAttribute('cy', PUPIL_CENTER_Y + offsetY);
                }
            });
        });
    }

    // --- INICIALIZAÇÕES GERAIS ---
    lucide.createIcons();
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    // Carrega as soluções padrão (solar) ao iniciar a página
    updateSolutions('solar');
});
