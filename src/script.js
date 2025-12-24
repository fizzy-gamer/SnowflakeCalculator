import { RPValues } from "./RPValues.js";
import { ItemIcons } from "./ItemIcons.js";

//Setup buttons
var ItemButtons = document.getElementById("ItemButtons");
for (let [ItemName, RPValue] of Object.entries(RPValues)) {
  let Button = document.createElement("button");
  Button.className = "DeselectedItemButton";
  Button.id = RPValue;
  Button.value = ItemName;
  Button.onclick = function () {
    ItemClicked(Button);
  };
  ItemButtons.appendChild(Button);

  let ButtonIcon = document.createElement("img");
  ButtonIcon.src = ItemIcons[ItemName];
  ButtonIcon.className = "ItemIcon";
  Button.appendChild(ButtonIcon);

  let ButtonText = document.createElement("p");
  ButtonText.className = "ItemText";
  ButtonText.innerHTML = ItemName + ': <span class="RPText">' + RPValue + "RP</span>";
  Button.appendChild(ButtonText);
};

document.getElementById("DeselectAllButton").onclick = function () {
  DeselectAll();
};
document.getElementById("SelectAllButton").onclick = function () {
  SelectAll();
};

//Sort
var Items = ItemButtons.children;
Array.from(Items)
  .sort((a, b) => parseFloat(b.id) - parseFloat(a.id))
  .forEach((Item) => {
    ItemButtons.appendChild(Item);
});

//Mathz
var Selected = [];
var LaunchesPerHour = (60 * 60) / 100;
var AmountSelectedText = document.getElementById("AmountSelected");
var AverageRPText = document.getElementById("AverageRP");
var SnowflakesPerLaunchText = document.getElementById("SnowflakesPerLaunch");
var SnowflakesPerHourText = document.getElementById("SnowflakesPerHour");
var RateOfItemsText = document.getElementById("RateOfItems");

function Update() {
  AmountSelectedText.innerText = Selected.length + " Selected";
  let TotalRP = 0;
  let AverageRP = 0;
  let SnowflakesPerLaunch = 0;
  let RateOfItems = 0;
  if (Selected.length > 0) {
    Selected.forEach(function (Item) {
      if (RPValues[Item.value]) {
        TotalRP += RPValues[Item.value];
      };
    });
    AverageRP = TotalRP / Selected.length;
    SnowflakesPerLaunch = AverageRP * Math.sqrt(Selected.length) * 2 + 1;
    RateOfItems = 1 / Selected.length;
  };
  AverageRPText.innerHTML = 'Average RP Value: <span class="RPText">'+(Math.round(AverageRP*10000)/10000)+ " RP</span>";
  SnowflakesPerLaunchText.innerHTML = 'Snowflakes Per Launch: ❄️<span class="LimeText">'+(Math.round(SnowflakesPerLaunch*10000)/10000)+"</span>";
  SnowflakesPerHourText.innerHTML = 'Snowflakes Per Hour: ❄️<span class="LimeText">'+(Math.round(SnowflakesPerLaunch*LaunchesPerHour*10000)/10000)+"</span>";
  RateOfItemsText.innerHTML = 'u/s of each item: <span class="OrangeText">'+(Math.round(RateOfItems*10000)/10000)+ "u/s</span>";
};
Update();

//Item Clicked
function ItemClicked(Button) {
  if (Button.className == "DeselectedItemButton") {
    console.log(Button.className);
    Button.className = "SelectedItemButton";
    Selected.push(Button);
  } else {
    Button.className = "DeselectedItemButton";
    Selected.forEach(function (Item, Index) {
      if (Item == Button) {
        Selected.splice(Index, 1);
      }
    });
  }
  Update();
};

function SelectAll() {
  Selected = [];
  Array.from(Items).forEach(function (Item) {
    Item.className = "SelectedItemButton";
    Selected.push(Item);
  });
  Update();
};
function DeselectAll() {
  Selected = [];
  Array.from(Items).forEach(function (Item) {
    Item.className = "DeselectedItemButton";
  });
  Update();
};
