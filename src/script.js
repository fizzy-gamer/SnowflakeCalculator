import {RPValues} from "./RPValues.js";

//Setup buttons
let ItemButtons = document.getElementById("ItemButtons");
for (let [ItemName, RPValue] of Object.entries(RPValues)) {
    let Button = document.createElement("button")
    Button.innerHTML = ItemName+": "+RPValue+"RP"
    Button.className = "DeselectedItemButton"
    Button.id = RPValue
    Button.value = ItemName
    Button.onclick = function(){ItemClicked(Button)};
    ItemButtons.appendChild(Button)
};

document.getElementById("DeselectAllButton").onclick = function() {DeselectAll()};
document.getElementById("SelectAllButton").onclick = function() {SelectAll()};

//Sort
var Items = ItemButtons.children;
Array.from(Items).sort((a, b) => parseFloat(b.id) - parseFloat(a.id)).forEach(Item => {
    ItemButtons.appendChild(Item);
});   

//Mathz
let Selected = [];
let LaunchesPerHour = (60*60)/100
let AmountSelectedText = document.getElementById("AmountSelected");
let AverageRPText = document.getElementById("AverageRP");
let SnowflakesPerLaunchText = document.getElementById("SnowflakesPerLaunch");
let SnowflakesPerHourText = document.getElementById("SnowflakesPerHour");

function Update(){
    AmountSelectedText.innerText = Selected.length+" Selected";
    let TotalRP = 0;
    Selected.forEach(function(Item){
        if (RPValues[Item.value]){
            TotalRP += RPValues[Item.value];
        };
    });
    let AverageRP = TotalRP/Selected.length;
    AverageRPText.innerText = "Average RP Value: "+AverageRP+" RP";
    let SnowflakesPerLaunch = ((AverageRP*Math.sqrt(Selected.length))*2)+1;
    SnowflakesPerLaunchText.innerText = "Snowflakes Per Launch: ❄️"+SnowflakesPerLaunch;
    SnowflakesPerHourText.innerText = "Snowflakes Per Hour: ❄️"+(SnowflakesPerLaunch*LaunchesPerHour);
};

//Item Clicked
function ItemClicked(Button) {
    if (Button.className == "DeselectedItemButton") {
        Button.className = "SelectedItemButton"
        Selected.push(Button)
    } else {
        Button.className = "DeselectedItemButton"
        Selected.forEach(function(Item, Index){
            if (Item == Button) {
                Selected.splice(Index, 1)
            }
        })
    };
    Update();
};

function SelectAll() {
    Selected =[];
    Array.from(Items).forEach(function(Item){
        Item.className = "SelectedItemButton"
        Selected.push(Item)
    });
    Update();
};
function DeselectAll(){
    Selected =[];
    Array.from(Items).forEach(function(Item){
        Item.className = "DeselectedItemButton"
    });
    Update();

};
