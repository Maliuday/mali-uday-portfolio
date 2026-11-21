// ==========================================================================
// UDAY MALI - CLOUD, DEVOPS & TECHNICAL SUPPORT INTERACTIVE PORTFOLIO ENGINE
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // 1. THEME TOGGLE (DARK / LIGHT MODE)
    // ----------------------------------------------------------------------
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
        });
    }

    // ----------------------------------------------------------------------
    // 2. DUAL RESUME DROPDOWN
    // ----------------------------------------------------------------------
    const resumeDropdown = document.querySelector('.resume-dropdown');
    const resumeTrigger = document.getElementById('resumeTrigger');

    if (resumeDropdown && resumeTrigger) {
        resumeTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = resumeDropdown.classList.toggle('open');
            resumeTrigger.setAttribute('aria-expanded', isOpen);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!resumeDropdown.contains(e.target)) {
                resumeDropdown.classList.remove('open');
                resumeTrigger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ----------------------------------------------------------------------
    // 3. MOBILE MENU TOGGLE
    // ----------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            mobileToggle.classList.toggle('active');
        });

        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // ----------------------------------------------------------------------
    // 4. TYPING ANIMATION (Including Tech Support & Cloud Roles)
    // ----------------------------------------------------------------------
    const typingElement = document.getElementById('typingText');
    const roles = [
        'Technical Support Engineer',
        'Cloud & DevOps Engineer',
        'IT Systems & Troubleshooting Specialist',
        'AWS Solutions Architect',
        'CI/CD Pipeline Automation Engineer',
        'Customer Support Executive',
        'MCA Scholar & 1st Prize Avishkar Winner'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeEffect() {
        if (!typingElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 35;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 85;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 1600;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 350;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();

    // ----------------------------------------------------------------------
    // 5. PROJECT CATEGORY FILTERING
    // ----------------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 6. ARCHITECTURE DIAGRAM TABS
    // ----------------------------------------------------------------------
    const archTabs = document.querySelectorAll('.arch-tab-btn');
    const archViews = document.querySelectorAll('.architecture-view');

    archTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const archId = tab.getAttribute('data-arch');

            archTabs.forEach(t => t.classList.remove('active'));
            archViews.forEach(v => v.classList.remove('active'));

            tab.classList.add('active');
            const targetView = document.getElementById(`arch-${archId}`);
            if (targetView) {
                targetView.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------------------------
    // 7. INTERACTIVE CLOUDSHELL TERMINAL
    // ----------------------------------------------------------------------
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalInput = document.getElementById('terminalInput');
    const terminalSubmit = document.getElementById('terminalSubmit');
    const quickChips = document.querySelectorAll('.quick-chip');

    let commandHistory = [];
    let historyIndex = -1;

    const commands = {
        help: `Available commands:
  • <span class="term-highlight">support</span>      - View IT & Technical Support competencies & tools
  • <span class="term-highlight">skills</span>       - List full skill competencies (Cloud, Support, DevOps)
  • <span class="term-highlight">projects</span>     - Display featured Cloud & Support engineering work
  • <span class="term-highlight">achievements</span> - Show certifications, awards & 1st prize honors
  • <span class="term-highlight">education</span>    - Display academic degrees, universities & GPAs
  • <span class="term-highlight">about</span>        - Summary of background and dual engineering focus
  • <span class="term-highlight">contact</span>      - Show email, phone, location & profiles
  • <span class="term-highlight">resume</span>       - Access both DevOps & Technical Support Resumes
  • <span class="term-highlight">sudo hire-uday</span>- Connect immediately for job openings
  • <span class="term-highlight">clear</span>        - Clear terminal screen`,

        support: `<span class="term-success">== TECHNICAL & IT SUPPORT PROFILE ==</span>
• <span class="term-highlight">OS Support</span>         : Windows 10/11, Linux (Ubuntu/Debian), driver installs, BSOD triage
• <span class="term-highlight">Network Diagnostics</span>: TCP/IP, DNS, DHCP, ping, traceroute, nslookup, netstat, VPN setup
• <span class="term-highlight">Remote Tools</span>       : Remote Desktop (RDP), AnyDesk, TeamViewer, SSH
• <span class="term-highlight">Productivity</span>       : MS Excel, MS Word, Outlook configuration, Google Workspace
• <span class="term-highlight">Customer Excellence</span>: Active listening, issue de-escalation, high FCR, clear documentation
• <span class="term-highlight">Shift Availability</span> : 24/7 Rotational shifts ready, immediate joining available`,

        about: `<span class="term-success">== UDAY MANOJ MALI ==</span>
Cloud, DevOps & Technical Support Engineer based in Pune / Jalgaon, Maharashtra, India.
BCA graduate from Moolji Jaitha College with 8.18 CGPA. Currently pursuing MCA at KBC North Maharashtra University.
Combines deep cloud/Linux/DevOps expertise with dedicated IT troubleshooting, customer support, and rotational shift readiness.`,

        skills: `<span class="term-success">== TECHNICAL SKILLS MATRIX ==</span>
[Technical Support] : Windows 10/11, Linux, RDP, AnyDesk, Network CLI diagnostics, MS Office, Customer Support
[Cloud Platforms]  : AWS (VPC, EC2, S3, RDS, ALB, ASG, IAM, Route53, CloudWatch, Lambda)
[DevOps & IaC]     : Terraform (HCL), Docker, Docker Compose, Kubernetes, Jenkins, GitHub Actions
[Languages & DBs]  : Python, Bash Shell, SQL, PostgreSQL, MySQL, HTML5/CSS3/JavaScript`,

        projects: `<span class="term-success">== FEATURED PROJECTS ==</span>
1. <span class="term-highlight">IT Support & Network Troubleshooting Workbench</span> (DNS/DHCP isolation, RDP, SOPs)
2. <span class="term-highlight">AWS Three-Tier Architecture</span> (Multi-AZ VPC, ALB, ASG, RDS, NGINX)
3. <span class="term-highlight">Terraform IaC Provisioning</span> (7-Day Challenge, Modular HCL, Docker & AWS)
4. <span class="term-highlight">GitHub Actions & Docker CI/CD</span> (Automated Pytest, Docker Build, EC2 Deployment)
5. <span class="term-highlight">Jenkins CI/CD Pipeline</span> (Declarative Jenkinsfile, Automated Tests, Health Check)`,

        achievements: `<span class="term-success">== HONORS & CERTIFICATIONS ==</span>
🏆 <span class="term-highlight">1st Prize Winner</span> - Avishkar Research Convention (District Level 2025, State Finalist)
☁️ <span class="term-highlight">AWS Cloud Practitioner Essentials</span> - Official Amazon Web Services certification
⚡ <span class="term-highlight">7-Day Terraform IaC Challenge</span> - Automated modular cloud infrastructure provisioning
💼 <span class="term-highlight">CI/CD & Docker Automation Workflow</span> - Practical pipeline & container orchestrations
🎓 <span class="term-highlight">Academic Distinction</span> - 8.18 CGPA in BCA & 89.40% in Secondary Schooling`,

        education: `<span class="term-success">== ACADEMIC BACKGROUND ==</span>
• <span class="term-highlight">MCA (Pursuing 2025–2027)</span>: School of Computer Science, KBC North Maharashtra University, Jalgaon
• <span class="term-highlight">BCA (2022–2025)</span>: Moolji Jaitha College, Jalgaon | CGPA: 8.18 / 10.0 (Distinction)
• <span class="term-highlight">HSC (2021–2022)</span>: Ladkubai Vidyamandir & DSMP Jr. College | 73.50%
• <span class="term-highlight">SSC (2019–2020)</span>: Ladkubai Vidya Mandir, Bhadgaon | 89.40% (Distinction)`,

        contact: `<span class="term-success">== CONTACT INFORMATION ==</span>
• Email    : <a href="mailto:maliuday0326@gmail.com" class="term-highlight">maliuday0326@gmail.com</a>
• Phone    : <a href="tel:+918626060798" class="term-highlight">+91-8626060798</a>
• GitHub   : <a href="https://github.com/Maliuday" target="_blank" class="term-highlight">https://github.com/Maliuday</a>
• LinkedIn : <a href="https://linkedin.com/in/uday-mali-7aa1b7286" target="_blank" class="term-highlight">https://linkedin.com/in/uday-mali-7aa1b7286</a>
• Location : Pune / Jalgaon, Maharashtra, India`,

        resume: `<span class="term-success">[RESUME SELECTOR]:</span>
1. <a href="assets/docs/Uday_Mali_DevOps_Resume.pdf" target="_blank" class="term-highlight">Click to open Cloud & DevOps Resume (PDF)</a>
2. <a href="assets/docs/Uday_Mali_Support_Resume.pdf" target="_blank" class="term-highlight">Click to open Technical Support Resume (PDF)</a>`,

        'resume devops': () => {
            window.open('assets/docs/Uday_Mali_DevOps_Resume.pdf', '_blank');
            return `<span class="term-success">Opening Cloud & DevOps Resume...</span>`;
        },

        'resume support': () => {
            window.open('assets/docs/Uday_Mali_Support_Resume.pdf', '_blank');
            return `<span class="term-success">Opening Technical Support Resume...</span>`;
        },

        'sudo hire-uday': `<span class="term-success">🚀 [ACCESS GRANTED]: You have connected with top talent in Cloud, DevOps & Tech Support!</span>
Uday Mali is currently open to full-time roles & internships in Cloud Engineering, DevOps, and Technical Support.
👉 Please reach out directly at <a href="mailto:maliuday0326@gmail.com" class="term-highlight">maliuday0326@gmail.com</a> or call <a href="tel:+918626060798" class="term-highlight">+91-8626060798</a>.`,

        whoami: `visitor@uday-portfolio (Role: Recruiter / Support Manager / Tech Lead)`,

        date: () => new Date().toUTCString()
    };

    function executeCommand(rawCmd) {
        if (!terminalOutput) return;

        const cmd = rawCmd.trim().toLowerCase();
        if (!cmd) return;

        commandHistory.push(rawCmd);
        historyIndex = commandHistory.length;

        const cmdLine = document.createElement('div');
        cmdLine.className = 'term-line';
        cmdLine.innerHTML = `<span class="term-prompt">uday@cloud:~$</span> ${escapeHTML(rawCmd)}`;
        terminalOutput.appendChild(cmdLine);

        if (cmd === 'clear') {
            terminalOutput.innerHTML = `
                <div class="term-line">
                    <span class="term-prompt">Uday's Cloud & Support Shell v2.6 (x86_64-aws-linux)</span>
                </div>
                <div class="term-line">
                    <span class="term-muted">Screen cleared. Type <span class="term-highlight">'help'</span> for options.</span>
                </div>
            `;
            return;
        }

        const responseLine = document.createElement('div');
        responseLine.className = 'term-line';

        if (commands[cmd]) {
            const resp = typeof commands[cmd] === 'function' ? commands[cmd]() : commands[cmd];
            responseLine.innerHTML = resp.replace(/\n/g, '<br>');
        } else {
            responseLine.innerHTML = `<span class="term-error">command not found: ${escapeHTML(rawCmd)}</span>. Type <span class="term-highlight">'help'</span> for available commands.`;
        }

        terminalOutput.appendChild(responseLine);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = terminalInput.value;
                terminalInput.value = '';
                executeCommand(val);
            } else if (e.key === 'ArrowUp') {
                if (historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = commandHistory[historyIndex];
                }
                e.preventDefault();
            } else if (e.key === 'ArrowDown') {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    terminalInput.value = '';
                }
                e.preventDefault();
            }
        });
    }

    if (terminalSubmit && terminalInput) {
        terminalSubmit.addEventListener('click', () => {
            const val = terminalInput.value;
            terminalInput.value = '';
            executeCommand(val);
        });
    }

    quickChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const cmd = chip.getAttribute('data-cmd');
            if (cmd) executeCommand(cmd);
        });
    });

    // ----------------------------------------------------------------------
    // 8. COPY TO CLIPBOARD BUTTONS
    // ----------------------------------------------------------------------
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalText = btn.textContent;
                    btn.textContent = '✓ Copied!';
                    btn.style.color = '#10b981';
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.color = '';
                    }, 2000);
                });
            }
        });
    });

    // ----------------------------------------------------------------------
    // 9. CONTACT FORM SUBMISSION
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            formStatus.className = 'form-status success';
            formStatus.innerHTML = `✓ Thank you, <strong>${escapeHTML(name)}</strong>! Your message has been prepared. Opening your email client...`;

            const mailtoUri = `mailto:maliuday0326@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            setTimeout(() => {
                window.location.href = mailtoUri;
                contactForm.reset();
            }, 1000);
        });
    }

    // ----------------------------------------------------------------------
    // 10. ACTIVE NAV LINK ON SCROLL
    // ----------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links .nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

});
