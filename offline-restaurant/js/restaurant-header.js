/**
 * Restaurant Header Component
 * Adiciona header com nome do restaurante e opção de troca
 */

function createRestaurantHeader() {
    const existingHeader = document.querySelector('.restaurant-header');
    if (existingHeader) {
        updateRestaurantHeader();
        return;
    }

    const restaurantName = getCurrentRestaurantName();
    if (!restaurantName) return;

    const header = document.createElement('div');
    header.className = 'restaurant-header';
    header.innerHTML = `
        <div class="restaurant-header-content">
            <div class="restaurant-info">
                <span class="restaurant-label">Aktives Restaurant:</span>
                <span class="restaurant-name" id="currentRestaurantName">${restaurantName}</span>
            </div>
            <div class="header-actions">
                <button class="header-btn save-btn" onclick="performQuickSave()" title="Quick save data">
                    <span class="icon">💾</span>
                    Save
                </button>
                <button class="header-btn load-btn" onclick="showDataLoadModal()" title="Load data">
                    <span class="icon">📁</span>
                    Load
                </button>
                <button class="header-btn export-btn" onclick="exportCurrentData()" title="Export data">
                    <span class="icon">⬇️</span>
                    Export
                </button>
                <button class="change-restaurant-btn" onclick="showRestaurantChangeModal()" title="Restaurant wechseln">
                    <span class="icon">🔄</span>
                    Wechseln
                </button>
            </div>
        </div>
    `;

    document.body.insertBefore(header, document.body.firstChild);
    addRestaurantHeaderStyles();
    createRestaurantChangeModal();
}

function addRestaurantHeaderStyles() {
    if (document.querySelector('#restaurant-header-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'restaurant-header-styles';
    styles.textContent = `
        .restaurant-header {
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            color: white;
            padding: 15px 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: relative;
            z-index: 100;
        }
        .restaurant-header-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 15px;
        }
        .header-actions {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
        }
        .restaurant-info {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
        }
        .restaurant-label {
            font-size: 0.9rem;
            color: rgba(255,255,255,0.8);
            font-weight: 400;
        }
        .restaurant-name {
            font-size: 1.4rem;
            font-weight: 600;
            color: #fff;
            text-shadow: 0 1px 2px rgba(0,0,0,0.2);
        }
        .change-restaurant-btn {
            background: rgba(255,255,255,0.1);
            border: 2px solid rgba(255,255,255,0.2);
            color: white;
            padding: 8px 16px;
            border-radius: 25px;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .change-restaurant-btn:hover {
            background: rgba(255,255,255,0.2);
            border-color: rgba(255,255,255,0.4);
            transform: translateY(-1px);
        }
        .header-btn {
            background: rgba(255,255,255,0.1);
            border: 2px solid rgba(255,255,255,0.2);
            color: white;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 5px;
            min-width: 80px;
            justify-content: center;
        }
        .header-btn:hover {
            background: rgba(255,255,255,0.2);
            border-color: rgba(255,255,255,0.4);
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .save-btn:hover {
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            border-color: #27ae60;
        }
        .load-btn:hover {
            background: linear-gradient(135deg, #3498db, #5dade2);
            border-color: #3498db;
        }
        .export-btn:hover {
            background: linear-gradient(135deg, #f39c12, #f1c40f);
            border-color: #f39c12;
        }
        .restaurant-change-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            z-index: 1000;
        }
        .restaurant-change-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 40px;
            border-radius: 20px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            text-align: center;
        }
        .restaurant-options {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin: 30px 0;
        }
        .restaurant-option {
            background: #f8f9fa;
            border: 2px solid #e9ecef;
            padding: 15px 20px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 15px;
            text-align: left;
        }
        .restaurant-option:hover {
            background: #e9ecef;
            border-color: #3498db;
            transform: translateY(-2px);
        }
        .restaurant-option.current {
            background: #3498db;
            color: white;
            border-color: #2980b9;
        }
        @media (max-width: 768px) {
            .restaurant-header-content {
                flex-direction: column;
                text-align: center;
                gap: 10px;
            }
            .header-actions {
                flex-wrap: wrap;
                justify-content: center;
            }
            .header-btn {
                min-width: 70px;
                padding: 6px 10px;
                font-size: 0.8rem;
            }
        }
    `;
    document.head.appendChild(styles);
}

function updateRestaurantHeader() {
    const nameElement = document.getElementById('currentRestaurantName');
    if (nameElement) {
        nameElement.textContent = getCurrentRestaurantName();
    }
}

function createRestaurantChangeModal() {
    const existingModal = document.querySelector('.restaurant-change-modal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.className = 'restaurant-change-modal';
    modal.id = 'restaurantChangeModal';
    
    const restaurants = [
        { id: 'Cantinetta', name: 'Cantinetta', icon: '🍷', desc: 'Italienische Küche & Weinbar' },
        { id: 'ThePastaRoom', name: 'The Pasta Room', icon: '🍝', desc: 'Hausgemachte Pasta' },
        { id: 'Panuozzo', name: 'Panuozzo', icon: '🥖', desc: 'Neapolitanische Sandwiches' }
    ];

    modal.innerHTML = `
        <div class="restaurant-change-content">
            <h3>Restaurant wechseln</h3>
            <div class="restaurant-options">
                ${restaurants.map(restaurant => `
                    <div class="restaurant-option ${restaurant.id === currentRestaurant ? 'current' : ''}" 
                         onclick="selectRestaurantFromModal('${restaurant.id}')">
                        <span style="font-size: 2rem;">${restaurant.icon}</span>
                        <div>
                            <h4 style="margin: 0 0 5px 0;">${restaurant.name}</h4>
                            <p style="margin: 0; font-size: 0.9rem; opacity: 0.8;">${restaurant.desc}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            <button onclick="hideRestaurantChangeModal()" style="padding: 12px 25px; background: #95a5a6; color: white; border: none; border-radius: 8px; cursor: pointer;">
                Abbrechen
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideRestaurantChangeModal();
        }
    });
}

