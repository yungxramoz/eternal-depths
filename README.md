# Eternal Depths 🏰 - Web-basiertes Mobile RPG

Willkommen bei Eternal Depths, dem ultimativen rundenbasierten RPG für unterwegs! Tauche ein in die unendlichen Tiefen zufällig generierter Dungeons, stelle dich furchteinflößenden Gegnern und sammle Schätze, die deinen Charakter stärken. Entwickelt mit ReactJS, bietet dieses Spiel ein nahtloses und spannendes Erlebnis direkt in deinem Browser.

🎮 Tauche ein in das Abenteuer! Spiele jetzt [Eternal Depths](https://yungxramoz.github.io) und entdecke die unendlichen Tiefen! 🐉

## 🌟 Features

- **Rundenbasierte Kämpfe:** Nutze Strategie und Geschick, um in intensiven Kämpfen zu triumphieren.
- **Wiederspielbarkeit:** Kein Durchlauf gleicht dem anderen dank zufällig generierter Gegner, Ausrüstungen und Attacken.
- **Charakterfortschritt:** Verbessere deinen Helden durch das Erlernen neuer Fähigkeiten und das Steigern von Attributen.
- **Ausrüstungssystem:** Rüste deinen Charakter mit mächtigen Waffen, Rüstungen aus.
- **Wettbewerb und Ruhm:** Erklimme die Spitze des Leaderboards und zeige allen, dass du der wahre Meister des Dungeons bist.

## 🛠 Lokales Setup

```bash
git clone https://git.ffhs.ch/web-technologien/fwebt/fs24/inf-w-af004-fwebt-ol-sa-1-pva-fs24/projektarbeiten/ol010-sandro-gerber-eternal-depths.git
cd ol010-sandro-gerber-eternal-depths
```

### Supabase Konfiguration
Für die lokale Entwicklung wird eine Supabase Instanz benötigt. Erstelle ein Konto auf [Supabase](https://supabase.io/) und erstelle eine neue Instanz. Erstelle eine neue Datenbank und füge die Tabellen `leaderboard` hinzu. Erstelle folgende Spalten in der `leaderboard` Tabelle:
![column configuration](/docs/assets/leaderboard-table.png)

Kopiere dann die URL und den API Key in die `.env.local` Datei.

```bash
REACT_APP_SUPABASE_URL=https://<supabase-url>.supabase.co
REACT_APP_SUPABASE_ANON_KEY=<supabase-api-key>
```

Es kann auch die Test Instanz verwendet werden. Dazu können die folgenden Werte in die `.env.local` Datei kopiert werden.

```bash
REACT_APP_SUPABASE_URL='https://ccsgujvmudczzpadmxmh.supabase.co'
REACT_APP_SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjc2d1anZtdWRjenpwYWRteG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyNzE1NTYsImV4cCI6MjAyNzg0NzU1Nn0.3Ndzp5_siyjaHJn0igKn7z7MW5znFAtQ6zKGIcrBYOY'
```

### Verfügbare Scripts

Im Projektverzeichnis kannst du Folgendes ausführen:

#### `npm start`

Startet die App im Entwicklungsmodus.\
Öffne [http://localhost:3000](http://localhost:3000), um sie in deinem Browser anzuzeigen.

Die Seite wird neu geladen, wenn du Änderungen vornimmst.\
Du kannst auch Lint-Fehler in der Konsole sehen.

#### `npm test`

Startet den Test-Runner im interaktiven Watch-Modus.\
Siehe den Abschnitt über [das Ausführen von Tests](https://facebook.github.io/create-react-app/docs/running-tests) für weitere Informationen.

#### `npm run coverage`

Start the test runner and generate a coverage report.\
Der Coverage-Report wird in der Konsole angezeigt. Es wird eine Coverage von 80% erwartet.

#### `npm run build`

Erstellt die App für die Produktion im `build`-Ordner.\
Es bündelt React im Produktionsmodus und optimiert den Build für die beste Leistung.

Der Build wird minifiziert und die Dateinamen enthalten die Hashes.\
Deine App ist bereit für die Bereitstellung!

## 🔄️ Spielzyklus
Der Spielzyklus besteht aus verschiedenen States und Cycles, die den Ablauf des Spiels definieren. Der Game State umfasst vier Phasen: Idle, Playing, Over und Won, die den allgemeinen Zustand des Spiels repräsentieren. Innerhalb des "Playing"-Zustands wird der Game Cycle aktiv, der spezifische Phasen wie Encounter, Battle (mit einem eigenen Battle Cycle), Battle Victory, Battle Defeat und Level Up durchläuft. Der Battle Cycle wiederum besteht aus zwei Hauptphasen: dem Encounter Turn, in dem der Gegner angreifft, und dem Player Turn, in dem der Spieler seine Aktionen durchführt.

![Game Cycle Diagram](/docs/assets/diagrams/game-cycle.png)

## 🧩 Modularisierung
### Atomic Design
Atomic Design ist eine Methodologie, die von Brad Frost  entwickelt wurde, um Benutzeroberflächen systematisch zu gestalten. Sie basiert auf der Analogie zur Chemie, wobei die Benutzeroberfläche in fundamentale Bausteine unterteilt wird, die sich zu komplexen Strukturen zusammensetzen lassen. Die fünf Ebenen des Atomic Designs sind Atome, Moleküle, Organismen, Templates und Seiten.

![Atomic Design](/docs/assets/diagrams/atomic-design.png)

- **Atoms:** Diese sind die grundlegendsten Bausteine und stellen UI-Elemente dar, wie Buttons, Inputs oder Labels. Atome sind hochgradig wiederverwendbar und dienen als Basis für komplexere Komponenten. In deinem Projekt sind Atome vollständig von Properties abhängig und vermeiden direkten Zugriff auf den Redux Store.
- **Molecules:** Moleküle sind Gruppierungen von Atomen, die zusammen eine funktionale Einheit bilden. Wie Atome sind Moleküle ausschliesslich von Properties getrieben und interagieren nicht direkt mit dem Redux Store.
- **Organsims:** Organismen sind relativ komplexe UI-Komponenten, die aus mehreren Molekülen und möglicherweise weiteren Atomen zusammengesetzt sind. Auch Organismen folgen dem Prinzip, nur über Properties gesteuert zu werden und nicht direkt auf den Redux Store zuzugreifen.
- **Templates:** Templates sind in diesem Web Projekt strukturierungselemente, die entwededer die Struktur der Seite Vorgeben oder einfach Elemente Wie Trennlinie oder Box sind. Templates haben keine interaktion mit dem Redux Store.
- **Pages:** Auf der höchsten Ebene stehen die Seiten, gefüllt mit realen Inhalten und Daten. Im Gegensatz zu den anderen Ebenen dürfen Seiten auf den Redux Store zugreifen, um globale Zustände abzurufen oder zu manipulieren. Dies ermöglicht eine klare Trennung der Zuständigkeiten, wobei die Verwaltung des Anwendungszustands auf der höchsten Ebene zentralisiert ist.
Pages können zur Übersicht in weitere Subkomponente unterteilt werden.

## 🎨 Artwork Attribution

| Component           | Attribution         |
| ------------------- | ------------------- |
| Attack Icons        | [game-icons.net](https://game-icons.net)      |
| Encounters & Stages | Sandro Gerber       |
| Item Icons          | [Pixeltiers Tiny RPG](https://pixeltier.itch.io/pixeltiers-tiny-rpg-assets) |
| UI-Elemente         | [RPGUI](https://ronenness.github.io/RPGUI/) |



## 📫 Kontakt

Für weitere Informationen und Unterstützung kontaktiere bitte sandro.gerber@students.ffhs.ch.
