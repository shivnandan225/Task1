document.getElementById("predictionForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const result = document.getElementById("result");

    result.innerHTML = "Predicting...";

    const data = {
        symboling: parseFloat(document.getElementById("symboling").value),
        wheelbase: parseFloat(document.getElementById("wheelbase").value),
        carlength: parseFloat(document.getElementById("carlength").value),
        carwidth: parseFloat(document.getElementById("carwidth").value),
        enginesize: parseFloat(document.getElementById("enginesize").value),
        boreratio: parseFloat(document.getElementById("boreratio").value),
        horsepower: parseFloat(document.getElementById("horsepower").value),
        peakrpm: parseFloat(document.getElementById("peakrpm").value),
        citympg: parseFloat(document.getElementById("citympg").value),
        highwaympg: parseFloat(document.getElementById("highwaympg").value)
    };

    try {

        const response = await fetch("/predict", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        });

        const resultData = await response.json();

        result.innerHTML =
            `🚗 Predicted Car Price: ₹${resultData.predicted_price}`;

    } catch (error) {

        result.innerHTML =
            "❌ Something went wrong. Please try again.";

        console.error(error);
    }

});