function showRestaurantChangeModal() {
    const modal = document.getElementById('restaurantChangeModal');
    if (modal) {
        createRestaurantChangeModal();
        document.getElementById('restaurantChangeModal').style.display = 'block';
    }
}

function hideRestaurantChangeModal() {
    const modal = document.getElementById('restaurantChangeModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function selectRestaurantFromModal(restaurantId) {
    if (restaurantId === currentRestaurant) {
        hideRestaurantChangeModal();
        return;
    }

    if (selectRestaurant(restaurantId)) {
        hideRestaurantChangeModal();
        updateRestaurantHeader();
        
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (!window.location.pathname.endsWith('index.html') && 
        window.location.pathname !== '/' && 
        window.location.pathname !== '/index.html') {
        
        if (checkRestaurantSelection()) {
            createRestaurantHeader();
        }
    }
});

window.createRestaurantHeader = createRestaurantHeader;
window.updateRestaurantHeader = updateRestaurantHeader;
window.showRestaurantChangeModal = showRestaurantChangeModal;
window.hideRestaurantChangeModal = hideRestaurantChangeModal;
window.selectRestaurantFromModal = selectRestaurantFromModal;

/**
 * RESTAURANT NAVIGATION HEADER
 * Cria automaticamente uma navegação completa para todas as páginas
 */

/**
 * Cria e insere o header de navegação completo
 */
function createNavigationHeader() {
    // Verificar se já existe um header de navegação
    const existingNav = document.querySelector('.navigation-header');
    if (existingNav) {
        existingNav.remove();
    }

    // HTML do header de navegação
    const navigationHTML = `
        <div class="navigation-header" style="margin-bottom: 25px;">
            <div class="nav-buttons-container">
                <button class="nav-btn btn-home" onclick="navigateTo('dashboard')">
                    🏠 Dashboard
                </button>
                <button class="nav-btn btn-finance" onclick="navigateTo('konten')">
                    💰 Finanzen
                </button>
                <button class="nav-btn btn-inventory" onclick="navigateTo('inventar')">
                    📦 Inventar
                </button>
                <button class="nav-btn btn-shopping" onclick="navigateTo('einkaeufe')">
                    🛒 Einkaufen
                </button>
                <button class="nav-btn btn-staff" onclick="navigateTo('personal')">
                    👥 Personal
                </button>
                <button class="nav-btn btn-prep" onclick="navigateTo('vorbereitungen')">
                    🍳 Küche
                </button>
                <button class="nav-btn btn-calendar" onclick="navigateTo('kalender')">
                    📅 Kalender
                </button>
                <button class="nav-btn btn-recurring" onclick="navigateTo('recurring')">
                    🔄 Zahlungen
                </button>
                <button class="nav-btn btn-settings" onclick="navigateTo('settings')">
                    ⚙️ Settings
                </button>
            </div>
        </div>
    `;

    // CSS para o header de navegação
    const navigationCSS = `
        <style>
        .navigation-header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 15px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .nav-buttons-container {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            justify-content: center;
        }

        .navigation-header .nav-btn {
            padding: 8px 16px;
            border: none;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 600;
            color: white;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.3s ease;
            cursor: pointer;
            white-space: nowrap;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .navigation-header .btn-home { background: linear-gradient(145deg, #3498db, #2980b9); }
        .navigation-header .btn-finance { background: linear-gradient(145deg, #27ae60, #229954); }
        .navigation-header .btn-inventory { background: linear-gradient(145deg, #f39c12, #d68910); }
        .navigation-header .btn-shopping { background: linear-gradient(145deg, #e74c3c, #c0392b); }
        .navigation-header .btn-staff { background: linear-gradient(145deg, #9b59b6, #8e44ad); }
        .navigation-header .btn-prep { background: linear-gradient(145deg, #1abc9c, #16a085); }
        .navigation-header .btn-calendar { background: linear-gradient(145deg, #e67e22, #d35400); }
        .navigation-header .btn-recurring { background: linear-gradient(145deg, #34495e, #2c3e50); }
        .navigation-header .btn-settings { background: linear-gradient(145deg, #95a5a6, #7f8c8d); }

        .navigation-header .nav-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        }

        .navigation-header .nav-btn:active {
            transform: translateY(0);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
            .nav-buttons-container {
                gap: 6px;
            }

            .navigation-header .nav-btn {
                font-size: 0.8rem;
                padding: 6px 12px;
                gap: 4px;
            }
        }

        @media (max-width: 480px) {
            .nav-buttons-container {
                gap: 4px;
            }

            .navigation-header .nav-btn {
                font-size: 0.75rem;
                padding: 5px 10px;
                gap: 3px;
            }
        }
        </style>
    `;

    // Inserir CSS no head se ainda não existir
    if (!document.querySelector('#navigation-css')) {
        const style = document.createElement('style');
        style.id = 'navigation-css';
        style.innerHTML = navigationCSS.replace('<style>', '').replace('</style>', '');
        document.head.appendChild(style);
    }

    // Encontrar onde inserir o header (após container principal)
    const container = document.querySelector('.container');
    if (container) {
        const navDiv = document.createElement('div');
        navDiv.innerHTML = navigationHTML;
        container.insertBefore(navDiv.firstElementChild, container.firstElementChild);
    }
}

/**
 * Inicializa o header de navegação quando a página carrega
 */
function initializeNavigationHeader() {
    // Verificar se não estamos na página index (seleção de restaurante)
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        return;
    }

    // Criar header após carregar os dados
    document.addEventListener('DOMContentLoaded', function() {
        // Aguardar um pouco para garantir que outros scripts foram carregados
        setTimeout(createNavigationHeader, 100);
    });
}

