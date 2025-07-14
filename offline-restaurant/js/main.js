/**
 * Sistema de Gestão de Restaurante - Offline
 * Arquivo principal para gerenciamento de dados
 */

// Objeto principal que contém todos os dados da aplicação organizados por restaurante
let appData = {
    Cantinetta: {
        cashflow: [],
        events: [],
        inventory: [],
        shopping: [],
        employees: [],
        preparations: [],
        recurring: [],
        customCategories: {
            financial: {
                income: [], // Categorias de receitas customizadas
                expense: [] // Categorias de despesas customizadas
            },
            recurring: [], // Categorias de pagamentos recorrentes customizadas
            inventory: [], // Categorias de produtos customizadas
            preparations: [], // Categorias de preparações customizadas
            employeeRoles: [] // Roles de funcionários customizados
        },
        settings: {
            restaurantName: 'Cantinetta',
            currency: '€'
        }
    },
    ThePastaRoom: {
        cashflow: [],
        events: [],
        inventory: [],
        shopping: [],
        employees: [],
        preparations: [],
        recurring: [],
        customCategories: {
            financial: {
                income: [],
                expense: []
            },
            recurring: [],
            inventory: [],
            preparations: [],
            employeeRoles: []
        },
        settings: {
            restaurantName: 'The Pasta Room',
            currency: '€'
        }
    },
    Panuozzo: {
        cashflow: [],
        events: [],
        inventory: [],
        shopping: [],
        employees: [],
        preparations: [],
        recurring: [],
        customCategories: {
            financial: {
                income: [],
                expense: []
            },
            recurring: [],
            inventory: [],
            preparations: [],
            employeeRoles: []
        },
        settings: {
            restaurantName: 'Panuozzo',
            currency: '€'
        }
    }
};

// Restaurante atualmente selecionado
let currentRestaurant = null;

// Chaves para localStorage
const STORAGE_KEY = 'restaurant_data';
const RESTAURANT_KEY = 'selected_restaurant';

/**
 * Carrega dados do localStorage
 */
function loadDataFromStorage() {
    console.log('🔧 INICIANDO loadDataFromStorage...');
    
    // Primeiro, garantir que appData existe
    if (!appData) {
        appData = {};
    }
    
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
        try {
            const parsedData = JSON.parse(storedData);
            appData = parsedData;
            console.log('✅ Dados carregados do localStorage');
        } catch (error) {
            console.error('❌ Erro ao carregar dados, inicializando padrão:', error);
            initializeDefaultData();
        }
    } else {
        console.log('⚠️ Nenhum dado encontrado, inicializando dados padrão');
        initializeDefaultData();
    }
    
    console.log('🔍 DEBUG appData após carregamento:', Object.keys(appData));
    
    // Carrega restaurante selecionado
    const storedRestaurant = localStorage.getItem(RESTAURANT_KEY);
    console.log('🔍 DEBUG localStorage RESTAURANT_KEY:', storedRestaurant);
    
    // CORRIGIDO: Verificação mais robusta
    if (storedRestaurant && appData && appData[storedRestaurant]) {
        currentRestaurant = storedRestaurant;
        console.log('✅ Restaurante carregado com sucesso:', currentRestaurant);
    } else {
        console.log('⚠️ Resetando seleção - dados inconsistentes');
        currentRestaurant = null;
        localStorage.removeItem(RESTAURANT_KEY);
    }
    
    console.log('🔍 DEBUG Estado final:');
    console.log('   - currentRestaurant:', currentRestaurant);
    console.log('   - appData keys:', Object.keys(appData || {}));
    console.log('   - localStorage:', localStorage.getItem(RESTAURANT_KEY));
}

/**
 * Inicializa dados padrão se não existirem
 */
