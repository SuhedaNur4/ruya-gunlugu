console.log("APP.JS LOADED - DREAM JOURNAL SPA v2");

const API_BASE_URL = 'http://localhost:3000/api';

// --- SVGS ---
const ICONS = {
    Lucid: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
    Kabus: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M8 20v2h8v-2"/><path d="m12.5 17-.5-1-.5 1h1z"/><path d="M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20"/></svg>`,
    Huzurlu: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
    Garip: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
    Nostaljik: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    Macera: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
    Kozmik: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    Diğer: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>`,
    Tümü: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`
};

const THEME_ICONS = {
    moon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
    sun: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
};

const TOAST_ICONS = {
    info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
    error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>`,
    warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
    success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--peace)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`
};

// --- STATE OBJESİ ---
// Eski localStorage anahtarlarını taşı
if (localStorage.getItem("token") && !localStorage.getItem("dream_token")) {
    localStorage.setItem("dream_token", localStorage.getItem("token"));
    localStorage.removeItem("token");
}

const state = {
    currentView: null,
    token: localStorage.getItem("dream_token"),
    user: null,
    dreams: [],
    currentFilter: "Tümü",
    searchQuery: ""
};

// --- INIT AKIŞI ---
document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
    // Modal referansları DOM hazır olduktan sonra alınıyor
    modalContainer = document.getElementById('modal-container');
    modalContent = document.getElementById('modal-content');
    modalOverlay = document.getElementById('modal-overlay');

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    restoreTheme();
    bindNavigation();
    bindAuthForms();
    bindDreamForm();
    bindSearch();
    bindThemeToggle();
    bindLogout();

    updateAppShell();

    if (state.token) {
        apiFetch('/auth/me').then(data => {
            if (data && data.user) {
                state.user = data.user;
                const emailDisplay = document.getElementById('user-email-display');
                if (emailDisplay) emailDisplay.textContent = state.user.email;
            }
            showView("home");
        }).catch(() => { });
    } else {
        showView("login");
    }
}

// --- VIEW YÖNETİMİ ---
function showView(viewName) {
    const protectedViews = ["home", "archive", "new-dream", "settings"];

    if (protectedViews.includes(viewName) && !state.token) {
        viewName = "login";
        showToast("Devam etmek için giriş yapmalısın.", "warning");
    }

    // Hepsini gizle
    document.querySelectorAll("[data-view]").forEach((view) => {
        view.classList.remove("is-active");
        view.hidden = true;
    });

    const target = document.querySelector(`[data-view="${viewName}"]`);

    if (!target) {
        console.error("View bulunamadı:", viewName);
        return;
    }

    // Seçileni aç
    target.hidden = false;

    requestAnimationFrame(() => {
        target.classList.add("is-active");
    });

    state.currentView = viewName;

    updateNavState(viewName);
    updateAppShell();

    if (viewName === "archive" && state.token) {
        fetchDreams();
    }
}

// --- APP SHELL & NAV STATE ---
function updateAppShell() {
    const authNav = document.querySelector("[data-auth-nav]");
    if (authNav) {
        authNav.hidden = !state.token;
    }
    document.body.classList.toggle("is-authenticated", !!state.token);
}

function updateNavState(viewName) {
    document.querySelectorAll("[data-nav]").forEach((button) => {
        button.classList.toggle("is-active", button.dataset.nav === viewName);
    });
}

// --- EVENT BINDINGS ---
function bindNavigation() {
    document.querySelectorAll("[data-nav]").forEach((button) => {
        button.addEventListener("click", () => {
            showView(button.dataset.nav);
        });
    });

    document.querySelectorAll("[data-auth-switch]").forEach((button) => {
        button.addEventListener("click", () => {
            showView(button.dataset.authSwitch);
        });
    });
}

function bindAuthForms() {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }

    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", handleRegister);
    }
}

function bindDreamForm() {
    const dreamForm = document.getElementById("dream-form");
    if (dreamForm) {
        dreamForm.addEventListener("submit", handleSaveDream);
    }
}

function bindLogout() {
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }
}

function bindThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = document.body.getAttribute("data-theme");
            const newTheme = currentTheme === "midnight" ? "dawn" : "midnight";
            document.body.setAttribute("data-theme", newTheme);
            localStorage.setItem("dream_theme", newTheme);
            themeToggle.innerHTML = newTheme === "midnight" ? THEME_ICONS.sun : THEME_ICONS.moon;
        });
    }
}

