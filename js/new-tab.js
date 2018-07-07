var sideOverlay = document.getElementsByClassName("page-overlay")[0];
var sideContainer = document.getElementsByClassName("side-container")[0];
var loader = document.getElementsByClassName("progress-container")[0];
var data = null;
var defaultData = {
  "background-color": "#03a9f4",
  "background-image": "0",
  "background-option": "color",
  "card-background-color": "#ffffff",
  "card-background-opacity": "1",
  "card-default-icon": "images/shortcut_icon.png",
  "card-height": "140px",
  "card-opacity": "1",
  "card-width": "150px",
  "cards": {
    "0": {
      "name": "Google",
      "url": "https://www.google.com/",
      "icon": "images/google_icon.png"
    },
    "1": {
      "name": "Gmail",
      "url": "https://mail.google.com/",
      "icon": "images/gmail_icon.png"
    },
    "2": {
      "name": "Google Calendar",
      "url": "https://calendar.google.com/",
      "icon": "images/google_calendar_icon.png"
    },
    "3": {
      "name": "Google Drive",
      "url": "https://drive.google.com/",
      "icon": "images/google_drive_icon.png"
    },
    "4": {
      "name": "Google Maps",
      "url": "https://www.google.com/maps/",
      "icon": "images/maps_icon.png"
    },
    "5": {
      "name": "Google Photos",
      "url": "https://photos.google.com/",
      "icon": "images/google_photos_icon.png"
    },
    "6": {
      "name": "Play Music",
      "url": "https://play.google.com/music/",
      "icon": "images/play_music_icon.png"
    },
    "7": {
      "name": "Google Keep",
      "url": "https://keep.google.com/",
      "icon": "images/google_keep_icon.png"
    },
    "8": {
      "name": "Youtube",
      "url": "https://www.youtube.com/",
      "icon": "images/youtube_icon.png"
    },
    "9": {
      "name": "Amazon",
      "url": "https://www.amazon.com/",
      "icon": "images/amazon_icon.png"
    },
    "10": {
      "name": "Facebook",
      "url": "https://www.facebook.com/",
      "icon": "images/facebook_icon.png"
    },
    "11": {
      "name": "Twitter",
      "url": "https://twitter.com/",
      "icon": "images/twitter_icon.png"
    },
    "12": {
      "name": "Instagram",
      "url": "https://www.instagram.com/",
      "icon": "images/instagram_icon.png"
    },
    "13": {
      "name": "Reddit",
      "url": "https://www.reddit.com/",
      "icon": "images/reddit_icon.png"
    },
    "14": {
      "name": "Netflix",
      "url": "https://www.netflix.com/",
      "icon": "images/netflix_icon.png"
    }
  },
  "header-background-color": "#fafafa",
  "header-font-color": "000000",
  "show-header": true,
  "show-clock": true,
  "time": {
    "timeFormat": "12",
    "show-weekday": true,
    "show-month": true,
    "show-day": true,
    "show-year": true,
    "show-time": true,
    "show-timeofday": true
  }
};

console.log("In main, calling getData");
getData();
console.log("Finished getData, in main");

function getData() {
  console.log("Arrived in getData");
  chrome.storage.local.get(null, function(userData) {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError);
      data = defaultData;
      console.log("lastError active, data is " + data);
      console.log("In getData, calling setData");
      setData();
      console.log("Finished setData, in getData");
      return;
    }
    if (Object.keys(userData).length === 0) {
      data = defaultData;
    } else {
      data = userData;
    }
    console.log("In getData, data is " + data);
    console.log("In getData, calling validateData");
    validateData();
    console.log("Finished validateData, in getData");
    console.log("In getData, calling hasBackground");
    hasBackground();
    console.log("Finished hasBackground, in getData");
    console.log("In getData, calling hasHeader");
    hasHeader();
    console.log("Finished hasHeader, in getData");
    console.log("In getData, calling initCards");
    initCards();
    console.log("Finished initCards, in getData");
  });
  console.log("End of getData");
}

function setData() {
  console.log("Arrived in setData");
  chrome.storage.local.set(data, function() {
    if (chrome.runtime.lastError) {
      console.log("lastError active, error is as follows:");
      console.log(chrome.runtime.lastError);
    }
  });
  console.log("End of setData");
}

// function removeData(removedData) {
//   console.log("Arrived in removeData");
//   chrome.storage.local.remove(removedData, function() {
//     if (chrome.runtime.lastError) {
//       console.log("lastError active, error is as follows:");
//       console.log(chrome.runtime.lastError);
//     }
//   });
//   console.log("End of removeData");
// }

