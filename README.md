# ec2-dashboard

## Running locally

### Start Backend server

```
cd src/server
npm install
node api.js
```

### Start Application UI

```
npm install
ng serve
```

### Run Backend tests ###

The backend tests use Jest - this is my favourite framework and the one I've most recently used

```
cd src/server
npm test
```

### Run UI Tests ###

The frontend tests use Jasmine/Karma, because this is what you get out of the box using the Angular CLI to create an app

```
ng test
```