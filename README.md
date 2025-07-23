# 🔍 Datadog Behavioral Analysis Dashboard

<div align="center">

![Datadog Analysis](https://img.shields.io/badge/Datadog-632CA6?style=for-the-badge&logo=datadog&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**An intelligent SRE tool for on-demand incident analysis and root cause correlation**

[🚀 Live Demo](https://moonlit-bubblegum-0a4e54.netlify.app) • [📖 Documentation](#documentation) • [🛠️ Installation](#installation)

</div>

---

## ✨ Overview

The **Datadog Behavioral Analysis Dashboard** is a sophisticated SRE tool designed to streamline incident response and root cause analysis. By simply providing a Datadog monitor ID, the system automatically correlates metrics, logs, traces, events, and deployment data to provide actionable insights and recommendations.

### 🎯 Key Features

- **🔄 Automated Data Correlation** - Intelligently links metrics, logs, traces, and events
- **📊 Timeline Analysis** - Analyzes 15 minutes before and 30 minutes after incidents
- **🚀 Version Change Detection** - Correlates deployments with incident patterns
- **💡 Smart Recommendations** - Provides prioritized, actionable insights
- **📈 Interactive Visualizations** - Real-time charts and correlation displays
- **⚡ Progressive Loading** - Multi-stage analysis with live progress indicators
- **🎨 Professional UI** - Dark theme optimized for SRE operations

---

## 🖥️ Screenshots

<div align="center">

### Dashboard Overview
![Dashboard](https://via.placeholder.com/800x400/1f2937/ffffff?text=Dashboard+Overview)

### Timeline Analysis
![Timeline](https://via.placeholder.com/800x400/1f2937/ffffff?text=Timeline+Analysis)

### Correlation Results
![Correlations](https://via.placeholder.com/800x400/1f2937/ffffff?text=Correlation+Results)

</div>

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **Datadog Account** (for production use)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/datadog-behavioral-analysis.git
   cd datadog-behavioral-analysis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup** (Optional for demo)
   ```bash
   # Create .env file for production Datadog integration
   cp .env.example .env
   
   # Add your Datadog credentials
   VITE_DATADOG_API_KEY=your_api_key_here
   VITE_DATADOG_APP_KEY=your_app_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

---

## 🔧 Configuration

### Datadog Integration

For production use, configure your Datadog API credentials:

```env
# .env file
VITE_DATADOG_API_KEY=your_datadog_api_key
VITE_DATADOG_APP_KEY=your_datadog_application_key
```

### Demo Mode

The application includes comprehensive mock data for demonstration purposes. No Datadog credentials are required to explore the interface and functionality.

---

## 📋 How It Works

### 1. **Monitor Input**
- Enter any Datadog monitor ID
- System validates input and initiates analysis

### 2. **Data Collection**
The system automatically retrieves:
- 📊 **Monitor Details** - Configuration, thresholds, and current state
- 🚨 **Alert Information** - Trigger time, severity, and messages
- 📈 **Metrics Data** - Time series data across the analysis window
- 📝 **Log Entries** - Error logs and warnings during the incident
- 🔍 **Trace Data** - Request traces showing performance impacts
- 🎯 **Events** - Deployments, configuration changes, and system events

### 3. **Timeline Analysis**
- **Pre-Incident** (15 minutes before): Baseline behavior analysis
- **Incident Period**: Peak impact and error correlation
- **Post-Incident** (30 minutes after): Recovery patterns and resolution

### 4. **Intelligent Correlation**
The system identifies relationships between:
- Version deployments and error spikes
- Infrastructure changes and performance degradation
- Log patterns and metric anomalies
- Cross-service dependencies and cascade failures

### 5. **Actionable Recommendations**
Generates prioritized recommendations:
- **🔴 High Priority**: Immediate actions to resolve the incident
- **🟡 Medium Priority**: Investigation steps for root cause analysis
- **🟢 Low Priority**: Preventive measures for future incidents

---

## 🛠️ Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | Frontend framework | ^18.3.1 |
| **TypeScript** | Type safety | ^5.5.3 |
| **Tailwind CSS** | Styling framework | ^3.4.1 |
| **Vite** | Build tool | ^5.4.2 |
| **Lucide React** | Icon library | ^0.344.0 |

---

## 📊 Analysis Capabilities

### Metric Correlation
- Error rate analysis and threshold detection
- Performance degradation patterns
- Resource utilization correlation
- Service dependency mapping

### Log Analysis
- Error pattern recognition
- Warning escalation tracking
- Service-specific log correlation
- Timeline-based log clustering

### Trace Analysis
- Request latency analysis
- Error propagation tracking
- Service boundary analysis
- Performance bottleneck identification

### Event Correlation
- Deployment impact analysis
- Configuration change correlation
- Infrastructure event mapping
- Cross-team activity correlation

---

## 🎨 UI Components

### Core Components
- **MonitorInput** - Monitor ID input with validation
- **AnalysisResults** - Main results dashboard
- **TimelineChart** - Interactive timeline visualization
- **CorrelationsPanel** - Correlation analysis display
- **RecommendationsPanel** - Actionable insights panel
- **LoadingSpinner** - Progressive loading states

### Design Features
- **Responsive Design** - Optimized for desktop and mobile
- **Dark Theme** - Reduced eye strain for extended use
- **Interactive Charts** - Hover states and detailed tooltips
- **Progressive Disclosure** - Organized information hierarchy
- **Accessibility** - WCAG compliant design patterns

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
```bash
# Using Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to Vercel
```bash
# Using Vercel CLI
npm install -g vercel
vercel --prod
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Datadog** for providing comprehensive monitoring APIs
- **React Team** for the excellent frontend framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon library

---

## 📞 Support

- 📧 **Email**: support@your-domain.com
- 💬 **Discord**: [Join our community](https://discord.gg/your-server)
- 📖 **Documentation**: [Full documentation](https://docs.your-domain.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-username/datadog-behavioral-analysis/issues)

---

<div align="center">

**Made with ❤️ for the SRE community**

[⭐ Star this repo](https://github.com/your-username/datadog-behavioral-analysis) • [🐛 Report Bug](https://github.com/your-username/datadog-behavioral-analysis/issues) • [💡 Request Feature](https://github.com/your-username/datadog-behavioral-analysis/issues)

</div>