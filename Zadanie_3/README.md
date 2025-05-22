
# Zadanie: Dokument XML, DTD i CSS

## 1. Stwórz dokument **XML**, który będzie wykorzystywany również w kolejnych zadaniach

**(nie można realizować tematu omawianego podczas zajęć grupowych, czyli spisu książek).**

### Struktura dokumentu musi zawierać:
- elementy składające się z tylko wartości
- elementy składające się z podelementów
- elementy posiadające atrybut/atrybuty
- elementy zawierające zarówno atrybuty, jak i prostą zawartość (np. tekst, liczba, data, itp.)

### Struktura dokumentu musi zawierać dwie grupy informacji umożliwiające odwołanie się jednej informacji do drugiej (połączenie informacji)
- przykład: jeden zbiór informacji zawiera dane o książkach, drugi o autorach tych książek – w zbiorze informacji o książce mamy połączenie poprzez atrybut, który autor napisał daną książkę (nie wpisujemy wprost autora książki, robimy do niego odwołanie)

### Struktura dokumentu musi zawierać różne typy danych, m.in.:
- napisy o różnym znaczeniu i różnej długości (w tym takie, dla których da się określić wzór/test, np. kod pocztowy XX-XXX)
- liczby w różnych formatach
- date (daty), kwoty pieniężne
- elementy o określonym zbiorze wartości (typy wyliczeniowe)

- **Umieść oprócz danych o usystematyzowanej strukturze informacje dodatkowe** – takiej jak np. dane o autorze dokumentu, dacie ostatniej modyfikacji, itp.
- **Powinno być około 20 pozycji danych (może być więcej 😉)** – dane powinny być ponumerowane (numeracja w elemencie, format dowolny – nie musi to być 1, 2, 3,…)

---

## 2. Dokument DTD opisujący strukturę dokumentu XML

Dokument **DTD** dla pliku XML należy określać:

- kolejność występowania elementów dokumentu;
- występowanie elementów opcjonalnych i wymaganych;
- liczność powtarzania elementów (zero, raz, wiele razy);
- sposób definiowania atrybutu / wielu atrybutów dla jednego elementu;
- informacje powtarzające się w elemencie (np. producent towaru) w oddzielnej sekcji i odnoszenie się do nich z wykorzystaniem atrybutów typu ID i IDREF

---

## 3. Stwórz kaskadowy arkusz stylów **CSS**

Ma on być odczytywalny w przeglądarce – formatowanie treści dokumentu XML w postaci dwóch sekcji (z użyciem tabel, obramowań, itp.):

1. W pierwszej sekcji powinny znaleźć się informacje dodatkowe z dokumentu, dotyczące wybranych znaczników (jak np. autorzy dokumentu, opis jego zawartości, itp.);
2. W drugiej sekcji (z układem kolumnowym lub innym) powinna znaleźć się właściwa zawartość z pozostałych znaczników, zawierających regularne dane.

---

## Przy budowie dokumentu CSS:
- połącz dokument XML z danymi z dokumentem opisującym sposób ich formatowania (zewnętrzny plik CSS);
- wykorzystaj różne układy formatowania (styl: `display`);
- wykorzystaj różne selektory i pseudo-klasy;
- wykorzystaj tła, marginesy, obramowania;
- wypróbuj różne modyfikacje dla tabel, punktorów w listach, itp.;
- dodaj znaczniki kodu, cytatów, definicji;
- np. dodaj „drukowaną” sekcję stylów, sposób jej działania sprawdź na okna druku.
