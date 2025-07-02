/**
 * Sistema de Salvamento Automático
 * Gerencia salvamento automático e atalhos de teclado
 */

class AutoSaveManager {
    constructor() {
        this.autoSaveInterval = null;
        this.hasUnsavedChanges = false;
        this.lastSaveTime = Date.now();
        this.saveInterval = 30000; // 30 segundos
        
        this.init();
    }
    
    init() {
        this.setupKeyboardShortcuts();
        this.setupAutoSaveInterval();
        this.setupFormChangeTracking();
        this.createAutoSaveIndicator();
    }
    
    /**
     * Configura atalhos de teclado
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+S oder Cmd+S für schnellen Speicher
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                this.performQuickSave();
            }
            
            // Ctrl+E oder Cmd+E für Backup
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                this.performBackup();
            }
        });
    }
    
    /**
     * Configura intervalo de salvamento automático
     */
    setupAutoSaveInterval() {
        this.autoSaveInterval = setInterval(() => {
            if (this.hasUnsavedChanges) {
                this.performAutoSave();
            }
        }, this.saveInterval);
    }
    
    /**
     * Monitora mudanças em formulários
     */
    setupFormChangeTracking() {
        // Monitora mudanças em inputs, selects e textareas
        document.addEventListener('input', () => {
            this.markAsUnsaved();
        });
        
        document.addEventListener('change', () => {
            this.markAsUnsaved();
        });
        
        // Monitora cliques em botões de ação
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn-primary, .btn-success, .btn-danger, .btn-edit, .btn-delete')) {
                this.markAsUnsaved();
            }
        });
    }
    
    /**
     * Cria indicador visual de salvamento automático
     */
    createAutoSaveIndicator() {
        if (!document.querySelector('.auto-save-indicator')) {
            const indicator = document.createElement('div');
            indicator.className = 'auto-save-indicator';
            indicator.innerHTML = '✅ Automatisch gespeichert';
            document.body.appendChild(indicator);
        }
    }
    
    /**
     * Marca dados como não salvos
     */
    markAsUnsaved() {
        this.hasUnsavedChanges = true;
    }
    
    /**
     * Marca dados como salvos
     */
    markAsSaved() {
        this.hasUnsavedChanges = false;
        this.lastSaveTime = Date.now();
        this.showAutoSaveIndicator();
    }
    
    /**
     * Mostra indicador de salvamento automático
     */
    showAutoSaveIndicator() {
        const indicator = document.querySelector('.auto-save-indicator');
        if (indicator) {
            indicator.classList.add('show');
            setTimeout(() => {
                indicator.classList.remove('show');
            }, 2000);
        }
    }
    
    /**
     * Executa salvamento automático
     */
    performAutoSave() {
        if (typeof saveDataToStorage === 'function') {
            saveDataToStorage();
            this.markAsSaved();
            
            if (typeof showNotification === 'function') {
                showNotification('💾 Daten automatisch gespeichert', 'success');
            }
        }
    }
    
    /**
     * Executa salvamento rápido (Ctrl+S)
     */
    performQuickSave() {
        if (typeof quickSave === 'function') {
            quickSave();
            this.markAsSaved();
        } else if (typeof saveDataToStorage === 'function') {
            saveDataToStorage();
            this.markAsSaved();
            
            if (typeof showNotification === 'function') {
                showNotification('⚡ Schnelle Speicherung durchgeführt!', 'success');
            }
        }
    }
    
    /**
     * Executa backup (Ctrl+E)
     */
    performBackup() {
        if (typeof exportData === 'function') {
            exportData();
        }
    }
    
    /**
     * Obtém tempo desde o último salvamento
     */
    getTimeSinceLastSave() {
        return Date.now() - this.lastSaveTime;
    }
    
    /**
     * Obtém status de salvamento
     */
    getSaveStatus() {
        return {
            hasUnsavedChanges: this.hasUnsavedChanges,
            lastSaveTime: this.lastSaveTime,
            timeSinceLastSave: this.getTimeSinceLastSave()
        };
    }
    
    /**
     * Para o salvamento automático
     */
    destroy() {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
            this.autoSaveInterval = null;
        }
    }
}

// Inicializar o sistema de salvamento automático quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.autoSaveManager = new AutoSaveManager();
    
    // Adicionar informações sobre atalhos de teclado na primeira visita
    const hasSeenShortcuts = localStorage.getItem('hasSeenKeyboardShortcuts');
    if (!hasSeenShortcuts) {
        setTimeout(() => {
            if (typeof showNotification === 'function') {
                showNotification('💡 Tipp: Verwenden Sie Strg+S zum schnellen Speichern und Strg+E für Backup', 'info');
            }
            localStorage.setItem('hasSeenKeyboardShortcuts', 'true');
        }, 2000);
    }
});

// Salvar antes de sair da página
window.addEventListener('beforeunload', (e) => {
    if (window.autoSaveManager && window.autoSaveManager.hasUnsavedChanges) {
        if (typeof saveDataToStorage === 'function') {
            saveDataToStorage();
        }
    }
}); 