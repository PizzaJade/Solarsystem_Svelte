**Doku der "Learn Solar System" Svelte App**

Die "Learn Solar System" App ist eine interaktive Anwendung, die den Nutzern ermöglicht, das Sonnensystem zu erkunden und mehr über astronomische Phänomene zu lernen. Die App besteht aus drei Hauptbereichen: Startseite, Übersicht und AI Chat Bot. Außerdem gibt es einen Dark- und Light-Mode, der über ein Sonnen-/Mond-Symbol im Header umgeschaltet werden kann.

**Allgemeine Funktionen**
Drei Unterseiten: Home, Explore und AI Chat Bot.


**Implementierungsdetails**
Routing: Die Unterseiten sind mit dem svelte-spa-router verbunden.

Problem: AI Chatbot funktioniert gerade nicht.


**Startseite
**
Inhalt:

Markieren von astronomischen Begriffen, um entweder eine kurze Beschreibung in einem Popup zu erhalten oder direkt zu den Wikipedia-Seiten dieser Begriffe weitergeleitet zu werden.
Pop-up Funktionen

Kurzbeschreibung: Nutzer können eine kurze Beschreibung des markierten Begriffs anzeigen lassen.
Wikipedia: Nutzer können den vollständigen Artikel auf Wikipedia lesen.
AI Chat Bot: Nutzer können den Begriff in den AI Chat Bot einfügen und weitere Informationen erhalten.

**AI Chat Bot Seite**

Funktion: Der Chat Bot ermöglicht es Nutzern, Fragen über Astronomie und das Sonnensystem zu stellen.
Hinweis: Der Chat Bot funktioniert derzeit nicht und ist in Entwicklung.
Implementierungsdetails für AI Chat Bot

Chat Interaktion:
Nutzer können Fragen stellen, die an den OpenAI API gesendet werden.
Antworten werden in Echtzeit angezeigt.

Vorgehen:
Nutzung der OpenAI API zur Verarbeitung der Nutzerfragen.
Implementierung von SSE zur Echtzeitkommunikation.
Quellen und Ressourcen

NASA API: https://api.nasa.gov
Spline Design Community: https://app.spline.design/community/search?query=planet&sort=trending
OpenAI ChatGPT und Whisper APIs: https://openai.com/index/introducing-chatgpt-and-whisper-apis/
Framework PicoCSS: https://picocss.com
Particle Nebula 3D Source: https://app.spline.design/community/file/cea96ce0-da30-46cc-bd5c-dc73a6497abd