// Auto-inicializar
initializeNavigationHeader();

/**
 * Função para destacar a página atual no menu
 */
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    const buttons = document.querySelectorAll('.navigation-header .nav-btn');
    
    buttons.forEach(button => {
        const onclick = button.getAttribute('onclick');
        if (onclick && onclick.includes(currentPage)) {
            button.style.opacity = '0.8';
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'inset 0 2px 8px rgba(0,0,0,0.3)';
            button.style.filter = 'brightness(1.1)';
        }
    });
}

// Chamar função de destaque após criar header
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(highlightCurrentPage, 200);
});

/**
 * FUNÇÕES DOS BOTÕES DE SAVE/LOAD/EXPORT
 */

// Function to quickly save data
function performQuickSave() {
    try {
        if (typeof quickSave === 'function') {
            quickSave();
        } else if (typeof saveDataToStorage === 'function') {
            saveDataToStorage();
        }
        
        // Add visual effect to button
        const saveBtn = document.querySelector('.save-btn');
        if (saveBtn) {
            saveBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            saveBtn.innerHTML = '<span class="icon">✅</span>Saved!';
            
            setTimeout(() => {
                saveBtn.style.background = 'rgba(255,255,255,0.1)';
                saveBtn.innerHTML = '<span class="icon">💾</span>Save';
            }, 1500);
        }
        
        if (typeof showNotification === 'function') {
            showNotification('✅ Data saved successfully!', 'success');
        }
            } catch (error) {
        console.error('Error saving data:', error);
        if (typeof showNotification === 'function') {
            showNotification('❌ Error saving data', 'error');
        }
    }
}

