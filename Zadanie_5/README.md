
# Zadanie: Transformacja z użyciem XSLT

Dla Twojego dokumentu XML stwórz **cztery** szablony przekształceń XSLT.

- **Pierwsze przekształcenie** będzie miało na celu stworzenie **pomocniczego dokumentu** w formacie XML, będącego raportem uzyskanym na podstawie dokumentu źródłowego – **format wyjściowy: XML**.
- **Drugie przekształcenie** będzie miało na celu uzyskanie z dokumentu pomocniczego dokumentu do prezentacji **w formacie XHTML**, przy zastosowaniu dodatkowych wymogów podnoszących funkcjonalność dokumentu – **format wyjściowy: plik HTML**.
- **Trzecie przekształcenie** będzie miało na celu uzyskanie z dokumentu pomocniczego dokumentu **w formacie tekstowym** – **format wyjściowy: plik TXT**.
- **Czwarte przekształcenie** będzie miało na celu uzyskanie z dokumentu pomocniczego dokumentu (wykresu) **w formacie SVG** jako inny sposób prezentacji danych – **format wyjściowy: plik SVG**.

---

## 📄 Dokument pomocniczy

Dokument ma być **raportem**, zestawieniem, podsumowaniem lub wybraniem dla klienta. Powinien zawierać znaczniki XML potrzebne do łatwego uzyskania dokumentu wyjściowego przeznaczonego do prezentacji.

**To jest dobry moment, żeby połączyć się za pomocą elementów powiązanych atrybutami ID i IDREF(S) / key i keyref.**

---

## 📊 Dokument XHTML

Elementami, na które trzeba będzie zwracać szczególną uwagę, to walidacja dokumentu jako **XHTML 1.0 Strict**, np. w:

👉 [Usłudze walidacji W3C](https://validator.w3.org/)

![Walidator W3C](2282dd47-33e9-4975-bc6f-9f62d20935fa.png)

---

## 📃 Dokument tekstowy

Stwórz **regularne kolumny tekstu** z użyciem dodatkowych spacji – użyj funkcji XPath `concat` i `substring`.

Przykład formatu tekstowego:

```
+------------+-------------+------------------+
| Nazwa      | Ocena       | Populacja        |
+------------+-------------+------------------+
| Buzek      | 1           | 34 tysięcy       |
| C4         | 1           | 34 tysięcy       |
| Mirosław   | 7           | 134.5 tysięcy    |
| C5         | 7           | 134.5 tysięcy    |
| CC         | 4           | 566 tysięcy      |
| Picasso    | 6           | 234.1 tysięcy    |
| Xsara      | 7           | 2344 tysięcy     |
+------------+-------------+------------------+
```

---

## 📈 Dokument SVG

Stwórz transformację pomocniczego dokumentu XML do postaci obrazu **SVG (Scalable Vector Graphics)**. Ma on stanowić inną formę prezentacji danych z raportu w postaci **wykresów**. Dołącz transformację wybranych elementów lub parametrów dokumentu XML, aby powstały proste animacje.

Postaraj się uzyskać plik w wyjściowym formacie, a nie tylko oglądać efekt końcowy transformacji w oknie przeglądarki.