function validateData() {
  console.log("Arrived in validateData");
  if (data["card-opacity"] === undefined) {
    data["card-opacity"] = "1";
    console.log("card-opacity was undefined, value is now " + data["card-opacity"]);
  }

  if (data["card-background-opacity"] === undefined) {
    data["card-background-opacity"] = "1";
    console.log("card-background-opacity was undefined, value is now " + data["card-background-opacity"]);
  }

  if (data["card-background-color"] === undefined) {
    data["card-background-color"] = "#ffffff";
    console.log("card-background-color was undefined, value is now " + data["card-background-color"]);
  }

  if (data["card-font-color"] === undefined) {
    data["card-font-color"] = "#000000";
    console.log("card-font-color was undefined, value is now " + data["card-font-color"]);
  }

  if (data["card-default-icon"] === undefined) {
    data["card-default-icon"] = "images/shortcut_icon.png";
    console.log("card-default-icon was undefined, value is now " + data["card-default-icon"]);
  }

  if (data["header-background-color"] === undefined) {
    data["header-background-color"] = "#fafafa";
    console.log("header-background-color was undefined, value is now " + data["header-background-color"]);
  }

  if (data["header-font-color"] === undefined) {
    data["header-font-color"] = "#000000";
    console.log("header-font-color was undefined, value is now " + data["header-font-color"]);
  }

  if (data["card-height"] === undefined) {
    data["card-height"] = "140px";
    console.log("card-height was undefined, value is now " + data["card-height"]);
  }

  if (data["card-width"] === undefined) {
    data["card-width"] = "150px";
    console.log("card-width was undefined, value is now " + data["card-width"]);
  }

  console.log("In validateData, calling setData");
  setData();
  console.log("Finished setData, in validateData");
  console.log("End of validateData");
}

function hasBackground() {
  console.log("Arrived in hasBackground");
  var body = document.getElementsByTagName("body")[0];
  var bodyImage = document.getElementsByClassName("body-image")[0];

  if (data["background-option"] === "color") {
    console.log("data[\"background-option\"] is set to color:" + data["background-color"]);
    body.style.backgroundColor = data["background-color"];
    console.log("color is " + body.style.backgroundColor);
  } else {
    console.log("data[\"background-option\"] is not set to color, presumably image?");
    bodyImage.src = data["background-image"];
    bodyImage.style.display = "block";
  }
  console.log("End of hasBackground");
}

function hasHeader() {
  console.log("Arrived in hasHeader");
  var header = document.getElementsByClassName("header")[0];
  var floatSettings = document.getElementsByClassName("float-header")[0];
  if (data["show-header"]) {
    console.log("data[\"show-header\"] is active");
    var dateHeader = document.getElementsByClassName("header-date")[0];
    var timeHeader = document.getElementsByClassName("header-time")[0];
    var headerInfo = document.getElementsByClassName("header-info-overlay")[0];
    header.style.display = "block";
    header.style.backgroundColor = data["header-background-color"];
    header.style.color = data["header-font-color"];
    loader.style.top = "40px";
    headerInfo.addEventListener("click", initLightBox);
    console.log("In hasHeader with show-header active, calling hasClock");
    hasClock(dateHeader, timeHeader);
    console.log("Finished hasClock, in hasHeader with show-header active");
  } else {
    console.log("data[\"show-header\" is NOT active]");
    var dateHeader = document.getElementsByClassName("header-float-date")[0];
    var timeHeader = document.getElementsByClassName("header-float-time")[0];
    var floatInfo = document.getElementsByClassName("float-info-overlay")[0];
    floatSettings.style.display = "block";
    loader.style.top = "0px";
    floatInfo.addEventListener("click", initLightBox);
    console.log("In hasHeader with show-header NOT active, calling hasClock");
    hasClock(dateHeader, timeHeader);
    console.log("Finished hasClock, in hasHader with show-header NOT active");
  }
  console.log("End of hasHeader");
}

function hasClock(dateHeader, timeHeader) {
  console.log("Arrived in hasClock");
  if (data["show-clock"]) {
    console.log("data[\"showClock\"] is active");
    console.log("In hasClock with show-clock active, calling initClock");
    initClock(dateHeader, timeHeader);
    console.log("Finished initClock, in hasClock with show-clock active");
  } else {
    console.log("data[\"show-clock\"] is NOT active");
    dateHeader.style.display = "none";
    timeHeader.style.display = "none";
  }
  console.log("End of hasClock");
}

