const form = document.getElementById("predictionForm");

const result = document.getElementById("result");

const predictionValue =
    document.getElementById("predictionValue");

const loading =
    document.getElementById("loading");

const errorBox =
    document.getElementById("error");

const predictButton =
    document.getElementById("predictButton");


form.addEventListener("submit", async function(event) {

    // Stop normal HTML form submission
    event.preventDefault();

    // Hide previous messages
    result.style.display = "none";
    errorBox.style.display = "none";

    // Show loading
    loading.style.display = "block";

    predictButton.disabled = true;
    predictButton.innerText = "Predicting...";


    try {

        // Collect values from form
        const data = {

            symboling:
                parseFloat(
                    document.getElementById("symboling").value
                ),

            wheelbase:
                parseFloat(
                    document.getElementById("wheelbase").value
                ),

            carlength:
                parseFloat(
                    document.getElementById("carlength").value
                ),

            carwidth:
                parseFloat(
                    document.getElementById("carwidth").value
                ),

            carheight:
                parseFloat(
                    document.getElementById("carheight").value
                ),

            curbweight:
                parseFloat(
                    document.getElementById("curbweight").value
                ),

            enginesize:
                parseFloat(
                    document.getElementById("enginesize").value
                ),

            boreratio:
                parseFloat(
                    document.getElementById("boreratio").value
                ),

            horsepower:
                parseFloat(
                    document.getElementById("horsepower").value
                ),

            peakrpm:
                parseFloat(
                    document.getElementById("peakrpm").value
                ),

            citympg:
                parseFloat(
                    document.getElementById("citympg").value
                ),

            highwaympg:
                parseFloat(
                    document.getElementById("highwaympg").value
                )
        };


        // Send data to FastAPI
        const response = await fetch("/predict", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        });


        // Check API response
        if (!response.ok) {

            throw new Error(
                "Prediction request failed"
            );
        }


        // Convert response to JSON
        const resultData =
            await response.json();


        // Display prediction
        predictionValue.innerText =
            "₹ " +
            resultData.prediction.toLocaleString(
                "en-IN",
                {
                    maximumFractionDigits: 2
                }
            );


        result.style.display = "block";


    } catch (error) {

        console.error(error);

        errorBox.innerText =
            "Something went wrong. Please check your input and try again.";

        errorBox.style.display = "block";

    } finally {

        // Hide loading
        loading.style.display = "none";

        // Enable button
        predictButton.disabled = false;

        predictButton.innerText =
            "Predict Car Price";
    }

});