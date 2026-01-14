# චෛතසික තෝරා ගැනීමේ නීති (Chetasika Selection Rules)

## විස්තරය (Overview)

මෙම ආදර්ශය චිත්ත සහ චෛතසික තෝරා ගැනීම සඳහා ස්වයංක්‍රීය වලංගු කිරීමේ නීති සමූහයක් භාවිතා කරයි. එක් එක් චෛතසිකය තෝරන විට, සම්බන්ධිත අනිවාර්ය චෛතසික ස්වයංක්‍රීයව පරීක්ෂා කර තෝරා ගැනීමට උපකාරී වේ.

This system uses a set of automatic validation rules for selecting Chitta and Chetasika. When selecting each Chetasika, related mandatory Chetasikas are automatically checked and helps with selection.

---

## චෛතසික කාණ්ඩ (Chetasika Categories)

### 1. අඤ්ඤසමාන (Anghasamana) - 13

- **සබ්බ චිත්ත සාධාරණ (Sabba Chitha Sadarana) - 7**

  - ඵස්ස (phassa)
  - වේදනා (vedhana)
  - සංඥා (sangya)
  - චෙතනා (chethana)
  - ඒකග්ඝතා (ekagatha)
  - ජීවිතෙන්ද්‍රිය (jeewitheedriya)
  - මනසිකාරය (manaskaraya)

- **ප්‍රකීර්ණක (Prakeernaka) - 6**
  - විතක්ක (withakka)
  - විචාර (vichara)
  - අධිමොක්ඛා (adhimokkha)
  - වීරිය (veeriya)
  - පීතී (preethi)
  - ඡන්ද (chandha)

### 2. අකුසල (Akushala) - 14

- **අකුසලා සාධාරණ (Akusala Sadarana) - 4**

  - මෝහ (moha)
  - අහිරික (ahirika)
  - අනොත්තෙප්ප (anotthappa)
  - උද්ධචච (uddhacha)

- **ලෝභ ත්‍රිහේතුක (Lobha) - 3**

  - ලෝභ (lobha)
  - දිට්ඨි (dhitti)
  - මාන (mana)

- **දොස චතුස්තකය (Dosa) - 4**

  - දොස (dhosa)
  - ඉස්සා (issa)
  - මිච්ඡරිය (michariya)
  - කුකුච්ච (kukucha)

- **තින, මිද්ධ - 2**

  - තින (theena)
  - මිද්ධ (middha)

- **විචිකිච්ඡා - 1**
  - විචිකිච්ඡා (vichikicha)

### 3. සොභන (Sobhana) - 25

- **සොභන සධාරන (Sobhana Sadharana) - 19**
- **විරති (Virathi) - 3**
- **අප්‍රමාන්‍ය (Apramanya) - 2**
- **අමොහ (Amoha) - 1**

---

## වලංගු කිරීමේ නීති (Validation Rules)

### නීතිය 1: සබ්බ චිත්ත සාධාරණ අනිවාර්යතාව

**Rule 1: Sabba Chitha Sadarana Mandatory Requirement**

**සිංහල:**
ඕනෑම චෛතසිකයක් තෝරා ගැනීමට පෙර සබ්බ චිත්ත සාධාරණ (7) හි සියලුම චෛතසික තෝරා ගත යුතුය.

**English:**
Before selecting any Chetasika, all 7 Sabba Chitha Sadarana Chetasikas must be selected.

**ක්‍රියාත්මක වීම (Implementation):**

- පරිශීලකයා සබ්බ චිත්ත සාධාරණ 7 හැර වෙනත් චෛතසිකයක් තෝරන විට පරීක්ෂා කරයි
- 7 ම තෝරා නොමැති නම්, තිබේ නම් pop-up පණිවිඩයක් පෙන්වයි
- පරිශීලකයා "ඔව්" ක්ලික් කළහොත්, සියලු 7 ම ස්වයංක්‍රීයව තෝරා ගනී

**පණිවිඩය (Message):**

> "සබ්බ චිත්ත සාධාරණ (sabba chitha sadarana) - 7 ප්‍රථමයෙන් තෝරා ගත යුතුය.
>
> ඔබට මේවා දැන් තෝරා ගැනීමට අවශ්‍යද?"

---

### නීතිය 2: අකුසල සහ සොභන අන්යෝන්‍ය බැහැරවීම

**Rule 2: Akushala and Sobhana Mutual Exclusion**

**සිංහල:**
අකුසල (14) සහ සොභන (25) චෛතසික එකට තෝරා ගත නොහැක. එකක් තෝරා ඇති විට අනිත තෝරා ගත නොහැක.

**English:**
Akushala (14) and Sobhana (25) Chetasikas cannot be selected together. If one is selected, the other cannot be chosen.

**ක්‍රියාත්මක වීම (Implementation):**

