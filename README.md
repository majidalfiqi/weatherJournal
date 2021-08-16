# Weather Journal <!-- omit in toc -->

This project consists of a server side code and a client side code for a website that is gets weather data from [OpenWeatherMap](OpenWeatherMap.org) and gets how the user is feeling today and posts the data to the server. The project was done as part of a [Udacity](Udacity.com) nanodegree under the [Egypt FWD Initiative](egfwd.com).

## Table of Content

- [Table of Content](#table-of-content)
- [Installation](#installation)
- [Usage](#usage)
- [Branches](#branches)
- [License](#license)

## Installation

To install this project, you need to have nodejs and npm installed the do the following:

```shell
git clone https://github.com/majidalfiqi/weatherJournal.git
cd weatherJournal
npm install
```

## Usage

In order to use this project, you will need to go to [OpenWeatherMap](OpenWeatherMap.org), register and get an api key. then open `./website/app.js` and place your api key in the following variable replacing `<YOUR_API_KEY>` with your api key:

```javascript
const API_KEY = "&appid=<YOUR_API_KEY>&units=metric";
```

## Branches

This repository contains two branches:

- A branch named `main` which uses the FetchAPI for the HTTP requests.
- A branch named `axios` which uses the axios module for the HTTP requests.

## License

This project is under the [MIT](https://choosealicense.com/licenses/mit/) license.
