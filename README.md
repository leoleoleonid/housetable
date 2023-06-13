to run this app in development:
```bash
docker-compose --env-file=./packages/backendExpress/.env  up --build
```

or you can run it locally (you must have postgres DB running on your machine )

adjust .env files.

run this:
```
cd packages/backendExpress/ && npm i && cd ../frontend/ && npm i
```

start backend (from packages/backendExpress):
```
npm run dev
```
start fromtend (from packages/frontend):
```
npm run dev
```

to build production backend run this:

```
cd packages/backendExpress/ && npm run build
```

to start production backend run this:

```
cd packages/backendExpress/ && node ./build/index.js
```


to build production frontend you need backend and database to be running locally because o static pages generation optimization.
then you can use this commands:

```
cd packages/frontend/ && npm run build
```

and 

```
cd packages/frontend/ && npm run start
```
