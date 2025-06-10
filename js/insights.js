/**
 * Sistema de Insights Automatizados
 * Analisa os dados do restaurante e gera relatórios inteligentes
 */

class InsightEngine {
    constructor() {
        this.insights = [];
        this.alerts = [];
        console.log('🧠 InsightEngine inicializado');
    }

    /**
     * Gera todos os insights para o restaurante atual
     */
    generateAllInsights() {
        if (!currentRestaurant) {
            console.warn('Nenhum restaurante selecionado para gerar insights');
            return { insights: [], alerts: [] };
        }

        const data = getCurrentRestaurantData();
        this.insights = [];
        this.alerts = [];

        // Gerar insights financeiros
        this.generateFinancialInsights(data);
        
        // Gerar insights de inventário
        this.generateInventoryInsights(data);
        
        // Gerar insights de funcionários
        this.generateEmployeeInsights(data);
        
        // Gerar insights de preparações
        this.generatePreparationInsights(data);
        
        // Gerar insights de pagamentos recorrentes
        this.generateRecurringPaymentInsights(data);

        console.log('📊 Insights gerados:', this.insights.length);
        console.log('⚠️ Alertas gerados:', this.alerts.length);

        return {
            insights: this.insights,
            alerts: this.alerts
        };
    }

    /**
     * Insights financeiros
     */
    generateFinancialInsights(data) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        const todayStr = formatDate(today);
        const yesterdayStr = formatDate(yesterday);

        // Entrada de hoje vs ontem
        const todayRevenue = this.calculateDayRevenue(data.cashflow, todayStr);
        const yesterdayRevenue = this.calculateDayRevenue(data.cashflow, yesterdayStr);

        if (todayRevenue > 0 && yesterdayRevenue > 0) {
            const change = ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100;
            if (change > 10) {
                this.insights.push({
                    type: 'positive',
                    icon: '📈',
                    title: 'Umsatz gestiegen',
                    description: `Heute ${change.toFixed(1)}% höher als gestern (${formatCurrency(todayRevenue)} vs ${formatCurrency(yesterdayRevenue)})`
                });
            } else if (change < -10) {
                this.insights.push({
                    type: 'warning',
                    icon: '📉',
                    title: 'Umsatz gesunken',
                    description: `Heute ${Math.abs(change).toFixed(1)}% niedriger als gestern (${formatCurrency(todayRevenue)} vs ${formatCurrency(yesterdayRevenue)})`
                });
            }
        }

        // Análise semanal
        const weeklyData = this.getWeeklyFinancialSummary(data.cashflow);
        if (weeklyData.averageDailyRevenue > 0) {
            this.insights.push({
                type: 'info',
                icon: '📊',
                title: 'Wöchentlicher Durchschnitt',
                description: `Durchschnittlich ${formatCurrency(weeklyData.averageDailyRevenue)} pro Tag diese Woche`
            });
        }

