

(async () => {
    const URL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_HlGLOTJLsEQ224qlTh0BzL9j12FVBoAEP5HUxQIu"
    const from = document.querySelector("#from");
    const to = document.querySelector("#to")
    const btn = document.querySelector("form button")
    const fromcurr = document.querySelector("#from")
    const tocurr = document.querySelector("#to")
    const errmsg = document.querySelector("#errmsg")
    const msg = document.querySelector("#msg")
    const optTo = document.querySelector("#toOpt")

    
    const data = await fetch(URL);
    const cur = await data.json()
    var regex = /^-?\d+(\.\d{1,2})?$/;

    if (!data) {
        console.log("loading")
    }


    const obj = Object.keys(cur.data)




    obj.forEach((val) => {
        const option = document.createElement("option");
        option.id = "fromOpt"
        if (val === "USD") {
            option.defaultSelected = "USD"
        }
        option.text = val
        option.value = val
        from.appendChild(option);

    })


    obj.forEach((val) => {
        const option = document.createElement("option");
        option.id = "toOpt"
        if (val === "INR") {
            option.defaultSelected = "INR"
        }
        option.text = val
        option.value = val
        to.appendChild(option)
    })


    btn.addEventListener("click", (evt) => {
        evt.preventDefault()
        const amount = document.querySelector("#amt").value

        if (!amount.match(regex)) {
            errmsg.innerHTML = "Enter a valid amount"
        }else{
            errmsg.innerHTML = ""
        }


        const fromexc = cur.data[fromcurr.value];
        const toexc = cur.data[tocurr.value];

        const convert = (amount / fromexc)* toexc;
        console.log(convert)

        

        msg.innerHTML = convert.toFixed(3) + " "+ tocurr.value

    
    })

 
})()



const darkMode = document.getElementById("toggle-dark-mode")
const optCh = async (val) => {
    const fromOpt = val.value.slice(0, 2);
    const url = `https://flagcdn.com/48x36/${fromOpt.toLowerCase()}.png`;

    document.getElementById('fromImg').src = url;
};

document.getElementById('from').onchange = (event) => optCh(event.target);

const optTo = async (val) => {
    const fromOpt = val.value.slice(0, 2);
    const url = `https://flagcdn.com/48x36/${fromOpt.toLowerCase()}.png`;

    document.getElementById('toImg').src = url;
};
document.getElementById('to').onchange = (event) => optTo(event.target);

darkMode.addEventListener("change", (evt)=>{
    if(evt.target.checked == true){
        localStorage.setItem("dark", "true");
        localStorage.setItem("light", "false");
    
        console.log("true")
        evt.target.checked == false
    }else{
        localStorage.setItem("light", "true");
        localStorage.setItem("dark", "false");
    console.log("false")
    }
    

    
    
    darkModeState()
    

})
const darkModeState = () => {
    localStorage.getItem("dark") == "true"?document.body.style.backgroundColor = "#333" : document.body.style.backgroundColor = "#f0f2f5"
    localStorage.getItem("light") == "true"?document.body.style.backgroundColor = "#f0f2f5" : document.body.style.backgroundColor = "#333"
    if (localStorage.getItem("dark") == "true") {
        darkMode.checked = true
    }else{

        darkMode.checked = false

    }
}

darkModeState()

