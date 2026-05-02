# Personal Trainer App: Front End ohjelmoinnin lopputyö

Tämä on Reactilla, TypeScriptillä ja MUI-kirjastolla luotu käyttöliittymä Personal Trainer yritykselle. Sovellus käyttää valmista REST APIa, johon tallennetaan asiakas- ja harjoitustietoja.

Kurssin opettajan luoma REST API -dokumentaatio löytyy täältä:  
[https://juhahinkula.github.io/personaltrainerdocs/](https://juhahinkula.github.io/personaltrainerdocs/)


## Käytetyt teknologiat

React, TypeScript, MUI, DataGrid, Vite

## Versionhallinta

Projektissa käytetään Git-versionhallintaa, eritoten osien 1 ja 2 kohdalla. Osa 1 on kehitetty paikallisesti ennen kuin repositoriota on luotu.

## Osa 1

Ensimmäisessä vaiheessa sovellukseen on toteutettu:

Asiakaslista, harjoituslista ja navigaatio sivujen välillä.

Listasivuilla on:

- taulukkomuotoinen DataGrid-näkymä
- tietojen haku REST APIsta
- sarakkeiden järjestely ja suodatus eri kenttien perusteella

Harjoituksissa näytetään myös asiakkaan nimi.

Päivämäärät on muotoiltu selkeämpään muotoon taulukossa.

## Osa 2

Toisessa vaiheessa sovellukseen on toteutettu asiakas- ja harjoitustietojen hallintaan liittyvät CRUD-toiminnot.

Sovelluksessa voidaan:

- lisätä uusia asiakkaita ja harjoituksia
- muokata olemassa olevia tietoja
- poistaa asiakkaita ja harjoituksia
- vahvistaa poisto ennen lopullista suoritusta

Kaikki toiminnot toteutetaan REST API:n kautta, ja käyttöliittymä päivittää näkymät automaattisesti muutosten jälkeen.

## Osa 3

Kolmannessa vaiheessa sovellukseen on lisätty lisätoiminnallisuuksia tietojen käsittelyyn ja visualisointiin.

Sovelluksessa on toteutettu:

- CSV-vientitoiminto, jonka avulla asiakas- ja harjoitustietoja voidaan ladata tiedostona
- Kalenterinäkymä, jossa harjoitukset näkyvät ajankohdan mukaan eri näkymissä

## Julkaisu

Sovellus on julkaistu myös GitHub Pages -palvelussa ja sitä voi käyttää selaimessa ilman paikallista asennusta.

## Oppimispäiväkirja ja esittely

Video + oppimispäiväkirja ovat palautettu moodleen.