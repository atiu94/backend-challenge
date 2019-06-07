## Project Description:

API Scraper for Twitter Profiles

## Prerequisistes

- Node v8.9.4 above

## Installation and development:

- `npm install`
- `npm start`

## Running behind a proxy

If you are in a network behind a proxy, please use the `NODE_PROXY` environment variable to include it in the request parameters.

Sample:
``` terminal
    NODE_PROXY='<proxy here>' npm start
```

## To Do's:

- [x] Configurable Variables
- [x] Standardized Response Format
- [] Refactor/Refine Cron Code Design
- [] Live Reload
- [] Node Inspector

### Heroku additional configuration variables:
To adjust these variables, use the following command:

`heroku config:set --app <app_name> <variable>="<value>"`

Environment variables may be set in the heroku config but their defaults have been set in the application code (environment-agnostic)

| Variable           | Default Value| Description |
|--------------------|--------------|-------------|
|PORT                |3000          |             |
|TIMEOUT             |30000         |             |
|SCHEDULE            |'* */2 * * * *'|            |
|DELAY               |0             |             |
|DURATION            |1200000       |             |