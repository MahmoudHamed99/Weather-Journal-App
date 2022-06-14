// Get Date
let dateNow = new Date();
let theDate = dateNow.toLocaleDateString("en-US");

// My Api Key
const API_KEY = "ce7dcff14247c198d10f48240dd77c92&units=metric";

let getBtn = document.getElementById("generate");
getBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        let zipCode = document.getElementById("zip").value,
            feel = document.getElementById("feel").value;

        if (zipCode === "" && feel === "") {
            let errMes = document.querySelectorAll(".err");
            errMes.forEach(el => {
                el.classList.add("active");
                window.setTimeout(() => {
                    el.classList.remove("active");
                }, 2000)
            })
            document.getElementById("date").innerHTML = "";
            document.getElementById("temp").innerHTML = "";
            document.getElementById("feelings").innerHTML = "";
        } else if (zipCode === "") {
            document.getElementById("err1").classList.add("active");
            window.setTimeout(() => {
                document.getElementById("err1").classList.remove("active");
            }, 2000)
        } else {
            // Get The Data From API
            const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${API_KEY}`,
                response = await fetch(url),
                resData = await response.json(),
                tempCelsius = await resData.main.temp;
            document.getElementById("date").innerHTML = theDate;
            document.getElementById("temp").innerHTML = Math.round(tempCelsius);
            document.getElementById("feelings").innerHTML = feel;
        }
    }
    catch(err) {
        document.getElementById("date").innerHTML = "City Not Found";
    }
    document.getElementById("zip").value = "",
    document.getElementById("feel").value = "";
});