function restoreTheme() {
    const savedTheme = localStorage.getItem("dream_theme") || "midnight";
    document.body.setAttribute("data-theme", savedTheme);
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.innerHTML = savedTheme === "midnight" ? THEME_ICONS.sun : THEME_ICONS.moon;
    }
}

// --- YARDIMCI FONKSİYONLAR ---
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHTML(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function formatDate(dateString) {
    if (!dateString) return "";
    let normalized = String(dateString).trim().replace(" ", "T");
    if (!normalized.endsWith("Z")) normalized += "Z";
    const date = new Date(normalized);
    if (Number.isNaN(date.getTime())) return String(dateString);
    const datePart = date.toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    const timePart = date.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit"
    });
    return `${datePart} · ${timePart}`;
}

const CATEGORY_CLASS = {
    Lucid: "cat-lucid",
    Kabus: "cat-kabus",
    Huzurlu: "cat-huzurlu",
    Garip: "cat-garip",
    Nostaljik: "cat-nostaljik",
    Macera: "cat-macera",
    Kozmik: "cat-kozmik",
    Diğer: "cat-diger"
};

// --- AUTH İŞLEMLERİ ---
async function handleLogin(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
        showToast("E-posta ve şifre zorunludur.", "error");
        return;
    }

    if (!isValidEmail(email)) {
        showToast("Geçerli bir e-posta adresi giriniz.", "error");
        return;
    }

    try {
        const data = await apiFetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password })
        });

        const token = data.token;
        if (!token) throw new Error("Token alınamadı.");

        localStorage.setItem("dream_token", token);
        state.token = token;
        state.user = data.user || null;

        if (state.user) {
            const emailDisplay = document.getElementById('user-email-display');
            if (emailDisplay) emailDisplay.textContent = state.user.email;
        }

        form.reset();
        updateAppShell();
        showToast("Arşivine hoş geldin.", "success");
        showView("home");
    } catch (error) {
        showToast(error.message || "Giriş yapılamadı.", "error");
    }
}

async function handleRegister(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!name) {
        showToast("İsim zorunludur.", "error");
        return;
    }

    if (!email || !password) {
        showToast("E-posta ve şifre zorunludur.", "error");
        return;
    }

    if (!isValidEmail(email)) {
        showToast("Geçerli bir e-posta adresi giriniz.", "error");
        return;
    }

    if (password.length < 6) {
        showToast("Şifre en az 6 karakter olmalıdır.", "error");
        return;
    }

    try {
        const data = await apiFetch("/auth/register", {
            method: "POST",
            body: JSON.stringify({ name, email, password })
        });

        const token = data.token;
        form.reset();

        if (token) {
            localStorage.setItem("dream_token", token);
            state.token = token;
            state.user = data.user || null;
            if (state.user) {
                const emailDisplay = document.getElementById('user-email-display');
                if (emailDisplay) emailDisplay.textContent = state.user.email;
            }
            updateAppShell();
            showToast("Rüya arşivin oluşturuldu.", "success");
            showView("home");
        } else {
            showToast("Hesap oluşturuldu. Şimdi giriş yapabilirsin.", "success");
            showView("login");
        }
    } catch (error) {
        showToast(error.message || "Hesap oluşturulamadı.", "error");
    }
}

function logout() {
    localStorage.removeItem("dream_token");
    state.token = null;
    state.user = null;
    state.dreams = [];

    updateAppShell();
    updateNavState(null);

    showToast("Arşivden çıkış yapıldı.", "info");
    showView("login");
}

// --- DREAMS İŞLEMLERİ ---
async function handleSaveDream(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();
    const category = document.getElementById('category').value;

    if (!title) {
        showToast("Başlık zorunludur.", "error");
        return;
    }
    if (title.length > 120) {
        showToast("Başlık en fazla 120 karakter olabilir.", "error");
        return;
    }
    if (content.length > 5000) {
        showToast("İçerik en fazla 5000 karakter olabilir.", "error");
        return;
    }

    try {
        await apiFetch('/dreams', {
            method: 'POST',
            body: JSON.stringify({ title, content, category })
        });
        showToast("Rüya arşive işlendi.", "success");
        form.reset();
        showView('archive');
    } catch (err) {
        showToast(err.message, "error");
    }
}

async function fetchDreams() {
    try {
        const data = await apiFetch('/dreams');
        state.dreams = data;
        renderFilters();
        renderDreams();
    } catch (err) {
        console.error("Rüyalar çekilemedi:", err);
    }
}

function bindSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value.toLowerCase();
            renderDreams();
        });
    }
}

function renderFilters() {
    const categoryFiltersContainer = document.getElementById('category-filters');
    if (!categoryFiltersContainer) return;

    const categories = ['Tümü', 'Lucid', 'Kabus', 'Huzurlu', 'Garip', 'Nostaljik', 'Macera', 'Kozmik', 'Diğer'];
    categoryFiltersContainer.innerHTML = '';

    categories.forEach((cat, index) => {
        const btn = document.createElement('button');
        const catClass = CATEGORY_CLASS[cat] || CATEGORY_CLASS['Diğer'];
        btn.className = `filter-chip reveal-element ${catClass} ${state.currentFilter === cat ? 'active' : ''}`;
        btn.style.animationDelay = `${index * 0.05}s`;
        btn.innerHTML = `${ICONS[cat] || ICONS['Diğer']} ${cat}`;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            state.currentFilter = cat;
            renderDreams();
        });
        categoryFiltersContainer.appendChild(btn);
    });
}

function renderDreams() {
    const dreamsContainer = document.getElementById('dreams-container');
    const dreamCount = document.getElementById('dream-count');
    if (!dreamsContainer) return;

    dreamsContainer.innerHTML = '';

    const filtered = state.dreams.filter(d => {
        const matchCat = state.currentFilter === 'Tümü' || d.category === state.currentFilter;
        const searchTarget = (d.title + " " + (d.content || '')).toLowerCase();
        const matchSearch = searchTarget.includes(state.searchQuery);
        return matchCat && matchSearch;
    });

    if (dreamCount) dreamCount.textContent = filtered.length;

    if (filtered.length === 0) {
        dreamsContainer.innerHTML = `
            <div style="grid-column: 1 / -1; display: flex; justify-content: center;">
                <div class="empty-state reveal-element">
                    <div class="empty-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                    </div>
                    <h3>Arşiv henüz sessiz.</h3>
                    <p>İlk rüyanı kaydettiğinde burada yumuşak bir iz bırakacak.</p>
                    <button class="btn-primary" data-nav="new-dream" style="margin-top: 1.5rem;">İlk Rüyayı Kaydet</button>
                </div>
            </div>
        `;

        const newBtn = dreamsContainer.querySelector('[data-nav="new-dream"]');
        if (newBtn) {
            newBtn.addEventListener('click', () => showView('new-dream'));
        }
        return;
    }

    filtered.forEach((dream, index) => {
        const publicId = dream.public_id || dream.publicId;
        const cat = dream.category || 'Diğer';
        const catClass = CATEGORY_CLASS[cat] || CATEGORY_CLASS["Diğer"];
        
        const card = document.createElement('article');
        card.className = `dream-card reveal-element ${catClass}`;
        card.style.animationDelay = `${index * 0.08}s`;

        const rawExcerpt = (dream.content && dream.content.length > 130)
            ? dream.content.substring(0, 130) + '...'
            : (dream.content || "Geriye sadece ince bir his kalmış...");

        const icon = ICONS[cat] || ICONS['Diğer'];

        const safeTitle = escapeHTML(dream.title);
        const safeExcerpt = escapeHTML(rawExcerpt);
        const safeCategory = escapeHTML(cat);
        const safeDate = escapeHTML(formatDate(dream.created_at || dream.date));

        card.innerHTML = `
            <div class="dream-card-main" data-action="view-dream" data-id="${publicId}" role="button" tabindex="0" aria-label="${safeTitle} — devamını oku">
                <div class="dream-meta">
                    <span class="card-category ${catClass}" data-category="${safeCategory}">
                        <span class="card-category-icon">${icon}</span>
                        ${safeCategory}
                    </span>
                    <span class="dream-date">${safeDate}</span>
                </div>
                <h3 class="dream-title">${safeTitle}</h3>
                <p class="dream-excerpt">${safeExcerpt}</p>
                <span class="dream-read-more">Devamını oku →</span>
            </div>
            <div class="dream-card-actions">
                <button type="button" class="btn-text dream-action-btn" data-action="edit-dream" data-id="${publicId}">Düzenle</button>
                <button type="button" class="btn-text dream-action-btn dream-action-btn--danger" data-action="delete-dream" data-id="${publicId}">Arşivden Kaldır</button>
            </div>
        `;
        dreamsContainer.appendChild(card);
    });
}

// --- MODAL SYSTEM ---
let modalContainer = null;
let modalContent = null;
let modalOverlay = null;