function initializeDefaultData() {
    console.log('Inicializando dados padrão...');
    
    // Dados padrão para Cantinetta
    appData.Cantinetta = {
        cashflow: [
            {
                id: generateId(),
                datum: '2025-06-01',
                betrag: 1500.00,
                beschreibung: 'Tageseinnahmen - Weinverkostung',
                kategorie: 'verkauf',
                typ: 'einnahme',
                rechnung: 'WEIN-001'
            },
            {
                id: generateId(),
                datum: '2025-06-02',
                betrag: 850.00,
                beschreibung: 'Mittagsservice',
                kategorie: 'verkauf',
                typ: 'einnahme',
                rechnung: 'TAG-002'
            },
            {
                id: generateId(),
                datum: '2025-06-02',
                betrag: 45.00,
                beschreibung: 'Trinkgeld Service',
                kategorie: 'trinkgeld',
                typ: 'einnahme',
                rechnung: ''
            },
            {
                id: generateId(),
                datum: '2025-06-01',
                betrag: 320.00,
                beschreibung: 'Einkauf Fleisch und Wein',
                kategorie: 'einkauf',
                typ: 'ausgabe',
                rechnung: 'EK-001'
            },
            {
                id: generateId(),
                datum: '2025-06-01',
                betrag: 1200.00,
                beschreibung: 'Miete Restaurant',
                kategorie: 'miete',
                typ: 'ausgabe',
                rechnung: 'MIETE-06-2025'
            }
        ],
        events: [],
        inventory: [
            {
                id: generateId(),
                name: 'Chianti Classico',
                kategorie: 'Weine',
                bestand: 12,
                einheit: 'Flaschen',
                mindestbestand: 5,
                preis: 25.50,
                lieferant: 'Weinhandel Rossi'
            },
            {
                id: generateId(),
                name: 'Parmigiano Reggiano',
                kategorie: 'Käse',
                bestand: 2.5,
                einheit: 'kg',
                mindestbestand: 1,
                preis: 32.00,
                lieferant: 'Casa Italia'
            }
        ],
        shopping: [],
        employees: [
            {
                id: generateId(),
                name: 'Marco Rossi',
                rolle: 'Küchenchef',
                arbeitstage: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
                startzeit: '07:00',
                endzeit: '15:00',
                stundenlohn_brutto: 22.50,
                stundenlohn_netto: 18.20,
                notizen: 'Erfahrener Küchenchef mit 10 Jahren Berufserfahrung'
            }
        ],
        preparations: [],
        recurring: [
            {
                id: generateId(),
                beschreibung: 'Miete Restaurant',
                betrag: 1200.00,
                kategorie: 'miete',
                typ: 'ausgabe',
                häufigkeit: 'monatlich',
                startDatum: '2025-01-01',
                erinnerungen: [1, 3] // Tage vor Fälligkeit
            },
            {
                id: generateId(),
                beschreibung: 'Versicherung',
                betrag: 85.00,
                kategorie: 'versicherung',
                typ: 'ausgabe',
                häufigkeit: 'monatlich',
                startDatum: '2025-01-15',
                erinnerungen: [3]
            }
        ],
        settings: {
            restaurantName: 'Cantinetta',
            currency: '€'
        }
    };

    // Dados padrão para The Pasta Room
    appData.ThePastaRoom = {
        cashflow: [
            {
                id: generateId(),
                datum: '2025-06-01',
                betrag: 980.00,
                beschreibung: 'Tageseinnahmen - Pasta Special',
                kategorie: 'verkauf',
                typ: 'einnahme',
                rechnung: 'PASTA-001'
            },
            {
                id: generateId(),
                datum: '2025-06-02',
                betrag: 1250.00,
                beschreibung: 'Wochenend-Service',
                kategorie: 'verkauf',
                typ: 'einnahme',
                rechnung: 'TAG-002'
            },
            {
                id: generateId(),
                datum: '2025-06-02',
                betrag: 65.00,
                beschreibung: 'Trinkgeld Team',
                kategorie: 'trinkgeld',
                typ: 'einnahme',
                rechnung: ''
            },
            {
                id: generateId(),
                datum: '2025-06-01',
                betrag: 180.00,
                beschreibung: 'Einkauf frische Pasta-Zutaten',
                kategorie: 'einkauf',
                typ: 'ausgabe',
                rechnung: 'EK-PASTA-001'
            },
            {
                id: generateId(),
                datum: '2025-06-01',
                betrag: 950.00,
                beschreibung: 'Miete Lokal',
                kategorie: 'miete',
                typ: 'ausgabe',
                rechnung: 'MIETE-06-2025'
            },
            {
                id: generateId(),
                datum: '2025-06-01',
                betrag: 125.00,
                beschreibung: 'Stromrechnung',
                kategorie: 'strom',
                typ: 'ausgabe',
                rechnung: 'STROM-05-2025'
            }
        ],
        events: [],
        inventory: [
            {
                id: generateId(),
                name: 'San Marzano Tomaten',
                kategorie: 'Gemüse',
                bestand: 8,
                einheit: 'Dosen',
                mindestbestand: 3,
                preis: 4.50,
                lieferant: 'Italienische Feinkost'
            },
            {
                id: generateId(),
                name: 'Spaghetti Nr. 5',
                kategorie: 'Pasta',
                bestand: 25,
                einheit: 'Pakete',
                mindestbestand: 10,
                preis: 1.80,
                lieferant: 'Pasta Import'
            }
        ],
        shopping: [],
        employees: [
            {
                id: generateId(),
                name: 'Sofia Bianchi',
                rolle: 'Pasta-Köchin',
                arbeitstage: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
                startzeit: '11:00',
                endzeit: '19:00',
                stundenlohn_brutto: 18.00,
                stundenlohn_netto: 14.60,
                notizen: 'Spezialistin für hausgemachte Pasta und italienische Saucen'
            }
        ],
        preparations: [],
        recurring: [
            {
                id: generateId(),
                beschreibung: 'Miete Lokal',
                betrag: 950.00,
                kategorie: 'miete',
                typ: 'ausgabe',
                häufigkeit: 'monatlich',
                startDatum: '2025-01-01',
                erinnerungen: [1, 3]
            },
            {
                id: generateId(),
                beschreibung: 'Lebensmittellieferung',
                betrag: 350.00,
                kategorie: 'einkauf',
                typ: 'ausgabe',
                häufigkeit: 'wöchentlich',
                startDatum: '2025-01-07',
                erinnerungen: [1]
            }
        ],
        settings: {
            restaurantName: 'The Pasta Room',
            currency: '€'
        }
    };

    // Dados padrão para Panuozzo
    appData.Panuozzo = {
        cashflow: [
            {
                id: generateId(),
                datum: '2025-06-01',
                betrag: 450.00,
                beschreibung: 'Tageseinnahmen - Street Food',
                kategorie: 'verkauf',
                typ: 'einnahme',
                rechnung: 'PAN-001'
            },
            {
                id: generateId(),
                datum: '2025-06-02',
                betrag: 680.00,
                beschreibung: 'Weekend Rush',
                kategorie: 'verkauf',
                typ: 'einnahme',
                rechnung: 'WE-002'
            },
            {
                id: generateId(),
                datum: '2025-06-02',
                betrag: 25.00,
                beschreibung: 'Trinkgeld Kasse',
                kategorie: 'trinkgeld',
                typ: 'einnahme',
                rechnung: ''
            },
            {
                id: generateId(),
                datum: '2025-06-01',
                betrag: 120.00,
                beschreibung: 'Einkauf Panuozzo-Brot',
                kategorie: 'einkauf',
                typ: 'ausgabe',
                rechnung: 'BROT-001'
            },
            {
                id: generateId(),
                datum: '2025-06-01',
                betrag: 750.00,
                beschreibung: 'Miete Stand',
                kategorie: 'miete',
                typ: 'ausgabe',
                rechnung: 'MIETE-STAND-06'
            }
        ],
        events: [],
        inventory: [
            {
                id: generateId(),
                name: 'Panuozzo Brot',
                kategorie: 'Brot',
                bestand: 50,
                einheit: 'Stück',
                mindestbestand: 20,
                preis: 0.80,
                lieferant: 'Bäckerei Napoli'
            },
            {
                id: generateId(),
                name: 'Mozzarella di Bufala',
                kategorie: 'Käse',
                bestand: 3,
                einheit: 'kg',
                mindestbestand: 1,
                preis: 12.50,
                lieferant: 'Italienische Feinkost'
            }
        ],
        shopping: [],
        employees: [
            {
                id: generateId(),
                name: 'Giuseppe Romano',
                rolle: 'Panuozzo-Meister',
                arbeitstage: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
                startzeit: '10:00',
                endzeit: '16:00',
                stundenlohn_brutto: 16.50,
                stundenlohn_netto: 13.40,
                notizen: 'Authentischer Panuozzo-Spezialist aus Neapel'
            }
        ],
        preparations: [],
        recurring: [
            {
                id: generateId(),
                beschreibung: 'Miete Stand',
                betrag: 750.00,
                kategorie: 'miete',
                typ: 'ausgabe',
                häufigkeit: 'monatlich',
                startDatum: '2025-01-01',
                erinnerungen: [1, 3]
            },
            {
                id: generateId(),
                beschreibung: 'Brot-Lieferung',
                betrag: 120.00,
                kategorie: 'einkauf',
                typ: 'ausgabe',
                häufigkeit: 'wöchentlich',
                startDatum: '2025-01-03',
                erinnerungen: [1]
            }
        ],
        settings: {
            restaurantName: 'Panuozzo',
            currency: '€'
        }
    };
    
    saveDataToStorage();
    console.log('Dados padrão inicializados para todos os restaurantes!');
}

