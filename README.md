#Alert Manager

##Projekt końcowy kursu .NET Developer – Sebastian Kowalik

##Cel projektu:
Celem projektu jest stworzenie aplikacji wspierającej proces sprzedaży w Departamencie Sprzedaży Rynków Finansowych mBanku, pozwalającej na rejestrowanie i zarządzanie „alertami” dotyczącymi kursów wymiany walut. 

##Problem:
W codziennej działalności związanej z rynkiem FOREX korporacyjni klienci banku (duże i małe przedsiębiorstwa, międzynarodowe korporacje) mają możliwość zawierania transakcji w dwóch kanałach komunikacji: elektronicznym (platforma walutowa wbudowana w system bankowości elektronicznej) oraz telefonicznym (manualnie z dedykowanym pracownikiem Departamentu Sprzedaży Rynków Finansowych – Dealerem). Zasadniczo wskazane te kanały są substytucyjne, jednak ze względu na możliwość negocjacji w kanale telefonicznym oraz ze względu na inne przesłanki (np. preferencje klienta, segment, wielkość i skomplikowanie transakcji) w praktyce mimo postępującej digitalizacji rozmowa z dedykowanym Dealerem w dalszym ciągu posiada istotny udział w operacjach klientów. 

Z punktu widzenia Dealera pozyskane podczas rozmowy z klientem ‘leady’ o jego nadchodzących wpływach lub płatnościach walutowych albo planowanych transakcjach są istotnym czynnikiem pozwalającym na generowanie wyniku na transakcjach cross-sell’owych. 

W praktyce – w zależności od obsługiwanego segmentu klienta pojedynczy Dealer może mieć w swoim portfelu od 80 – 120 (segment strategiczny) do nawet kilku tysięcy klientów (segment mikro i e-Desk – skoncentrowanym na utrzymaniu i aktywizacji klientów w kanałach zdalnych). Ze względu na ograniczone możliwości zapamiętywania wszystkich istotnych z punktu widzenia transakcji detali (np. oczekiwany przez klienta kurs wymiany, para walutowa, kierunek) zasadnym wydaje się wsparcie Dealera w procesie sprzedaży aplikacją, która pozwalałaby na przechowywanie informacji o pozyskanych ‘leadach’: ich dodawanie po pozyskaniu od klienta stosownej wiedzy i usuwaniu w sytuacji osiągnięcia przez rynek pożądanego przez klienta poziomu kursu i realizacji transakcji wymiany walut lub w przypadku jego rezygnacji z pierwotnych planów.

Zasadniczo aplikacja ma wspierać i odciążać człowieka (uwalniając jego pamięć, lub zastępując manualne sposoby rejestracji ‘leadów’) a przy tym być interaktywna - pozwalając na zarządzanie alertami i filtrować je w przejrzysty sposób (w warstwie wyświetlania). Osiągnięty poziom alertu ma promptować użytkownika do wykonania akcji - np. zadzwonienia do klienta z ofertą - skoro rynek jest blisko pożądanych przez niego poziomów. To z kolei ma przełożyć się na większą transakcyjność i budowanie wizerunku organizacji skoncentrowanej na potrzebach swoich klientów.

##Wyzwania:
Aplikacja Alert Manger ma w przejrzysty sposób – w postaci aplikacji Web’owej zbudowanej w oparciu o technologię React prezentować użytkownikowi zestawienie wprowadzonych przez niego alertów dla par walutowych: EUR/PLN oraz USD/PLN na obsługiwanym portfelu klientów (dostęp tylko do klientów, dla których dany użytkownik jest dedykowanym Dealerem), pozwalać na zarządzanie nimi i – w oparciu o dane o aktualnych kursach walutowych na rynku (pozyskane z API Narodowego Banku Polskiego) sugerować użytkownikowi, z którym klientem powinien się skontaktować ze względu na bliskość kursu i potencjał na zawarcie transakcji. Dane do prezentacji użytkownikowi aplikacja ma pobierać z aplikacji REST API połączonej z bazą danych.


##Architektura
Warstwy aplikacji
Baza danych SQL:
Tabele: użytkowników, klientów, alertów.

###Warstwa logiki biznesowej:
Modele anemiczne: User, Client, Alert, ClientAlert, LoginModel.

###Warstwa dostępu do danych:
Kontekst Dapper wykorzystujący bazę danych, repozytoria.

###Projekt .NET Web API:
Middleware do testowania (Swagger), uwierzytelnianie użytkowników, kontrolery.

###Warstwa prezentacji:
Front-end w technologii React.

###Back-end:
.NET Framework - C#.

##Instalacja
Wymagania wstępne
.NET Core SDK (w wersji 3.1 lub wyższej)
Node.js (w wersji 14 lub wyższej)
SQL Server lub inna baza danych SQL

##Użycie
Interfejs użytkownika
Dodawanie alertów:

Wprowadź dane dotyczące klienta, pary walutowej, kierunku transakcji, kwoty w walucie bazowej oraz kursu.
Kliknij "Dodaj alert".
Zarządzanie alertami:

Wyświetl wszystkie alerty w widoku listy.
Edytuj lub usuń alerty za pomocą odpowiednich przycisków.
Filtracja alertów:

###Filtrowanie alertów według par walutowych, klientów oraz innych kryteriów.
API
GET /api/alert - Pobierz wszystkie alerty
GET /api/alert/{id} - Pobierz alert według ID
POST /api/alert - Dodaj nowy alert
PUT /api/alert/{id} - Zaktualizuj alert
DELETE /api/alert/{id} - Usuń alert

##Dokumentacja
Swagger UI: http://localhost:7249/swagger - Dokumentacja API

##Przyszłe rozszerzenia:
Pierwsza faza projektu zakłada skupienie się na "prostych" transakcjach przewalutowania (rynek wymiany walutowej), ale można go rozwijać dalej w kierunku bardziej skomplikowanych instrumentów  i innych rynków (np. obligacji, metali szlachetnych, handel uprawnieniami do emisji CO2 itp.) co pozwoli na lepsze dopasowanie do zmieniających się warunków rynkowych i docelowo większe pokrycie rynku.

##Autor
Sebastian Kowalik – Projekt końcowy kursu .NET Developer

##Licencja
Projekt jest dostępny na licencji MIT. Zobacz plik LICENSE w celu uzyskania szczegółowych informacji.