document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const action = button.dataset.action;

    if (action === "view-dream") {
        const id = button.dataset.id;
        const dream = state.dreams.find(d => (d.public_id || d.publicId) === id);
        if (dream) showDreamDetailModal(dream);
        return;
    }

    if (action === "delete-dream") {
        const id = button.dataset.id;
        if (!id || id === "undefined") {
            console.error("Silme için geçerli public_id yok:", button);
            showToast("Rüya kimliği bulunamadı.", "error");
            return;
        }
        handleDeleteDream(id);
    }

    if (action === "edit-dream") {
        const id = button.dataset.id;
        const dream = state.dreams.find(d => (d.public_id || d.publicId) === id);
        if (dream) {
            closeModal();
            showEditModal(dream);
        }
    }
});

let pendingConfirmResolve = null;

function showConfirm({ title, message, confirmText, cancelText }) {
    const html = `
        <h2 class="cinematic-heading" style="font-size: 32px; margin-bottom: 1rem;">${title}</h2>
        <p style="color: var(--text-soft); margin-bottom: 3rem; font-size: 17px;">${message}</p>
        <div style="display: flex; gap: 1rem; justify-content: flex-end;">
            <button type="button" class="btn-secondary" id="modal-cancel-btn">${cancelText}</button>
            <button type="button" class="btn-danger" id="modal-confirm-delete-btn">${confirmText}</button>
        </div>
    `;
    showModal(html);

    return new Promise((resolve) => {
        pendingConfirmResolve = resolve;

        const confirmBtn = document.getElementById('modal-confirm-delete-btn');
        const cancelBtn = document.getElementById('modal-cancel-btn');

        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                resolve(true);
                closeModal();
            }, { once: true });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                resolve(false);
                closeModal();
            }, { once: true });
        }
    });
}

async function handleDeleteDream(publicId) {
    const confirmed = await showConfirm({
        title: "Bu rüyayı arşivden kaldır?",
        message: "Bu işlemden sonra rüya listende görünmeyecek.",
        confirmText: "Arşivden Kaldır",
        cancelText: "Vazgeç"
    });

    if (!confirmed) return;

    try {
        await apiFetch(`/dreams/${publicId}`, { method: 'DELETE' });
        showToast("Rüya arşivden kaldırıldı.", "success");
        state.dreams = state.dreams.filter(dream => {
            const id = dream.public_id || dream.publicId;
            return id !== publicId;
        });
        renderDreams();
    } catch (err) {
        showToast(err.message || "Rüya arşivden kaldırılamadı.", "error");
    }
}

function showDreamDetailModal(dream) {
    const publicId = dream.public_id || dream.publicId;
    const cat = dream.category || "Diğer";
    const icon = ICONS[cat] || ICONS["Diğer"];
    const catClass = CATEGORY_CLASS[cat] || CATEGORY_CLASS["Diğer"];
    const safeTitle = escapeHTML(dream.title);
    const safeContent = escapeHTML(dream.content || "Bu rüyada kayıtlı metin yok.");
    const safeCategory = escapeHTML(cat);
    const safeDate = escapeHTML(formatDate(dream.created_at || dream.date));

    const html = `
        <article class="dream-detail">
            <div class="dream-meta dream-detail-meta">
                <span class="card-category ${catClass}" data-category="${safeCategory}">
                    <span class="card-category-icon">${icon}</span>
                    ${safeCategory}
                </span>
                <span class="dream-date">${safeDate}</span>
            </div>
            <h2 class="cinematic-heading dream-detail-title">${safeTitle}</h2>
            <div class="dream-detail-content">${safeContent}</div>
            <div class="dream-detail-actions">
                <button type="button" class="btn-secondary" id="detail-close-btn">Kapat</button>
                <button type="button" class="btn-text" data-action="edit-dream" data-id="${publicId}">Düzenle</button>
            </div>
        </article>
    `;
    showModal(html);

    const closeBtn = document.getElementById("detail-close-btn");
    if (closeBtn) closeBtn.addEventListener("click", closeModal, { once: true });
}