function initCards() {
  console.log("Arrived in initCards");
  var cardGrid = document.getElementsByClassName("shortcut-grid")[0];
  var cardKeys = Object.keys(data["cards"]);
  var html = "";
  console.log("In initCards, calling initAddCard");
  initAddCard();
  console.log("Finished initAddCard, in initCards");

  loader.style.visibility = "visible";
  for (var i = 0; i < cardKeys.length; i++) {
    html = "";
    html += "<li>";
    html += "<a class='shortcut-link' href=" + data["cards"][cardKeys[i]]["url"] + ">";
    html += "<div class='shortcut-card waves-effect waves-blue' draggable='true'>";
    html += "<img class='shortcut-icon' alt='" + data["cards"][cardKeys[i]]["name"] + " shortcut' src='" + data["cards"][cardKeys[i]]["icon"] + "' draggable='false' />";
    html += "<span class='shortcut-name'>" + data["cards"][cardKeys[i]]["name"] + "</span>";
    html += "<div class='shortcut-manager'>";
    //html += "<img class='shortcut-edit' alt='Edit icon' src='images/add_icon.png'>";
    //html += "<img class='shortcut-delete' alt='Delete icon' src='images/delete_icon.png'>";
    html += "</div>";
    html += "</div>";
    html += "</a>";
    html += "</li>";
    cardGrid.innerHTML += html;
    console.log("In initCards, added the following HTML to cardGrid: " + html);
  }
  loader.style.visibility = "hidden";

  console.log("In initCards, creating Sortable for cardGrid");
  Sortable.create(cardGrid, {
    animation: 150,
    onUpdate: function(evt) {
      console.log("In initCards, Sortable on cardGrid has been activated, calling updateData");
      updateData();
      console.log("Finished updateData, in initCards");
    }
  });

  console.log("In initCards, calling initCardOptions");
  initCardOptions();
  console.log("Finished initCardOptions, in initCards");
  console.log("In initCards, calling initCardManager");
  //initCardManager();
  console.log("Finished initCardManager, in initCards");
  console.log("End of initCards");
}

function initAddCard() {
  console.log("Arrived in initAddCard");
  var headerAdd = document.getElementsByClassName("header-add-overlay")[0];
  var floatAdd = document.getElementsByClassName("float-add-overlay")[0];
  headerAdd.addEventListener("click", function headerAddListener() {
    console.log("In initAddCard, headerAdd click event activated, calling showSideContainer");
    showSideContainer("add");
    console.log("Finished showSideContainer, in initAddCard with headerAdd click event active");
    headerAdd.removeEventListener("click", headerAddListener);
    headerAdd.addEventListener("click", floatAddListener);
  });
  floatAdd.addEventListener("click", function floatAddListener() {
    console.log("In initAddCard, floatAdd click event activated, calling showSideContainer");
    showSideContainer("add");
    console.log("Finished showSideContainer, in initAddCard with floatAdd click event active");
    floatAdd.removeEventListener("click", floatAddListener);
    floatAdd.addEventListener("click", floatAddListener);
  });
  console.log("End of initAddCard");
}

function addCard(imageData, title, url) {
  console.log("Arrived in <.< >.> addCard");
  var cardIndex = (Object.keys(data["cards"]).length).toString();
  var cardGrid = document.getElementsByClassName("shortcut-grid")[0];
  var html = "";
  html += "<li>";
  html += "<a class='shortcut-link' href=" + url + ">";
  html += "<div class='shortcut-card waves-effect waves-blue' draggable='true'>";
  html += "<img class='shortcut-icon' alt='" + title + " icon' src='" + imageData + "' draggable='false' />";
  html += "<span class='shortcut-name'>" + title + "</span>";
  html += "<div class='shortcut-manager'>";
  //html += "<img class='shortcut-edit' alt='Edit icon' src='images/add_icon.png'>";
  //html += "<img class='shortcut-delete' alt='Delete icon' src='images/delete_icon.png'>";
  html += "</div>";
  html += "</div>";
  html += "</a>";
  html += "</li>";
  cardGrid.innerHTML += html;
  console.log("Adding the following HTML to cardGrid: " + html);
  html = "";
  data["cards"][cardIndex] = {
    "name": title,
    "url": url,
    "icon": imageData
  };
  console.log("In addCard, calling setData");
  setData();
  console.log("Finished setData, in addCard");
  console.log("In addCard, calling initCardOptions");
  initCardOptions();
  console.log("Finished initCardOptions, in addCard");
  console.log("In addCard, calling initCardManager");
  //initCardManager();
  console.log("Finished initCardManager, in addCard");
  console.log("End of addCard");
}

