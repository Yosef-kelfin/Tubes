// Papan Kepanitiaan & Volunteer Kampus — 100% Emoji Free

let defaultActivities = [
    {
        id: 1,
        title: 'Festival Seni & Budaya Mahasiswa 2026',
        category: 'acara seni dan budaya',
        category_label: 'Seni & Budaya',
        desc: 'Ajang unjuk bakat seni musik, tari tradisional, dan teater antar mahasiswa se-universitas.',
        poster: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
        date: '2026-08-15',
        deadline: '2026-08-10',
        status: 'Dibuka',
        contact: '6281234567890',
        teamsLink: 'https://teams.microsoft.com/l/meetup-join/...',
        divisions: [
            { name: 'Divisi Acara', quota: 5, filled: 1, requirements: 'Pengalaman minimal 1 kali event' },
            { name: 'Divisi Humas & Sponsorship', quota: 4, filled: 0, requirements: 'Komunikatif dan relasi luas' },
            { name: 'Divisi Dokumentasi', quota: 3, filled: 0, requirements: 'Memiliki kamera pribadi & skill editing' },
            { name: 'Divisi Konsumsi', quota: 4, filled: 0, requirements: 'Teliti dan bertanggung jawab' }
        ],
        applicants: [
            { id: 101, name: 'Budi Santoso', nim: 'L200220001', prodi: 'Teknik Informatika', division: 'Divisi Acara', reason: 'Ingin belajar mengelola event besar.', experience: 'Pernah panitia pensi.', portfolio: '', status: 'Menunggu' }
        ]
    }
];

let activities = JSON.parse(localStorage.getItem('campus_activities')) || defaultActivities;
let myRegistrations = JSON.parse(localStorage.getItem('my_registrations')) || [];
let currentUser = JSON.parse(localStorage.getItem('current_user')) || null;

let currentCategory = 'all';
let currentDivisionFilter = 'all';
let searchQuery = '';
let currentStatusFilter = 'all';
let activeActivityId = null;

// Theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
}

function updateThemeIcon(theme) {
    const btn = document.getElementById('theme-toggle-icon');
    if (!btn) return;
    if (theme === 'dark') {
        btn.innerHTML = `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`;
    } else {
        btn.innerHTML = `<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`;
    }
}

function saveStorage() {
    localStorage.setItem('campus_activities', JSON.stringify(activities));
    localStorage.setItem('my_registrations', JSON.stringify(myRegistrations));
    localStorage.setItem('current_user', JSON.stringify(currentUser));
    updateStats();
    updateAuthUI();
}

function updateStats() {
    const totalOpen = activities.filter(a => a.status === 'Dibuka').length;
    const totalDivs = activities.reduce((acc, curr) => acc + curr.divisions.reduce((dAcc, d) => dAcc + d.quota, 0), 0);
    const totalRegs = myRegistrations.length;

    document.getElementById('stat-open').textContent = totalOpen;
    document.getElementById('stat-slots').textContent = totalDivs;
    document.getElementById('stat-regs').textContent = totalRegs;
}

function updateAuthUI() {
    const authArea = document.getElementById('auth-nav-area');
    if (!authArea) return;

    if (currentUser) {
        authArea.innerHTML = `
            <span style="font-size: 0.8rem; font-weight: 700;">Halo, ${currentUser.name}</span>
            <button onclick="openProfileModal()" class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;">Profil</button>
            <button onclick="logout()" class="btn btn-danger" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;">Logout</button>
        `;
    } else {
        authArea.innerHTML = `
            <button onclick="openAuthModal('login')" class="btn btn-secondary" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;">Login</button>
            <button onclick="openAuthModal('register')" class="btn btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;">Registrasi</button>
        `;
    }
}

function getCountdown(deadlineStr) {
    const diff = new Date(deadlineStr) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days < 0) return 'Waktu Habis';
    if (days === 0) return 'Hari Terakhir!';
    return `${days} hari lagi`;
}

