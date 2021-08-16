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
  const errorMsg = document.getElementById("error");

  // GET request function
  const getData = async (url) => {
    // fetch the response
    const res = await axios.get(url);
    return res.data;
  };

  // POST request function
  const addData = async (url, data) => {
    // fetch the response
    const res = await axios.post(url, data);

    //log the returned message from the server that confirms the addition of the data
    console.log("Response from server: " + res.data.msg);
    return res.data.data;
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
        // send the retrieved data to the server
        .then((data) => {
          addData("/add", data);
        })
        // if data posted successfully update the UI
        // get the last entry from our server
        .then(() => getData("/data"))
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

          // focus on the input field
          zip.focus();

          // add click event listener again after finishing
          generate.addEventListener("click", clicked);
        })
        // in case of an error;
        .catch((err) => {
          if (err.response) {
            // response with a not ok status
            console.log(
              `Error!\nRequest error code: ${err.response.status}\nRequest error message: ${err.response.statusText}`
            );
            errorMsg.innerText = `Error!\nRequest error code: ${err.response.status}\nRequest error message: ${err.response.statusText}`;
          } else if (err.request) {
            // no response from the server
            console.log(err.request);
            errorMsg.innerText = err.request;
          } else {
            // another error
            console.log(err.message);
            errorMsg.innerText = err.message;
          }

          // show error message
          errorMsg.style.display = "block";
          // add click event listner on the document to hide the error on click
          const removeError = () => {
            errorMsg.style.display = "none";
            document.removeEventListener("click", removeError);
          };
          document.addEventListener("click", removeError);

          // add click event listener again in case an error happens before adding it
          generate.addEventListener("click", clicked);

          // focus on the input field
          zip.focus();
        });
    }
  };

  // button event listeners
  generate.addEventListener("click", preventDefault);
  generate.addEventListener("click", clicked);
});