// function initCardManager() {
//   console.log("Arrived in initCardManager");
//   var manager = document.getElementsByClassName("shortcut-manager");
//
//   for (var i = 0; i < manager.length; i++) {
//     manager[i].addEventListener("click", function(e) {
//       console.log("In initCardManager, manager " + i + " has been clicked, preventing default action");
//       e.preventDefault();
//     });
//   }
//
//   console.log("In initCardManager, calling initEditCard");
//   initEditCard();
//   console.log("Finished initEditCard, in initCardManager");
//   console.log("In initCardManager, calling initRemoveCard");
//   initRemoveCard();
//   console.log("Finished initRemoveCard, in initCardManager");
//   console.log("End of initCardManager");
// }

// function initEditCard() {
//   console.log("Arrived in initEditCard");
//   var edit = document.getElementsByClassName("shortcut-edit");
//
//   for (var i = 0; i < edit.length; i++) {
//     edit[i].addEventListener("click", function(e) {
//       console.log("Edit button has been clicked");
//       var grid = document.getElementsByClassName("shortcut-grid")[0];
//       var element = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
//       var index = 0;
//
//       for (var j = 0; j < grid.childNodes.length; j++) {
//         if (grid.childNodes[j] === element) {
//           console.log("Element has been found, it's card no. " + j);
//           index = j;
//           console.log("Breaking out of FOR loop");
//           break;
//         }
//         console.log("Still in FOR loop");
//       }
//       console.log("Out of FOR loop");
//
//       console.log("In initEditCard, edit button has been clicked, calling showSideContainer");
//       showSideContainer("edit", index);
//       console.log("Finished showSideContainer, in initEditCard, edit button has been clicked");
//     });
//   }
//   console.log("End of initEditCard");
// }

// function initRemoveCard() {
//   console.log("Arrived in initRemoveCard");
//   var remove = document.getElementsByClassName("shortcut-delete");
//   for (var i = 0; i < remove.length; i++) {
//     remove[i].addEventListener("click", function(e) {
//       console.log("Remove button has been clicked, removing element " + e.currentTarget);
//       console.log("In initRemoveCard, remove button active, calling removeCard");
//       removeCard(e.currentTarget);
//       console.log("Finished removeCard, in initRemoveCard with remove button active");
//     });
//   }
//   console.log("End of initRemoveCard");
// }

// function removeCard(element) {
//   console.log("Arrived in removeCard");
//   if (confirm("Are you sure you want to delete the " + element.parentElement.parentElement.childNodes[1].innerHTML + " shortcut?")) {
//     console.log("In removeCard, confirm dialogue activated, deleting element");
//     element.parentElement.parentElement.parentElement.parentElement.remove();
//     console.log("In removeCard, confirm dialogue activated, element deleted, calling updateData");
//     updateData("remove");
//     console.log("Finished updateData, in removeCard, confirm dialogue activated");
//   }
//   console.log("End of removeCard");
// }

function initCardOptions() {
  console.log("Arrived in initCardOptions");
  var cards = document.getElementsByClassName("shortcut-card");
  var cardNames = document.getElementsByClassName("shortcut-name");
  console.log("In initCardOptions, calling cardBackground");
  var background = cardBackground();
  console.log("Finished cardBackground, in initCardOptions");

  for (var i = 0; i < cards.length; i++) {
    cards[i].style.opacity = data["card-opacity"];
    cards[i].style.backgroundColor = background;
    cardNames[i].style.color = data["card-font-color"];
    cards[i].style.display = "block";
    cards[i].style.height = data["card-height"];
    cards[i].style.width = data["card-width"];
    cards[i].childNodes[1].style.width = data["card-width"];
    cards[i].classList.add("fade-in-card");
  }

  function cardBackground() {
    console.log("Arrived in cardBackground in initCardOptions");
    backgroundOpacity = data["card-background-opacity"];
    backgroundColor = data["card-background-color"];
    console.log("In cardBackground in initCardOptions, calling hexToRgb");
    rgb = hexToRgb(backgroundColor);
    console.log("Finished hexToRgb, in cardBackground in initCardOptions");
    cssColor = "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + backgroundOpacity + ")";
    console.log("End of cardBackground in initCardOptions, returning cssColor: " + cssColor);
    return cssColor;
  }

  setTimeout(function() {
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.remove("fade-in-card");
    }
  }, 300);
  console.log("End of initCardOptions");
}

