function createTag(element, elementClass="", elementID=""){
    var tag = document.createElement(element);
    tag.setAttribute("class",elementClass);
    tag.setAttribute("id",elementID);
    return tag;
}

var h1 = createTag("h1");
h1.setAttribute("style","text-align:center;")
h1.innerHTML = "<br>List of all countries <br> <br>";
var container = createTag("div","container");
var row = createTag("div","row");

// Fetching the Rest API data
fetch("https://restcountries.eu/rest/v2/all")
.then((response1) =>{
    return response1.json();
})
.then((data) =>{
    console.log(data);
    restAPI(data);
})
.catch((error) =>{
    console.log(error);
});

function restAPI(data){
    console.log(data[0]);
        function weather(){
        var city = this.id;
        // Fetch the weather data
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ea4267f3a9d81e9f16a3375bb247c149`)
        .then((res) => {
            //console.log(res);
            return res.json();
        })
        .then((item) =>{
            console.log(item);
            alert("Weather in "+item.name+" is: "+Math.round(((item.main.temp)-273.15))+" degree Celcius");
        })
        .catch((er)=>{
            console.log(er);
        });
    }

    for(var i=0;i<data.length;i++){
        var capital="";
        var col = createTag("div","col-lg-4 col-sm-12");
        var carddeck = createTag("div","card-deck");
        var card = createTag("div","card");
        var cardhead = createTag("div","card-header text-center");
        cardhead.setAttribute("style","font-size:20px;font-weight:bold;");
        cardhead.innerText = data[i].name;
        var img = createTag("img","card-img-top");
        img.setAttribute("src",data[i].flag);
        img.setAttribute("height","200px");
        var cardbody = createTag("div","card-body");
        var ul = createTag("ul","list-group list-group-flush");
        var li1 = createTag("li","list-group-item");
        li1.setAttribute("style","font-size:20px");
        if(data[i].capital == ""){
            capital=data[i].name;
        }
        else
        capital = data[i].capital;
        li1.innerHTML = `<b> Capital:</b> ${capital}`;
        var li2 = createTag("li","list-group-item");
        li2.setAttribute("style","font-size:20px");
        li2.innerHTML = `<b> Region:</b> ${data[i].region}`;
        var li3 = createTag("li","list-group-item");
        li3.setAttribute("style","font-size:20px");
        li3.innerHTML = `<b>Latitude and Longitude values:</b> ${data[i].latlng[0]} ,${data[i].latlng[1]}`;
        var li4 = createTag("li","list-group-item");
        li4.setAttribute("style","font-size:20px");
        li4.innerHTML = `<b> Country Code:</b> ${data[i].alpha3Code} <br> <br>`;

        ul.append(li1,li2,li3,li4);
        var button = createTag("button","btn btn-primary",capital);
        button.setAttribute("style","margin-left:auto;margin-right:auto;");
        button.addEventListener("click", weather);
        button.innerText = "Click for weather";
        cardbody.append(ul,button)
        card.append(cardhead,img,cardbody);
        carddeck.append(card);
        col.append(carddeck);
        row.append(col);

    }

}
container.append(row);
document.body.append(h1,container);
