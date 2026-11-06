<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Papan Kepanitiaan & Volunteer Kampus</title>
    <!-- Google Fonts: Plus Jakarta Sans (Clean, Modern, Friendly) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
    <!-- Native CSS Stylesheet -->
    <link rel="stylesheet" href="assets/css/style.css">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
</head>
<body>

    <!-- Header / Navbar -->
    <header>
        <div class="header-container">
            <div class="logo-area">
                <div class="logo-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
                </div>
                <div class="logo-text">
                    <h1>PapanKepanitiaan.</h1>
                    <p>Portal Informasi & Rekrutmen Volunteer Kampus</p>
                </div>
            </div>
            
            <div class="nav-actions" id="auth-nav-area">
                <!-- Dynamically rendered by JS -->
            </div>
            <div class="nav-actions" style="margin-left: 0.5rem;">
                <button onclick="toggleTheme()" class="theme-toggle-btn" id="theme-toggle-icon" title="Ubah Tema">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
                </button>
                <button onclick="openMyRegistrationsModal()" class="btn btn-secondary" style="font-size: 0.75rem;">Riwayat</button>
                <button onclick="openCreateModal()" class="btn btn-primary" style="font-size: 0.75rem;">Buat Acara</button>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main>
        
        <!-- Hero Section & Stats -->
        <div class="hero">
            <div class="hero-badge">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                Temukan Kepanitiaan & Volunteer Kampus Impianmu
            </div>
            <h2>Berkontribusi & Kembangkan Portofolio</h2>
            <p>Satu platform untuk mencari lowongan kegiatan, mendaftar ke berbagai divisi, dan mengelola pendaftar dengan mudah.</p>
            
            <!-- Stats Counter Bar -->
            <div class="stats-bar">
                <div class="stat-item">
                    <h3 id="stat-open">0</h3>
                    <p>Kegiatan Dibuka</p>
                </div>
                <div class="stat-item">
                    <h3 id="stat-slots" style="color: var(--primary);">0</h3>
                    <p>Total Kuota Divisi</p>
                </div>
                <div class="stat-item">
                    <h3 id="stat-regs" style="color: #10b981;">0</h3>
                    <p>Lamaran Saya</p>
                </div>
            </div>

            <!-- Search, Status & Division Filter Bar -->
            <div class="controls-bar" style="flex-wrap: wrap;">
                <div class="search-box">
                    <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    <input type="text" id="search-input" oninput="handleSearch(this.value)" placeholder="Cari nama kegiatan atau deskripsi...">
                </div>
                <div>
                    <select id="status-filter" onchange="filterStatus(this.value)" class="select-filter">
                        <option value="all">Semua Status</option>
                        <option value="Dibuka">Dibuka</option>
                        <option value="Ditutup">Ditutup</option>
                        <option value="Berlangsung">Berlangsung</option>
                        <option value="Selesai">Selesai</option>
                    </select>
                </div>
                <div>
                    <select id="division-filter" onchange="filterDivision(this.value)" class="select-filter">
                        <option value="all">Semua Divisi</option>
                        <option value="Acara">Acara</option>
                        <option value="Humas">Humas</option>
                        <option value="Dokumentasi">Dokumentasi</option>
                        <option value="Konsumsi">Konsumsi</option>
                    </select>
                </div>
            </div>
        </div>

        <?php
        $categories = [
            'all' => 'Semua Kategori',
            'seminar dan workshop' => 'Seminar & Workshop',
            'lomba dan kompetisi' => 'Lomba & Kompetisi',
            'kegiatan sosial dan volunteer' => 'Sosial & Volunteer',
            'acara seni dan budaya' => 'Seni & Budaya',
            'olahraga' => 'Olahraga',
            'orientasi dan kaderisasi' => 'Orientasi & Kader'
        ];
        ?>

        <!-- Filter Buttons -->
        <div class="categories-filter">
            <?php foreach ($categories as $key => $label): ?>
                <button onclick="filterCategory('<?php echo $key; ?>')" 
                    class="filter-btn <?php echo $key === 'all' ? 'active' : ''; ?>" 
                    data-filter="<?php echo $key; ?>">
                    <?php echo $label; ?>
                </button>
            <?php endforeach; ?>
        </div>

        <!-- Activity Grid -->
        <div id="activity-grid" class="activity-grid">
            <!-- Rendered dynamically by JS -->
        </div>
    </main>

    <!-- Footer -->
    <footer>
        <p>&copy; 2026 Papan Kepanitiaan & Volunteer Kampus. Native PHP, CSS & JavaScript.</p>
    </footer>

    <!-- Auth Modal (Login / Registrasi) -->
    <div id="auth-modal" class="modal-backdrop">
        <div class="modal-box" style="max-width: 450px;">
            <button onclick="closeAuthModal()" class="modal-close">×</button>
            <div class="modal-body">
                <h3 id="auth-modal-title" style="font-size: 1.35rem; font-weight: 900; margin-bottom: 0.25rem;">Login / Registrasi</h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">Masuk atau buat akun untuk mengakses seluruh fitur.</p>
                
                <form id="auth-form">
                    <div id="auth-register-fields">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Program Studi</label>
                                <input type="text" id="auth-prodi" placeholder="Teknik Informatika" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Angkatan</label>
                                <input type="text" id="auth-angkatan" placeholder="2023" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Nama Lengkap</label>
                        <input type="text" id="auth-name" required placeholder="Nama Anda" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>NIM</label>
                        <input type="text" id="auth-nim" required placeholder="NIM Mahasiswa" class="form-control">
                    </div>
                    <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
                        <button type="button" onclick="closeAuthModal()" class="btn btn-secondary">Batal</button>
                        <button type="submit" id="auth-submit-btn" class="btn btn-primary">Lanjutkan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Detail & Registration Modal -->
    <div id="detail-modal" class="modal-backdrop">
        <div class="modal-box">
            <button onclick="closeDetailModal()" class="modal-close">×</button>

            <div style="max-height: 85vh; overflow-y: auto;">
                <div style="height: 220px; background: #000; position: relative;">
                    <img id="modal-poster" src="" alt="Poster" style="width: 100%; height: 100%; object-fit: cover;">
                </div>

                <div class="modal-body">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
                        <div style="display: flex; gap: 0.5rem; align-items: center;">
                            <span id="modal-status" style="font-size: 0.75rem; font-weight: 800; padding: 0.3rem 0.85rem; border-radius: 50px; background: #ecfdf5; color: #047857;"></span>
                            <span id="modal-category" style="font-size: 0.75rem; font-weight: 800; padding: 0.3rem 0.85rem; border-radius: 50px; background: rgba(37, 99, 235, 0.1); color: var(--primary);"></span>
                        </div>
                        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
                            <a id="modal-wa-btn" href="#" target="_blank" class="btn btn-primary" style="padding: 0.35rem 0.75rem; font-size: 0.75rem; background: #10b981; display: inline-flex; align-items: center; gap: 0.35rem;">WhatsApp</a>
                            <a id="modal-teams-btn" href="#" target="_blank" class="btn btn-primary" style="padding: 0.35rem 0.75rem; font-size: 0.75rem; background: #5558af; display: inline-flex; align-items: center; gap: 0.35rem;">Microsoft Teams</a>
                            <span style="font-size: 0.75rem; color: var(--text-muted);">Pelaksanaan: <span id="modal-date"></span></span>
                        </div>
                    </div>

                    <h3 id="modal-title" style="font-size: 1.75rem; font-weight: 900; color: var(--text-main); margin-bottom: 0.5rem; letter-spacing: -0.02em;"></h3>
                    <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 1rem;">Batas Pendaftaran: <span id="modal-deadline" style="font-weight: 700; color: var(--text-main);"></span></p>
                    <p id="modal-desc" style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.75rem;"></p>

                    <h4 style="font-size: 0.95rem; font-weight: 800; margin-bottom: 0.75rem;">Daftar Divisi & Syarat Kuota</h4>
                    <div id="modal-divisions-list" style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 2rem;"></div>

                    <div style="border-top: 1px solid var(--border-color); padding-top: 2rem;">
                        <h4 style="font-size: 1.1rem; font-weight: 900; margin-bottom: 1.25rem;">Formulir Pendaftaran Divisi</h4>
                        <form id="registration-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Nama Lengkap</label>
                                    <input type="text" id="reg-name" required class="form-control">
                                </div>
                                <div class="form-group">
                                    <label>NIM</label>
                                    <input type="text" id="reg-nim" required class="form-control">
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Pilih Divisi Pilihan</label>
                                <select id="reg-division" required class="form-control" style="cursor: pointer;"></select>
                            </div>
                            <div class="form-group">
                                <label>Alasan Bergabung</label>
                                <textarea id="reg-reason" rows="2" required placeholder="Mengapa Anda tertarik bergabung di divisi ini?" class="form-control"></textarea>
                            </div>
                            <div class="form-group">
                                <label>Pengalaman Organisasi / Keahlian</label>
                                <textarea id="reg-experience" rows="2" class="form-control"></textarea>
                            </div>
                            <div class="form-group">
                                <label>Tautan Portofolio (Opsional)</label>
                                <input type="url" id="reg-portfolio" placeholder="https://..." class="form-control">
                            </div>
                            <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
                                <button type="button" onclick="closeDetailModal()" class="btn btn-secondary">Batal</button>
                                <button type="submit" class="btn btn-primary">Kirim Pendaftaran</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Profile Modal -->
    <div id="profile-modal" class="modal-backdrop">
        <div class="modal-box" style="max-width: 550px;">
            <button onclick="closeProfileModal()" class="modal-close">×</button>
            <div class="modal-body">
                <h3 style="font-size: 1.35rem; font-weight: 900; margin-bottom: 0.25rem;">Pengelolaan Profil Mahasiswa</h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.75rem;">Atur informasi profil, keahlian, dan pengalaman organisasi Anda.</p>
                
                <form id="profile-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Nama Lengkap</label>
                            <input type="text" id="profile-name" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label>NIM</label>
                            <input type="text" id="profile-nim" required class="form-control">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Program Studi</label>
                            <input type="text" id="profile-prodi" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Angkatan</label>
                            <input type="text" id="profile-angkatan" required class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Keahlian / Skills</label>
                        <input type="text" id="profile-skills" placeholder="Contoh: Desain, Pemrograman" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Pengalaman Organisasi</label>
                        <textarea id="profile-experience" rows="2" class="form-control"></textarea>
                    </div>
                    <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
                        <button type="button" onclick="closeProfileModal()" class="btn btn-secondary">Batal</button>
                        <button type="submit" class="btn btn-primary">Simpan Profil</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Organizer Applicants Modal -->
    <div id="applicants-modal" class="modal-backdrop">
        <div class="modal-box" style="max-width: 650px;">
            <button onclick="closeApplicantsModal()" class="modal-close">×</button>
            <div class="modal-body">
                <h3 style="font-size: 1.35rem; font-weight: 900; margin-bottom: 0.25rem;">Kelola Pendaftar Kegiatan</h3>
                <p id="applicants-activity-title" style="font-size: 0.85rem; color: var(--primary); font-weight: 700; margin-bottom: 1.75rem;"></p>
                <div id="applicants-list" style="display: flex; flex-direction: column; gap: 1rem; max-height: 400px; overflow-y: auto;"></div>
            </div>
        </div>
    </div>

    <!-- Create Activity Modal -->
    <div id="create-modal" class="modal-backdrop">
        <div class="modal-box">
            <button onclick="closeCreateModal()" class="modal-close">×</button>
            <div class="modal-body">
                <h3 style="font-size: 1.35rem; font-weight: 900; margin-bottom: 0.25rem;">Buat Kegiatan / Kepanitiaan</h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.75rem;">Buka lowongan volunteer atau panitia baru.</p>
                
                <form id="create-activity-form">
                    <div class="form-group">
                        <label>Nama Kegiatan / Acara</label>
                        <input type="text" id="create-title" placeholder="Contoh: Dies Natalis Fakultas 2026" required class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Kategori Kegiatan</label>
                        <select id="create-category" class="form-control" style="cursor: pointer;">
                            <option value="seminar dan workshop">Seminar & Workshop</option>
                            <option value="lomba dan kompetisi">Lomba & Kompetisi</option>
                            <option value="kegiatan sosial dan volunteer">Kegiatan Sosial & Volunteer</option>
                            <option value="acara seni dan budaya">Acara Seni & Budaya</option>
                            <option value="olahraga">Olahraga</option>
                            <option value="orientasi dan kaderisasi">Orientasi & Kaderisasi</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Tanggal Pelaksanaan</label>
                            <input type="date" id="create-date" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Batas Pendaftaran</label>
                            <input type="date" id="create-deadline" required class="form-control">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Nomor WhatsApp Penyelenggara</label>
                            <input type="text" id="create-contact" placeholder="6281234567890" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Link Microsoft Teams</label>
                            <input type="url" id="create-teams" placeholder="https://teams.microsoft.com/..." class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>URL Poster / Banner</label>
                        <input type="url" id="create-poster" placeholder="https://images.unsplash.com/..." class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Deskripsi Lengkap</label>
                        <textarea id="create-desc" rows="3" placeholder="Jelaskan detail kegiatan..." required class="form-control"></textarea>
                    </div>
                    <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
                        <button type="button" onclick="closeCreateModal()" class="btn btn-secondary">Batal</button>
                        <button type="submit" class="btn btn-primary">Publikasikan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- My Registrations Modal -->
    <div id="my-registrations-modal" class="modal-backdrop">
        <div class="modal-box" style="max-width: 600px;">
            <button onclick="closeMyRegistrationsModal()" class="modal-close">×</button>
            <div class="modal-body">
                <h3 style="font-size: 1.35rem; font-weight: 900; margin-bottom: 0.25rem;">Riwayat Kegiatan & Pengalaman Organisasi</h3>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.75rem;">Daftar kegiatan yang pernah Anda ikuti atau lamar sebagai rujukan portofolio.</p>
                <div id="my-registrations-list" style="display: flex; flex-direction: column; gap: 1rem; max-height: 400px; overflow-y: auto;"></div>
            </div>
        </div>
    </div>

    <!-- Native JavaScript -->
    <script src="assets/js/app.js"></script>
</body>
</html>