function updateData(action) {
  console.log("Arrived in updateData");
  var cardGrid = document.getElementsByClassName("shortcut-grid")[0];
  var cardKeys = Object.keys(data["cards"]);
  var cardList = cardGrid.children;

  if (action === "remove") {
    console.log("Action was to remove, cardKeys.length is " + cardKeys.length);
    delete data["cards"][cardKeys.length.toString() - 1];
    cardKeys = Object.keys(data["cards"]);
    console.log("cardKeys.length is now " + cardKeys.length);
  }

  for (var i = 0; i < cardList.length; i++) {
    data["cards"][cardKeys[i]]["url"] = cardList[i].childNodes[0].href;
    data["cards"][cardKeys[i]]["icon"] = cardList[i].childNodes[0].childNodes[0].childNodes[0].src;
    data["cards"][cardKeys[i]]["name"] = cardList[i].childNodes[0].childNodes[0].childNodes[1].innerHTML;
  }
  console.log("In updateData, calling setData");
  setData();
  console.log("Finished setData, in updateData");
  console.log("End of updateData");
}

function initClock(dateHeader, timeHeader) {
  function updateClock() {
    var date = new Date();
    var dateArr = [];
    var timeArr = [];
    var dateString = "";
    var timeString = "";

    if (data["time"]["show-weekday"]) {
      dateArr.push(dayToString(date.getDay()));
    }

    if (data["time"]["show-month"]) {
      dateArr.push(monthToString(date.getMonth()));
    }

    if (data["time"]["show-day"]) {
      if (data["time"]["show-day"] && data["time"]["show-year"]) {
        dateArr.push(date.getDate() + ",")
      } else {
        dateArr.push(date.getDate());
      }
    }

    if (data["time"]["show-year"]) {
      dateArr.push(date.getFullYear());
    }

    if (data["time"]["show-weekday"] && dateArr.length > 1) {
      dateArr[0] = dateArr[0] + ","
    }

    if (data["time"]["show-time"]) {
      if (data["time"]["timeFormat"] === "12") {
        timeArr.push(timeToTwelveHourFormat(date.getHours()));
      } else {
        timeArr.push(date.getHours());
      }

      timeArr.push(":" + formatSingleDigitTime(date.getMinutes()));

      if (data["time"]["show-timeofday"]) {
        timeArr.push(setAMPM(date.getHours()));
      }
    }

    if (dateArr.length > 0) {
      for (var i = 0; i < dateArr.length; i++) {
        dateString += dateArr[i];

        if (i !== dateArr.length - 1) {
          dateString += " ";
        }
      }
    } else {
      dateHeader.style.display = "none";
    }

    if (timeArr.length > 0) {
      for (var i = 0; i < timeArr.length; i++) {
        timeString += timeArr[i];

        if (i !== 0 && i !== timeArr.length - 1) {
          timeString += " ";
        }
      }
    } else {
      timeHeader.style.display = "none";
    }

    dateHeader.innerHTML = dateString;
    timeHeader.innerHTML = timeString;
  }
  setInterval(updateClock, 10000);
  updateClock();

  function formatSingleDigitTime(time) {
    if (time < 10) {
      time = "0" + time;
    }
    return time;
  }

  function setAMPM(hour) {
    var timeOfDay = "";
    if (hour < 12) {
      timeOfDay = "AM";
    } else {
      timeOfDay = "PM";
    }
    return timeOfDay;
  }

  function timeToTwelveHourFormat(hour) {
    if (hour > 12) {
      hour = hour - 12;
    }
    return hour;
  }

  function dayToString(dayNum) {
    var dayString = "";
    switch (dayNum) {
      case 0:
        dayString = "Sunday";
        break;
      case 1:
        dayString = "Monday";
        break;
      case 2:
        dayString = "Tuesday";
        break;
      case 3:
        dayString = "Wednesday";
        break;
      case 4:
        dayString = "Thursday";
        break;
      case 5:
        dayString = "Friday";
        break;
      case 6:
        dayString = "Saturday";
        break;
    }
    return dayString;
  }

  function monthToString(monthNum) {
    var monthString = "";
    switch (monthNum) {
      case 0:
        monthString = "January";
        break;
      case 1:
        monthString = "February";
        break;
      case 2:
        monthString = "March";
        break;
      case 3:
        monthString = "April";
        break;
      case 4:
        monthString = "May";
        break;
      case 5:
        monthString = "June";
        break;
      case 6:
        monthString = "July";
        break;
      case 7:
        monthString = "August";
        break;
      case 8:
        monthString = "September";
        break;
      case 9:
        monthString = "October";
        break;
      case 10:
        monthString = "November";
        break;
      case 11:
        monthString = "December";
        break;
    }
    return monthString;
  }
}

