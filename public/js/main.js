document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadClients();
    setupForms();
});

const API_Base = '/api';

// --- Toast Notification Logic ---
function showToast(message, type = 'success') {
    // Create toast element if it doesn't exist
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }

    // Set content and type
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// --- Load Projects ---
async function loadProjects() {
    const container = document.getElementById('projects-container');
    try {
        const res = await fetch(`${API_Base}/projects`);
        const projects = await res.json();

        container.innerHTML = '';
        if (projects.length === 0) {
            container.innerHTML = '<p class="text-center">No projects added yet.</p>';
            return;
        }

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <img src="${project.image}" alt="${project.name}" class="project-img">
                <div class="project-info">
                    <h5>Project</h5>
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <button class="btn btn-primary" onclick="showToast('Project details coming soon!', 'success')" style="margin-top: 1rem; padding: 0.5rem 1rem; font-size: 0.8rem;">Read More</button>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (err) {
        console.error('Error loading projects:', err);
        container.innerHTML = '<p>Failed to load projects.</p>';
        showToast('Failed to load projects', 'error');
    }
}

// --- Load Clients ---
async function loadClients() {
    const container = document.getElementById('clients-container');
    try {
        const res = await fetch(`${API_Base}/clients`);
        const clients = await res.json();

        container.innerHTML = '';
        if (clients.length === 0) {
            container.innerHTML = '<p class="text-center">No client stories yet.</p>';
            return;
        }

        clients.forEach(client => {
            const card = document.createElement('div');
            card.className = 'client-card';
            card.innerHTML = `
                <img src="${client.image}" alt="${client.name}" class="client-img">
                <div class="client-info">
                    <h4>${client.name}</h4>
                    <span>${client.designation}</span>
                    <p>"${client.description}"</p>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (err) {
        console.error('Error loading clients:', err);
        container.innerHTML = '<p>Failed to load clients.</p>';
        showToast('Failed to load clients', 'error');
    }
}

// --- Setup Forms ---
function setupForms() {
    // Newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;

            try {
                const res = await fetch(`${API_Base}/newsletter`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });

                if (res.ok) {
                    showToast('Subscribed successfully!', 'success');
                    newsletterForm.reset();
                } else {
                    const data = await res.json();
                    showToast(data.message || 'Subscription failed', 'error');
                }
            } catch (err) {
                console.error(err);
                showToast('Something went wrong.', 'error');
            }
        });
    }

    // Main Contact Form
    const contactForm = document.getElementById('main-contact-form');
    if (contactForm) {
        handleContactSubmit(contactForm, 'contact-name', 'contact-email', 'contact-mobile', 'contact-city');
    }

    // Hero Contact Form
    const heroForm = document.getElementById('hero-contact-form');
    // Note: Reusing the same API logic, just needing to map inputs simply
    if (heroForm) {
        heroForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Since hero form inputs don't have IDs in my HTML, I'll access by index or querySelector
            const inputs = heroForm.querySelectorAll('input');
            const data = {
                fullName: inputs[0].value,
                email: inputs[1].value,
                mobile: inputs[2].value,
                city: inputs[3].value
            };
            submitContact(data, heroForm);
        });
    }
}

function handleContactSubmit(form, nameId, emailId, mobileId, cityId) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            fullName: document.getElementById(nameId).value,
            email: document.getElementById(emailId).value,
            mobile: document.getElementById(mobileId).value,
            city: document.getElementById(cityId).value
        };
        submitContact(data, form);
    });
}

async function submitContact(data, form) {
    try {
        const res = await fetch(`${API_Base}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            showToast('Thank you! We will contact you soon.', 'success');
            form.reset();
        } else {
            showToast('Submission failed.', 'error');
        }
    } catch (err) {
        console.error(err);
        showToast('Something went wrong.', 'error');
    }
}