function renderActivities() {
    const grid = document.getElementById('activity-grid');
    
    activities.forEach(item => {
        const diff = new Date(item.deadline) - new Date();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        const totalQuota = item.divisions.reduce((sum, d) => sum + d.quota, 0);
        const totalFilled = item.divisions.reduce((sum, d) => sum + d.filled, 0);

        if ((days < 0 || totalFilled >= totalQuota) && item.status === 'Dibuka') {
            item.status = 'Ditutup';
        }
    });

    let filtered = activities.filter(item => {
        const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
        const matchesStatus = currentStatusFilter === 'all' || item.status === currentStatusFilter;
        const matchesDivision = currentDivisionFilter === 'all' || item.divisions.some(d => d.name.toLowerCase().includes(currentDivisionFilter.toLowerCase()));
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              item.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesStatus && matchesDivision && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; background: var(--bg-card); border-radius: 28px; border: 1px solid var(--border-color);">
                <h3 style="font-size: 1.15rem; font-weight: 800;">Tidak ada kegiatan ditemukan</h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">Coba ubah kata kunci pencarian atau filter kategori/divisi.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map((item) => {
        let statusClass = item.status === 'Dibuka' ? 'dibuka' : 'ditutup';
        const totalQuota = item.divisions.reduce((sum, d) => sum + d.quota, 0);
        const totalFilled = item.divisions.reduce((sum, d) => sum + d.filled, 0);
        const countdown = getCountdown(item.deadline);

        return `
            <div class="activity-card">
                <div class="card-img-wrap" onclick="openDetailModal(${item.id})">
                    <img src="${item.poster}" alt="${item.title}">
                    <span class="badge-status ${statusClass}">${item.status}</span>
                    <span class="countdown-badge">Sisa ${countdown}</span>
                    <button onclick="event.stopPropagation(); deleteActivity(${item.id})" class="delete-card-btn" title="Hapus">×</button>
                </div>
                <div class="card-content">
                    <div class="card-meta">
                        <span class="card-cat">${item.category_label}</span>
                        <span class="card-date">Batas: ${item.deadline}</span>
                    </div>
                    <h3 class="card-title" onclick="openDetailModal(${item.id})">${item.title}</h3>
                    <p class="card-desc">${item.desc}</p>
                    
                    <div class="card-footer">
                        <div class="quota-text">Kuota: <span>${totalFilled}/${totalQuota}</span></div>
                        <div style="display: flex; gap: 0.5rem;">
                            <button onclick="openApplicantsModal(${item.id})" class="btn btn-secondary" style="padding: 0.4rem 0.6rem; font-size: 0.75rem;" title="Kelola Pendaftar">Pendaftar (${item.applicants.length})</button>
                            <button onclick="openDetailModal(${item.id})" class="btn btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;">Daftar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function filterCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if(btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    renderActivities();
}

function handleSearch(query) {
    searchQuery = query;
    renderActivities();
}

function filterStatus(status) {
    currentStatusFilter = status;
    renderActivities();
}

function filterDivision(div) {
    currentDivisionFilter = div;
    renderActivities();
}

function deleteActivity(id) {
    if (confirm('Hapus kegiatan ini?')) {
        activities = activities.filter(a => a.id !== id);
        saveStorage();
        renderActivities();
    }
}

// Auth Modals
function openAuthModal(mode) {
    const title = document.getElementById('auth-modal-title');
    const submitBtn = document.getElementById('auth-submit-btn');
    const regFields = document.getElementById('auth-register-fields');

    if (mode === 'login') {
        title.textContent = 'Login Akun';
        submitBtn.textContent = 'Login';
        regFields.style.display = 'none';
    } else {
        title.textContent = 'Registrasi Akun';
        submitBtn.textContent = 'Daftar & Buat Akun';
        regFields.style.display = 'block';
    }
    document.getElementById('auth-modal').classList.add('show');
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.remove('show');
}

function logout() {
    currentUser = null;
    saveStorage();
    alert('Berhasil logout.');
}

// Detail & Registration Modal
function openDetailModal(id) {
    activeActivityId = id;
    const item = activities.find(a => a.id === id);
    if (!item) return;

    document.getElementById('modal-poster').src = item.poster;
    document.getElementById('modal-title').textContent = item.title;
    document.getElementById('modal-category').textContent = item.category_label;
    document.getElementById('modal-date').textContent = item.date;
    document.getElementById('modal-deadline').textContent = item.deadline;
    document.getElementById('modal-status').textContent = item.status;
    document.getElementById('modal-desc').textContent = item.desc;

    if (currentUser) {
        document.getElementById('reg-name').value = currentUser.name;
        document.getElementById('reg-nim').value = currentUser.nim;
        document.getElementById('reg-experience').value = currentUser.experience;
    }

    const waBtn = document.getElementById('modal-wa-btn');
    const teamsBtn = document.getElementById('modal-teams-btn');
    
    if (item.contact) {
        waBtn.href = `https://wa.me/${item.contact}?text=Halo%20penyelenggara%20kegiatan%20${encodeURIComponent(item.title)}`;
        waBtn.style.display = 'inline-flex';
    } else {
        waBtn.style.display = 'none';
    }

    if (item.teamsLink) {
        teamsBtn.href = item.teamsLink;
        teamsBtn.style.display = 'inline-flex';
    } else {
        teamsBtn.style.display = 'none';
    }

    const divSelect = document.getElementById('reg-division');
    const divList = document.getElementById('modal-divisions-list');

    divSelect.innerHTML = item.divisions.map(d => `
        <option value="${d.name}">${d.name} — Syarat: ${d.requirements} (Sisa: ${d.quota - d.filled})</option>
    `).join('');

    divList.innerHTML = item.divisions.map(d => `
        <div style="background: var(--bg-main); padding: 0.85rem 1rem; border-radius: 14px; border: 1px solid var(--border-color); font-size: 0.85rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                <span style="font-weight: 800;">${d.name}</span>
                <span style="padding: 0.2rem 0.6rem; background: rgba(37, 99, 235, 0.1); color: var(--primary); font-weight: 800; border-radius: 8px;">${d.filled} / ${d.quota} Kuota</span>
            </div>
            <p style="font-size: 0.75rem; color: var(--text-muted);">Syarat: ${d.requirements}</p>
        </div>
    `).join('');

    document.getElementById('detail-modal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
    document.getElementById('detail-modal').classList.remove('show');
    document.body.style.overflow = 'auto';
    activeActivityId = null;
}

// Organizer Applicants
function openApplicantsModal(id) {
    const item = activities.find(a => a.id === id);
    if (!item) return;

    const container = document.getElementById('applicants-list');
    document.getElementById('applicants-activity-title').textContent = item.title;

    if (!item.applicants || item.applicants.length === 0) {
        container.innerHTML = `<p style="font-size: 0.85rem; color: var(--text-muted); text-align: center; padding: 2.5rem; font-style: italic;">Belum ada pendaftar.</p>`;
    } else {
        container.innerHTML = item.applicants.map((app) => `
            <div style="background: var(--bg-main); padding: 1.25rem; border-radius: 16px; border: 1px solid var(--border-color); font-size: 0.85rem;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                    <div>
                        <h4 style="font-weight: 900; color: var(--text-main); font-size: 0.95rem;">${app.name} (${app.nim}) — ${app.prodi || ''}</h4>
                        <p style="color: var(--primary); font-weight: 700; font-size: 0.8rem;">Divisi: ${app.division}</p>
                    </div>
                    <span style="padding: 0.2rem 0.6rem; border-radius: 50px; font-weight: 800; font-size: 0.7rem; background: ${app.status === 'Diterima' ? '#ecfdf5' : app.status === 'Ditolak' ? '#fff1f2' : '#fef3c7'}; color: ${app.status === 'Diterima' ? '#047857' : app.status === 'Ditolak' ? '#be123c' : '#b45309'};">
                        ${app.status}
                    </span>
                </div>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 0.4rem;"><strong>Alasan:</strong> ${app.reason}</p>
                <p style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 0.8rem;"><strong>Pengalaman:</strong> ${app.experience || '-'}</p>
                
                <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                    <button onclick="updateApplicantStatus(${id}, ${app.id}, 'Ditolak')" class="btn btn-secondary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; background: #fee2e2; color: #991b1b;">Tolak</button>
                    <button onclick="updateApplicantStatus(${id}, ${app.id}, 'Diterima')" class="btn btn-primary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; background: #10b981;">Terima</button>
                    ${app.status === 'Diterima' ? `
                        <a href="https://wa.me/?text=Halo%20${encodeURIComponent(app.name)},%20Anda%20diterima!" target="_blank" class="btn btn-primary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; background: #10b981;">WhatsApp</a>
                        <a href="${item.teamsLink || '#'}" target="_blank" class="btn btn-primary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; background: #5558af;">Teams</a>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }
    document.getElementById('applicants-modal').classList.add('show');
}

function closeApplicantsModal() {
    document.getElementById('applicants-modal').classList.remove('show');
}

function updateApplicantStatus(activityId, appId, newStatus) {
    const act = activities.find(a => a.id === activityId);
    const app = act.applicants.find(ap => ap.id === appId);
    if (app) {
        app.status = newStatus;
        const myReg = myRegistrations.find(r => r.id === appId);
        if (myReg) myReg.status = newStatus;

        saveStorage();
        openApplicantsModal(activityId);
        renderActivities();
    }
}

// Profile Modal
function openProfileModal() {
    if (!currentUser) {
        alert('Silakan login terlebih dahulu!');
        openAuthModal('login');
        return;
    }
    document.getElementById('profile-name').value = currentUser.name;
    document.getElementById('profile-nim').value = currentUser.nim;
    document.getElementById('profile-prodi').value = currentUser.prodi;
    document.getElementById('profile-angkatan').value = currentUser.angkatan;
    document.getElementById('profile-skills').value = currentUser.skills;
    document.getElementById('profile-experience').value = currentUser.experience;

    document.getElementById('profile-modal').classList.add('show');
}

function closeProfileModal() {
    document.getElementById('profile-modal').classList.remove('show');
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateStats();
    updateAuthUI();
    renderActivities();

    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('auth-name').value.trim();
            const nim = document.getElementById('auth-nim').value.trim();
            const prodi = document.getElementById('auth-prodi').value.trim();
            const angkatan = document.getElementById('auth-angkatan').value.trim();

            currentUser = {
                name, nim, prodi, angkatan,
                skills: 'Manajemen Acara, Public Speaking',
                experience: 'Staff Organisasi Kampus'
            };

            saveStorage();
            closeAuthModal();
            authForm.reset();
            alert(`Selamat datang, ${currentUser.name}! Anda berhasil login.`);
        });
    }

    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            currentUser.name = document.getElementById('profile-name').value.trim();
            currentUser.nim = document.getElementById('profile-nim').value.trim();
            currentUser.prodi = document.getElementById('profile-prodi').value.trim();
            currentUser.angkatan = document.getElementById('profile-angkatan').value.trim();
            currentUser.skills = document.getElementById('profile-skills').value.trim();
            currentUser.experience = document.getElementById('profile-experience').value.trim();

            saveStorage();
            closeProfileModal();
            alert('Profil berhasil diperbarui!');
        });
    }

    const regForm = document.getElementById('registration-form');
    if (regForm) {
        regForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!currentUser) {
                alert('Silakan login terlebih dahulu untuk mendaftar!');
                openAuthModal('login');
                return;
            }
            if (!activeActivityId) return;

            const division = document.getElementById('reg-division').value;
            const reason = document.getElementById('reg-reason').value.trim();
            const experience = document.getElementById('reg-experience').value.trim();
            const portfolio = document.getElementById('reg-portfolio').value.trim();

            const item = activities.find(a => a.id === activeActivityId);
            const divObj = item.divisions.find(d => d.name === division);

            if (divObj.filled >= divObj.quota) {
                alert('Maaf, kuota divisi ini sudah penuh!');
                return;
            }

            divObj.filled++;
            const newApplicant = { 
                id: Date.now(), 
                name: currentUser.name, 
                nim: currentUser.nim, 
                prodi: currentUser.prodi,
                division, 
                reason, 
                experience, 
                portfolio, 
                status: 'Menunggu' 
            };
            item.applicants.push(newApplicant);

            myRegistrations.push({
                id: newApplicant.id,
                activityTitle: item.title,
                division,
                date: item.date,
                status: 'Menunggu'
            });

            saveStorage();
            renderActivities();
            closeDetailModal();
            regForm.reset();
            alert('Pendaftaran berhasil dikirim! Status pendaftaran Anda: Menunggu.');
        });
    }

    const createForm = document.getElementById('create-activity-form');
    if (createForm) {
        createForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('create-title').value.trim();
            const category = document.getElementById('create-category').value;
            const desc = document.getElementById('create-desc').value.trim();
            const date = document.getElementById('create-date').value;
            const deadline = document.getElementById('create-deadline').value;
            const contact = document.getElementById('create-contact').value.trim() || '6281234567890';
            const teamsLink = document.getElementById('create-teams').value.trim() || 'https://teams.microsoft.com/';
            const poster = document.getElementById('create-poster').value.trim() || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80';

            let categoryLabel = 'Seminar & Workshop';
            if (category === 'lomba dan kompetisi') categoryLabel = 'Lomba & Kompetisi';
            if (category === 'kegiatan sosial dan volunteer') categoryLabel = 'Sosial & Volunteer';
            if (category === 'acara seni dan budaya') categoryLabel = 'Acara Seni & Budaya';
            if (category === 'olahraga') categoryLabel = 'Olahraga';
            if (category === 'orientasi dan kaderisasi') categoryLabel = 'Orientasi & Kader';

            const newAct = {
                id: Date.now(),
                title, category, category_label: categoryLabel, desc, poster, date, deadline, contact, teamsLink,
                status: 'Dibuka',
                divisions: [
                    { name: 'Divisi Acara', quota: 5, filled: 0, requirements: 'Komunikatif & aktif' },
                    { name: 'Divisi Humas', quota: 5, filled: 0, requirements: 'Good looking & relasi luas' }
                ],
                applicants: []
            };

            activities.unshift(newAct);
            saveStorage();
            renderActivities();
            closeCreateModal();
            createForm.reset();
            alert('Kegiatan baru berhasil dipublikasikan!');
        });
    }
});

