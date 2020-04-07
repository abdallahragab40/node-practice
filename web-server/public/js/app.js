console.log("Working");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const msg1 = document.getElementById("message-1");
const msg2 = document.getElementById("message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = search.value;

  msg1.textContent = "Loading...";
  msg2.textContent = "";
  fetch("/weather?address=" + address)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        msg1.textContent = data.location;
        msg2.textContent = data.forecast;
      }
    });
  search.value = "";
});