// Function to export current restaurant data
function exportCurrentData() {
    try {
        if (typeof exportData === 'function') {
            const success = exportData();
            if (success) {
                // Add visual effect to button
                const exportBtn = document.querySelector('.export-btn');
                if (exportBtn) {
                    exportBtn.style.background = 'linear-gradient(135deg, #f39c12, #f1c40f)';
                    exportBtn.innerHTML = '<span class="icon">✅</span>Exported!';
                    
                    setTimeout(() => {
                        exportBtn.style.background = 'rgba(255,255,255,0.1)';
                        exportBtn.innerHTML = '<span class="icon">⬇️</span>Export';
                    }, 2000);
                }
                
                if (typeof showNotification === 'function') {
                    showNotification('📁 Data exported successfully!', 'success');
                }
            }
        } else {
            if (typeof showNotification === 'function') {
                showNotification('❌ Export function not available', 'error');
            }
        }
    } catch (error) {
        console.error('Error exporting data:', error);
        if (typeof showNotification === 'function') {
            showNotification('❌ Error exporting data', 'error');
        }
    }
}

// Function to show data loading modal
function showDataLoadModal() {
    // Create modal if it doesn't exist
    const existingModal = document.getElementById('dataLoadModal');
    if (existingModal) {
        existingModal.style.display = 'block';
        return;
    }
    
    const modal = document.createElement('div');
    modal.id = 'dataLoadModal';
    modal.className = 'data-load-modal';
    modal.innerHTML = `
        <div class="data-load-content">
            <h3>📁 Load Data</h3>
            <p style="margin-bottom: 30px; color: #7f8c8d; line-height: 1.6;">
                Choose how you want to load the restaurant data:
            </p>
            
            <div class="load-options">
                <div class="load-option" onclick="reloadFromStorage()">
                    <span class="load-icon">🔄</span>
                    <div class="load-info">
                        <h4>Reload from Cache</h4>
                        <p>Update data from local storage</p>
                    </div>
                </div>
                
                <div class="load-option" onclick="document.getElementById('importFileInput').click()">
                    <span class="load-icon">📂</span>
                    <div class="load-info">
                        <h4>Import File</h4>
                        <p>Load data from a JSON file</p>
                    </div>
                </div>
                
                <div class="load-option" onclick="loadDemoData()">
                    <span class="load-icon">🎭</span>
                    <div class="load-info">
                        <h4>Demo Data</h4>
                        <p>Load demonstration data</p>
                    </div>
                </div>
            </div>
            
            <input type="file" id="importFileInput" accept=".json" style="display: none;" onchange="handleFileImportFromModal(event)">
            
            <div style="text-align: center; margin-top: 30px;">
                <button class="modal-btn cancel-btn" onclick="hideDataLoadModal()">Cancel</button>
            </div>
        </div>
    `;
    
    // Add modal styles
    if (!document.getElementById('data-load-modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'data-load-modal-styles';
        styles.textContent = `
            .data-load-modal {
                display: block;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.7);
                z-index: 1001;
                overflow-y: auto;
            }
            .data-load-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 40px;
                border-radius: 20px;
                width: 90%;
                max-width: 500px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                text-align: center;
            }
            .load-options {
                display: flex;
                flex-direction: column;
                gap: 15px;
                margin: 20px 0;
            }
            .load-option {
                background: #f8f9fa;
                border: 2px solid #e9ecef;
                padding: 20px;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 15px;
                text-align: left;
            }
            .load-option:hover {
                background: #e9ecef;
                border-color: #3498db;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            .load-icon {
                font-size: 2.5rem;
                min-width: 60px;
                text-align: center;
            }
            .load-info h4 {
                margin: 0 0 5px 0;
                color: #2c3e50;
                font-size: 1.1rem;
            }
            .load-info p {
                margin: 0;
                color: #7f8c8d;
                font-size: 0.9rem;
            }
            .modal-btn {
                padding: 12px 25px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            .cancel-btn {
                background: #95a5a6;
                color: white;
            }
            .cancel-btn:hover {
                background: #7f8c8d;
                transform: translateY(-1px);
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(modal);
}

// Function to hide data loading modal
function hideDataLoadModal() {
    const modal = document.getElementById('dataLoadModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Function to reload data from storage
function reloadFromStorage() {
    try {
        if (typeof loadDataFromStorage === 'function') {
            loadDataFromStorage();
            hideDataLoadModal();
            
            if (typeof showNotification === 'function') {
                showNotification('🔄 Data reloaded from local cache!', 'success');
            }
            
            // Reload page to ensure complete update
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    } catch (error) {
        console.error('Error reloading data:', error);
        if (typeof showNotification === 'function') {
            showNotification('❌ Error reloading data', 'error');
        }
    }
}

// Function to import file from modal
function handleFileImportFromModal(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (!file.name.endsWith('.json')) {
        if (typeof showNotification === 'function') {
            showNotification('❌ Please select a JSON file', 'error');
        }
        return;
    }
    
    if (confirm('⚠️ Warning: All current data will be replaced! Do you want to continue?')) {
        if (typeof importData === 'function') {
            importData(file)
                .then(() => {
                    hideDataLoadModal();
                    if (typeof showNotification === 'function') {
                        showNotification('✅ Data imported successfully! Reloading...', 'success');
                    }
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                })
                .catch(error => {
                    console.error('Import error:', error);
                    if (typeof showNotification === 'function') {
                        showNotification('❌ Import error: ' + error.message, 'error');
                    }
                });
        } else {
            if (typeof showNotification === 'function') {
                showNotification('❌ Import function not available', 'error');
            }
        }
    }
    
    // Clear input
    event.target.value = '';
}

// Function to load demo data
function loadDemoData() {
    if (confirm('⚠️ This will load demonstration data and replace current data. Continue?')) {
        try {
            // Here you can implement specific demo data loading
            // For now, we'll use the system's default data
            if (typeof initializeDefaultData === 'function') {
                initializeDefaultData();
                if (typeof saveDataToStorage === 'function') {
                    saveDataToStorage();
                }
                hideDataLoadModal();
                
                if (typeof showNotification === 'function') {
                    showNotification('🎭 Demo data loaded! Reloading...', 'success');
                }
                
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                if (typeof showNotification === 'function') {
                    showNotification('❌ Demo data not available', 'error');
                }
            }
        } catch (error) {
            console.error('Error loading demo data:', error);
            if (typeof showNotification === 'function') {
                showNotification('❌ Error loading demo data', 'error');
            }
        }
    }
}

// Make functions global
window.performQuickSave = performQuickSave;
window.exportCurrentData = exportCurrentData;
window.showDataLoadModal = showDataLoadModal;
window.hideDataLoadModal = hideDataLoadModal;
window.reloadFromStorage = reloadFromStorage;
window.handleFileImportFromModal = handleFileImportFromModal;
window.loadDemoData = loadDemoData;