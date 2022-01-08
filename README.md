## Software Details

A compiled database of every player, of every team in the NBA.

## Known Issues

So it appears that when persisting data >500 files to Couchbase, we run into a TimeoutError. To combat this, running the file twice, or even a third time will successfully create all scopes, collections, and insert each player into the DB under their respective teams.

## Installation
* Clone Repository
* Install Dependencies

```
git clone git@github.com:rakinne/nba.git
npm install
cd src
node index.js
```

## Collaborate

Sure