- අකුසල චෛතසිකයක් තෝරා ඇති විට සොභන චෛතසිකයක් තෝරන්නට උත්සාහ කළහොත් වළක්වයි
- සොභන චෛතසිකයක් තෝරා ඇති විට අකුසල චෛතසිකයක් තෝරන්නට උත්සාහ කළහොත් වළක්වයි
- දෝෂ පණිවිඩයක් පෙන්වා තෝරා ගැනීම අවලංගු කරයි

**පණිවිඩය (Message):**

> "දැනට තෝරා ඇති චෛතසික සමඟ මෙය නොයෙදේ"

---

### නීතිය 3: වීරිය අනිවාර්යතාව

**Rule 3: Veeriya Mandatory Requirement**

**සිංහල:**
අකුසල (14) හෝ සොභන (25) චෛතසිකයක් තෝරන විට වීරිය (veeriya) තිබිය යුතුය.

**English:**
When selecting any Akushala (14) or Sobhana (25) Chetasika, Veeriya (veeriya) must be present.

**ක්‍රියාත්මක වීම (Implementation):**

- අකුසල හෝ සොභන චෛතසිකයක් තෝරන විට වීරිය තෝරා ඇත්දැයි පරීක්ෂා කරයි
- වීරිය තෝරා නොමැති නම් තහවුරු කිරීමේ pop-up පෙන්වයි
- "ඔව්" ක්ලික් කළහොත් වීරිය ස්වයංක්‍රීයව තෝරා ගනී

**පණිවිඩය (Message):**

> "සෑම කුසල හෝ අකුසල සිතක් සමඟ වීරිය (veeriya) තිබිය යුතුය.
>
> ඔබට වීරිය දැන් තෝරා ගැනීමට අවශ්‍යද?"

---

### නීතිය 4: අකුසල සාධාරණ පූර්ව අවශ්‍යතාව

**Rule 4: Akusala Sadarana Prerequisite**

**සිංහල:**
ලෝභ ත්‍රිහේතුක (3) හෝ දොස චතුස්තකය (4) තෝරන විට අකුසලා සාධාරණ (4) අතරින් අවම වශයෙන් එකක් තෝරා ගත යුතුය.

**English:**
When selecting Lobha Trihetuka (3) or Dosa Chatusthaka (4), at least one from Akusala Sadarana (4) must be selected.

**ක්‍රියාත්මක වීම (Implementation):**

- ලෝභ හෝ දොස කාණ්ඩයේ චෛතසිකයක් තෝරන විට පරීක්ෂා කරයි
- අකුසල සාධාරණ තෝරා නොමැති නම් තෝරාගැනීමේ pop-up පෙන්වයි
- පරිශීලකයාට මෝහ, අහිරික, අනොත්තෙප්ප, හෝ උද්ධචච තෝරා ගැනීමට විකල්පය ලබා දෙයි

**පණිවිඩය (Message):**

> "අකුසල සාධාරණ චෛතසික තෝරන්න
>
> කරුණාකර එකක් තෝරන්න:"

**විකල්ප (Options):**

- මෝහ
- අහිරික
- අනොත්තෙප්ප
- උද්ධචච
- අවලංගු කරන්න

---

### නීතිය 5: ප්‍රීතිය සහ ජන්දය සම්බන්ධය

**Rule 5: Preethi and Chandha Relationship**

**සිංහල:**
පීතී (preethi) තෝරන විට ඡන්ද (chandha) ද තිබිය යුතුය.

**English:**
When selecting Preethi, Chandha must also be present.

**ක්‍රියාත්මක වීම (Implementation):**

- පීතී තෝරන විට ඡන්ද තෝරා ඇත්දැයි පරීක්ෂා කරයි
- ඡන්ද තෝරා නොමැති නම් තහවුරු කිරීමේ pop-up පෙන්වයි
- "ඔව්" ක්ලික් කළහොත් ඡන්ද ස්වයංක්‍රීයව තෝරා ගනී

**පණිවිඩය (Message):**

> "ප්‍රීතිය සමඟ ජන්දය යෙදිය යුතුය.
>
> ඔබට ජන්දය දැන් තෝරා ගැනීමට අවශ්‍යද?"

---

### නීතිය 6: ලෝභය සමඟ දිට්ඨි හෝ මාන

**Rule 6: Lobha with Dhitti or Mana**

**සිංහල:**
ලෝභය (lobha) තෝරන විට දිට්ඨි (dhitti) හෝ මාන (mana) අතරින් එකක් තෝරා ගත යුතුය.

**English:**
When selecting Lobha, either Dhitti or Mana must be selected.

**ක්‍රියාත්මක වීම (Implementation):**

- ලෝභය තෝරන විට දිට්ඨි හෝ මාන තෝරා ඇත්දැයි පරීක්ෂා කරයි
- දෙකම තෝරා නොමැති නම් තෝරාගැනීමේ pop-up පෙන්වයි
- පරිශීලකයාට දිට්ඨිය හෝ මානය තෝරා ගැනීමට විකල්පය ලබා දෙයි

**පණිවිඩය (Message):**

> "ලෝභය සමඟ දිට්ඨිය හෝ මානය යෙදිය යුතුය.
>
> කරුණාකර එකක් තෝරන්න:"