function openCreateModal() {
    if (!currentUser) {
        alert('Silakan login terlebih dahulu untuk membuat kegiatan!');
        openAuthModal('login');
        return;
    }
    document.getElementById('create-modal').classList.add('show');
}

function closeCreateModal() {
    document.getElementById('create-modal').classList.remove('show');
}

function openMyRegistrationsModal() {
    if (!currentUser) {
        alert('Silakan login terlebih dahulu!');
        openAuthModal('login');
        return;
    }
    const listContainer = document.getElementById('my-registrations-list');
    if (myRegistrations.length === 0) {
        listContainer.innerHTML = `<p style="font-size: 0.85rem; color: var(--text-muted); text-align: center; padding: 2.5rem; font-style: italic;">Anda belum pernah mendaftar ke kegiatan apapun. Riwayat kegiatan ini dapat menjadi rujukan pengalaman organisasi Anda.</p>`;
    } else {
        listContainer.innerHTML = myRegistrations.map((reg, idx) => `
            <div style="background: var(--bg-main); padding: 1.25rem; border-radius: 16px; border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem;">
                <div>
                    <h4 style="font-weight: 800; color: var(--text-main); font-size: 0.95rem; margin-bottom: 0.2rem;">${reg.activityTitle}</h4>
                    <p style="color: var(--text-muted); font-size: 0.8rem;">Divisi: <span style="font-weight: 700; color: var(--primary);">${reg.division}</span> • Pelaksanaan: ${reg.date}</p>
                    <span style="display: inline-block; margin-top: 0.5rem; padding: 0.2rem 0.6rem; background: #fef3c7; color: #b45309; font-weight: 800; border-radius: 8px; font-size: 0.7rem;">Status: ${reg.status}</span>
                </div>
                <button onclick="cancelRegistration(${idx})" class="btn btn-danger" style="padding: 0.45rem 0.9rem; font-size: 0.75rem;">Batalkan</button>
            </div>
        `).join('');
    }
    document.getElementById('my-registrations-modal').classList.add('show');
}

function closeMyRegistrationsModal() {
    document.getElementById('my-registrations-modal').classList.remove('show');
}

function cancelRegistration(idx) {
    if (confirm('Batalkan pendaftaran ini?')) {
        myRegistrations.splice(idx, 1);
        saveStorage();
        openMyRegistrationsModal();
    }
}