/**
 * Salva dados no localStorage
 */
function saveDataToStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
        console.log('Dados salvos no localStorage');
        
        // Emitir evento de mudança de dados
        if (typeof eventBus !== 'undefined') {
            eventBus.emit(EVENTS.DATA_CHANGED, {
                restaurant: currentRestaurant,
                timestamp: new Date().toISOString()
            });
        }
    } catch (error) {
        console.error('Erro ao salvar dados no localStorage:', error);
    }
}

/**
 * Formata valor monetário em euros
 * @param {number} value - Valor a ser formatado
 * @returns {string} - Valor formatado em euros
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
    }).format(value);
}

/**
 * Formata data para exibição
 * @param {Date|string} date - Data a ser formatada
 * @returns {string} - Data formatada
 */
function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('de-DE');
}

/**
 * Gera ID único
 * @returns {string} - ID único
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Adiciona entrada no fluxo de caixa
 * @param {Object} entry - Entrada de fluxo de caixa
 */
function addCashflowEntry(entry) {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return false;
    
    entry.id = generateId();
    if (!entry.datum) {
        // Fix timezone issue: create date string without timezone conversion
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        entry.datum = `${year}-${month}-${day}`;
    }
    restaurantData.cashflow.push(entry);
    saveDataToStorage();
    
    // Emitir evento específico
    if (typeof eventBus !== 'undefined') {
        eventBus.emit(EVENTS.CASHFLOW_ADDED, {
            entry: entry,
            restaurant: currentRestaurant
        });
        
        // Adicionar evento ao calendário
        eventBus.emit(EVENTS.CALENDAR_EVENT_ADDED, {
            datum: entry.datum,
            beschreibung: entry.beschreibung,
            betrag: entry.betrag,
            typ: entry.typ,
            kategorie: entry.kategorie,
            source: 'cashflow'
        });
    }
    
    return true;
}

/**
 * Remove entrada do fluxo de caixa
 * @param {string} id - ID da entrada
 */
function removeCashflowEntry(id) {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return false;
    
    restaurantData.cashflow = restaurantData.cashflow.filter(entry => entry.id !== id);
    saveDataToStorage();
    return true;
}

/**
 * Atualiza entrada do fluxo de caixa
 * @param {string} id - ID da entrada
 * @param {Object} updates - Atualizações a serem aplicadas
 */
function updateCashflowEntry(id, updates) {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return false;
    
    const index = restaurantData.cashflow.findIndex(entry => entry.id === id);
    if (index !== -1) {
        restaurantData.cashflow[index] = { ...restaurantData.cashflow[index], ...updates };
        saveDataToStorage();
        return true;
    }
    return false;
}

/**
 * Obtém transações de uma data específica
 * @param {string} date - Data no formato YYYY-MM-DD
 * @returns {Array} - Array de transações da data
 */
function getCashflowByDate(date) {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return [];
    
    return restaurantData.cashflow.filter(entry => entry.datum === date);
}

/**
 * Calcula totais financeiros para um período
 * @param {string} startDate - Data inicial (YYYY-MM-DD) - opcional
 * @param {string} endDate - Data final (YYYY-MM-DD) - opcional
 * @returns {Object} - Objeto com totais
 */
function calculateFinancialTotals(startDate, endDate) {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return { einnahmen: 0, ausgaben: 0, gewinn: 0, entries: [] };
    
    let filteredEntries = restaurantData.cashflow;
    
    // Se datas foram fornecidas, filtrar por período
    if (startDate && endDate) {
        filteredEntries = restaurantData.cashflow.filter(entry => {
            return entry.datum >= startDate && entry.datum <= endDate;
        });
    }
    
    const einnahmen = filteredEntries
        .filter(entry => entry.typ === 'einnahme')
        .reduce((sum, entry) => sum + parseFloat(entry.betrag), 0);
    
    const ausgaben = filteredEntries
        .filter(entry => entry.typ === 'ausgabe')
        .reduce((sum, entry) => sum + parseFloat(entry.betrag), 0);
    
    return {
        einnahmen,
        ausgaben,
        gewinn: einnahmen - ausgaben,
        entries: filteredEntries
    };
}

/**
 * Adiciona item ao inventário
 * @param {Object} item - Item do inventário
 */
