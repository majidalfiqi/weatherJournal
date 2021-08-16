// wait for the content to load
addEventListener("DOMContentLoaded", () => {
  // elements selectors
  const entryHolder = document.getElementById("entryHolder");
  const template = document.getElementById("template");
  const errorMsg = document.getElementById("error");

  // GET request function
  const getData = async (url) => {
    // fetch the response
    const res = await axios.get(url);
    return res.data;
  };

  //get the data from our server
  getData("/all")
    //if data retrieve successfully process the data
    .then((data) => {
      // create afragment to hold the entries to avoid redrawing in each iteration
      const frag = document.createDocumentFragment();
      data.forEach((entry) => {
        // make a copy of the HTML entry template
        const node = template.content.cloneNode(true);

        // select the elements to be populated with the data
        const date = node.querySelector(".date");
        const temp = node.querySelector(".temp");
        const content = node.querySelector(".content");

        // set the elements' innerHTML to their corresponding values
        date.innerHTML = entry.date;
        temp.innerHTML = entry.temp + "°C";
        content.innerHTML = entry.content;

        // append each entry to the fragment
        frag.appendChild(node);
      });

      // append the fragment to the entry holder
      entryHolder.appendChild(frag);
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
    });
});
