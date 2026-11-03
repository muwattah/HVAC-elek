/* Vakinhoud voor de statische HVAC Academy. Didactische samenvattingen, geen gecertificeerde opleiding. */
(function(){
"use strict";
function Q(q,a,b,c,d,why){return {q:q,options:[a,b,c,d],correct:0,why:why};}
function M(title,group,icon,min,summary,topics,heading,body,points,example,mistake,formula,diagram,questions){
 return {id:window.HVAC_DATA?window.HVAC_DATA.length+1:0,title:title,group:group,icon:icon,minutes:min,summary:summary,
 topics:topics.split("|"),heading:heading,body:body,points:points.split("|"),example:example,mistake:mistake,formula:formula,diagram:diagram,questions:questions};
}
var data=[];
function add(x){x.id=data.length+1;data.push(x);}
add(M("Basis elektriciteit","basis","⚡",55,"Van spanning en stroom tot veilige elektrische circuits.",
"Spanning, stroom en weerstand|Wet van Ohm|Elektrisch vermogen|Gelijkstroom en wisselstroom|Serie- en parallelschakelingen|230 V en 400 V|Eenfasig en driefasig|Frequentie en cos φ|Aarding|Zekeringen en differentieelschakelaars|Multimeter|Schema's lezen",
"De drie grootheden die alles verklaren","Spanning (U) is het elektrische potentiaalverschil, stroom (I) is de elektrische lading die per seconde passeert en weerstand (R) beperkt de stroom. Met die drie begrippen begrijp je de basis van elektrische belastingen. Een zuiver ohmse weerstand volgt rechtstreeks de wet van Ohm. Bij echte ventilatormotoren spelen daarnaast inductie, arbeidsfactor en rendement een rol.",
"Spanning meet je met een geschikte voltmeter parallel tussen twee punten en druk je uit in volt (V).|Stroom loopt door een gesloten stroomkring en wordt gemeten in ampère (A).|Weerstand druk je uit in ohm (Ω); bij een ohmse belasting geldt de wet van Ohm.|Bij sinusvormige wisselstroom is voor eenfasig actief vermogen P = U × I × cos φ; voor een symmetrische driefasige belasting P = √3 × Ulijn × Ilijn × cos φ. U en I zijn effectieve waarden.",
"Een eenvoudige weerstand van 46 Ω op 230 V zou theoretisch 5 A opnemen. Met P = U × I kom je op 1.150 W. Echte motoren zijn complexer door inductie en arbeidsfactor.",
"Een spanning kunnen meten betekent niet dat je veilig aan een installatie kunt werken. Werk spanningsloos en controleer dit volgens de geldende veiligheidsprocedure.",
"U = I × R   •   P = U × I (gelijkstroom of ohms, cos φ = 1)","circuit",[
Q("Wat is de eenheid van elektrische stroom?","Ampère (A)","Volt (V)","Ohm (Ω)","Watt (W)","Stroomsterkte druk je uit in ampère. Volt is spanning, ohm weerstand en watt vermogen."),
Q("Een ohmse weerstand is 20 Ω en er staat 100 V over. Welke stroom loopt er?","5 A","0,2 A","20 A","2.000 A","Wet van Ohm: I = U / R = 100 / 20 = 5 A.")
]));
add(M("Gevorderde elektriciteit","basis","🔌",65,"Motoren, relais, beveiligingen en industriële stuurkringen.",
"Relais en contactoren|Transformatoren|Condensatoren|Asynchrone motoren|EC-motoren|Motorbeveiligingen|Ster- en driehoekschakelingen|Frequentieregelaars (VFD)|Softstarters|Stuurkringen|Elektrische schema's|Fouten opsporen",
"Vermogen sturen met een stuurkring","Een contactor is een elektromagnetisch bediende schakelaar. Een relatief kleine stuurstroom bedient contacten die een grotere motorbelasting schakelen. In HVAC schakelen contactoren onder andere compressoren, pompen en ventilatoren.",
"Maak onderscheid tussen hoofdstroomkring en stuurkring.|Een thermische motorbeveiliging beschermt tegen ongewenste overbelasting binnen zijn ontwerp.|Een frequentieregelaar regelt de snelheid van geschikte wisselstroommotoren via een veranderende uitgangsfrequentie.",
"Bij een luchtbehandelingskast geeft de regelaar een startcommando. De contactor trekt aan of de frequentieregelaar start de ventilator. Beveiligingen onderbreken de werking bij een storing.",
"Verbind nooit zomaar een motor met een andere spanning of schakelconfiguratie. Controleer typeplaatje, datasheet en schema.",
"nₛ = 120 × f / p (omw/min; p = aantal polen; asynchrone rotor draait trager door slip)","motor",[
Q("Wat doet een contactor in een HVAC-stuurkring?","Elektrisch een vermogenskring schakelen","Een koelmiddel mechanisch comprimeren","De luchtdruk in een kanaal meten","Water ontkalken","De spoel bedient contacten die de vermogenskring schakelen."),
Q("Welke component wordt vaak gebruikt voor toerentalregeling van een geschikte AC-motor?","Frequentieregelaar (VFD)","Smeltzekering","Drukschakelaar","Expansievat","Een VFD verandert onder meer de uitgangsfrequentie en daarmee het toerental.")
]));
add(M("Elektronica en sensoren","basis","〰",50,"Leer begrijpen wat sensoren meten en hoe regelaars ermee werken.",
"Analoge en digitale signalen|NTC en PTC|PT1000|Drukopnemers|Pressostaten|Vochtigheidssensoren|Debietmeters|0–10 V|4–20 mA|PWM-sturing|Printplaten|Sensoren doormeten",
"Van fysieke grootheid naar regelsignaal","Een sensor zet bijvoorbeeld temperatuur, druk of vocht om naar een elektrisch signaal. De HVAC-regelaar interpreteert dat signaal en beslist of een pomp, klep of compressor moet bijsturen.",
"Een NTC heeft bij stijgende temperatuur doorgaans een lagere weerstand.|Een 0–10 V-signaal kan bijvoorbeeld een regelklep proportioneel aansturen.|Een 4–20 mA-stroomlus wordt vaak gebruikt voor betrouwbare industriële meettransmissie.",
"Een watertemperatuursensor geeft een waarde door. De regelaar vergelijkt die met de gewenste temperatuur en verhoogt of verlaagt het verwarmingsvermogen.",
"Sensoren hebben verschillende karakteristieken. Een verkeerde sensortype-instelling levert foutieve temperaturen op.",
"R, V of mA → meetwaarde → regelactie","control",[
Q("Wat gebeurt bij een typische NTC als de temperatuur stijgt?","De weerstand daalt","De weerstand stijgt steeds","De sensor produceert netspanning","De frequentie wordt altijd 50 Hz","NTC betekent negatieve temperatuurcoëfficiënt."),
Q("Welk signaal is een gangbaar analoog regelsignaal in HVAC?","0–10 V","230 V aan/uit als universeel meetsignaal","HDMI","Ethernet als analoge spanning","0–10 V wordt veel gebruikt voor modulerende aansturing.")
]));
add(M("Wiskunde en natuurkunde","basis","∑",55,"Formules, eenheden en warmteberekeningen begrijpen.",
"Eenheden omrekenen|Formules omvormen|Procenten|Oppervlakte en volume|Druk en debiet|Vermogen en energie|Temperatuur|Dichtheid|Soortelijke warmte|Gaswetten|Warmteoverdracht|Thermodynamica",
"Meten is rekenen in de juiste eenheden","In HVAC werk je met kilowatt, kilowattuur, liter per seconde, kubieke meter per uur, pascal, bar en kelvin. Eenheden correct omzetten is belangrijker dan formules uit het hoofd leren zonder begrip.",
"Vermogen (kW) beschrijft hoe snel energie wordt geleverd; energie (kWh) is vermogen maal tijd.|1 m³/h is gelijk aan ongeveer 0,278 L/s.|1 bar is 100.000 Pa; een drukverschil is iets anders dan absolute druk.",
"Een elektrische bijverwarming van 2 kW die 3 uur draait, verbruikt 6 kWh energie.",
"Verwar nooit kW met kWh. Het eerste is een snelheid van energieoverdracht, het tweede de hoeveelheid energie.",
"E = P × t","math",[
Q("Hoeveel energie verbruikt een toestel van 1,5 kW in 4 uur?","6 kWh","0,375 kWh","4 kW","1,5 kWh","E = P × t = 1,5 × 4 = 6 kWh."),
Q("Welke eenheid wordt gebruikt voor een drukverschil?","Pascal (Pa)","Watt (W)","Ampère (A)","Kilowattuur (kWh)","Pascal is de SI-eenheid voor druk.")
]));
add(M("Gereedschap & werktechniek","basis","🧰",45,"Meten, monteren, leidingen bewerken en documenten lezen.",
"Handgereedschap|Meetinstrumenten|Technische tekeningen|Leidingwerk opmeten|Boren en bevestigen|Koperleidingen|Buigen en optrompen|Hardsolderen|Persverbindingen|Druktesten|Lekdichtheid|Documentatie",
"Een goede meting begint bij goed gereedschap","Een ervaren HVAC-monteur kiest het meetmiddel dat bij de grootheid en de veiligheidscategorie past. Naast elektrisch meten moet je technische plannen kunnen lezen en mechanisch nauwkeurig monteren.",
"Controleer meetbereik, meetcategorie en kalibratiestatus.|Volg montagerichtlijnen en koppels van de fabrikant.|Duid leidingwerk en componenten aan op een technisch schema voordat je monteert.",
"Bij een storing noteer je eerst gemeten waarden, tijdstip, bedrijfsmodus en omstandigheden. Zo kun je later feiten van vermoedens onderscheiden.",
"Hardsolderen, koudemiddelwerk en elektrische aansluitingen vereisen passende opleiding, materiaal en voorzorgsmaatregelen.",
"meten → noteren → vergelijken → besluiten","tools",[
Q("Wat controleer je voor gebruik van een multimeter?","Meetfunctie, meetbereik en veiligheidscategorie","Alleen de kleur van het toestel","Alleen de batterijspanning van de HVAC-regelaar","Alleen de lengte van de meetsnoeren","Een passend en intact meetinstrument is essentieel voor veilig meten."),
Q("Waarom noteer je meetwaarden tijdens een storing?","Om de diagnose op controleerbare feiten te baseren","Omdat de fabrieksgarantie altijd nul metingen eist","Om geen schema meer te hoeven lezen","Om beveiligingen te kunnen uitschakelen","Systematisch registreren maakt vergelijken en herhalen mogelijk.")
]));
add(M("Verwarmingstechniek","hvac","♨",60,"Ketels, radiatoren, pompen en lage-temperatuurverwarming.",
"Centrale verwarming|Condensatieketels|Radiatoren|Vloerverwarming|Circulatiepompen|Expansievaten|Veiligheidsventielen|Thermostatische kranen|Mengkringen|Aanvoer en retour|Stooklijn|Waterzijdig inregelen",
"Warmte opwekken, verdelen en afgeven","Een verwarmingsinstallatie brengt warmte via water naar radiatoren, convectoren of vloerverwarming. De bron kan een ketel of warmtepomp zijn. Comfort hangt af van de juiste temperatuur én van voldoende waterdebiet.",
"De pomp levert debiet tegen de drukverliezen van het circuit.|Een expansievat vangt thermische uitzetting van water op.|Lage aanvoertemperaturen verhogen bij geschikte omstandigheden vaak het warmtepomprendement.",
"Een radiator voelt bovenaan warm en onderaan koeler: dat kan normaal zijn door warmteafgifte. Pas in combinatie met andere metingen kun je een storing afleiden.",
"Zomaar een veiligheidsventiel blokkeren of een heet systeem openen is gevaarlijk.",
"Q̇ = ṁ × cₚ × ΔT","hydraulic",[
Q("Waarom is een expansievat nodig?","Om volumeverandering van verwarmingswater op te vangen","Om koelmiddel uit de lucht te filteren","Om de netfrequentie te verhogen","Om rookgassen te meten","Een gesloten watersysteem zet uit als het opwarmt."),
Q("Wat regelt de circulatiepomp in hoofdzaak?","De waterstroming door het circuit","De verbrandingstemperatuur van gas","De spanning van alle sensoren","Het vochtgehalte in buitenlucht","De pomp verplaatst water en overwint daarbij drukverlies.")
]));
add(M("Koeltechniek","hvac","❄",75,"De volledige koelkring van compressor tot expansieorgaan.",
"Compressor|Condensor|Verdamper|Expansieventiel|Koelmiddelen|Verdampingsdruk|Condensatiedruk|Oververhitting|Onderkoeling|Log p-h-diagram|COP|Storingsdiagnose",
"Vier delen, één kringproces","Het koelmiddel neemt warmte op in de verdamper, wordt samengeperst door de compressor, geeft warmte af in de condensor en ondergaat een drukverlaging in het expansieorgaan. Zo kan warmte van koud naar warmer worden verplaatst met toegevoerde arbeid.",
"De verdamper absorbeert warmte uit de te koelen omgeving.|De compressor verhoogt in de normale dampcompressiekring de druk van de damp.|Het expansieorgaan veroorzaakt een drukval en doseert koelmiddel naar de verdamper.",
"Een airco koelt een ruimte doordat de binnenunit warmte overdraagt aan verdampend koelmiddel; de buitenunit geeft die warmte plus compressorarbeid af.",
"Een drukmeting alleen vertelt niet de volledige toestand: temperatuur, type koudemiddel en bedrijfscondities zijn eveneens nodig.",
"COP = nuttig thermisch vermogen / opgenomen vermogen","refrigeration",[
Q("Welk onderdeel verhoogt de druk van de koelmiddeldamp?","Compressor","Verdamper","Expansieventiel","Filterdroger","Een compressor levert arbeid aan de damp en verhoogt zo druk en temperatuur."),
Q("Waar neemt het koelmiddel in de koelmodus nuttige warmte op?","In de verdamper","In de condensor","In de contactor","In de beveiligingsautomaat","In de verdamper verdampt koelmiddel door opname van warmte.")
]));
add(M("Warmtepompen","hvac","🌡",70,"Lucht-water, monoblock, split, geothermie en rendement.",
"Lucht-lucht|Lucht-water|Water-water|Geothermie|Monoblock en split|Vierwegklep|Ontdooicyclus|SCOP|Stooklijn|Waterzijdig ontwerp|Warmteverlies|Hybride systemen",
"Een koelkring die je woning verwarmt","Een warmtepomp verplaatst omgevingswarmte naar een verwarmingsafgiftesysteem. Het grootste deel van de geleverde warmte kan uit buitenlucht, bodem of water komen. Een deel van de energie komt uit elektriciteit voor compressor, pompen en ventilatoren.",
"Het temperatuurniveau aan de afgiftekant beïnvloedt het rendement.|SCOP beschrijft een seizoensprestatie onder gedefinieerde testcondities.|Bij bepaalde luchtwarmtepompen is periodiek ontdooien van de buitenwisselaar nodig.",
"Een warmtepomp levert 8 kW verwarmingsvermogen bij 2 kW opgenomen elektrische energie: de momentane COP is 4.",
"Een hoge COP uit de brochure is geen garantie voor die waarde in elk huis of bij elke buitentemperatuur.",
"COP = Q̇warmte / Pel","heatpump",[
Q("Een warmtepomp levert 9 kW warmte en neemt 3 kW elektriciteit op. Wat is de COP?","3","6","12","0,33","COP = 9 / 3 = 3."),
Q("Waarom helpt een lagere afgiftetemperatuur vaak bij een warmtepomp?","Het vereiste temperatuurverschil wordt kleiner","Er is dan nooit een circulatiepomp nodig","De installatie heeft geen koelmiddel meer nodig","De netspanning halveert","Een kleiner temperatuurverschil tussen bron en afgifte kan de efficiëntie verbeteren.")
]));
add(M("Airconditioning","hvac","☀",55,"Split, multisplit, VRF en koeling/ontvochtiging.",
"Splitairco|Multisplit|VRF en VRV|Binnenunits|Buitenunits|Invertertechnologie|Koelen|Ontvochtigen|Condenswater|Luchtfilters|Montage|Foutcodes",
"Koelen is ook lucht behandelen","Een airco verlaagt in koelbedrijf de temperatuur en vaak ook de absolute vochtigheid van binnenlucht. Een binnenunit bevat een warmtewisselaar en ventilator; buiten wordt de afgevoerde warmte afgegeven.",
"Een inverter regelt het toerental van de compressor binnen de grenzen van het systeem.|Bij koelen kan condenswater ontstaan dat veilig afgevoerd moet worden.|Verstopte filters beïnvloeden de luchtstroming en de prestaties.",
"Bij een airco die onvoldoende koelt, kijk je eerst naar bedrijfsmodus, filters, luchtdebiet, temperaturen en foutmeldingen voordat je conclusies trekt.",
"Open nooit een koelmiddelcircuit zonder vereiste kwalificaties, veilig gereedschap en correcte procedures.",
"Q̇koel ≈ ṁlucht × Δh","airflow",[
Q("Waarom ontstaat condenswater in een koelende binnenunit?","Lucht koelt onder haar dauwpunt af","Een motor produceert altijd drinkwater","De buitenunit pompt water naar binnen","Het koelmiddel mengt met de kamerlucht","Waterdamp uit de lucht condenseert op voldoende koude oppervlakken."),
Q("Wat betekent inverterregeling bij een geschikte aircocompressor?","Het toerental kan worden aangepast","De compressor draait alleen met vaste snelheid","Er is geen elektriciteit meer nodig","Alle beveiligingen worden vervangen","Invertertechniek past de aandrijving aan de gevraagde capaciteit aan.")
]));
add(M("Ventilatietechniek","hvac","🌀",60,"Systemen A tot D, luchtkanalen, WTW en luchtdebieten.",
"Ventilatiesystemen A B C D|Mechanische ventilatie|Balansventilatie|Warmteterugwinning|Ventilatoren|Luchtkanalen|Luchtdebiet|Luchtsnelheid|Drukverlies|Filters|Geluid|Inregelen",
"Goede luchtkwaliteit begint bij gecontroleerde stroming","Ventilatie voert vervuilde of vochtige lucht af en brengt verse lucht binnen. Het ontwerp bepaalt de richting en hoeveelheid lucht. Bij balansventilatie met warmteterugwinning wordt een deel van de warmte uit afgevoerde lucht overgedragen.",
"Debiet druk je bijvoorbeeld uit in m³/h.|Drukverlies in kanalen stijgt met onder meer debiet, lengte en hulpstukken.|Filters moeten passend gekozen en onderhouden worden.|In België: systeem A = natuurlijke toe- en afvoer; B = mechanische toevoer en natuurlijke afvoer; C = natuurlijke toevoer en mechanische afvoer; D = mechanische toe- en afvoer.",
"Een ventilatiesysteem levert 180 m³/h aan een woning. Bij een groter filterdrukverlies kan hetzelfde systeem extra ventilatorvermogen vragen of minder debiet halen, afhankelijk van de regeling.",
"Meer ventilatorsnelheid is niet altijd de oplossing voor een verkeerd ontworpen kanaalnet.",
"Qv = v × A","airflow",[
Q("Wat is de eenheid van volumetrisch luchtdebiet?","m³/h","kWh","°C","Ω","Luchtdebiet beschrijft een luchtvolume per tijdseenheid."),
Q("Wat is een belangrijk doel van warmteterugwinning in ventilatie?","Een deel van de warmte van afvoerlucht terugwinnen","Koelmiddel uit de kanalen halen","Alle filters overbodig maken","De druk tot 0 Pa reduceren","WTW wisselt warmte uit tussen luchtstromen zonder ze normaal rechtstreeks te mengen.")
]));
add(M("Sanitair & hydraulica","hvac","💧",55,"Waterdruk, warmwater, buffers en leidingberekeningen.",
"Drinkwaterleidingen|Warmwaterproductie|Boilers|Buffervaten|Hydraulische schema's|Waterdruk|Pompen|Regelventielen|Terugslagkleppen|Luchtafscheiders|Waterkwaliteit|Legionellapreventie",
"Debiet en druk: de basis van watercircuits","Bij hydraulica bestudeer je waterstroming in leidingen. Pompen moeten voldoende stroming leveren tegen de weerstand van leidingen, kleppen en wisselaars. Een correct hydraulisch schema is de basis van een goed werkend systeem.",
"Drukverlies hangt af van leidingdiameter, lengte, debiet en componenten.|Een terugslagklep voorkomt ongewenste omgekeerde stroming.|Waterkwaliteit kan invloed hebben op corrosie, kalkaanslag en rendement.",
"Een te kleine leidingdiameter kan bij hetzelfde waterdebiet extra drukverlies en geluid veroorzaken.",
"Drinkwater en verwarmingswater zijn niet zomaar uitwisselbaar. Respecteer scheiding, beveiliging en hygiënevoorschriften.",
"Qv = v × A","hydraulic",[
Q("Wat doet een terugslagklep?","Ongewenste terugstroming voorkomen","Temperatuur nauwkeurig meten","Frequentie van een motor regelen","Koelmiddeldamp comprimeren","Een terugslagklep opent in de voorziene stroomrichting en sluit tegen terugstroming."),
Q("Wat gebeurt vaak met het drukverlies bij meer debiet door dezelfde leiding?","Het drukverlies neemt toe","Het drukverlies verdwijnt","De waterdichtheid wordt nul","De netfrequentie neemt toe","Grotere stroming geeft doorgaans meer wrijvingsverlies.")
]));
add(M("Gas & verbranding","hvac","🔥",55,"Branders, condensatieketels, rookgassen en CO-veiligheid.",
"Aardgas|Verbranding|Gasbranders|Condenserende ketels|Lucht-gasverhouding|Rookgasafvoer|Rookgasanalyse|Koolmonoxide|Gasveiligheid|Vlamdetectie|Ontsteking|Onderhoud",
"Verbranding heeft brandstof, zuurstof en veilige afvoer nodig","Een gasgestookt verwarmingstoestel zet chemische energie om in warmte. De kwaliteit van de verbranding, toevoer van lucht en afvoer van rookgassen bepalen efficiëntie en veiligheid.",
"Koolmonoxide is een gevaarlijk gas dat bij onvolledige verbranding kan ontstaan.|Een condenserende ketel kan een deel van de warmte uit waterdamp in rookgassen terugwinnen.|Verbrandingsmetingen vergen geschikte meetapparatuur en kwalificatie.",
"Een CO-melding is geen gewone comfortstoring maar een veiligheidssignaal: volg onmiddellijk de geldende noodprocedure.",
"Wijzig nooit zelf gasdruk, branderinstellingen of rookgasvoorzieningen zonder bevoegde vakkennis en erkenning.",
"brandstof + zuurstof → warmte + verbrandingsproducten","heat",[
Q("Wat maakt koolmonoxide extra gevaarlijk?","Het is giftig en niet betrouwbaar waarneembaar met menselijke zintuigen","Het heeft altijd een sterke geur","Het is alleen bij lage druk gevaarlijk","Het is hetzelfde als waterdamp","CO is zeer toxisch en kan zonder duidelijke geur of kleur aanwezig zijn."),
Q("Waarom kan een condenserende gasketel efficiënter zijn?","Hij benut ook een deel van de condensatiewarmte in rookgas","Hij heeft geen warmtewisselaar","Hij werkt zonder verbrandingslucht","Hij schakelt alle beveiligingen uit","De rookgassen worden verder afgekoeld zodat extra warmte vrijkomt.")
]));
add(M("Thermodynamica & luchtbehandeling","hvac","◈",65,"Enthalpie, dauwpunt, warmtewisselaars en luchtcondities.",
"Warmtegeleiding|Convectie|Straling|Enthalpie|Voelbare warmte|Latente warmte|Relatieve vochtigheid|Absolute vochtigheid|Dauwpunt|Psychrometrisch diagram|Luchtbehandelingskast|Energiebalans",
"Warmte en vocht volgen fysische wetten","In luchtbehandeling worden temperatuur en vochtgehalte samen bekeken. De hoeveelheid energie in vochtige lucht wordt beschreven met enthalpie. Bij ontvochtigen kan condensatie plaatsvinden en komt latente warmte vrij.",
"Voelbare warmte verandert de temperatuur zonder faseovergang.|Latente warmte heeft te maken met faseverandering zoals verdamping of condensatie.|Het dauwpunt is de temperatuur waarbij lucht bij afkoeling verzadigd raakt.",
"Warme vochtige lucht tegen een koude warmtewisselaar kan afkoelen tot onder het dauwpunt; er vormt zich watercondens.",
"Relatieve vochtigheid is temperatuurafhankelijk; 60% RV bij 10°C is niet hetzelfde vochtgehalte als 60% RV bij 25°C.",
"Q̇ = ṁ × Δh","heat",[
Q("Wat betekent het dauwpunt van lucht?","Temperatuur waarbij lucht bij afkoeling verzadigd raakt","Temperatuur van een elektrisch contact","Maximaal toerental van een ventilator","De absolute buitendruk","Bij het dauwpunt is de relatieve vochtigheid 100% onder gebruikelijke definities."),
Q("Wat is latente warmte?","Warmte die samenhangt met een faseovergang","Alleen energie door elektrische weerstand","Uitsluitend warmte door straling","De luchtsnelheid door een rooster","Bij verdampen of condenseren wordt energie opgenomen of vrijgegeven.")
]));
add(M("Meet- & regeltechniek","regeling","🎛",70,"Van thermostaat tot PID, klepaandrijving en regeling.",
"Thermostaten|Aan-uitregeling|Modulerende regeling|PID-regeling|Regelkleppen|Servomotoren|Drukregeling|Temperatuurregeling|Debietregeling|Beveiligingsketens|Stuurdiagrammen|PLC-basis",
"Regelen = meten, vergelijken, corrigeren","Een regelkring meet een proceswaarde, vergelijkt die met een gewenste waarde (setpoint) en stuurt een component bij. HVAC-regelingen gebruiken onder meer aan-uitregelingen en modulerende regelingen.",
"Het setpoint is de gewenste meetwaarde.|Een regelaar berekent de benodigde sturing uit de regelafwijking.|Een beveiligingsfunctie heeft een ander doel dan comfortabele temperatuurregeling.",
"Bij een ruimtetemperatuur van 19°C en een setpoint van 21°C kan een verwarmingsregelaar extra warmte vragen.",
"Verwar een veiligheidslimiet niet met een regelsetpoint: een beveiliging mag je niet overbruggen om te blijven draaien.",
"fout = setpoint − meetwaarde","control",[
Q("Wat is het setpoint in een regelkring?","De gewenste waarde","De kabelweerstand","De maximale netspanning","Het bouwjaar van de installatie","De regelaar streeft ernaar de gemeten waarde naar het setpoint te brengen."),
Q("Waarvoor dient een PID-regelaar?","Een proces bijsturen op basis van regelafwijking en haar gedrag","Gas in de condensor samenpersen","Een manometer kalibreren","Lucht rechtstreeks filteren","P-, I- en D-acties kunnen een regelkring nauwkeurig en stabiel helpen maken.")
]));
add(M("Gebouwautomatisering","regeling","⌘",65,"BMS, Modbus, BACnet, KNX en slimme HVAC-installaties.",
"Gebouwbeheersystemen|Modbus RTU|Modbus TCP|BACnet|KNX|OpenTherm|Communicatiebekabeling|IP-adressen|Monitoring|Slimme thermostaten|Trendgrafieken|Communicatiestoringen",
"Installaties die met elkaar communiceren","In grotere gebouwen verbinden communicatieprotocollen HVAC-regelaars met een gebouwbeheersysteem. Metingen, alarmen, parameters en trends worden digitaal beschikbaar en kunnen centraal opgevolgd worden.",
"Modbus laat apparaten gegevensregisters uitwisselen.|BACnet is ontworpen voor gebouwautomatisering.|Een trendgrafiek maakt het verloop van bijvoorbeeld een temperatuur over de tijd zichtbaar.",
"Een installateur ziet via het gebouwbeheersysteem dat de aanvoertemperatuur tijdens piekuren te laag wordt. De trend helpt gericht onderzoeken.",
"Een verbinding met het netwerk betekent niet automatisch dat alle meetpunten juist zijn geschaald of benoemd.",
"sensor → controller → protocol → BMS","control",[
Q("Wat is het doel van een gebouwbeheersysteem (BMS)?","Installaties centraal monitoren en beheren","De koelmiddelkring mechanisch afdichten","De relatieve vochtigheid rechtstreeks meten","Aardlekstromen vervangen","Een BMS verzamelt status, metingen en commando's van gebouwautomatisering."),
Q("Welk protocol komt veel voor in HVAC-gebouwautomatisering?","BACnet","SMTP uitsluitend voor motorsturing","USB Audio","JPEG","BACnet is een standaard voor communicatie in gebouwautomatisering.")
]));
add(M("HVAC-berekeningen & ontwerp","regeling","📐",80,"Dimensioneren op basis van behoefte, debiet en drukverlies.",
"Warmteverlies|Koellast|Vermogensselectie|Leidingdiameters|Kanaaldiameters|Pompselectie|Ventilatorselectie|Drukverlies|Buffervaten|Expansievaten|Akoestiek|Energie-efficiëntie",
"Een installatie begint bij de warmtevraag","Een goed ontwerp start met de benodigde verwarmings- en koelcapaciteit. Te groot dimensioneren kan leiden tot pendelen en hogere kosten, te klein dimensioneren tot comfortproblemen.",
"Warmteverlies is afhankelijk van isolatie, oppervlakken, ventilatie en temperatuurverschil.|Een pomp of ventilator moet de werkelijke drukverliezen kunnen overwinnen.|Dimensionering wordt gecontroleerd op ontwerpcondities en fabrikantgegevens.",
"Een woning heeft een berekend ontwerpwarmteverlies van 6 kW. Dan kiest een ontwerper een passend systeem op basis van die berekening en ontwerpcondities, niet zomaar de grootste warmtepomp.",
"Vuistregels kunnen helpen bij een eerste inschatting, maar vervangen geen ontwerpberekening.",
"Q̇verlies ≈ U × A × ΔT","math",[
Q("Welke factor beïnvloedt het transmissiewarmteverlies door een muur?","U-waarde, oppervlakte en temperatuurverschil","Alleen de kleur van de verf","Alleen het merk van de thermostaat","De frequentie van het wifi-netwerk","Transmissiewarmteverlies hangt af van U × A × ΔT."),
Q("Waarom is te grote HVAC-dimensionering soms nadelig?","Ze kan pendelen en inefficiëntie veroorzaken","Ze maakt een expansievat onnodig","Ze maakt elke sensor nauwkeuriger","Ze elimineert alle drukverliezen","Een ongeschikte overcapaciteit kan ongunstig regelgedrag geven.")
]));
add(M("Installatie & inbedrijfstelling","praktijk","🛠",65,"Montage, testen, parameters, commissioning en oplevering.",
"Installatieplannen|Werkvoorbereiding|Mechanische montage|Elektrische aansluitingen|Isolatie|Dichtheidsproeven|Vacuüm en droging|Koelmiddelprocedures|Vullen en ontluchten|Parameters|Functionele testen|Opleverrapport",
"Een installatie is pas klaar als ze correct werkt","Inbedrijfstelling is een gecontroleerd proces waarbij de monteur nagaat of een systeem veilig is gemonteerd, juist is ingesteld en binnen de ontwerpwaarden functioneert.",
"Controleer de montage met de fabrikantdocumentatie.|Meet en registreer relevante waarden bij de eerste opstart.|Leg instellingen, testresultaten en afwijkingen vast in een opleverrapport.",
"Na montage van een warmtepomp controleert de bevoegde technieker onder andere waterzijdige stroming, beveiligingen, sturing en de correcte bedrijfsmodus.",
"Druktesten, koelmiddelhandelingen, gas- en elektrische werkzaamheden mogen alleen volgens toepasselijke regels door bekwame personen gebeuren.",
"plan → controle → testen → inregelen → registreren","tools",[
Q("Wat hoort bij een goede inbedrijfstelling?","Functionaliteit en veiligheidsfuncties controleren en documenteren","Alle foutmeldingen uitschakelen","De installatie zonder metingen vrijgeven","De handleiding weggooien","Commissioning bevestigt gedocumenteerd dat het systeem volgens eisen functioneert."),
Q("Waarom is een opleverrapport nuttig?","Het legt metingen en instellingen voor later vast","Het vervangt alle wettelijke keuringen","Het voorkomt dat onderhoud nodig is","Het zorgt voor een hogere netspanning","Een rapport geeft een referentie voor toekomstig onderhoud en diagnose.")
]));
add(M("Onderhoud & storingsdiagnose","praktijk","🔎",75,"Systematisch diagnoses stellen met metingen en schema's.",
"Preventief onderhoud|Periodieke inspectie|Storingsanalyse|Elektrische fouten|Temperatuur en druk|Koelkring|Compressorproblemen|Ventilatoren|Sensorfouten|Hydraulische storingen|Foutcodes|Servicerapporten",
"Een goede technieker gokt niet","Storingen oplossen is het toetsen van hypotheses. Eerst noteer je symptomen en omstandigheden; vervolgens meet je gericht, vergelijk je met schema's en specificaties en bepaal je de oorzaak.",
"Controleer basisvoorwaarden zoals voeding, instellingen, debiet en filters.|Eén afwijkende meting is geen volledige diagnose.|Los de oorzaak op en controleer daarna of het systeem weer stabiel werkt.",
"Een warmtepomp meldt te weinig waterdebiet. Controleer volgens de veilige procedure het hydraulische circuit, de pompstatus, de afsluiters en de relevante signalen.",
"Zet nooit een drukschakelaar, motorbeveiliging of andere veiligheidsfunctie buiten werking om een fout te verbergen.",
"symptoom → hypothese → meting → oorzaak","diagnostics",[
Q("Wat is een goede eerste stap bij storingsdiagnose?","Symptomen en bedrijfscondities vastleggen","Willekeurig onderdelen vervangen","Een veiligheidsrelais overbruggen","Alle parameters maximaal zetten","Een gestructureerde diagnose begint met informatie en controleerbare waarnemingen."),
Q("Wat doe je nadat de oorzaak van een storing verholpen is?","De werking en beveiligingen opnieuw controleren","Metingen niet meer noteren","De foutcode als enige bewijs gebruiken","De onderhoudsdocumentatie wissen","Verifieer dat het systeem correct en veilig functioneert na herstel.")
]));
add(M("Veiligheid, wetgeving & attesten","praktijk","🛡",65,"AREI, F-gassen, veiligheid, certificering en Vlaamse regels.",
"Elektrische veiligheid|AREI|LOTO|PBM|Werken op hoogte|Koudemiddelveiligheid|F-gassen|Erkenningsvoorwaarden|EPB|Gasveiligheid|VCA|Afvalbeheer",
"Veilig werken is altijd onderdeel van de techniek","In België zijn het AREI, welzijnsregels en gewestelijke erkenningsvoorwaarden relevant voor HVAC-werk. Europese F-gasregels (EU 2024/573 en EU 2024/2215) bevatten bovendien certificeringsbepalingen voor bepaalde alternatieve koudemiddelen, zoals koolwaterstoffen, CO₂ en ammoniak. Controleer altijd de actuele toepassing, categorieën en overgangsregels bij de bevoegde overheid.",
"Schakel vóór werkzaamheden volgens de veiligheidsprocedure af, beveilig tegen herinschakelen en controleer de spanningsloze toestand met geschikt meetgereedschap.|Koudemiddelen en druksystemen kennen specifieke risico's en voorschriften.|Werk met F-gassen aan stationaire airco's en warmtepompen vereist in Vlaanderen voor aangewezen werkzaamheden doorgaans een erkend koeltechnicus en, voor bepaalde bedrijfsactiviteiten, een erkend koeltechnisch bedrijf.|De EU 2024/2215 onderscheidt onder meer certificaattypen A1, A2, B, C, D en E; raadpleeg actuele Vlaamse erkenningsregels en eventuele overgangsmaatregelen.",
"Bij koelmiddelwerk ga je vooraf na welk middel aanwezig is en welke vereiste certificering, apparatuur en veiligheidsprocedure van toepassing zijn.",
"Deze website is studiehulp, geen certificaat, keuring, formele bevoegdheid of vervanging van het AREI en andere actuele regelgeving. Controleer eisen en toepasselijke uitzonderingen bij FOD Economie en Vlaanderen.be.",
"risico herkennen → beveiligen → controleren","safety",[
Q("Waarvoor staat AREI in België?","Algemeen Reglement op de Elektrische Installaties","Arbeidsregeling voor Energie en Isolatie","Algemene Richtlijn voor Elektrische Inverters","Automatische Regeling van Elektrische Installateurs","Het AREI bevat voorschriften rond elektrische installaties."),
Q("Wat is een juiste houding tegenover een veiligheidsbeveiliging?","De functie behouden en storingen veilig onderzoeken","Tijdelijk kortsluiten om sneller te werken","Uitschakelen bij een hoge energiefactuur","Neerleggen bij de eindklant","Beveiligingsfuncties zijn essentieel en mogen niet zomaar worden overbrugd.")
]));
add(M("Duurzaamheid & energiebeheer","expert","🌿",55,"SCOP, warmterecuperatie, slim regelen en verbruik.",
"Energiezuinige installaties|COP en EER|SEER en SCOP|Warmterecuperatie|Isolatie|Lage temperatuur|Thermische opslag|Slimme regeling|Zonnepanelen|Vraaggestuurde ventilatie|Lage GWP|Levenscycluskosten",
"Rendement zit in het hele systeem","Energiebesparing begint bij een passende warmtevraag, goed ontwerp, correcte afstelling en onderhoud. Het hoogste rendement haal je niet met één slim toestel, maar door alle onderdelen goed op elkaar af te stemmen.",
"SCOP vergelijkt warmteproductie met energie-input over een gedefinieerd seizoen.|Warmterecuperatie benut warmte die anders verloren gaat.|Een lage afgiftetemperatuur kan de warmtepompprestatie verbeteren.",
"Een goed geïsoleerd gebouw heeft minder verwarmingsvermogen nodig. De juiste regeling kan daarop inspelen met langere, rustige bedrijfsperiodes.",
"Een goede theoretische efficiëntie zegt weinig als debieten, setpoints en onderhoud in de praktijk niet kloppen.",
"η = nuttige energie / toegevoerde energie","heatpump",[
Q("Wat is een praktische reden om warmteterugwinning toe te passen?","Verloren warmte opnieuw nuttig benutten","De luchtkwaliteit niet meer hoeven controleren","Geen ventilatoren meer gebruiken","De verwarmingsvraag altijd tot nul brengen","Recuperatie verlaagt het netto verlies aan bruikbare warmte."),
Q("Wat beschrijft SCOP?","Een seizoensgebonden prestatie-indicator van een warmtepomp","Alleen het elektrisch vermogen op één moment","De diameter van een warmtepompbuis","Het zuurstofpercentage in rookgassen","SCOP is een seizoensmatige verhouding volgens vastgelegde testomstandigheden.")
]));
add(M("Industriële & commerciële HVAC","expert","🏭",75,"Chillers, koeltorens, grote installaties en natuurlijke koudemiddelen.",
"Chillers|Koeltorens|Rooftop-units|Luchtbehandelingskasten|VRF op gebouwniveau|Commerciële koeling|Industriële compressoren|CO₂ R744|Propaan R290|Ammoniak R717|Cascadekoeling|Industriële regeling",
"Dezelfde fysica, veel grotere systemen","Industriële en commerciële systemen gebruiken dezelfde basisprincipes, maar met meer vermogen, grotere netwerken en striktere bedrijfszekerheids- en veiligheidsvereisten. Meerdere koelkringen en geavanceerde regelstrategieën komen vaak voor.",
"Een chiller maakt gekoeld water voor een gebouw of proces.|R744 (CO₂), R290 (propaan) en R717 (ammoniak) hebben elk specifieke eigenschappen en risico's.|Redundantie kan belangrijk zijn in kritische gebouwen.",
"Een ziekenhuis kan meerdere koelwatermachines gebruiken zodat het koelvermogen ook bij onderhoud beschikbaar blijft.",
"Natuurlijke koudemiddelen zijn niet automatisch ongevaarlijk: sommige zijn brandbaar, toxisch of werken op hoge druk.",
"belasting → capaciteit → regeling → redundantie","refrigeration",[
Q("Wat levert een watergekoelde of luchtgekoelde chiller in hoofdzaak aan een systeem?","Gekoeld water of een andere secundaire vloeistof","Rechtstreeks aardgas voor de ketel","Alleen elektrische spanning","Perslucht voor de ventilatiekanalen","Een chiller maakt een koudedrager voor koeling van gebouwen of processen."),
Q("Welk koudemiddel heeft de aanduiding R290?","Propaan","Ammoniak","Water","Koolstofdioxide","R290 is propaan, een brandbaar koudemiddel.")
]));
add(M("Professionele vaardigheden & carrière","expert","🎓",45,"Technisch Engels, documentatie, klantwerk en specialisatie.",
"Technisch Engels|Fabrikantdocumentatie|Klantcommunicatie|Servicerapporten|Werkplanning|Materialenlijsten|Offertes|Kostprijs|Samenwerking|Probleemoplossing|Digitale tools|Bijscholing",
"Techniek begrijpen én helder uitleggen","De beste vaktechniekers kunnen een probleem onderzoeken, het veilig oplossen, de klant begrijpelijk informeren en hun werk correct documenteren. Door voortdurende bijscholing blijf je mee met nieuwe technologie.",
"Lees eerst het juiste modelspecifieke schema en de servicehandleiding.|Schrijf metingen en uitgevoerde handelingen helder op.|Leg uit welke bevindingen zeker zijn en welke nog onderzoek vragen.",
"Schrijf na een storing: foutmelding, bedrijfscondities, gecontroleerde onderdelen, meetwaarden, oplossing en testresultaat.",
"Een vermoeden voorstellen als een vaststaande diagnose kan leiden tot onnodige kosten en onveilig handelen.",
"waarnemen → begrijpen → communiceren → verbeteren","tools",[
Q("Wat is een goede eigenschap van een servicerapport?","Het bevat duidelijke waarnemingen, metingen en uitgevoerde acties","Het bevat alleen de merknaam van de klant","Het laat de toestand na herstel weg","Het bevat geen datum of context","Een volledig rapport ondersteunt opvolging, onderhoud en verantwoording."),
Q("Waarom is technische bijscholing belangrijk?","Technologie en voorschriften blijven evolueren","Omdat basiskennis na één jaar verdwijnt","Omdat fabrikantdocumentatie nooit verandert","Omdat meetinstrumenten geen onderhoud nodig hebben","Nieuwe koudemiddelen, regelingen, normen en systemen vragen regelmatige actualisering.")
]));
window.HVAC_DATA=data;
window.HVAC_GROUPS=[
{id:"basis",name:"Basis & elektriciteit",color:"#558efa",desc:"Het technische fundament"},
{id:"hvac",name:"HVAC-systemen",color:"#18bcb1",desc:"Koeling, verwarming en lucht"},
{id:"regeling",name:"Regeling & ontwerp",color:"#9b7bf6",desc:"Automatiseren en berekenen"},
{id:"praktijk",name:"Praktijk & veiligheid",color:"#f1a34f",desc:"Monteren, meten, diagnosticeren"},
{id:"expert",name:"Expert & carrière",color:"#e77b99",desc:"Duurzaamheid en specialisatie"}
];
window.HVAC_GLOSSARY=[
["Ampère (A)","Eenheid van elektrische stroomsterkte."],["Volt (V)","Eenheid van elektrische spanning of potentiaalverschil."],["Ohm (Ω)","Eenheid van elektrische weerstand."],["Watt (W)","Eenheid van vermogen: energieomzetting per seconde."],["Kilowattuur (kWh)","Eenheid van energie. Een toestel van 1 kW gebruikt in 1 uur 1 kWh."],["Wet van Ohm","Relatie U = I × R voor een ohmse elektrische belasting."],["Wisselstroom (AC)","Elektrische stroom waarvan richting en grootte periodiek veranderen."],["Gelijkstroom (DC)","Stroom die in één richting vloeit."],["Driefasen","Elektrische voeding met drie fasegeleiders, vaak gebruikt voor grotere motoren."],["Aarding","Beschermingsvoorziening die aanraakspanningen en foutstromen helpt beheersen."],["Differentieelschakelaar","Beveiliging die een verschil tussen heen- en terugstromende stroom detecteert."],["Contactor","Elektromagnetisch bediende schakelaar voor elektrische belastingen."],["Relais","Schakelcomponent waarvan een signaal een ander circuit bedient."],["VFD","Frequentieregelaar voor toerentalregeling van geschikte motoren."],["NTC","Temperatuursensor waarvan de weerstand afneemt bij stijgende temperatuur."],["PT1000","Weerstandstemperatuursensor van platina met nominaal 1000 Ω bij 0°C."],["0–10 V","Veelgebruikt analoog meetsignaal of regelsignaal."],["4–20 mA","Analoge stroomlus voor metingen en industriële procesbesturing."],["Setpoint","Gewenste waarde die een regelaar probeert te bereiken."],["PID","Regelmethode met proportionele, integrerende en afgeleide actie."],["BMS/GBS","Gebouwbeheersysteem voor monitoring en regeling van gebouwinstallaties."],["Modbus","Communicatieprotocol voor uitwisseling van apparaatwaarden."],["BACnet","Communicatieprotocol voor gebouwbeheersystemen."],["Compressor","Machine die koelmiddeldamp samenperst en de druk verhoogt."],["Condensor","Warmtewisselaar waarin een stof warmte afgeeft en vaak condenseert."],["Verdamper","Warmtewisselaar waarin een koelmiddel verdampt door warmteopname."],["Expansieventiel","Onderdeel dat de koelmiddeltoevoer doseert en een drukval veroorzaakt."],["Oververhitting","Temperatuur van damp boven haar verzadigingstemperatuur bij die druk."],["Onderkoeling","Temperatuur van vloeistof onder haar verzadigingstemperatuur bij die druk."],["Koudemiddel","Werkmedium dat warmte in een koelkring transporteert."],["COP","Verhouding tussen nuttige thermische output en opgenomen energie-input in een gekozen bedrijfsmodus."],["SCOP","Seizoensgebonden prestatiecoëfficiënt van een warmtepomp volgens testmethodiek."],["Inverter","Elektronische aandrijving die een geschikte motor variabel kan laten draaien."],["Warmtepomp","Machine die met arbeid warmte van een bron naar een afgiftesysteem verplaatst."],["WTW","Warmteterugwinning uit bijvoorbeeld afgevoerde ventilatielucht."],["Debiet","Hoeveelheid vloeistof of lucht die per tijdseenheid stroomt."],["Pascal (Pa)","SI-eenheid van druk; 1 bar = 100.000 Pa."],["Drukverlies","Drukverschil dat nodig is om stromingsweerstand te overwinnen."],["Expansievat","Voorziening die volumeveranderingen in gesloten watersystemen opvangt."],["Dauwpunt","Temperatuur waarbij lucht bij afkoeling verzadigd raakt."],["Relatieve vochtigheid","Verhouding van actuele waterdampdruk tot verzadigingsdampdruk bij dezelfde temperatuur."],["Enthalpie","Thermodynamische toestandsfunctie, bruikbaar voor energiebalansen."],["Latente warmte","Warmte die bij een faseovergang opgenomen of afgegeven wordt."],["Voelbare warmte","Warmte-uitwisseling die de temperatuur verandert zonder faseovergang."],["U-waarde","Warmtedoorgangscoëfficiënt van een bouwdeel in W/(m²·K)."],["Stooklijn","Regelverband tussen buitentemperatuur en gewenste aanvoertemperatuur."],["Hydraulisch inregelen","Waterstromingen verdelen volgens ontwerpdebieten."],["R744","Aanduiding voor koolstofdioxide als koudemiddel."],["R290","Aanduiding voor propaan als koudemiddel; brandbaar."],["R717","Aanduiding voor ammoniak als koudemiddel; toxisch."],["AREI","Algemeen Reglement op de Elektrische Installaties in België."],["LOTO","Lockout/tagout: methode om ongewenste energietoelevering te voorkomen tijdens werkzaamheden."],["Commissioning","Gecontroleerde inbedrijfstelling en verificatie van installatieprestaties."]
].map(function(a){return {term:a[0],definition:a[1]};});
})();