function hexToRgb(hex) {
  console.log("Arrived in hexToRgb");
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  console.log("End of hexToRgb");
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function initLightBox() {
  console.log("Arrived in initLightBox");
  var lightBox = document.getElementById("lightbox");
  var overlay = document.getElementById("lightbox-overlay");
  var close = document.getElementById("lightbox-close");

  overlay.addEventListener("click", hideLightBox);
  close.addEventListener("click", hideLightBox);

  lightBox.style.display = "table";
  overlay.style.display = "block";
  lightBox.classList.add("slide-in-fwd-top");
  overlay.classList.add("fade-in");
  setTimeout(function() {
    lightBox.classList.remove("slide-in-fwd-top");
    overlay.classList.remove("fade-in");
  }, 200);

  function hideLightBox() {
    console.log("Arrived in hideLightBox in initLightBox");
    lightBox.classList.add("slide-out-fwd-top");
    overlay.classList.add("fade-out");
    setTimeout(function() {
      lightBox.classList.remove("slide-out-fwd-top");
      overlay.classList.remove("fade-out");
      lightBox.style.display = "none";
      overlay.style.display = "none";
    }, 200);
    console.log("End of hideLightBox in initLightBox");
  }
  console.log("End of initLightBox");
}

function initSideContainer(type, index) {
  console.log("Arrived in initSideContainer");
  var closeBtn = document.getElementById("close-btn");
  var saveBtn = document.getElementById("save-btn");
  var inputFile = document.getElementById("shortcut-file");
  var inputFileText = document.getElementById("shortcut-file-text");
  var inputTitle = document.getElementById("shortcut-title");
  var inputURL = document.getElementById("shortcut-url");
  var inputError = document.getElementsByClassName("side-container-error")[0];
  var previewImage = document.getElementsByClassName("shortcut-icon-test")[0];
  var previewTitle = document.getElementsByClassName("shortcut-name-test")[0];
  var imageData = "";
  var title = "";
  var url = "";

  sideOverlay.addEventListener("click", function sideOverlayListener() {
    console.log("In initSideContainer, sideOverlay clicked, calling emptyFields");
    emptyFields();
    console.log("Finished emptyFields, in initSideContainer, sideOverlay clicked");
    console.log("In initSideContainer, sideOverlay clicked, calling hideSideContainer");
    hideSideContainer();
    console.log("Finished hideSideContainer, in initSideContainer, sideOverlay clicked");
  });

  closeBtn.addEventListener("click", function closeBtnListener() {
    console.log("In initSideContainer, closeBtn clicked, calling emptyFields");
    emptyFields();
    console.log("Finished emptyFields, in initSideContainer, closeBtn clicked");
    console.log("In initSideContainer, closeBtn clicked, calling hideSideContainer");
    hideSideContainer();
    console.log("finished hideSideContainer, in initSideContainer, closeBtn clicked");
  });

  // if (type === "edit") {
  //   console.log("In initSideContainer, type is edit, calling fillFields");
  //   fillFields(index);
  //   console.log("Finished fillFields, in initSideContainer, type is edit");
  // }

  saveBtn.addEventListener("click", function saveBtnListener() {
    console.log("In initSideContainer, saveBtn clicked");
    var result = false;

    if (type === "add") {
      console.log("In initSideContainer, saveBtn clicked, type is add, calling newCard");
      result = newCard();
      console.log("Finished newCard, in initSideContainer, saveBtn clicked, type is add");
    }

    // if (type === "edit") {
    //   console.log("In initSideContainer, saveBtn clicked, type is edit, calling editCard");
    //   result = editCard(index);
    //   console.log("Finished editCard, in initSideContainer, saveBtn clicked, type is edit");
    // }

    if (result) {
      console.log("In initSideContainer, saveBtn clicked, result good, calling emptyFields");
      emptyFields();
      console.log("Finished emptyFields, in initSideContainer, saveBtn clicked, result good");
      console.log("In initSideContainer, saveBtn clicked, result good, calling hideSideContainer");
      hideSideContainer();
      console.log("Finished hideSideContainer, in initSideContainer, saveBtn clicked, result good");
    }
  });

  function newCard() {
    console.log("Arrived in newCard in initSideContainer");
    console.log("In newCard in initSideContainer, calling validateFields");
    if (!validateFields()) {
      console.log("In newCard in initSideContainer, validateFields FAILED, returning FALSE");
      console.log("End of newCard in initSideContainer");
      return false;
    }

    console.log("In newCard in initSideContainer, validateFields good, calling addCard");
    addCard(imageData, title, url);
    console.log("Finished addCard, in newCard in initSideContainer, validateFields good, returning TRUE");
    console.log("End of newCard in initSideContainer");
    return true;
  }

  // function editCard(index) {
  //   console.log("Arrived in editCard in initSideContainer");
  //   console.log("In editCard in initSideContainer, calling validateFields");
  //   if (!validateFields()) {
  //     console.log("In editCard in initSideContainer, validateFields FAILED, returning FALSE");
  //     console.log("End of editCard in initSideContainer");
  //     return false;
  //   }
  //
  //   data["cards"][index - 1]["url"] = url;
  //   data["cards"][index - 1]["name"] = title;
  //   data["cards"][index - 1]["icon"] = imageData;
  //
  //   console.log("In editCard in initSideContainer, validateFields good, calling setData");
  //   setData();
  //   console.log("Finished setData, in editCard in initSideContainer, validateFields good");
  //   console.log("In editCard in initSideContainer, validateFields good, calling refreshCard");
  //   refreshCard(index);
  //   console.log("Finished refreshCard, in editCard in initSideContainer, validateFields good, returning TRUE");
  //   console.log("End of editCard in initSideContainer");
  //
  //   return true;
  // }

  function validateFields() {
    console.log("Arrived in validateFields in initSideContainer");
    if (url === "") {
      console.log("URL empty");
      inputError.innerHTML = "Card requires a url :)";
      console.log("In validateFields in initSideContainer, URL empty, calling showError");
      showError();
      console.log("Finished showError, in validateFields in initSideContainer, URL empty, returning FALSE");
      console.log("End of validateFields in initSideContainer");
      return false;
    }

    if (url.indexOf("https://") === -1) {
      console.log("URL did not have https://");
      url = "https://" + url;
      console.log("URL now " + url);
    }

    if (imageData === "") {
      console.log("imageData empty, taking default");
      imageData = data["card-default-icon"];
    }

    console.log("In validateFields in initSideContainer, returning TRUE");
    console.log("End of validateFields in initSideContainer");
    return true;
  }

  // function fillFields(index) {
  //   console.log("Arrived in fillFields in initSideContainer");
  //   url = data["cards"][index - 1]["url"];
  //   title = data["cards"][index - 1]["name"];
  //   imageData = data["cards"][index - 1]["icon"];
  //   inputURL.value = url;
  //   inputURL.text = url;
  //   inputTitle.value = title;
  //   inputTitle.text = title;
  //   previewTitle.innerHTML = title;
  //   previewImage.src = imageData;
  //   console.log("End of fillFields in initSideContainer");
  // }

  function emptyFields() {
    console.log("Arrived in emptyFields in initSideContainer");
    inputURL.value = "";
    inputURL.text = "";
    previewImage.src = data["card-default-icon"];
    inputTitle.value = "";
    inputTitle.text = "";
    previewTitle.innerHTML = "Title";
    inputFile.files[0] = "";
    inputFileText.text = "";
    inputFileText.value = "";
    inputError.innerHTML = "";
    title = "";
    imageData = "";
    url = "";
    console.log("End of emptyFields in initSideContainer");
  }

  function showError() {
    console.log("Arrived in showError in initSideContainer");
    inputError.style.visibility = "visible";
    inputError.classList.add("heartbeat");
    setTimeout(function() {
      inputError.classList.remove("heartbeat");
    }, 1500);
    console.log("End of showError in initSideContainer");
  }

  previewImage.addEventListener("click", function previewImageListener() {
    console.log("In initSideContainer, previewImage clicked");
    inputFile.click();
    console.log("End of previewImage clicked, in initSideContainer");
  });

  inputFile.addEventListener("change", function inputFileListener() {
    var file = inputFile.files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function readerListener() {
      previewImage.src = reader.result;
      imageData = reader.result;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  });

  inputTitle.addEventListener("change", function inputTitleListener() {
    console.log("In initSideContainer, inputTitle changed");
    previewTitle.innerHTML = inputTitle.value;
    title = inputTitle.value;
    console.log("Title now " + title);
    console.log("End of inputTitle changed, in initSideContainer");
  });

  inputURL.addEventListener("change", function inputURLListener() {
    console.log("In initSideContainer, inputURL changed");
    url = inputURL.value;
    console.log("Url now " + url);
    console.log("End of inputURL changed, in initSideContainer");
  });

  document.addEventListener("keyup", function documentListener(e) {
    console.log("In initSideContainer, keyup");
    if (sideContainer.style.display === "block") {
      console.log("Sidecontainer style block");
      if (e.key === "Enter") {
        console.log("Keypress was Enter, calling saveBtn.click");
        saveBtn.click();
        console.log("Finished saveBtn.click, in initSideContainer keyup, Enter pressed");
      }

      if (e.key === "Escape") {
        console.log("Keypress was Escape");
        console.log("In initSideContainer, calling hideSideContainer");
        hideSideContainer();
        console.log("Finished hideSideContainer, in initSideContainer, keypress was Escape");
        console.log("In initSideContainer, calling emptyFields");
        emptyFields();
        console.log("Finished emptyFields, in initSideContainer, keypress was Escape");
      }
    }
  });
  console.log("End of initSideContainer");
}

function showSideContainer(type, index) {
  console.log("Arrived in showSideContainer");
  sideContainer.style.display = "block";
  sideOverlay.style.display = "block";
  sideContainer.classList.add("slide-in-right");
  sideOverlay.classList.add("fade-in");
  console.log("In showSideContainer, calling initSideContainer");
  initSideContainer(type, index);
  console.log("Finished initSideContainer, in showSideContainer");
  setTimeout(function() {
    sideContainer.classList.remove("slide-in-right");
    sideOverlay.classList.remove("fade-in");
  }, 200);
  console.log("End of showSideContainer");
}

function hideSideContainer() {
  console.log("Arrived in hideSideContainer");
  sideContainer.classList.add("slide-out-right");
  sideOverlay.classList.add("fade-out");
  setTimeout(function() {
    sideContainer.classList.remove("slide-out-right");
    sideOverlay.classList.remove("fade-out");
    sideContainer.style.display = "none";
    sideOverlay.style.display = "none";
  }, 200);
  resetSideContainer();
  console.log("End of hideSideContainer");
  //location.reload();
}

function resetSideContainer() {
  document.getElementsByClassName("side-container")[0].innerHTML = "<div class=\"shortcut-card-test waves-effect waves-blue\"><img class=\"shortcut-icon-test\" alt=\"Preview shortcut icon\" src=\"images/shortcut_icon.png\" draggable=\"false\" /><span class=\"shortcut-name-test\">Title</span></div><div class=\"side-container-error\">This is an error message!</div><div class=\"side-container-form\"><div class=\"file-field input-field\"><div class=\"btn waves-effect waves-light\"><span>Image</span><input id=\"shortcut-file\" type=\"file\"></div><div class=\"file-path-wrapper\"><input id=\"shortcut-file-text\" class=\"file-path validate\" type=\"text\"></div></div><div class=\"input-field col s6\"><input placeholder=\"\" id=\"shortcut-title\" type=\"text\" class=\"validate\"><label for=\"shortcut-title\">Title</label></div><div class=\"input-field col s6\"><input placeholder=\"\" id=\"shortcut-url\" type=\"text\" class=\"validate\"><label for=\"shortcut-url\">URL</label></div><div id=\"save-btn\" class=\"btn btn-margin-right waves-effect waves-light\">Save</div><div id=\"close-btn\" class=\"btn btn-margin-left waves-effect waves-light\">Close</div></div>\"";
}

function refreshCard(index) {
  console.log("Arrived in refreshCard");
  var cardList = document.getElementsByClassName("shortcut-grid")[0];
  var card = cardList.childNodes[index];

  card.childNodes[0].href = data["cards"][index - 1]["url"];
  card.childNodes[0].childNodes[0].childNodes[0].src = data["cards"][index - 1]["icon"];
  card.childNodes[0].childNodes[0].childNodes[1].innerHTML = data["cards"][index - 1]["name"];
  console.log("End of refreshCard");
}