function addInventoryItem(item) {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return false;
    
    item.id = generateId();
    restaurantData.inventory.push(item);
    saveDataToStorage();
    return true;
}

/**
 * Remove item do inventário
 * @param {string} id - ID do item
 */
function removeInventoryItem(id) {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return false;
    
    restaurantData.inventory = restaurantData.inventory.filter(item => item.id !== id);
    saveDataToStorage();
    return true;
}

/**
 * Atualiza item do inventário
 * @param {string} id - ID do item
 * @param {Object} updates - Atualizações a serem aplicadas
 */
function updateInventoryItem(id, updates) {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return false;
    
    const index = restaurantData.inventory.findIndex(item => item.id === id);
    if (index !== -1) {
        restaurantData.inventory[index] = { ...restaurantData.inventory[index], ...updates };
        saveDataToStorage();
        return true;
    }
    return false;
}

/**
 * Adiciona pagamento recorrente
 * @param {Object} payment - Pagamento recorrente
 */
function addRecurringPayment(payment) {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return false;
    
    payment.id = generateId();
    payment.nextDue = calculateNextDue(payment);
    
    if (!restaurantData.recurring) {
        restaurantData.recurring = [];
    }
    restaurantData.recurring.push(payment);
    saveDataToStorage();
    
    // Emitir evento
    if (typeof eventBus !== 'undefined') {
        eventBus.emit(EVENTS.RECURRING_PAYMENT_ADDED, {
            payment: payment,
            restaurant: currentRestaurant
        });
        
        // Adicionar evento futuro ao calendário
        if (payment.nextDue) {
            eventBus.emit(EVENTS.CALENDAR_EVENT_ADDED, {
                datum: formatDate(payment.nextDue),
                beschreibung: `Zahlung: ${payment.description}`,
                betrag: payment.amount,
                typ: 'recurring',
                kategorie: payment.category,
                source: 'recurring'
            });
        }
    }
    
    return true;
}

/**
 * Remove pagamento recorrente
 * @param {string} id - ID do pagamento
 */
function removeRecurringPayment(id) {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return false;
    
    restaurantData.recurring = restaurantData.recurring.filter(payment => payment.id !== id);
    saveDataToStorage();
    return true;
}

/**
 * Calcula próxima data de vencimento
 * @param {Object} payment - Pagamento recorrente
 * @returns {string} - Próxima data de vencimento
 */
