# 🏪 Restaurant Management System - 100% Offline

Sistema de gestão financeira e operacional para restaurantes, funcionando completamente offline no navegador.

## 📋 Características

- **100% Offline** - Funciona sem conexão com internet
- **Interface em Alemão** - Totalmente localizado
- **Valores em Euro (€)** - Formatação monetária adequada
- **Design Acessível** - Otimizado para pessoas idosas
- **Persistência Local** - Dados salvos via localStorage e arquivos JSON
- **Zero Dependências** - HTML, CSS e JavaScript puro

## 🗂 Estrutura do Projeto

```
offline-restaurant/
├── index.html              # Página de entrada (redireciona para dashboard)
├── dashboard.html           # Dashboard principal
├── cashflow.html           # Controle de fluxo de caixa
├── inventory.html          # Gestão de inventário
├── recurring.html          # Pagamentos recorrentes
├── settings.html           # Configurações e backup
├── css/
│   └── style.css          # Estilos principais
├── js/
│   └── main.js           # Lógica central da aplicação
└── assets/
    └── icons/            # Ícones (opcional)
```

## 🚀 Como Usar

1. **Abrir o Sistema**: Abra `index.html` em qualquer navegador moderno
2. **Navegação**: Use os botões grandes no dashboard para acessar cada seção
3. **Dados**: Todos os dados são salvos automaticamente no navegador
4. **Backup**: Use a página "Einstellungen" para exportar/importar dados

## 📊 Funcionalidades

### 💰 Kassenfluss (Fluxo de Caixa)
- Registro de entradas e saídas
- Categorização automática
- Filtros por tipo, categoria e período
- Resumo financeiro em tempo real

### 📦 Inventar (Inventário)
- Controle de estoque
- Alertas para estoque baixo
- Geração automática de lista de compras
- Categorias de produtos
- Valores em euro

### 🔄 Wiederkehrende Zahlungen (Pagamentos Recorrentes)
- Pagamentos semanais, mensais, trimestrais, anuais
- Datas personalizadas
- Alertas de vencimento
- Histórico de pagamentos

### ⚙️ Einstellungen (Configurações)
- Export/Import de dados em JSON
- Backup completo do sistema
- Limpeza de dados
- Informações do sistema

## 🔧 Características Técnicas

### Armazenamento
- **localStorage**: Cache temporário entre páginas
- **JSON Export/Import**: Backup permanente dos dados
- **Estrutura de Dados**:
  ```javascript
  {
    cashflow: [],      // Transações financeiras
    inventory: [],     // Itens do inventário
    recurring: [],     // Pagamentos recorrentes
    settings: {}       // Configurações do sistema
  }
  ```

### Design Responsivo
- Layout adaptável para desktop e mobile
- Botões grandes e acessíveis
- Fontes grandes (18px base)
- Cores contrastantes
- Ícones Unicode (sem dependências)

### Compatibilidade
- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+

## 🎨 Interface

### Cores Principais
- **Azul**: `#3498db` - Botões e links
- **Verde**: `#27ae60` - Entradas/Sucesso
- **Vermelho**: `#e74c3c` - Saídas/Perigo
- **Laranja**: `#f39c12` - Alertas
- **Roxo**: `#9b59b6` - Configurações

### Tipografia
- **Fonte**: Arial (sistema)
- **Tamanho Base**: 18px
- **Títulos**: 2.5em
- **Botões**: 1.2em

## 💾 Backup e Restauração

### Exportar Dados
1. Acesse "Einstellungen"
2. Clique em "Daten herunterladen"
3. Arquivo JSON será baixado automaticamente

### Importar Dados
1. Acesse "Einstellungen"
2. Clique na área de upload ou arraste arquivo JSON
3. Confirme a importação
4. Sistema será recarregado com novos dados

### Formato do Arquivo JSON
```json
{
  "cashflow": [
    {
      "id": "unique_id",
      "type": "income|expense",
      "description": "Beschreibung",
      "amount": 100.00,
      "category": "kategorie",
      "date": "2024-01-15"
    }
  ],
  "inventory": [
    {
      "id": "unique_id",
      "name": "Artikelname",
      "category": "kategorie",
      "currentStock": 10,
      "minStock": 5,
      "unit": "kg",
      "unitPrice": 2.50
    }
  ],
  "recurring": [
    {
      "id": "unique_id",
      "description": "Zahlung",
      "amount": 500.00,
      "frequency": "monthly",
      "category": "rent",
      "nextDue": "2024-02-01T00:00:00.000Z"
    }
  ],
  "settings": {
    "restaurantName": "Mein Restaurant",
    "currency": "€"
  }
}
```

## 🔒 Privacidade e Segurança

- **Dados Locais**: Todos os dados permanecem no seu dispositivo
- **Sem Servidor**: Nenhuma comunicação externa
- **Sem Login**: Acesso direto ao sistema
- **Sem Cookies**: Apenas localStorage

## 🐛 Solução de Problemas

### Dados Perdidos
- Verifique se JavaScript está habilitado
- Limpe o cache do navegador se necessário
- Restaure de backup JSON se disponível

### Performance
- Exporte dados grandes periodicamente
- Limpe transações antigas se necessário
- Use filtros para melhor performance

### Compatibilidade
- Use navegador moderno (2019+)
- Habilite JavaScript
- Permita armazenamento local

## 📝 Licença

Este projeto é de domínio público. Use livremente para fins comerciais ou pessoais.

## 🤝 Contribuição

Como este é um projeto offline e autocontido, melhorias podem ser feitas diretamente nos arquivos:

1. Modifique `main.js` para lógica adicional
2. Ajuste `style.css` para mudanças visuais
3. Edite arquivos HTML para nova funcionalidade

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique este README
2. Examine o código JavaScript em `main.js`
3. Use as ferramentas de desenvolvedor do navegador para debug

---

**Desenvolvido para simplicidade e eficiência máxima** ⚡ 