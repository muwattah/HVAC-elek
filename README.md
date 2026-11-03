# HVAC Academy — Elektriciteit & HVAC

Een Nederlandstalige interactieve zelfstudiewebsite voor toekomstige HVAC-techniekers in België. Gebaseerd op het principe van een stapsgewijs leerpad uit de koeltechniekopleiding en zelfstandig opgebouwd voor elektriciteit, verwarming, ventilatie, airconditioning, warmtepompen, regeling en onderhoud.

## Inhoud

- 22 leerhoofdstukken, verdeeld over 5 vakdomeinen.
- 264 leeronderwerpen met kernuitleg, formules, praktijkvoorbeelden en waarschuwingen.
- 44 kennistoetsvragen met directe uitleg en een gemengd oefenexamen.
- 12 soorten interactieve/technische SVG-tekeningen.
- 4 interactieve simulators: Wet van Ohm, elektrisch energieverbruik, luchtdebiet en warmtepomp-COP.
- 53 doorzoekbare technische woordenboekbegrippen.
- Dashboard, leerpad, favorieten, voortgang, zoekfunctie en licht/donker thema.
- Responsieve vormgeving en offline ondersteuning voor reeds bezochte pagina's.

De vooruitgang wordt uitsluitend lokaal in de browser bewaard via localStorage. Er is geen gebruikersaccount of synchronisatie tussen toestellen.

## De website publiceren met GitHub Pages

1. Open https://github.com/muwattah/HVAC-elek/settings/pages
2. Kies onder Build and deployment → Source voor GitHub Actions.
3. Open indien nodig Actions → Deploy HVAC Academy to Pages → Run workflow.
4. Na een geslaagde deployment wordt de verwachte live URL https://muwattah.github.io/HVAC-elek/

De workflow in .github/workflows/pages.yml valideert automatisch de JavaScript-syntax en aantallen, en publiceert de statische website bij iedere push naar main.

Alternatief: kies in de Pages-instellingen Deploy from a branch met main en / (root). Je hebt dan geen workflow nodig.

## Projectbestanden

| Bestand | Functie |
|---|---|
| index.html | Pagina-opbouw, navigatie, metatags |
| styles.css | Visuele vormgeving, mobiel en donkere modus |
| curriculum.js | 22 hoofdstukken, 44 toetsvragen, 53 woordenboekbegrippen |
| app.js | Lessen, SVG-schema's, toetsen, simulators en voortgang |
| favicon.svg | Vektorlogo |
| manifest.webmanifest | Homescreen-metadata |
| sw.js | Offline fallback voor eerder geladen websitebestanden |
| .github/workflows/pages.yml | Validatie en Pages-publicatie |

## Zelf verder uitbreiden

Het leerplan staat in curriculum.js. Elk hoofdstuk heeft een titel, domein, leeronderwerpen, uitleg, praktische voorbeelden, een formule, een technische tekening en toetsvragen. Voeg nieuwe hoofdstukken of verdieping toe en controleer technische inhoud en antwoorden zorgvuldig voor publicatie.

De website werkt zonder buildproces en zonder externe JavaScript-bibliotheken. Open index.html rechtstreeks of gebruik een lokale webserver. De offline functie werkt alleen op HTTPS of localhost.

## Veiligheid

De schema's en simulators zijn vereenvoudigde leermodellen en vormen geen installatie- of werkinstructies. Deze website is geen formele beroepsopleiding of certificaat. Bij elektriciteit, gas, koude- en druksystemen gelden toepasselijke voorschriften, erkenningen, fabrikantgegevens en veiligheidsprocedures. Raadpleeg actuele officiële bronnen, waaronder het AREI.

Gemaakt om technische kennis toegankelijk en begrijpelijk te maken.
