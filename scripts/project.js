    // --- 1. Theme Toggle Logic ---
        const themeBtns = [document.getElementById('theme-toggle-desktop'), document.getElementById('theme-toggle-mobile')];
        const htmlElement = document.documentElement;
        
        // Check for saved user preference, default to system preference or light
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }

        function toggleTheme() {
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                localStorage.theme = 'light';
                updateChartTheme('light');
            } else {
                htmlElement.classList.add('dark');
                localStorage.theme = 'dark';
                updateChartTheme('dark');
            }
        }

        themeBtns.forEach(btn => {
            if(btn) btn.addEventListener('click', toggleTheme);
        });

        // --- 2. Mobile Menu Toggle ---
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const sidebar = document.querySelector('aside');
        
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
            sidebar.classList.toggle('absolute');
            sidebar.classList.toggle('h-full');
            sidebar.classList.toggle('top-0');
            sidebar.classList.toggle('left-0');
            sidebar.classList.toggle('w-64');
        });

        // --- 3. Chart.js Configuration ---
        const ctx = document.getElementById('cashFlowChart').getContext('2d');
        
        // Chart Defaults
        Chart.defaults.font.family = "'Inter', sans-serif";
        
        const cashFlowChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Start', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10'],
                datasets: [
                    {
                        label: 'Annual Cash Flow',
                        data: [-30, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5],
                        backgroundColor: (context) => {
                            const value = context.raw;
                            return value < 0 ? 'rgba(239, 68, 68, 0.7)' : 'rgba(34, 197, 94, 0.7)';
                        },
                        borderColor: (context) => {
                            const value = context.raw;
                            return value < 0 ? 'rgb(220, 38, 38)' : 'rgb(22, 163, 74)';
                        },
                        borderWidth: 1,
                        order: 2
                    },
                    {
                        label: 'Cumulative Cash Flow',
                        data: [-30, -24.5, -19.0, -13.5, -8.0, -2.5, 3.0, 8.5, 14.0, 19.5, 25.0],
                        type: 'line',
                        borderColor: 'rgb(59, 130, 246)',
                        borderWidth: 3,
                        pointBackgroundColor: 'rgb(59, 130, 246)',
                        tension: 0.3,
                        order: 1,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) { label += ': '; }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(context.parsed.y) + ' M';
                                }
                                return label;
                            }
                        }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#475569' // Default light mode text
                        }
                    },
                    annotation: {
                        annotations: {
                            line1: {
                                type: 'line',
                                yMin: 0,
                                yMax: 0,
                                borderColor: 'rgb(100, 116, 139)',
                                borderWidth: 1,
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: { color: '#e2e8f0' },
                        ticks: {
                            color: '#64748b',
                            callback: function(value) { return '€' + value + 'M'; }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#64748b' }
                    }
                }
            }
        });

        // --- 4. Function to Update Chart Colors based on Theme ---
        function updateChartTheme(theme) {
            const isDark = theme === 'dark';
            const textColor = isDark ? '#cbd5e1' : '#64748b';
            const gridColor = isDark ? '#334155' : '#e2e8f0';

            cashFlowChart.options.scales.y.grid.color = gridColor;
            cashFlowChart.options.scales.y.ticks.color = textColor;
            cashFlowChart.options.scales.x.ticks.color = textColor;
            cashFlowChart.options.plugins.legend.labels.color = textColor;
            
            cashFlowChart.update();
        }

        // Initialize Chart Theme on Load
        if (htmlElement.classList.contains('dark')) {
            updateChartTheme('dark');
        }
