# Weather Journal <!-- omit in toc -->

This project consists of a server side code and a client side code for a website that is gets weather data from [OpenWeatherMap](OpenWeatherMap.org) and gets how the user is feeling today and posts the data to the server. The project was done as part of a [Udacity](Udacity.com) nanodegree under the [Egypt FWD Initiative](egfwd.com).

## Table of Content

- [Table of Content](#table-of-content)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

To install this project, you need to have nodejs and npm installed the do the following:

```shell
git clone https://github.com/majidalfiqi/weatherJournal.git
cd weatherJournal
npm install
```

## Usage

In order to use this project, you will need to go to [OpenWeatherMap](OpenWeatherMap.org), register and get an api key. then open `./website/app.js` and place your api key in the following variable:

```javascript
const API_KEY = "your_api_key";
```

## License

This project is under the [MIT](https://choosealicense.com/licenses/mit/) license.
