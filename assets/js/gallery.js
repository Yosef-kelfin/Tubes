// Initial Data & State
let defaultGalleries = [
    {
        id: 1,
        category: 'alam',
        category_label: 'Alam',
        color: 'emerald',
        title: 'Pegunungan Kabut Pagi',
        desc: 'Pemandangan alam pegunungan yang diselimuti kabut sejuk di pagi hari.',
        image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
        image_large: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
        likes: 12,
        comments: [
            { user: 'Budi', text: 'Keren banget pemandangannya!' },
            { user: 'Siti', text: 'Jadi ingin kesana.' }
        ],
        date: Date.now() - 86400000 * 5
    },
    {
        id: 2,
        category: 'arsitektur',
        category_label: 'Arsitektur',
        color: 'blue',
        title: 'Gedung Pencakar Langit',
        desc: 'Arsitektur modern perkotaan dengan kaca reflektif yang megah.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
        image_large: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        likes: 8,
        comments: [
            { user: 'Andi', text: 'Detail arsitekturnya mantap.' }
        ],
        date: Date.now() - 86400000 * 4
    },
    {
        id: 3,
        category: 'kuliner',
        category_label: 'Kuliner',
        color: 'amber',
        title: 'Sajian Kuliner Spesial',
        desc: 'Hidangan lezat dengan penataan artistik yang menggugah selera.',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
        image_large: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
        likes: 24,
        comments: [
            { user: 'Rina', text: 'Wah terlihat sangat enak!' }
        ],
        date: Date.now() - 86400000 * 3
    },
    {
        id: 4,
        category: 'alam',
        category_label: 'Alam',
        color: 'emerald',
        title: 'Pantai Tropis Indah',
        desc: 'Pasir putih bersih dan deburan ombak laut biru yang menenangkan.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        image_large: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        likes: 19,
        comments: [],
        date: Date.now() - 86400000 * 2
    },
    {
        id: 5,
        category: 'arsitektur',
        category_label: 'Arsitektur',
        color: 'blue',
        title: 'Interior Minimalis',
        desc: 'Ruangan dalam dengan desain estetis dan pencahayaan natural.',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
        image_large: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        likes: 15,
        comments: [],
        date: Date.now() - 86400000 * 1
    },
    {
        id: 6,
        category: 'kuliner',
        category_label: 'Kuliner',
        color: 'amber',
        title: 'Kafe Estetik',
        desc: 'Suasana hangat dan secangkir kopi segar di sore hari.',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
        image_large: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
        likes: 31,
        comments: [
            { user: 'Joko', text: 'Tempat ngopi favorit nih.' }
        ],
        date: Date.now()
    }
];

let galleries = JSON.parse(localStorage.getItem('galleries')) || defaultGalleries;
let currentCategory = 'all';
let searchQuery = '';
let sortBy = 'newest'; // 'newest', 'popular', 'title'
let currentPage = 1;
let itemsPerPage = 6;
let activeItemIndex = null;

function saveGalleries() {
    localStorage.setItem('galleries', JSON.stringify(galleries));
    updateStats();
}

function updateStats() {
    const totalPhotos = galleries.length;
    const totalLikes = galleries.reduce((acc, curr) => acc + curr.likes, 0);
    const totalComments = galleries.reduce((acc, curr) => acc + curr.comments.length, 0);

    document.getElementById('stat-photos').textContent = totalPhotos;
    document.getElementById('stat-likes').textContent = totalLikes;
    document.getElementById('stat-comments').textContent = totalComments;
}