**විකල්ප (Options):**

- දිට්ඨිය (නිල් බොත්තම)
- මානය (තැඹිලි බොත්තම)
- අවලංගු කරන්න

---

## නීති ක්‍රියාත්මක වීමේ පිළිවෙල

**Rule Execution Order**

චෛතසිකයක් තෝරන විට නීති පහත අනුපිළිවෙලින් ක්‍රියාත්මක වේ:

When selecting a Chetasika, rules are executed in the following order:

1. **සබ්බ චිත්ත සාධාරණ පරීක්ෂාව** (Sabba Chitha Sadarana Check)
2. **අකුසල-සොභන අන්යෝන්‍ය බැහැරවීම** (Akushala-Sobhana Mutual Exclusion)
3. **වීරිය අනිවාර්යතාව** (Veeriya Requirement)
4. **අකුසල සාධාරණ පූර්ව අවශ්‍යතාව** (Akusala Sadarana Prerequisite)
5. **ප්‍රීතිය-ජන්දය සම්බන්ධය** (Preethi-Chandha Relationship)
6. **ලෝභය සමඟ දිට්ඨි/මාන** (Lobha with Dhitti/Mana)

---

## තාක්ෂණික විස්තර

**Technical Details**

### Modal පද්ධතිය (Modal System)

**1. showModal(title, message)**

- ඔව්/නැත තහවුරු කිරීම් සඳහා (Yes/No confirmations)
- Boolean ප්‍රතිදානය කරයි (Returns boolean)

**2. showModalWithChoices(title, message, choices)**

- බහු-තෝරා ගැනීම් සඳහා (Multi-choice options)
- තෝරාගත් අගය ප්‍රතිදානය කරයි (Returns selected value)

### Refresh බොත්තම් (Refresh Buttons)

සෑම කාණ්ඩයකම නැවත පූරණය බොත්තමක් තිබේ:
Each category has a refresh button:

- **අඤ්ඤසමාන refresh** - සියලු 13 අනුරූප කිරීම
- **අකුසල refresh** - සියලු 14 අනුරූප කිරීම
- **සොභන refresh** - සියලු 25 අනුරූප කිරීම

---

## දත්ත ගබඩා කිරීම

**Data Storage**

- සියලු චෛතසික තෝරා ගැනීම් localStorage හි ස්වයංක්‍රීයව සුරකිනු ලැබේ
- පිටුව නැවත පූරණය කළ පසුව තත්ත්වය යථා තත්ත්වයට පත් කෙරේ
- සටහන් ද ස්වයංක්‍රීයව සුරකිනු ලැබේ

All Chetasika selections are automatically saved in localStorage

- State is restored after page reload
- Notes are also saved automatically

---

## යතුරු කෙටි මං

**Keyboard Shortcuts**

කිසිවක් දැනට නොමැත, නමුත් අනාගතයේ එකතු කළ හැක:
None currently, but can be added in the future:

- Enter - තහවුරු කිරීම (Confirm)
- Escape - අවලංගු කිරීම (Cancel)
- Space - checkbox toggle

---

## අනාගත වැඩිදියුණු කිරීම්

**Future Enhancements**

1. **ආපසු හැරවීමේ විශේෂාංගය** (Undo Feature)
2. **චිත්ත වර්ග සැකිලි** (Chitta Type Templates)
3. **PDF නිර්යාත කිරීම** (PDF Export)
4. **බහු භාෂා සහාය** (Multi-language Support)
5. **උසස් වලංගු කිරීම් නීති** (Advanced Validation Rules)

---

## සහාය හා ගැටළු විසඳීම

**Support and Troubleshooting**

### පොදු ගැටළු (Common Issues)

**1. Pop-up පෙන්නන්නේ නැත**

- Browser pop-up blocker පරීක්ෂා කරන්න
- JavaScript සක්‍රිය බව සහතික කරන්න

**2. තෝරා ගැනීම් සුරකිනු නොලැබේ**

- Browser localStorage සක්‍රීය බව පරීක්ෂා කරන්න
- Incognito/Private mode භාවිතා නොකරන්න

**3. නීති ක්‍රියාත්මක වන්නේ නැත**

- Browser console පරීක්ෂා කරන්න
- script.js නිවැරදිව පූරණය වී ඇත්දැයි සහතික කරන්න

---

## අනුවාද ඉතිහාසය

**Version History**

### Version 1.0.0 (January 2026)

- මූලික චෛතසික තෝරා ගැනීම
- 6 වලංගු කිරීමේ නීති
- අභිරුචි modal පද්ධතිය
- ප්‍රගති ප්‍රස්ථාරය
- LocalStorage සහාය
- Refresh බොත්තම්

---

## සම්බන්ධ වීමට

**Contact**

ගැටළු හෝ යෝජනා සඳහා කරුණාකර repository එකේ issues කොටසට යොමු වන්න.

For issues or suggestions, please refer to the issues section of the repository.

---

**© 2026 - සිත් සහ චෙතසික Application**
