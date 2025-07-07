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
                    if (mouse.x < this.x && this.x < canvas.width - this.size * 10) { this.x += 1,8; }
                    if (mouse.x > this.x && this.x > this.size * 10) { this.x -= 1,8; }
                    if (mouse.y < this.y && this.y < canvas.height - this.size * 10) { this.y += 1,8; }
                    if (mouse.y > this.y && this.y > this.size * 10) { this.y -= 1,8; }
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
            { icon: 'shield-check', title: 'Segurança Perimetral', description: 'Sensores de fibra ótica, cercas elétricas e barreiras de infravermelho para detecção precisa de invasões em grandes áreas.' },
            { icon: 'drone', title: 'Rondas com Drones', description: 'Drones autônomos com câmeras térmicas que cobrem todo o perímetro em minutos, identificando ameaças antes que se aproximem.' },
            { icon: 'video', title: 'Vigilância com IA', description: 'Câmeras que analisam comportamento, diferenciam animais de pessoas e alertam a central sobre qualquer atividade suspeita.' }
        ],
        industrial: [
            { icon: 'truck', title: 'Controle de Docas', description: 'Sistema de agendamento e verificação de lacres com reconhecimento de placas (LPR) para um controle logístico seguro e eficiente.' },
            { icon: 'eye', title: 'Prevenção de Perdas', description: 'Equipes especializadas e monitoramento discreto para identificar e mitigar riscos de furtos internos e externos de ativos.' },
            { icon: 'users', title: 'Gestão de Acesso', description: 'Plataforma integrada para gerir o acesso de funcionários, terceirizados e visitantes, definindo permissões por área e horário.' }
        ],
        corporate: [
            { icon: 'fingerprint', title: 'Acesso Biométrico', description: 'Catracas e portas com leitores de alta precisão que garantem o acesso rápido e seguro apenas a pessoas autorizadas.' },
            { icon: 'building', title: 'Gestão de Andares', description: 'Controle de elevadores integrado ao sistema de acesso, restringindo a circulação de visitantes a andares específicos.' },
            { icon: 'alarm-clock-check', title: 'Monitoramento 24h', description: 'Nossa central monitora todas as câmeras e sensores do edifício, acionando equipes de resposta a qualquer sinal de anormalidade.' }
        ]
    };

    const panelButtons = document.querySelectorAll('.panel-cta');
    const solutionSection = document.getElementById('solution-section');

    function updateSolutions(sector) {
        const solutions = sectorSolutions[sector];
        if (!solutions) return;

        solutions.forEach((solution, index) => {
            const iconEl = document.getElementById(`solution-${index + 1}-icon`);
            const titleEl = document.getElementById(`solution-${index + 1}-title`);
            const descEl = document.getElementById(`solution-${index + 1}-description`);

            if (iconEl && titleEl && descEl) {
                iconEl.innerHTML = `<i data-lucide="${solution.icon}"></i>`;
                titleEl.textContent = solution.title;
                descEl.textContent = solution.description;
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

    // --- INICIALIZAÇÕES GERAIS ---
    lucide.createIcons();
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    // Carrega as soluções padrão (solar) ao iniciar a página
    updateSolutions('solar');
});