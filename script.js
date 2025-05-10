// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// Energy Chart Configuration
const canvas = document.getElementById('energyChart');
        const ctx = canvas.getContext('2d');

        // Data setup (using sample values - replace with actual data)
        const data = [
            { year: 2016, value: 174 },
            { year: 2017, value: 181 },
            { year: 2018, value: 182 },
            { year: 2019, value: 178 },
            { year: 2020, value: 173 },
            { year: 2021, value: 177 },
            { year: 2022, value: 182 },
            { year: 2023, value: 184 }
        ];

        // Chart configuration
        const config = {
            margin: { top: 60, right: 40, bottom: 60, left: 80 },
            gridColor: '#ddd',
            lineColor: '#e74c3c',
            pointRadius: 5,
            fontSize: 14,
            yLabels: [172, 174, 176, 178, 180, 182, 184, 186]  // Custom y-axis labels
        };

        // Calculate drawing area
        const chartWidth = canvas.width - config.margin.left - config.margin.right;
        const chartHeight = canvas.height - config.margin.top - config.margin.bottom;

        // Scaling factors
        const xScale = chartWidth / (data.length - 1);
        const yMin = Math.min(...config.yLabels);
        const yMax = Math.max(...config.yLabels);
        const yRange = yMax - yMin;
        const yScale = chartHeight / yRange;

        // Set up high-DPI canvas
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = canvas.offsetHeight * dpr;
        ctx.scale(dpr, dpr);

        ctx.translate(config.margin.left, config.margin.top);

        // Draw grid
        ctx.strokeStyle = config.gridColor;
        ctx.beginPath();
        
        // Vertical grid
        data.forEach((d, i) => {
            const x = i * xScale;
            ctx.moveTo(x, 0);
            ctx.lineTo(x, chartHeight);
        });

        // Horizontal grid (using custom yLabels)
        config.yLabels.forEach(y => {
            const yPos = chartHeight - (y - yMin) * yScale;
            ctx.moveTo(0, yPos);
            ctx.lineTo(chartWidth, yPos);
        });
        ctx.stroke();

        // Draw axes
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        // Y-axis
        ctx.moveTo(0, 0);
        ctx.lineTo(0, chartHeight);
        // X-axis
        ctx.moveTo(0, chartHeight);
        ctx.lineTo(chartWidth, chartHeight);
        ctx.stroke();

        // Draw data line
        ctx.strokeStyle = config.lineColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        data.forEach((d, i) => {
            const x = i * xScale;
            const y = chartHeight - (d.value - yMin) * yScale;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Draw data points
        ctx.fillStyle = config.lineColor;
        data.forEach((d, i) => {
            const x = i * xScale;
            const y = chartHeight - (d.value - yMin) * yScale;
            ctx.beginPath();
            ctx.arc(x, y, config.pointRadius, 0, Math.PI * 2);
            ctx.fill();
        });

        // Labels
        ctx.fillStyle = '#000';
        ctx.font = `${config.fontSize}px Arial`;
        ctx.textAlign = 'center';

        // X-axis labels
        data.forEach((d, i) => {
            const x = i * xScale;
            ctx.fillText(d.year, x, chartHeight + 35);
        });

        // Y-axis labels
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        config.yLabels.forEach(y => {
            const yPos = chartHeight - (y - yMin) * yScale;
            ctx.fillText(y, -10, yPos);
        });

        // Y-axis title
        ctx.save();
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Billion Idiowatt-hours', -chartHeight/2, -config.margin.left + 30);
        ctx.restore();

        // Chart title
        ctx.font = `bold ${config.fontSize + 4}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText("Egypt's Fossil Fuel Power Generation Over Time", 
                    chartWidth/2, -config.margin.top + 40);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Demo video modal
const demoVideoBtn = document.querySelector('a[href="#demo-video"]');
if (demoVideoBtn) {
    demoVideoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">MoanaBlast Demo Video</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="ratio ratio-16x9">
                            <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
                                    title="MoanaBlast Demo" 
                                    allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
        modal.addEventListener('hidden.bs.modal', function() {
            modal.remove();
        });
    });
}

// Add team members dynamically
const teamMembers = [
    { name: 'Team Member 1', role: 'Project Lead', image: 'team1.jpg' },
    { name: 'Team Member 2', role: 'Technical Lead', image: 'team2.jpg' },
    { name: 'Team Member 3', role: 'Design Lead', image: 'team3.jpg' },
    // Add more team members as needed
];

const teamGrid = document.querySelector('.team-grid');
if (teamGrid) {
    teamMembers.forEach(member => {
        const memberElement = document.createElement('div');
        memberElement.className = 'team-member text-center';
        memberElement.innerHTML = `
            <img src="${member.image}" alt="${member.name}" class="img-fluid rounded-circle mb-3">
            <h4>${member.name}</h4>
            <p class="text-muted">${member.role}</p>
        `;
        teamGrid.appendChild(memberElement);
    });
}

// Add scroll-based animations
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight) && (elementBottom >= 0);
        
        if (isVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}); 