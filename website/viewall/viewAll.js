// wait for the content to load
addEventListener("DOMContentLoaded", () => {
  // elements selectors
  const entryHolder = document.getElementById("entryHolder");
  const template = document.getElementById("template");

  // GET request function
  const getData = async (url) => {
    // fetch the response
    const res = await fetch(url);

    // if the status is 'ok' parse as json
    if (res.ok) return await res.json();
    // if status is not 'ok' throw an error to be caught by the catch statement
    else throw await res.json();
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
      if (err.cod) {
        // response with a not ok status
        console.log(`Error!\nRequest error code: ${err.cod}\nRequest error message: ${err.message}`);
        errorMsg.innerText = `Error!\nRequest error code: ${err.cod}\nRequest error message: ${err.message}`;
      } else {
        // another error
        console.log(err);
        errorMsg.innerText = err;
      }

      // show error message
      errorMsg.style.display = "block";
    });
});
