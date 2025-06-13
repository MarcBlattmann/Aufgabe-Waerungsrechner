# 💱 Währungsrechner

Ein moderner, komponentenbasierter Währungsrechner entwickelt mit **Next.js** und **React**. Die Anwendung ermöglicht die schnelle und einfache Umrechnung zwischen verschiedenen internationalen Währungen.

## ✨ Features

- 🌍 **10 internationale Währungen** unterstützt
- 🔄 **Echtzeit-Umrechnung** bei Eingaben
- 🔀 **Swap-Funktion** zum schnellen Wechseln der Währungsrichtung
- 📊 **Detaillierte Wechselkurs-Informationen**
- 📱 **Responsive Design** für Desktop und Mobile
- ⚡ **Schnelle Performance** durch Next.js
- 🎨 **Sauberes, weißes Design** ohne Ablenkungen
- 🧩 **Komponentenbasierte Architektur**

## 🚀 Technologie-Stack

- **Frontend Framework:** Next.js 15 (App Router)
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Sprache:** TypeScript
- **Package Manager:** npm

## 💰 Unterstützte Währungen

| Code | Währung | Symbol |
|------|---------|--------|
| EUR | Euro | € |
| USD | US Dollar | $ |
| GBP | British Pound | £ |
| CHF | Swiss Franc | CHF |
| JPY | Japanese Yen | ¥ |
| CAD | Canadian Dollar | C$ |
| AUD | Australian Dollar | A$ |
| SEK | Swedish Krona | kr |
| NOK | Norwegian Krone | kr |
| DKK | Danish Krone | kr |

## 🏗️ Projektstruktur

```
src/
├── app/
│   ├── layout.tsx          # Root Layout
│   ├── page.tsx            # Hauptseite
│   └── globals.css         # Globale Styles
└── components/
    ├── Button.tsx          # Wiederverwendbare Button-Komponente
    ├── InputField.tsx      # Input-Feld für Beträge
    ├── SelectField.tsx     # Dropdown für Währungsauswahl
    ├── SwapButton.tsx      # Button zum Tauschen der Währungen
    ├── ResultDisplay.tsx   # Anzeige des Umrechnungsergebnisses
    ├── ExchangeRateInfo.tsx # Wechselkurs-Informationen
    └── CurrencyConverter.tsx # Hauptkomponente
```

## 🛠️ Installation & Setup

### Voraussetzungen
- Node.js (Version 18 oder höher)
- npm

### Schritt-für-Schritt Anleitung

1. **Repository klonen:**
   ```bash
   git clone <repository-url>
   cd waehrungsrechner
   ```

2. **Dependencies installieren:**
   ```bash
   npm install
   ```

3. **Development Server starten:**
   ```bash
   npm run dev
   ```

4. **Anwendung öffnen:**
   ```
   http://localhost:3000
   ```

## 📋 Verfügbare Scripts

```bash
# Development Server starten
npm run dev

# Production Build erstellen
npm run build

# Production Server starten
npm start

# Code Linting
npm run lint

# TypeScript Check
npm run type-check
```

## 🧩 Komponenten-Architektur

### Core Komponenten

#### `CurrencyConverter`
Die Hauptkomponente, die alle anderen Komponenten orchestriert und das State-Management übernimmt.

#### `InputField`
```tsx
interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'number';
}
```

#### `SelectField`
```tsx
interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Currency[];
}
```

#### `Button`
```tsx
interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}
```

## 💡 Verwendung

1. **Betrag eingeben:** Geben Sie den gewünschten Betrag im Eingabefeld ein
2. **Ausgangswährung wählen:** Wählen Sie die Währung aus dem "Von"-Dropdown
3. **Zielwährung wählen:** Wählen Sie die gewünschte Zielwährung aus dem "Nach"-Dropdown
4. **Ergebnis anzeigen:** Das umgerechnete Ergebnis wird automatisch angezeigt
5. **Währungen tauschen:** Nutzen Sie den Swap-Button (⇅) zum schnellen Wechseln
6. **Kurse aktualisieren:** Klicken Sie auf "Aktualisieren" für neue Wechselkurse

## 🎯 Features im Detail

### Eingabevalidierung
- Nur numerische Eingaben und Dezimalpunkte erlaubt
- Automatische Formatierung der Währungsbeträge
- Deutsche Lokalisierung (Komma als Dezimaltrennzeichen)

### Wechselkurs-System
- Mock-Daten für Demonstrationszwecke
- Bidirektionale Wechselkurse
- Fallback auf Umkehrung von Wechselkursen
- Präzise Anzeige mit 4 Nachkommastellen

### Responsive Design
- Optimiert für verschiedene Bildschirmgrößen
- Touch-freundliche Bedienelemente
- Klare Typografie und Kontraste

## 🔧 Anpassungen

### Neue Währungen hinzufügen
Bearbeiten Sie das `currencies` Array in `CurrencyConverter.tsx`:

```tsx
const currencies: Currency[] = [
  // ...existing currencies
  { code: 'NEW', name: 'New Currency', symbol: 'N$' },
];
```

### Styling anpassen
Das Projekt verwendet Tailwind CSS. Styles können durch Änderung der className-Properties angepasst werden.

### API-Integration
Ersetzen Sie die `mockExchangeRates` in `fetchExchangeRates()` durch echte API-Aufrufe:

```tsx
const fetchExchangeRates = async () => {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
    const data = await response.json();
    // Process real data...
  } catch (error) {
    console.error('API Error:', error);
  }
};
```

## 🧪 Testing

Das Projekt ist für Testing vorbereitet. Empfohlene Testing-Libraries:
- Jest für Unit Tests
- React Testing Library für Component Tests
- Cypress für E2E Tests

## 📦 Deployment

### Vercel (Empfohlen)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork das Repository
2. Erstellen Sie einen Feature Branch (`git checkout -b feature/neue-funktion`)
3. Commiten Sie Ihre Änderungen (`git commit -m 'Neue Funktion hinzugefügt'`)
4. Pushen Sie den Branch (`git push origin feature/neue-funktion`)
5. Erstellen Sie einen Pull Request

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Details finden Sie in der [LICENSE](LICENSE) Datei.

## 👥 Autoren

- **Ihr Name** - *Initial work* - [GitHub](https://github.com/yourusername)

## 🙏 Danksagungen

- Next.js Team für das großartige Framework
- Tailwind CSS für das Utility-First CSS Framework
- Lucide für die schönen Icons
- ExchangeRate-API für Wechselkurs-Daten (zukünftige Integration)

---

**Hinweis:** Diese Anwendung verwendet derzeit Mock-Daten für Demonstrationszwecke. Für Produktionseinsatz sollte eine echte Wechselkurs-API integriert werden.