        // Verificar pagamentos em atraso hoje
        const paymentsToday = this.getPaymentsDueToday(data);
        if (paymentsToday.length > 0) {
            this.alerts.push({
                type: 'urgent',
                icon: '💰',
                title: `${paymentsToday.length} Zahlungen fällig`,
                description: `Heute stehen ${paymentsToday.length} Zahlungen an (${formatCurrency(paymentsToday.reduce((sum, p) => sum + p.betrag, 0))})`
            });
        }
    }

    /**
     * Insights de inventário
     */
    generateInventoryInsights(data) {
        const lowStockItems = data.inventory.filter(item => 
            item.bestand <= item.mindestbestand
        );

        if (lowStockItems.length > 0) {
            this.alerts.push({
                type: 'warning',
                icon: '📦',
                title: `${lowStockItems.length} Produkte niedrig`,
                description: `${lowStockItems.length} Produkte haben wenig Bestand: ${lowStockItems.slice(0, 3).map(i => i.name).join(', ')}`
            });
        }

        // Produtos sem estoque definido
        const noStockItems = data.inventory.filter(item => 
            !item.bestand || item.bestand === 0
        );

        if (noStockItems.length > 0) {
            this.insights.push({
                type: 'warning',
                icon: '❗',
                title: 'Bestand nicht eingetragen',
                description: `${noStockItems.length} Produkte haben keinen aktuellen Bestand eingetragen`
            });
        }

        // Análise de valor do inventário
        const totalInventoryValue = data.inventory.reduce((sum, item) => 
            sum + (item.bestand * item.preis), 0
        );

        if (totalInventoryValue > 0) {
            this.insights.push({
                type: 'info',
                icon: '💎',
                title: 'Lagerwert',
                description: `Aktueller Lagerwert: ${formatCurrency(totalInventoryValue)}`
            });
        }
    }

    /**
     * Insights de funcionários
     */
    generateEmployeeInsights(data) {
        if (!data.employees || data.employees.length === 0) {
            this.insights.push({
                type: 'warning',
                icon: '👥',
                title: 'Keine Mitarbeiter',
                description: 'Noch keine Mitarbeiter im System erfasst'
            });
            return;
        }

        // Calcular custos totais de pessoal
        const totalWeeklyCost = data.employees.reduce((sum, emp) => {
            const weeklyHours = calculateWeeklyHours(emp);
            return sum + (weeklyHours * emp.stundenlohn_brutto);
        }, 0);

        if (totalWeeklyCost > 0) {
            this.insights.push({
                type: 'info',
                icon: '💰',
                title: 'Personalkosten',
                description: `Wöchentliche Personalkosten: ${formatCurrency(totalWeeklyCost)} (${data.employees.length} Mitarbeiter)`
            });
        }

        // Verificar funcionários sem horários definidos
        const noScheduleEmployees = data.employees.filter(emp => 
            !emp.arbeitstage || emp.arbeitstage.length === 0
        );

        if (noScheduleEmployees.length > 0) {
            this.alerts.push({
                type: 'warning',
                icon: '⏰',
                title: 'Arbeitszeiten fehlen',
                description: `${noScheduleEmployees.length} Mitarbeiter haben keine Arbeitszeiten definiert`
            });
        }
    }

    /**
     * Insights de preparações
     */
    generatePreparationInsights(data) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dayAfterTomorrow = new Date(today);
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

        // Verificar preparações para amanhã
        const tomorrowPreps = data.preparations.filter(prep => 
            prep.datum === formatDate(tomorrow)
        );

        if (tomorrowPreps.length === 0) {
            this.insights.push({
                type: 'warning',
                icon: '🍳',
                title: 'Keine Vorbereitung geplant',
                description: 'Für morgen sind noch keine Vorbereitungen geplant'
            });
        } else {
            this.insights.push({
                type: 'positive',
                icon: '✅',
                title: 'Vorbereitung geplant',
                description: `${tomorrowPreps.length} Vorbereitungen für morgen geplant`
            });
        }

        // Verificar fim de semana
        const saturday = new Date(today);
        const daysUntilSaturday = (6 - today.getDay()) % 7;
        saturday.setDate(saturday.getDate() + daysUntilSaturday);

        const saturdayPreps = data.preparations.filter(prep => 
            prep.datum === formatDate(saturday)
        );

        if (daysUntilSaturday <= 2 && saturdayPreps.length === 0) {
            this.alerts.push({
                type: 'warning',
                icon: '📅',
                title: 'Wochenende nicht geplant',
                description: 'Für Samstag sind noch keine Vorbereitungen geplant'
            });
        }
    }

    /**
     * Insights de pagamentos recorrentes
     */
    generateRecurringPaymentInsights(data) {
        if (!data.recurring || data.recurring.length === 0) {
            return;
        }

        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);

        let paymentsNextWeek = 0;
        let totalAmountNextWeek = 0;

        data.recurring.forEach(payment => {
            const nextDue = calculateNextDue(payment);
            if (nextDue && nextDue <= nextWeek) {
                paymentsNextWeek++;
                totalAmountNextWeek += payment.betrag;
            }
        });

        if (paymentsNextWeek > 0) {
            this.insights.push({
                type: 'info',
                icon: '📋',
                title: 'Zahlungen nächste Woche',
                description: `${paymentsNextWeek} wiederkehrende Zahlungen fällig (${formatCurrency(totalAmountNextWeek)})`
            });
        }
    }

    /**
     * Calcula receita do dia
     */
    calculateDayRevenue(cashflow, date) {
        return cashflow
            .filter(entry => entry.datum === date && entry.typ === 'einnahme')
            .reduce((sum, entry) => sum + entry.betrag, 0);
    }

    /**
     * Resumo financeiro semanal
     */
    getWeeklyFinancialSummary(cashflow) {
        const today = new Date();
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);

        const weeklyEntries = cashflow.filter(entry => {
            const entryDate = new Date(entry.datum);
            return entryDate >= weekAgo && entryDate <= today;
        });

        const totalRevenue = weeklyEntries
            .filter(entry => entry.typ === 'einnahme')
            .reduce((sum, entry) => sum + entry.betrag, 0);

        const totalExpenses = weeklyEntries
            .filter(entry => entry.typ === 'ausgabe')
            .reduce((sum, entry) => sum + entry.betrag, 0);

        return {
            totalRevenue,
            totalExpenses,
            netProfit: totalRevenue - totalExpenses,
            averageDailyRevenue: totalRevenue / 7
        };
    }

    /**
     * Pagamentos vencendo hoje
     */
    getPaymentsDueToday(data) {
        if (!data.recurring) return [];
        
        const today = new Date();
        const todayStr = formatDate(today);
        
        return data.recurring.filter(payment => {
            const nextDue = calculateNextDue(payment);
            return nextDue && formatDate(nextDue) === todayStr;
        });
    }

    /**
     * Formata insights para exibição
     */
    formatInsightsForDisplay() {
        const result = this.generateAllInsights();
        
        return {
            insights: result.insights.map(insight => `
                <div class="insight-card insight-${insight.type}">
                    <div class="insight-icon">${insight.icon}</div>
                    <div class="insight-content">
                        <h4>${insight.title}</h4>
                        <p>${insight.description}</p>
                    </div>
                </div>
            `).join(''),
            
            alerts: result.alerts.map(alert => `
                <div class="alert-card alert-${alert.type}">
                    <div class="alert-icon">${alert.icon}</div>
                    <div class="alert-content">
                        <h4>${alert.title}</h4>
                        <p>${alert.description}</p>
                    </div>
                </div>
            `).join('')
        };
    }
}

// Instância global do engine de insights
const insightEngine = new InsightEngine();

// Integração com EventBus
document.addEventListener('DOMContentLoaded', () => {
    // Regenerar insights quando dados mudarem
    eventBus.on(EVENTS.DATA_CHANGED, () => {
        if (typeof refreshInsights === 'function') {
            refreshInsights();
        }
    });

    eventBus.on(EVENTS.RESTAURANT_CHANGED, () => {
        if (typeof refreshInsights === 'function') {
            refreshInsights();
        }
    });
}); 