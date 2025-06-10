# 🍽️ Sistema de Gestão de Restaurantes Offline

Um sistema completo de gestão para restaurantes que funciona totalmente offline, desenvolvido em HTML, CSS e JavaScript puro.

## 📁 Estrutura do Projeto

```
offline-restaurant/
├── index.html              # Página de seleção de restaurante
├── README.md              # Este arquivo
├── pages/                 # Páginas do sistema
│   ├── dashboard.html     # Painel principal
│   ├── cashflow.html      # Gestão financeira
│   ├── inventar.html      # Inventário (alemão)
│   ├── inventory.html     # Inventário (inglês)
│   ├── konten.html        # Contas
│   ├── einkaeufe.html     # Compras
│   ├── kalender.html      # Calendário
│   ├── personal.html      # Gestão de pessoal
│   ├── vorbereitungen.html # Preparações de cozinha
│   ├── recurring.html     # Pagamentos recorrentes
│   └── settings.html      # Configurações
├── js/                    # Scripts JavaScript
│   ├── main.js           # Funcionalidades principais
│   ├── eventBus.js       # Sistema de eventos
│   ├── insights.js       # Análises e insights
│   ├── autoSave.js       # Salvamento automático
│   └── restaurant-header.js # Cabeçalho do restaurante
├── css/                   # Estilos
│   └── style.css         # Estilos principais
├── assets/                # Recursos
│   └── icons/            # Ícones (vazio)
├── data/                  # Dados
│   └── demo-data.json    # Dados de demonstração
└── docs/                  # Documentação
    ├── README.md         # README original
    ├── README-FINAL.md   # README final
    └── LEIA-ME.txt       # Instruções em português
```

## 🚀 Como Usar

1. **Iniciar o Servidor**:
   ```bash
   # Navegue até o diretório do projeto
   cd offline-restaurant
   
   # Inicie um servidor HTTP local
   python -m http.server 8000
   # ou
   npx http-server -p 8000
   ```

2. **Acessar o Sistema**:
   - Abra o navegador e vá para `http://localhost:8000`
   - Selecione um dos restaurantes disponíveis:
     - **Cantinetta** - Restaurante italiano
     - **The Pasta Room** - Especialidade em massas
     - **Panuozzo** - Comida italiana casual

3. **Navegar pelo Sistema**:
   - Use o painel principal (Dashboard) para visão geral
   - Acesse cada módulo através do menu de navegação
   - Todos os dados são salvos automaticamente no navegador

## 🎯 Funcionalidades

### 💰 Gestão Financeira
- Controle de receitas e despesas
- Relatórios financeiros
- Análise de fluxo de caixa
- Pagamentos recorrentes

### 📦 Inventário
- Controle de estoque
- Lista de compras automática
- Alertas de estoque baixo
- Gestão de fornecedores

### 👥 Gestão de Pessoal
- Cadastro de funcionários
- Controle de horários
- Cálculo de horas trabalhadas
- Exportação de relatórios

### 🍳 Preparações de Cozinha
- Receitas e preparações
- Controle de ingredientes
- Planejamento de produção
- Duplicação de receitas

### 📅 Calendário
- Agendamento de eventos
- Lembretes importantes
- Planejamento de atividades

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Armazenamento**: LocalStorage (navegador)
- **Design**: CSS Grid, Flexbox, Animações CSS
- **Compatibilidade**: Navegadores modernos

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- 💻 Desktop
- 📱 Tablets
- 📱 Smartphones

## 🎨 Design

- Interface moderna com efeitos glassmorphism
- Animações suaves e micro-interações
- Esquema de cores profissional
- Acessibilidade para usuários idosos

## 💾 Dados

- Todos os dados são armazenados localmente no navegador
- Não requer conexão com internet após carregamento inicial
- Backup automático dos dados
- Exportação/importação de dados

## 🔧 Desenvolvimento

Para contribuir com o projeto:

1. Clone o repositório
2. Faça suas alterações
3. Teste em diferentes navegadores
4. Envie um pull request

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 🆘 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação em `docs/`
2. Consulte os dados de demonstração em `data/`
3. Abra uma issue no repositório

---

**Desenvolvido com ❤️ para gestão eficiente de restaurantes** 