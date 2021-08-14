// wait for the content to load
addEventListener("DOMContentLoaded", () => {
  // openWeatherMap API key
  const API_KEY = "db047bc0b0cb7e9da7f9c3e58ad11256";

  // selecting elements
  const zip = document.getElementById("zip");
  const feelings = document.getElementById("feelings");
  const generate = document.getElementById("generate");
  const date = document.getElementById("date");
  const temp = document.getElementById("temp");
  const content = document.getElementById("content");

  // GET request function
  const getData = async (url) => {
    // fetch the response
    const res = await fetch(url);

    // if the status is 'ok' parse as json
    if (res.ok) return await res.json();
    // if status is not 'ok' throw an error to be caught by the catch statement
    else throw `Error!\nRequest error code: ${res.status}\nRequest error message: ${res.statusText}`;
  };

  // POST request function
  const addData = async (url, data) => {
    // fetch the response
    const res = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // if the status is 'ok' log the returned message from the server that confirms the addition of the data
    if (res.ok) {
      const parsed = await res.json();
      console.log("Response from server: " + parsed.msg);
      return parsed.data;
    }
    // if status is not 'ok' throw an error to be caught by the catch statement
    else throw `Error!\nRequest error code: ${res.status}\nRequest error message: ${res.statusText}`;
  };

  // kelvin to celsius
  const kToC = (f) => f - 273.15;

  // button click event handler
  const clicked = (e) => {
    // prevent the dafault submit action of refreshing the page
    e.preventDefault();

    // set the dynamic url using the API Key
    let base = "http://api.openweathermap.org/data/2.5/weather?zip=";

    // get the weather data from openWeatherMap
    getData(base + zip.value + "&appid=" + API_KEY)
      // if data retrieve successfully process the data
      .then((data) => {
        // get the date and temperature from the received data
        const newDate = new Date(data.dt * 1000).toDateString();
        const newTemp = kToC(data.main.temp).toFixed(2);

        // get the content from the feelings field
        const newContent = feelings.value;

        // combine all the data in an object
        return {
          date: newDate,
          temp: newTemp,
          content: newContent,
        };
      })
      .then((data) => {
        // send the retrieved data to the server
        addData("/add", data)
          // if data posted successfully update the UI
          .then(() => {
            // get the last entry from our server
            getData("/data")
              // if data retrieve successfully process the data
              .then((data) => {
                console.log(data);
                // set the fields to their corresponding values from the last object of the data array
                date.innerHTML = data.date;
                temp.innerHTML = data.temp + "°C";
                content.innerHTML = data.content;

                // empty the fields
                zip.value = "";
                feelings.value = "";
              })
              // if status is not 'ok' catch the error;
              .catch((err) => console.log(err));
          })
          // if status is not 'ok' catch the error;
          .catch((err) => console.log(err));
      })
      // if status is not 'ok' catch the error;
      .catch((err) => console.log(err));
  };

  // button event listener
  generate.addEventListener("click", clicked);
});
