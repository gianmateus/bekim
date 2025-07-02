# 🍽️ Restaurant Management System

A comprehensive offline restaurant management system built with modern web technologies. Manage multiple restaurants with financial tracking, inventory management, employee scheduling, and more.

## ✨ Features

### 🏪 Multi-Restaurant Support
- **Cantinetta**: Italian cuisine & wine bar
- **The Pasta Room**: Homemade pasta specialist
- **Panuozzo**: Neapolitan sandwiches & street food

### 💰 Financial Management
- Real-time cashflow tracking
- Income and expense categorization
- Recurring payments management
- Financial insights and analytics
- Monthly/yearly financial reports

### 📦 Inventory Management
- Stock level monitoring
- Low stock alerts
- Automatic shopping list generation
- Supplier management
- Price tracking

### 👥 Employee Management
- Staff scheduling
- Working hours tracking
- Wage calculations (gross/net)
- Employee profiles and roles

### 🍳 Kitchen Operations
- Preparation task management
- Priority-based task system
- Time estimation and tracking
- Kitchen workflow optimization

### 📅 Calendar Integration
- Event scheduling
- Staff planning
- Financial deadlines
- Recurring task management

### 💾 Data Management
- **Save**: Quick data persistence
- **Load**: Multiple loading options (cache, file import, demo data)
- **Export**: JSON data export
- Auto-save functionality
- Keyboard shortcuts (Ctrl+S, Ctrl+E)

## 🎨 Modern UI/UX

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Gradients**: Beautiful color schemes
- **Smooth Animations**: Enhanced user experience
- **Dark/Light Theme**: Adaptive design
- **Intuitive Navigation**: Easy-to-use interface

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Storage**: LocalStorage API
- **Architecture**: Component-based design
- **PWA**: Progressive Web App capabilities
- **Offline-First**: Works without internet connection

## 🚀 Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/gianmateus/bekim.git
   cd bekim/offline-restaurant
   ```

2. **Start local server**:
   ```bash
   python -m http.server 8000
   # or
   npx serve
   ```

3. **Open in browser**:
   ```
   http://localhost:8000
   ```

4. **Select a restaurant** and start managing!

## 📱 Usage

### Getting Started
1. Select your restaurant from the main page
2. Navigate through different modules using the header buttons
3. Use **Save** (💾) to quickly save your data
4. Use **Load** (📁) to access loading options
5. Use **Export** (⬇️) to download your data

### Keyboard Shortcuts
- `Ctrl+S` / `Cmd+S`: Quick save
- `Ctrl+E` / `Cmd+E`: Export data

### Data Management
- **Auto-save**: Data is automatically saved every 30 seconds
- **Manual save**: Use the Save button for instant saving
- **Import/Export**: JSON format for data portability
- **Demo data**: Load sample data for testing

## 📊 Modules

| Module | Description | Features |
|--------|-------------|----------|
| **Dashboard** | Overview and insights | Statistics, recent activities, alerts |
| **Finances** | Money management | Cashflow, income, expenses, reports |
| **Inventory** | Stock management | Items, stock levels, suppliers |
| **Shopping** | Purchase planning | Auto-generated lists, supplier contacts |
| **Staff** | Employee management | Schedules, wages, roles |
| **Kitchen** | Preparation tasks | Task management, priorities, timing |
| **Calendar** | Event planning | Scheduling, deadlines, recurring events |
| **Settings** | Configuration | Restaurant settings, data management |

## 🔧 Features in Detail

### Financial Insights
- Monthly income/expense tracking
- Category-based spending analysis
- Profit/loss calculations
- Budget planning and forecasting

### Inventory Automation
- Automatic reorder points
- Supplier price comparisons
- Waste tracking
- Seasonal demand planning

### Staff Optimization
- Work hour optimization
- Cost analysis per employee
- Performance tracking
- Schedule conflict detection

## 🌐 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## 📄 File Structure

```
offline-restaurant/
├── index.html          # Restaurant selection page
├── pages/              # Application pages
│   ├── dashboard.html  # Main dashboard
│   ├── konten.html     # Financial management
│   ├── inventar.html   # Inventory management
│   ├── personal.html   # Employee management
│   └── ...
├── js/                 # JavaScript modules
│   ├── main.js         # Core functionality
│   ├── autoSave.js     # Auto-save system
│   ├── insights.js     # Analytics engine
│   └── restaurant-header.js # Header component
├── css/                # Stylesheets
│   └── style.css       # Main styles
└── data/               # Sample data
    └── demo-data.json  # Demo dataset
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Roadmap

- [ ] Multi-language support (Portuguese, Spanish)
- [ ] Cloud synchronization
- [ ] Advanced reporting dashboard
- [ ] Mobile app version
- [ ] Integration with POS systems
- [ ] Receipt generation
- [ ] Customer management
- [ ] Table reservation system

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ for restaurant owners and managers worldwide** 