function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    const paginationContainer = document.getElementById('pagination-container');
    
    // Filter
    let filtered = galleries.filter(item => {
        const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              item.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Sort
    filtered.sort((a, b) => {
        if (sortBy === 'newest') return b.date - a.date;
        if (sortBy === 'popular') return b.likes - a.likes;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const start = (currentPage - 1) * itemsPerPage;
    const paginatedItems = filtered.slice(start, start + itemsPerPage);

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-xs">
                <div class="text-4xl mb-3">🔍</div>
                <h3 class="text-lg font-bold text-slate-800">Tidak ada foto ditemukan</h3>
                <p class="text-sm text-slate-500 mt-1">Coba gunakan kata kunci pencarian lain atau pilih kategori berbeda.</p>
            </div>
        `;
        paginationContainer.innerHTML = '';
        return;
    }

    grid.innerHTML = paginatedItems.map((item) => {
        const originalIndex = galleries.findIndex(g => g.id === item.id);
        return `
            <div class="gallery-item group relative overflow-hidden rounded-3xl bg-white border border-slate-200/80 shadow-xs transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col">
                <div class="aspect-4/3 w-full overflow-hidden bg-slate-100 cursor-pointer relative" onclick="openLightbox(${originalIndex})">
                    <img src="${item.image}" alt="${item.title}" class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span class="text-white text-xs font-semibold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">Lihat Detail →</span>
                    </div>
                </div>
                <div class="p-5 flex flex-col flex-grow">
                    <div class="flex items-center justify-between mb-2">
                        <span class="inline-block px-3 py-1 text-xs font-bold bg-${item.color}-50 text-${item.color}-700 rounded-full">
                            ${item.category_label}
                        </span>
                        <div class="flex items-center gap-3">
                            <button onclick="likePhoto(${originalIndex})" class="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-rose-600 transition-colors cursor-pointer group/btn">
                                <svg class="w-4 h-4 fill-current text-rose-500 transition-transform group-hover/btn:scale-125" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                                <span>${item.likes}</span>
                            </button>
                        </div>
                    </div>
                    <h3 class="font-bold text-slate-900 text-base cursor-pointer hover:text-blue-600 transition-colors line-clamp-1" onclick="openLightbox(${originalIndex})">${item.title}</h3>
                    <p class="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">${item.desc}</p>
                    <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                        <span>💬 ${item.comments.length} Komentar</span>
                        <button onclick="deletePhoto(${originalIndex})" class="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer" title="Hapus Foto">🗑️ Hapus</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Pagination Render
    if (totalPages > 1) {
        let pagHtml = `<div class="flex items-center justify-center gap-2 mt-10">`;
        pagHtml += `<button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled class="px-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"' : 'class="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs"'}>← Sebelumnya</button>`;
        
        for (let i = 1; i <= totalPages; i++) {
            pagHtml += `<button onclick="changePage(${i})" class="w-10 h-10 text-sm rounded-xl font-bold transition-all cursor-pointer shadow-xs ${i === currentPage ? 'bg-blue-600 text-white shadow-blue-200' : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}">${i}</button>`;
        }

        pagHtml += `<button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled class="px-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"' : 'class="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs"'}>Berikutnya →</button>`;
        pagHtml += `</div>`;
        paginationContainer.innerHTML = pagHtml;
    } else {
        paginationContainer.innerHTML = '';
    }
}

function filterPhotos(category) {
    currentCategory = category;
    currentPage = 1;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if(btn.getAttribute('data-filter') === category) {
            btn.classList.remove('bg-white', 'text-slate-600', 'border', 'border-slate-200');
            btn.classList.add('bg-slate-900', 'text-white', 'shadow-md');
        } else {
            btn.classList.remove('bg-slate-900', 'text-white', 'shadow-md');
            btn.classList.add('bg-white', 'text-slate-600', 'border', 'border-slate-200');
        }
    });
    renderGallery();
}

function handleSearch(query) {
    searchQuery = query;
    currentPage = 1;
    renderGallery();
}

function handleSort(value) {
    sortBy = value;
    renderGallery();
}

function changePage(page) {
    currentPage = page;
    renderGallery();
    window.scrollTo({ top: 400, behavior: 'smooth' });
}

function likePhoto(index) {
    galleries[index].likes++;
    saveGalleries();
    renderGallery();
    if (activeItemIndex === index) {
        document.getElementById('lightbox-likes').textContent = galleries[index].likes;
    }
}

function deletePhoto(index) {
    if (confirm('Apakah Anda yakin ingin menghapus foto ini?')) {
        galleries.splice(index, 1);
        saveGalleries();
        renderGallery();
        closeLightbox();
    }
}

function openLightbox(index) {
    activeItemIndex = index;
    const item = galleries[index];
    const lightbox = document.getElementById('lightbox');

    document.getElementById('lightbox-img').src = item.image_large || item.image;
    document.getElementById('lightbox-title').textContent = item.title;
    document.getElementById('lightbox-desc').textContent = item.desc;
    document.getElementById('lightbox-category').textContent = item.category_label;
    document.getElementById('lightbox-likes').textContent = item.likes;
    document.getElementById('lightbox-download').href = item.image_large || item.image;

    renderComments(item.comments);
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('hidden');
    document.body.style.overflow = 'auto';
    activeItemIndex = null;
}

function sharePhoto() {
    if (activeItemIndex === null) return;
    const item = galleries[activeItemIndex];
    navigator.clipboard.writeText(window.location.href);
    alert('Tautan foto berhasil disalin ke clipboard!');
}

function renderComments(comments) {
    const container = document.getElementById('lightbox-comments');
    if (!comments || comments.length === 0) {
        container.innerHTML = `<p class="text-xs text-slate-400 italic text-center py-4">Belum ada komentar. Jadilah yang pertama berkomentar!</p>`;
        return;
    }
    container.innerHTML = comments.map(c => `
        <div class="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span class="font-bold text-xs text-slate-900">${escapeHtml(c.user)}</span>
            <p class="text-xs text-slate-600 mt-0.5 leading-relaxed">${escapeHtml(c.text)}</p>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    renderGallery();

    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (activeItemIndex === null) return;

            const userInput = document.getElementById('comment-user');
            const textInput = document.getElementById('comment-text');

            const user = userInput.value.trim() || 'Anonim';
            const text = textInput.value.trim();

            if (!text) return;

            galleries[activeItemIndex].comments.push({ user, text });
            saveGalleries();
            renderComments(galleries[activeItemIndex].comments);
            renderGallery();

            textInput.value = '';
        });
    }

    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const title = document.getElementById('upload-title').value.trim();
            const category = document.getElementById('upload-category').value;
            const desc = document.getElementById('upload-desc').value.trim();
            const imageFile = document.getElementById('upload-image').files[0];

            if (!title || !category || !imageFile) {
                alert('Mohon lengkapi judul, kategori, dan pilih gambar!');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(event) {
                const imageUrl = event.target.result;

                let categoryLabel = 'Alam';
                let color = 'emerald';
                if (category === 'arsitektur') { categoryLabel = 'Arsitektur'; color = 'blue'; }
                if (category === 'kuliner') { categoryLabel = 'Kuliner'; color = 'amber'; }

                const newItem = {
                    id: Date.now(),
                    category: category,
                    category_label: categoryLabel,
                    color: color,
                    title: title,
                    desc: desc || 'Tidak ada deskripsi.',
                    image: imageUrl,
                    image_large: imageUrl,
                    likes: 0,
                    comments: [],
                    date: Date.now()
                };

                galleries.unshift(newItem);
                saveGalleries();
                renderGallery();
                closeUploadModal();
                uploadForm.reset();
            };
            reader.readAsDataURL(imageFile);
        });
    }
});

function openUploadModal() {
    document.getElementById('upload-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeUploadModal() {
    document.getElementById('upload-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

document.getElementById('lightbox')?.addEventListener('click', function(e) {
    if (e.target === this) closeLightbox();
});

document.getElementById('upload-modal')?.addEventListener('click', function(e) {
    if (e.target === this) closeUploadModal();
});
