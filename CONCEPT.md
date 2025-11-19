## 📊 **Definitieve Parameterlijst**

### 1️⃣ **Type cadeau**

* **Klein gebaar** → kaartje, bloemen, symbolisch bedrag
* **Gewoon cadeau** → een “volwaardig” cadeau voor de gelegenheid

> **Invloed:** een vermenigvuldigingsfactor op het eindbedrag (bv. klein gebaar = 0.5×, gewoon cadeau = 1×)

---

### 2️⃣ **Frequentie van gelegenheid**

* **Unieke gebeurtenis** (huwelijk, eerste kind, jubileum)
* **Terugkerend** (verjaardag, jaarlijks etentje, Kerst)

> **Invloed:** Uniek → bedrag omhoog, terugkerend → bedrag omlaag

---

### 3️⃣ **Budget / financiële draagkracht**

* **Laag budget** (student, starter, schulden)
* **Gemiddeld budget**
* **Hoog budget**

> **Invloed:** schaalfactor op alle bedragen (bv. 0.75×, 1×, 1.25×)

---

### 4️⃣ **Relatieduur / Contactfrequentie**

* **Zie je vaak** (dagelijks/wekelijks)
* **Zie je af en toe** (maandelijks)
* **Zie je zelden** (jaar of meer niet gezien)

> **Invloed:** hoe vaker je de persoon ziet, hoe hoger het bedrag (je voelt je meer betrokken)

---

### 5️⃣ **Relatie tot persoon**

* **Dichte familie**
* **Verre familie**
* **Goede vriend**
* **Vriend**
* **Collega**
* **Kennis**

> **Invloed:** elke categorie kan een basisbedrag of factor hebben (dichte familie > kennis)

---

### 6️⃣ **Rol in de gelegenheid**

Afhankelijk van het eventtype:

* Huwelijk → daggast, avondgast, receptie
* Geboorte → peter/meter, ouderwetse “kraamvisite”, collega
* Verjaardag → groot feest, klein feest, gewoon kaartje

> **Invloed:** grote rol → bedrag omhoog

---

### 7️⃣ **Persoonlijke waarden / Prioriteiten**

* **Royaal** (ik geef graag wat extra)
* **Gemiddeld**
* **Symbolisch** (ik wil niet te veel uitgeven, maar toch iets geven)

> **Invloed:** schuifregelaar die een percentage van het algoritmisch bedrag aanpast

---

## 🧠 **Concept voor het Algoritme**

Je zou dit kunnen opbouwen als een gewogen score:

```
basisbedrag = lookup[gelegenheid][relatie]    # bv. geboorte + collega = €15
bedrag *= factor_type_cadeau                  # klein gebaar (0.5x) of gewoon (1x)
bedrag *= factor_frequentie                   # uniek (1.3x) of terugkerend (0.8x)
bedrag *= factor_budget                       # laag (0.75x), gemiddeld (1x), hoog (1.25x)
bedrag *= factor_relatieduur                  # vaak (1.2x), af en toe (1x), zelden (0.8x)
bedrag *= factor_rol                          # gastrollen of betrokkenheid
bedrag *= factor_persoonlijke_waarde          # royaal (1.2x), symbolisch (0.8x)
```

Je zou uiteindelijk een **range** kunnen tonen:
bijvoorbeeld *“Op basis van je keuzes raden we tussen €20 en €25 aan.”*
Zo voelt de gebruiker nog enige vrijheid.

---

## 📊 **Tabel – Basisbedragen per Gelegenheid & Relatie**

| **Gelegenheid**                                    | **Dichte familie** | **Verre familie** | **Goede vriend** | **Vriend** | **Collega** | **Kennis** |
| -------------------------------------------------- | ------------------ | ----------------- | ---------------- | ---------- | ----------- | ---------- |
| **Geboorte (eerste kind)**                         | €50                | €35               | €40              | €30        | €15         | €10        |
| **Geboorte (volgende kinderen)**                   | €35                | €25               | €30              | €20        | €10         | €7         |
| **Huwelijk**                                       | €100               | €75               | €90              | €70        | €50         | €30        |
| **Verjaardag**                                     | €40                | €25               | €30              | €20        | €10         | €5         |
| **Kerst / Nieuwjaar**                              | €40                | €25               | €30              | €20        | €10         | €5         |
| **Andere unieke gelegenheid (jubileum, promotie)** | €50                | €30               | €30              | €20        | €15         | €10        |

> 💡 **Tip:** Dit is je *basisbedrag* vóór factoren zoals budget, type cadeau, relatieduur, enz.

---

## 🔢 **Factor-suggesties**

### 1️⃣ **Type cadeau**

| Type cadeau   | Factor |
| ------------- | ------ |
| Klein gebaar  | 0.5    |
| Gewoon cadeau | 1.0    |

---

### 2️⃣ **Frequentie**

| Frequentie                   | Factor |
| ---------------------------- | ------ |
| Unieke gebeurtenis           | 1.3    |
| Terugkerend (bv. verjaardag) | 0.8    |

---

### 3️⃣ **Budget / Financiële draagkracht**

| Budget                         | Factor |
| ------------------------------ | ------ |
| Laag (beperkt budget)          | 0.75   |
| Gemiddeld                      | 1.0    |
| Hoog (royale bestedingsruimte) | 1.25   |

---

### 4️⃣ **Relatieduur / Contactfrequentie**

| Frequentie zien            | Factor |
| -------------------------- | ------ |
| Vaak (dagelijks/wekelijks) | 1.2    |
| Af en toe (maandelijks)    | 1.0    |
| Zelden (jaar+ niet gezien) | 0.8    |

---

### 5️⃣ **Rol in de gelegenheid**

| Rol / Betrokkenheid                      | Factor |
| ---------------------------------------- | ------ |
| Speciale rol (peter/meter, getuige)      | 1.5    |
| Belangrijke gast (daggast, groot feest)  | 1.3    |
| Gewone gast (avondgast, kleine receptie) | 1.0    |
| Geen uitnodiging / enkel kaartje         | 0.5    |

---

### 6️⃣ **Persoonlijke waarden / Prioriteiten**

| Persoonlijke stijl               | Factor |
| -------------------------------- | ------ |
| Symbolisch (liever klein bedrag) | 0.8    |
| Gemiddeld                        | 1.0    |
| Royaal                           | 1.2    |

---

## 🧮 **Voorbeeld (uit deze tabel)**

Situatie:

* **Geboorte eerste kind** + **Collega**
* **Gewoon cadeau** → 1.0
* **Unieke gebeurtenis** → 1.3
* **Gemiddeld budget** → 1.0
* **Zie wekelijks** → 1.2
* **Rol = gewoon collega** → 1.0
* **Persoonlijk gemiddeld** → 1.0

Berekening:

```
Basisbedrag = €15
15 × 1.0 × 1.3 × 1.0 × 1.2 × 1.0 × 1.0 = €23,40
→ Aanbevolen bedrag: €20 – €25
```