function calculateNextDue(payment) {
    let nextDue;
    
    // Se tem customDate, usar isso
    if (payment.customDate) {
        nextDue = new Date(payment.customDate);
    } else if (payment.startDate) {
        // Se tem startDate, usar isso
        nextDue = new Date(payment.startDate);
    } else {
        // Senão, calcular baseado na frequência
        const today = new Date();
        nextDue = new Date(today);
        
        switch (payment.frequency) {
            case 'weekly':
                nextDue.setDate(today.getDate() + 7);
                break;
            case 'monthly':
                nextDue.setMonth(today.getMonth() + 1);
                break;
            case 'quarterly':
                nextDue.setMonth(today.getMonth() + 3);
                break;
            case 'yearly':
                nextDue.setFullYear(today.getFullYear() + 1);
                break;
            default:
                nextDue.setMonth(today.getMonth() + 1);
        }
    }
    
    // Retornar apenas a data (sem timezone issues)
    const year = nextDue.getFullYear();
    const month = String(nextDue.getMonth() + 1).padStart(2, '0');
    const day = String(nextDue.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Gera nova lista de compras baseada no inventário
 */
function generateShoppingList() {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return false;
    
    const shoppingList = [];
    
    restaurantData.inventory.forEach(item => {
        const needed = item.wöchentlicherBedarf - item.aktuellerBestand;
        if (needed > 0) {
            shoppingList.push({
                id: generateId(),
                produkt: item.produkt,
                menge: needed,
                einheit: item.einheit,
                status: 'offen',
                priority: needed >= item.wöchentlicherBedarf * 0.8 ? 'hoch' : needed >= item.wöchentlicherBedarf * 0.5 ? 'mittel' : 'niedrig'
            });
        }
    });
    
    restaurantData.shopping = shoppingList;
    saveDataToStorage();
    return true;
}

/**
 * Atualiza status de um item da lista de compras
 * @param {string} id - ID do item
 * @param {string} status - Novo status (offen, gekauft, nicht_verfügbar, später_kaufen)
 */
function updateShoppingStatus(id, status) {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return false;
    
    const item = restaurantData.shopping.find(item => item.id === id);
    if (item) {
        item.status = status;
        saveDataToStorage();
        return true;
    }
    return false;
}

/**
 * Remove item da lista de compras
 * @param {string} id - ID do item
 */
function removeShoppingItem(id) {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return false;
    
    restaurantData.shopping = restaurantData.shopping.filter(item => item.id !== id);
    saveDataToStorage();
    return true;
}

/**
 * Marca todos os itens como comprados
 */
function markAllAsBought() {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return false;
    
    restaurantData.shopping.forEach(item => {
        if (item.status === 'offen') {
            item.status = 'gekauft';
        }
    });
    
    saveDataToStorage();
    return true;
}

/**
 * Obtém estatísticas da lista de compras
 */
function getShoppingStats() {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return { total: 0, offen: 0, gekauft: 0, nicht_verfügbar: 0, später_kaufen: 0 };
    
    const stats = {
        total: restaurantData.shopping.length,
        offen: 0,
        gekauft: 0,
        nicht_verfügbar: 0,
        später_kaufen: 0
    };
    
    restaurantData.shopping.forEach(item => {
        stats[item.status]++;
    });
    
    return stats;
}

/**
 * Adiciona novo funcionário
 * @param {Object} employee - Dados do funcionário
 */
function addEmployee(employee) {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return false;
    
    employee.id = generateId();
    restaurantData.employees.push(employee);
    saveDataToStorage();
    return true;
}

/**
 * Remove funcionário
 * @param {string} id - ID do funcionário
 */
function removeEmployee(id) {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return false;
    
    restaurantData.employees = restaurantData.employees.filter(emp => emp.id !== id);
    saveDataToStorage();
    return true;
}

/**
 * Atualiza funcionário
 * @param {string} id - ID do funcionário
 * @param {Object} updates - Atualizações a serem aplicadas
 */
function updateEmployee(id, updates) {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return false;
    
    const index = restaurantData.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
        restaurantData.employees[index] = { ...restaurantData.employees[index], ...updates };
        saveDataToStorage();
        return true;
    }
    return false;
}

/**
 * Calcula horas semanais de trabalho
 * @param {Object} employee - Dados do funcionário
 * @returns {number} - Horas semanais
 */
function calculateWeeklyHours(employee) {
    if (!employee.arbeitstage || !employee.startzeit || !employee.endzeit) {
        return 0;
    }
    
    const start = new Date(`2024-01-01 ${employee.startzeit}`);
    const end = new Date(`2024-01-01 ${employee.endzeit}`);
    
    let dailyHours = (end - start) / (1000 * 60 * 60);
    
    // Se o horário de fim for menor que o de início, assumimos que atravessa a meia-noite
    if (dailyHours < 0) {
        dailyHours += 24;
    }
    
    return dailyHours * employee.arbeitstage.length;
}

/**
 * Obtém estatísticas dos funcionários
 */
function getEmployeeStats() {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return { total: 0, totalHours: 0, roles: {} };
    
    const stats = {
        total: restaurantData.employees.length,
        totalHours: 0,
        roles: {}
    };
    
    restaurantData.employees.forEach(emp => {
        const hours = calculateWeeklyHours(emp);
        stats.totalHours += hours;
        
        if (!stats.roles[emp.rolle]) {
            stats.roles[emp.rolle] = 0;
        }
        stats.roles[emp.rolle]++;
    });
    
    return stats;
}

/**
 * Adiciona nova preparação de cozinha
 * @param {Object} preparation - Dados da preparação
 */
function addPreparation(preparation) {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return false;
    
    if (!restaurantData.preparations) {
        restaurantData.preparations = [];
    }
    
    preparation.id = generateId();
    preparation.createdAt = new Date().toISOString();
    restaurantData.preparations.push(preparation);
    saveDataToStorage();
    return true;
}

/**
 * Remove preparação de cozinha
 * @param {string} id - ID da preparação
 */
function removePreparation(id) {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return false;
    
    if (!restaurantData.preparations) return false;
    
    restaurantData.preparations = restaurantData.preparations.filter(prep => prep.id !== id);
    saveDataToStorage();
    return true;
}

/**
 * Atualiza preparação de cozinha
 * @param {string} id - ID da preparação
 * @param {Object} updates - Atualizações a serem aplicadas
 */
function updatePreparation(id, updates) {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return false;
    
    if (!restaurantData.preparations) return false;
    
    const index = restaurantData.preparations.findIndex(prep => prep.id === id);
    if (index !== -1) {
        restaurantData.preparations[index] = { ...restaurantData.preparations[index], ...updates };
        saveDataToStorage();
        return true;
    }
    return false;
}

/**
 * Duplica uma preparação existente
 * @param {string} id - ID da preparação a ser duplicada
 */
function duplicatePreparation(id) {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return false;
    
    const preparation = restaurantData.preparations.find(prep => prep.id === id);
    if (preparation) {
        const duplicated = {
            ...preparation,
            name: `${preparation.name} (Kopie)`,
            id: generateId(),
            createdAt: new Date().toISOString()
        };
        restaurantData.preparations.push(duplicated);
        saveDataToStorage();
        return true;
    }
    return false;
}

/**
 * Obtém estatísticas das preparações
 */
function getPreparationStats() {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData) return { total: 0, units: {}, totalIngredients: 0 };
    
    const preparations = restaurantData.preparations || [];
    const stats = {
        total: preparations.length,
        units: {},
        totalIngredients: 0
    };
    
    preparations.forEach(prep => {
        // Count units
        if (!stats.units[prep.einheit]) {
            stats.units[prep.einheit] = 0;
        }
        stats.units[prep.einheit]++;
        
        // Count ingredients
        if (prep.zutaten && Array.isArray(prep.zutaten)) {
            stats.totalIngredients += prep.zutaten.length;
        }
    });
    
    return stats;
}

/**
 * Exporta dados para arquivo JSON (Backup Manual)
 */
function exportData() {
    const dataStr = JSON.stringify(appData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const now = new Date();
    // Fix timezone issue: create date string without timezone conversion
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const timestamp = `${year}-${month}-${day}`;
    const restaurantName = getCurrentRestaurantName().replace(/\s+/g, '_');
    const fileName = `${restaurantName}_backup_${timestamp}.json`;
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Backup erfolgreich erstellt!', 'success');
    return true;
}

/**
 * Importa dados de arquivo JSON
 * @param {File} file - Arquivo JSON a ser importado
 * @returns {Promise} - Promise que resolve quando dados são importados
 */
function importData(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                
                // Validação básica da estrutura dos dados
                if (importedData.cashflow && importedData.inventory && importedData.recurring) {
                    appData = importedData;
                    saveDataToStorage();
                    resolve(true);
                } else {
                    reject(new Error('Arquivo JSON inválido: estrutura incorreta'));
                }
            } catch (error) {
                reject(new Error('Arquivo JSON inválido: ' + error.message));
            }
        };
        
        reader.onerror = function() {
            reject(new Error('Erro ao ler arquivo'));
        };
        
        reader.readAsText(file);
    });
}

/**
 * Mostra notificação para o usuário
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo da notificação (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Remove notificação anterior se existir
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notificação após 3 segundos
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

/**
 * Seleciona um restaurante
 * @param {string} restaurantId - ID do restaurante (Cantinetta, ThePastaRoom, Panuozzo)
 */