function showEditModal(dream) {
    const publicId = dream.public_id || dream.publicId;
    const categories = ['Lucid', 'Kabus', 'Huzurlu', 'Garip', 'Nostaljik', 'Macera', 'Kozmik', 'Diğer'];
    const categoryOptions = categories.map(cat =>
        `<option value="${cat}" ${dream.category === cat ? 'selected' : ''}>${cat}</option>`
    ).join('');

    const safeTitle = escapeHTML(dream.title);
    const safeContent = escapeHTML(dream.content || "");

    const html = `
        <h2 class="cinematic-heading" style="font-size: 28px; margin-bottom: 1.5rem;">Rüyayı Düzenle</h2>
        <form id="edit-dream-form">
            <div class="input-group">
                <input type="text" id="edit-title" class="cinematic-input title-input" value="${safeTitle}" placeholder="Rüyanın adı..." required>
            </div>
            <div class="input-group">
                <select id="edit-category" class="styled-select cinematic-input">
                    ${categoryOptions}
                </select>
            </div>
            <div class="input-group">
                <textarea id="edit-content" rows="7" class="cinematic-textarea" placeholder="Hatırladığın parçaları buraya bırak...">${safeContent}</textarea>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1rem;">
                <button type="button" class="btn-secondary" id="edit-cancel-btn">Vazgeç</button>
                <button type="submit" class="btn-primary">Kaydet</button>
            </div>
        </form>
    `;
    showModal(html);

    const form = document.getElementById('edit-dream-form');
    const cancelBtn = document.getElementById('edit-cancel-btn');

    if (cancelBtn) cancelBtn.addEventListener('click', closeModal, { once: true });
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = document.getElementById('edit-title').value.trim();
            const content = document.getElementById('edit-content').value.trim();
            const category = document.getElementById('edit-category').value;

            if (!title) {
                showToast("Başlık zorunludur.", "error");
                return;
            }
            if (title.length > 120) {
                showToast("Başlık en fazla 120 karakter olabilir.", "error");
                return;
            }
            if (content.length > 5000) {
                showToast("İçerik en fazla 5000 karakter olabilir.", "error");
                return;
            }

            await handleUpdateDream(publicId, { title, content, category });
        }, { once: true });
    }
}

async function handleUpdateDream(publicId, data) {
    try {
        await apiFetch(`/dreams/${publicId}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
        const index = state.dreams.findIndex(d => (d.public_id || d.publicId) === publicId);
        if (index !== -1) {
            state.dreams[index] = { ...state.dreams[index], ...data };
        }
        closeModal();
        renderDreams();
        showToast("Rüya güncellendi.", "success");
    } catch (err) {
        showToast(err.message || "Rüya güncellenemedi.", "error");
    }
}

function showModal(html) {
    if (!modalContent || !modalContainer) return;
    modalContent.innerHTML = html;
    modalContainer.hidden = false;
    modalContainer.classList.remove('hidden'); // legacy class support
    document.body.classList.add('modal-open');
}

function closeModal() {
    if (!modalContainer) return;
    modalContainer.hidden = true;
    modalContainer.classList.add('hidden'); // legacy class support
    document.body.classList.remove('modal-open');
    if (pendingConfirmResolve) {
        pendingConfirmResolve(false);
        pendingConfirmResolve = null;
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer && !modalContainer.hidden && !modalContainer.classList.contains('hidden')) {
        closeModal();
    }
});

// modalOverlay listener initApp içinde bağlanıyor

// --- API FETCH & TOAST ---
async function apiFetch(path, options = {}) {
    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    if (state.token) {
        headers.Authorization = `Bearer ${state.token}`;
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers
    });

    if (response.status === 204) {
        return null;
    }

    let data = null;
    try {
        data = await response.json();
    } catch (error) {
        data = null;
    }

    if (response.status === 401) {
        const isLoginRequest = path.startsWith("/auth/login");
        const isRegisterRequest = path.startsWith("/auth/register");
        const isAuthRequest = isLoginRequest || isRegisterRequest;

        if (isAuthRequest) {
            throw new Error(
                data?.error || data?.message ||
                (isLoginRequest ? "E-posta veya şifre hatalı." : "Hesap oluşturulamadı.")
            );
        }

        localStorage.removeItem("dream_token");
        state.token = null;
        state.user = null;
        updateAppShell();
        showView("login");
        throw new Error("Oturum süren doldu. Lütfen tekrar giriş yap.");
    }

    if (!response.ok) {
        throw new Error(data?.error || data?.message || "İstek tamamlanamadı.");
    }

    return data;
}

function showToast(message, type = "info") {
    const root = document.getElementById("toast-root");

    if (!root) {
        console.error("toast-root bulunamadı.");
        return;
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;

    root.appendChild(toast);

    window.setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-6px) scale(.98)";
        window.setTimeout(() => toast.remove(), 220);
    }, 3000);
}
