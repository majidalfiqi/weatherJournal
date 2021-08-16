// wait for the content to load
addEventListener("DOMContentLoaded", () => {
  // openWeatherMap API key
  const API_KEY = "&appid=db047bc0b0cb7e9da7f9c3e58ad11256&units=metric";

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

  // prevent default event handler (will not be removed while processing)
  const preventDefault = (e) => e.preventDefault();

  // button click event handler (will be removed while processing)
  const clicked = () => {
    if (!zip.value.match(/^\d{5}$/)) {
      // zip format entered is not valid
      // show message
      zip.parentElement.classList.remove("no-pseudo");
      //focus on input field
      zip.focus();
      // hide message when typing starts
      zip.addEventListener("input", () => zip.parentElement.classList.add("no-pseudo"));
    } else if (feelings.value === "") {
      // feelings is empty
      // show message
      feelings.parentElement.classList.remove("no-pseudo");
      //focus on input field
      feelings.focus();
      // hide message when typing starts
      feelings.addEventListener("input", () => feelings.parentElement.classList.add("no-pseudo"));
    } else {
      // remove click event listener to prevent requests before completion
      generate.removeEventListener("click", clicked);

      // set the dynamic url using the API Key
      const base = "http://api.openweathermap.org/data/2.5/weather?zip=";

      // get the weather data from openWeatherMap
      getData(base + zip.value + API_KEY)
        // if data retrieve successfully process the data
        .then((data) => {
          // get the date and temperature from the received data
          const newDate = new Date(data.dt * 1000).toDateString();
          const newTemp = data.main.temp;

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

                  // add click event listener again after finishing
                  generate.addEventListener("click", clicked);
                })
                // if status is not 'ok' catch the error;
                .catch((err) => console.log(err));
            })
            // if status is not 'ok' catch the error;
            .catch((err) => console.log(err));
        })
        // if status is not 'ok' catch the error;
        .catch((err) => console.log(err));
    }
  };

  // button event listeners
  generate.addEventListener("click", preventDefault);
  generate.addEventListener("click", clicked);
});