function selectRestaurant(restaurantId) {
    console.log('🎯 EXECUTANDO selectRestaurant para:', restaurantId);
    
    // Garantir que os dados estão carregados
    if (!appData || Object.keys(appData).length === 0) {
        console.log('⚠️ appData vazio, carregando dados...');
        loadDataFromStorage();
    }
    
    if (appData[restaurantId]) {
        const previousRestaurant = currentRestaurant;
        currentRestaurant = restaurantId;
        localStorage.setItem(RESTAURANT_KEY, restaurantId);
        
        console.log('✅ Restaurante selecionado com sucesso:');
        console.log('   - currentRestaurant:', currentRestaurant);
        console.log('   - localStorage:', localStorage.getItem(RESTAURANT_KEY));
        
        showNotification(`Restaurant erfolgreich gewechselt zu: ${appData[restaurantId].settings.restaurantName}`, 'success');
        
        // Emitir evento de mudança de restaurante
        if (typeof eventBus !== 'undefined') {
            eventBus.emit(EVENTS.RESTAURANT_CHANGED, {
                previous: previousRestaurant,
                current: restaurantId,
                timestamp: new Date().toISOString()
            });
        }
        
        return true;
    } else {
        console.error('❌ Restaurante não encontrado:', restaurantId);
        console.error('❌ appData disponível:', Object.keys(appData || {}));
        return false;
    }
}

/**
 * Obtém os dados do restaurante atual
 * @returns {Object|null} - Dados do restaurante atual ou null se nenhum selecionado
 */
function getCurrentRestaurantData() {
    if (!currentRestaurant || !appData[currentRestaurant]) {
        return null;
    }
    return appData[currentRestaurant];
}

/**
 * Obtém o nome do restaurante atual
 * @returns {string} - Nome do restaurante atual ou string vazia
 */
function getCurrentRestaurantName() {
    const data = getCurrentRestaurantData();
    return data ? data.settings.restaurantName : '';
}

/**
 * Atualiza o nome do restaurante no cabeçalho da página
 */
function updateRestaurantName() {
    const restaurantName = getCurrentRestaurantName();
    const restaurantNameElement = document.getElementById('restaurantName');
    
    if (restaurantNameElement) {
        // Para páginas que têm um formato específico
        if (window.location.pathname.includes('dashboard')) {
            restaurantNameElement.textContent = `Zentrale Verwaltung für ${restaurantName}`;
        } else {
            restaurantNameElement.textContent = restaurantName;
        }
        console.log('✅ updateRestaurantName: Nome atualizado para', restaurantName);
    } else {
        console.log('⚠️ updateRestaurantName: Elemento #restaurantName não encontrado na página');
    }
}

/**
 * Verifica se um restaurante está selecionado
 * @returns {boolean} - True se um restaurante está selecionado
 */
function isRestaurantSelected() {
    // Se currentRestaurant não está definido, tenta carregar do localStorage
    if (!currentRestaurant) {
        const storedRestaurant = localStorage.getItem(RESTAURANT_KEY);
        if (storedRestaurant && appData && appData[storedRestaurant]) {
            currentRestaurant = storedRestaurant;
            console.log('🔄 isRestaurantSelected: Restaurante restaurado do localStorage:', currentRestaurant);
        }
    }
    
    // Verificação tripla para garantir consistência
    const hasCurrentRestaurant = currentRestaurant !== null && currentRestaurant !== undefined;
    const hasLocalStorage = localStorage.getItem(RESTAURANT_KEY) !== null;
    const hasAppData = appData && appData[currentRestaurant] !== undefined;
    
    const result = hasCurrentRestaurant && hasLocalStorage && hasAppData;
    
    console.log('🔍 DEBUG isRestaurantSelected:', {
        currentRestaurant: currentRestaurant,
        localStorage: localStorage.getItem(RESTAURANT_KEY),
        hasCurrentRestaurant: hasCurrentRestaurant,
        hasLocalStorage: hasLocalStorage,
        hasAppData: hasAppData,
        result: result
    });
    
    return result;
}

/**
 * Redireciona para index.html se nenhum restaurante estiver selecionado
 */
function checkRestaurantSelection() {
    const isSelected = isRestaurantSelected();
    const pathname = window.location.pathname;
    const isIndexPage = pathname === '/index.html' || 
                       pathname.endsWith('index.html') || 
                       pathname === '/' || 
                       pathname.endsWith('/');
    
    console.log('🔍 DEBUG checkRestaurantSelection - entrada:', {
        currentRestaurant: currentRestaurant,
        pathname: pathname,
        isSelected: isSelected,
        isIndexPage: isIndexPage
    });
    
    // Se não está selecionado E não está na página index, redireciona
    if (!isSelected && !isIndexPage) {
        console.log('⚠️ CHECKPOINT: Nenhum restaurante selecionado, redirecionando para index.html...');
        setTimeout(() => {
            // Determina se está em uma subpágina para ajustar o caminho
            const isInPagesDir = pathname.includes('/pages/');
            const indexPath = isInPagesDir ? '../index.html' : 'index.html';
            window.location.href = indexPath;
        }, 100); // Pequeno delay para evitar conflitos
        return false;
    }
    
    console.log('✅ CHECKPOINT: checkRestaurantSelection passou, retornando true');
    return true;
}

/**
 * Navega para uma página
 * @param {string} page - Nome da página (sem .html)
 */
