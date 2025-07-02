/**
 * EventBus - Sistema de comunicação entre módulos
 * Sistema offline para coordenar todos os módulos do restaurante
 */

class EventBus {
    constructor() {
        this.events = {};
        this.debug = true; // Para debug e desenvolvimento
        console.log('🚌 EventBus inicializado');
    }

    /**
     * Registra um listener para um evento
     * @param {string} eventName Nome do evento
     * @param {function} callback Função callback
     */
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
        
        if (this.debug) {
            console.log(`📡 Listener registrado para evento: ${eventName}`);
        }
    }

    /**
     * Remove um listener para um evento
     * @param {string} eventName Nome do evento
     * @param {function} callback Função callback para remover
     */
    off(eventName, callback) {
        if (!this.events[eventName]) return;
        
        this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
        
        if (this.debug) {
            console.log(`📡 Listener removido para evento: ${eventName}`);
        }
    }

    /**
     * Emite um evento para todos os listeners
     * @param {string} eventName Nome do evento
     * @param {*} data Dados a serem enviados
     */
    emit(eventName, data) {
        if (this.debug) {
            console.log(`🚀 Emitindo evento: ${eventName}`, data);
        }
        
        if (!this.events[eventName]) return;
        
        this.events[eventName].forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error(`❌ Erro ao executar callback para evento ${eventName}:`, error);
            }
        });
    }

    /**
     * Registra listener que é executado apenas uma vez
     * @param {string} eventName Nome do evento
     * @param {function} callback Função callback
     */
    once(eventName, callback) {
        const onceWrapper = (data) => {
            callback(data);
            this.off(eventName, onceWrapper);
        };
        this.on(eventName, onceWrapper);
    }

    /**
     * Lista todos os eventos registrados
     */
    listEvents() {
        console.log('📋 Eventos registrados:', Object.keys(this.events));
        return Object.keys(this.events);
    }

    /**
     * Remove todos os listeners
     */
    clear() {
        this.events = {};
        console.log('🧹 EventBus limpo');
    }
}

// Instância global do EventBus
const eventBus = new EventBus();

// Eventos padrão do sistema
const EVENTS = {
    // Dados / Storage
    DATA_CHANGED: 'dataChanged',
    RESTAURANT_CHANGED: 'restaurantChanged',
    
    // Financeiro
    CASHFLOW_ADDED: 'cashflowAdded',
    CASHFLOW_UPDATED: 'cashflowUpdated',
    CASHFLOW_DELETED: 'cashflowDeleted',
    
    // Pagamentos recorrentes
    RECURRING_PAYMENT_ADDED: 'recurringPaymentAdded',
    RECURRING_PAYMENT_UPDATED: 'recurringPaymentUpdated',
    RECURRING_PAYMENT_DELETED: 'recurringPaymentDeleted',
    RECURRING_PAYMENT_DUE: 'recurringPaymentDue',
    
    // Inventário
    INVENTORY_UPDATED: 'inventoryUpdated',
    LOW_STOCK_ALERT: 'lowStockAlert',
    
    // Funcionários
    EMPLOYEE_ADDED: 'employeeAdded',
    EMPLOYEE_UPDATED: 'employeeUpdated',
    EMPLOYEE_DELETED: 'employeeDeleted',
    
    // Preparações
    PREPARATION_ADDED: 'preparationAdded',
    PREPARATION_UPDATED: 'preparationUpdated',
    PREPARATION_COMPLETED: 'preparationCompleted',
    
    // Calendário
    CALENDAR_EVENT_ADDED: 'calendarEventAdded',
    CALENDAR_REFRESHED: 'calendarRefreshed',
    
    // Notificações
    NOTIFICATION_SHOW: 'notificationShow',
    ALERT_REMINDER: 'alertReminder'
};

// Auto-inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 EventBus pronto para uso');
    
    // Configurar listeners globais para debug
    if (eventBus.debug) {
        // Listener para mudanças de dados
        eventBus.on(EVENTS.DATA_CHANGED, (data) => {
            console.log('💾 Dados alterados:', data);
        });
        
        // Listener para mudanças de restaurante
        eventBus.on(EVENTS.RESTAURANT_CHANGED, (data) => {
            console.log('🏪 Restaurante alterado:', data);
            // Recarregar dados relevantes
            if (typeof loadDataFromStorage === 'function') {
                loadDataFromStorage();
            }
        });
    }
}); 