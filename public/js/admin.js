document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    loadAllData();
    setupAdminForms();
});

const API_Base = 'https://fullstack-admin-panel-backend.onrender.com/api';

// --- Tab Navigation ---
function setupNavigation() {
    const links = document.querySelectorAll('.sidebar .nav-link');
    const sections = document.querySelectorAll('.admin-section');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Activate Link
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show Section
            const targetId = link.getAttribute('data-target');
            sections.forEach(sec => sec.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
        });
    });
}

function loadAllData() {
    fetchProjects();
    fetchClients();
    fetchContacts();
    fetchSubscribers();
}

// --- Projects Logic ---
async function fetchProjects() {
    const tbody = document.querySelector('#projects-table tbody');
    try {
        const res = await fetch(`${API_Base}/projects`);
        const data = await res.json();
        tbody.innerHTML = data.map(p => `
            <tr>
                <td><img src="${p.image}" alt="img"></td>
                <td>${p.name}</td>
                <td>${p.description}</td>
            </tr>
        `).join('');
    } catch (err) { console.error(err); }
}

async function addProject(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', document.getElementById('proj-name').value);
    formData.append('description', document.getElementById('proj-desc').value);
    formData.append('image', document.getElementById('proj-image').files[0]);

    try {
        const res = await fetch(`${API_Base}/projects`, { method: 'POST', body: formData });
        if (res.ok) {
            alert('Project Added!');
            document.getElementById('add-project-form').reset();
            fetchProjects();
        } else alert('Failed to add project');
    } catch (err) { alert('Error adding project'); }
}

// --- Clients Logic ---
async function fetchClients() {
    const tbody = document.querySelector('#clients-table tbody');
    try {
        const res = await fetch(`${API_Base}/clients`);
        const data = await res.json();
        tbody.innerHTML = data.map(c => `
            <tr>
                <td><img src="${c.image}" alt="img"></td>
                <td>${c.name}</td>
                <td>${c.designation}</td>
                <td>${c.description}</td>
            </tr>
        `).join('');
    } catch (err) { console.error(err); }
}

async function addClient(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', document.getElementById('client-name').value);
    formData.append('designation', document.getElementById('client-role').value);
    formData.append('description', document.getElementById('client-desc').value);
    formData.append('image', document.getElementById('client-image').files[0]);

    try {
        const res = await fetch(`${API_Base}/clients`, { method: 'POST', body: formData });
        if (res.ok) {
            alert('Client Added!');
            document.getElementById('add-client-form').reset();
            fetchClients();
        } else alert('Failed to add client');
    } catch (err) { alert('Error adding client'); }
}

// --- Contact Logic ---
async function fetchContacts() {
    const tbody = document.querySelector('#contact-table tbody');
    try {
        const res = await fetch(`${API_Base}/contact`);
        const data = await res.json();
        tbody.innerHTML = data.map(c => `
            <tr>
                <td>${new Date(c.date).toLocaleDateString()}</td>
                <td>${c.fullName}</td>
                <td>${c.email}</td>
                <td>${c.mobile}</td>
                <td>${c.city}</td>
            </tr>
        `).join('');
    } catch (err) { console.error(err); }
}

// --- Subscriber Logic ---
async function fetchSubscribers() {
    const tbody = document.querySelector('#subscriber-table tbody');
    try {
        const res = await fetch(`${API_Base}/newsletter`);
        const data = await res.json();
        tbody.innerHTML = data.map(s => `
            <tr>
                <td>${new Date(s.date).toLocaleDateString()}</td>
                <td>${s.email}</td>
            </tr>
        `).join('');
    } catch (err) { console.error(err); }
}

// --- Setup Forms ---
function setupAdminForms() {
    document.getElementById('add-project-form').addEventListener('submit', addProject);
    document.getElementById('add-client-form').addEventListener('submit', addClient);
}