function navigateTo(page) {
    console.log('🔍 DEBUG navigateTo - Tentando navegar para:', page);
    console.log('🔍 DEBUG navigateTo - currentRestaurant antes:', currentRestaurant);
    console.log('🔍 DEBUG navigateTo - isRestaurantSelected antes:', isRestaurantSelected());
    
    if (page === 'index' || page === 'restaurant-selection') {
        console.log('🔍 DEBUG navigateTo - Navegando para index.html');
        // Determina se está em uma subpágina para ajustar o caminho
        const currentPath = window.location.pathname;
        const isInPagesDir = currentPath.includes('/pages/');
        const indexPath = isInPagesDir ? '../index.html' : 'index.html';
        window.location.href = indexPath;
    } else {
        // Verifica se restaurante está selecionado antes de navegar
        const canNavigate = checkRestaurantSelection();
        console.log('🔍 DEBUG navigateTo - checkRestaurantSelection retornou:', canNavigate);
        
        if (canNavigate) {
            console.log('✅ DEBUG navigateTo - Navegando para:', `${page}.html`);
            // Determina se está em uma subpágina para ajustar o caminho
            const currentPath = window.location.pathname;
            const isInPagesDir = currentPath.includes('/pages/');
            const pagePath = isInPagesDir ? `${page}.html` : `pages/${page}.html`;
            window.location.href = pagePath;
        } else {
            console.log('❌ DEBUG navigateTo - Navegação bloqueada, redirecionando para index.html');
        }
    }
}

/**
 * Salva dados automaticamente com notificação
 * @param {string} customMessage - Mensagem personalizada (opcional)
 */
function autoSave(customMessage = null) {
    saveDataToStorage();
    const message = customMessage || 'Daten automatisch gespeichert';
    showNotification(message, 'success');
}

/**
 * Função de salvamento rápido (Ctrl+S)
 */
function quickSave() {
    autoSave('💾 Schnelle Speicherung durchgeführt!');
}

/**
 * Função auxiliar para garantir que um restaurante está selecionado
 * Tenta recuperar de localStorage se necessário
 * @returns {boolean} - True se conseguiu garantir uma seleção válida
 */
function ensureRestaurantSelected() {
    console.log('🔧 ensureRestaurantSelected: Verificando seleção...');

// ====== SISTEMA DE CATEGORIAS CUSTOMIZADAS ======

/**
 * Obtém categorias padrão do sistema
 * @param {string} type - Tipo de categoria (financial, recurring, inventory, preparations, employeeRoles)
 * @param {string} subtype - Subtipo para financial (income/expense)
 * @returns {Array} Array de objetos com value e label
 */
function getDefaultCategories(type, subtype = null) {
    const defaults = {
        financial: {
            income: [
                { value: 'sales', label: 'Verkäufe' },
                { value: 'delivery', label: 'Lieferungen' },
                { value: 'catering', label: 'Catering' },
                { value: 'other_income', label: 'Sonstige Einnahmen' }
            ],
            expense: [
                { value: 'food_supplies', label: 'Lebensmittel' },
                { value: 'rent', label: 'Miete' },
                { value: 'utilities', label: 'Nebenkosten' },
                { value: 'staff', label: 'Personal' },
                { value: 'equipment', label: 'Ausrüstung' },
                { value: 'marketing', label: 'Marketing' },
                { value: 'maintenance', label: 'Wartung' },
                { value: 'other_expense', label: 'Sonstige Ausgaben' }
            ]
        },
        recurring: [
            { value: 'rent', label: 'Miete' },
            { value: 'utilities', label: 'Nebenkosten' },
            { value: 'insurance', label: 'Versicherung' },
            { value: 'loan', label: 'Kredite/Darlehen' },
            { value: 'staff', label: 'Personal' },
            { value: 'taxes', label: 'Steuern' },
            { value: 'services', label: 'Dienstleistungen' },
            { value: 'maintenance', label: 'Wartung' },
            { value: 'subscriptions', label: 'Abonnements' },
            { value: 'other', label: 'Sonstiges' }
        ],
        inventory: [
            { value: 'vegetables', label: 'Gemüse' },
            { value: 'fruits', label: 'Obst' },
            { value: 'meat', label: 'Fleisch' },
            { value: 'fish', label: 'Fisch' },
            { value: 'dairy', label: 'Milchprodukte' },
            { value: 'grains', label: 'Getreide/Reis' },
            { value: 'spices', label: 'Gewürze' },
            { value: 'oils', label: 'Öle/Fette' },
            { value: 'beverages', label: 'Getränke' },
            { value: 'frozen', label: 'Tiefkühlkost' },
            { value: 'cleaning', label: 'Reinigung' },
            { value: 'other', label: 'Sonstiges' }
        ],
        preparations: [
            { value: 'Vorbereitung', label: 'Vorbereitung' },
            { value: 'Kochen', label: 'Kochen' },
            { value: 'Backen', label: 'Backen' },
            { value: 'Reinigung', label: 'Reinigung' },
            { value: 'Dekoration', label: 'Dekoration' },
            { value: 'Andere', label: 'Andere' }
        ],
        employeeRoles: [
            { value: 'Koch', label: 'Koch' },
            { value: 'Sous-Chef', label: 'Sous-Chef' },
            { value: 'Service', label: 'Service' },
            { value: 'Kellner', label: 'Kellner' },
            { value: 'Barkeeper', label: 'Barkeeper' },
            { value: 'Reinigung', label: 'Reinigung' },
            { value: 'Manager', label: 'Manager' },
            { value: 'Aushilfe', label: 'Aushilfe' }
        ]
    };

    if (type === 'financial' && subtype) {
        return defaults.financial[subtype] || [];
    }
    return defaults[type] || [];
}

/**
 * Adiciona categoria customizada
 * @param {string} type - Tipo de categoria
 * @param {string} value - Valor único da categoria
 * @param {string} label - Label em alemão
 * @param {string} subtype - Subtipo para financial (income/expense)
 * @returns {boolean} True se adicionado com sucesso
 */
function addCustomCategory(type, value, label, subtype = null) {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData || !restaurantData.customCategories) return false;

    const categoryObj = { value, label, custom: true };

    try {
        if (type === 'financial' && subtype) {
            if (!restaurantData.customCategories.financial[subtype]) {
                restaurantData.customCategories.financial[subtype] = [];
            }
            
            // Verificar se já existe
            const exists = restaurantData.customCategories.financial[subtype].some(cat => cat.value === value);
            if (exists) {
                showNotification('Kategorie existiert bereits', 'warning');
                return false;
            }
            
            restaurantData.customCategories.financial[subtype].push(categoryObj);
        } else {
            if (!restaurantData.customCategories[type]) {
                restaurantData.customCategories[type] = [];
            }
            
            // Verificar se já existe
            const exists = restaurantData.customCategories[type].some(cat => cat.value === value);
            if (exists) {
                showNotification('Kategorie existiert bereits', 'warning');
                return false;
            }
            
            restaurantData.customCategories[type].push(categoryObj);
        }

        saveDataToStorage();
        showNotification('Kategorie erfolgreich hinzugefügt', 'success');
        
        // Emitir evento de mudança de dados
        if (typeof eventBus !== 'undefined') {
            eventBus.emit(EVENTS.DATA_CHANGED, {
                type: 'category_added',
                category: { type, value, label, subtype },
                timestamp: new Date().toISOString()
            });
        }
        
        return true;
    } catch (error) {
        console.error('Erro ao adicionar categoria:', error);
        showNotification('Fehler beim Hinzufügen der Kategorie', 'error');
        return false;
    }
}

/**
 * Remove categoria customizada
 * @param {string} type - Tipo de categoria
 * @param {string} value - Valor da categoria
 * @param {string} subtype - Subtipo para financial
 * @returns {boolean} True se removido com sucesso
 */
function removeCustomCategory(type, value, subtype = null) {
    const restaurantData = getCurrentRestaurantData();
    if (!restaurantData || !restaurantData.customCategories) return false;

    try {
        if (type === 'financial' && subtype) {
            if (!restaurantData.customCategories.financial[subtype]) return false;
            
            const index = restaurantData.customCategories.financial[subtype].findIndex(cat => cat.value === value);
            if (index > -1) {
                restaurantData.customCategories.financial[subtype].splice(index, 1);
            }
        } else {
            if (!restaurantData.customCategories[type]) return false;
            
            const index = restaurantData.customCategories[type].findIndex(cat => cat.value === value);
            if (index > -1) {
                restaurantData.customCategories[type].splice(index, 1);
            }
        }

        saveDataToStorage();
        showNotification('Kategorie erfolgreich entfernt', 'success');
        
        // Emitir evento de mudança de dados
        if (typeof eventBus !== 'undefined') {
            eventBus.emit(EVENTS.DATA_CHANGED, {
                type: 'category_removed',
                category: { type, value, subtype },
                timestamp: new Date().toISOString()
            });
        }
        
        return true;
    } catch (error) {
        console.error('Erro ao remover categoria:', error);
        showNotification('Fehler beim Entfernen der Kategorie', 'error');
        return false;
    }
}

/**
 * Obtém todas as categorias (padrão + customizadas)
 * @param {string} type - Tipo de categoria
 * @param {string} subtype - Subtipo para financial
 * @returns {Array} Array combinado de categorias
 */
function getAllCategories(type, subtype = null) {
    const defaultCategories = getDefaultCategories(type, subtype);
    const restaurantData = getCurrentRestaurantData();
    
    if (!restaurantData || !restaurantData.customCategories) {
        return defaultCategories;
    }

    let customCategories = [];
    
    if (type === 'financial' && subtype) {
        customCategories = restaurantData.customCategories.financial[subtype] || [];
    } else {
        customCategories = restaurantData.customCategories[type] || [];
    }

    return [...defaultCategories, ...customCategories];
}

/**
 * Obtém apenas categorias customizadas
 * @param {string} type - Tipo de categoria
 * @param {string} subtype - Subtipo para financial
 * @returns {Array} Array de categorias customizadas
 */
function getCustomCategories(type, subtype = null) {
    const restaurantData = getCurrentRestaurantData();
    
    if (!restaurantData || !restaurantData.customCategories) {
        return [];
    }

    if (type === 'financial' && subtype) {
        return restaurantData.customCategories.financial[subtype] || [];
    }
    
    return restaurantData.customCategories[type] || [];
}

/**
 * Obtém label da categoria (padrão ou customizada)
 * @param {string} type - Tipo de categoria
 * @param {string} value - Valor da categoria
 * @param {string} subtype - Subtipo para financial
 * @returns {string} Label da categoria ou o próprio value se não encontrado
 */
function getCategoryLabel(type, value, subtype = null) {
    const allCategories = getAllCategories(type, subtype);
    const category = allCategories.find(cat => cat.value === value);
    return category ? category.label : value;
}
    
    // Se já tem currentRestaurant válido, retorna true
    if (currentRestaurant && appData && appData[currentRestaurant]) {
        console.log('✅ ensureRestaurantSelected: Restaurante já selecionado:', currentRestaurant);
        return true;
    }
    
    // Tenta carregar dados do storage
    loadDataFromStorage();
    
    // Verifica novamente após carregar
    if (currentRestaurant && appData && appData[currentRestaurant]) {
        console.log('✅ ensureRestaurantSelected: Restaurante recuperado do storage:', currentRestaurant);
        return true;
    }
    
    // Se localStorage tem um restaurante mas currentRestaurant não está definido
    const storedRestaurant = localStorage.getItem(RESTAURANT_KEY);
    if (storedRestaurant && appData && appData[storedRestaurant]) {
        console.log('🔄 ensureRestaurantSelected: Restaurando do localStorage:', storedRestaurant);
        currentRestaurant = storedRestaurant;
        return true;
    }
    
    console.log('❌ ensureRestaurantSelected: Nenhum restaurante válido encontrado');
    return false;
}

// CORRIGIDO: Não carrega dados automaticamente para evitar conflitos com seleção de restaurante
// loadDataFromStorage(); // Removido - será chamado explicitamente quando necessário

// Salva dados automaticamente antes de sair da página
window.addEventListener('beforeunload', saveDataToStorage); 