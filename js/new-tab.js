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

getData();

function getData() {
  chrome.storage.local.get(null, function(userData) {
    if (chrome.runtime.lastError) {
      data = defaultData;
      setData();
      console.log(chrome.runtime.lastError);
      return;
    }
    if (Object.keys(userData).length === 0) {
      data = defaultData;
    } else {
      data = userData;
    }
    validateData();
    hasBackground();
    hasHeader();
    initCards();
  });
}

function setData() {
  chrome.storage.local.set(data, function() {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError);
    }
  });
}

function removeData(removedData) {
  chrome.storage.local.remove(removedData, function() {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError);
    }
  });
}

function validateData() {
  if (data["card-opacity"] === undefined) {
    data["card-opacity"] = "1";
  }

  if (data["card-background-opacity"] === undefined) {
    data["card-background-opacity"] = "1";
  }

  if (data["card-background-color"] === undefined) {
    data["card-background-color"] = "#ffffff";
  }

  if (data["card-font-color"] === undefined) {
    data["card-font-color"] = "#000000";
  }

  if (data["card-default-icon"] === undefined) {
    data["card-default-icon"] = "images/shortcut_icon.png";
  }

  if (data["header-background-color"] === undefined) {
    data["header-background-color"] = "#fafafa";
  }

  if (data["header-font-color"] === undefined) {
    data["header-font-color"] = "#000000";
  }

  if (data["card-height"] === undefined) {
    data["card-height"] = "140px";
  }

  if (data["card-width"] === undefined) {
    data["card-width"] = "150px";
  }

  setData();
}

function hasBackground() {
  var body = document.getElementsByTagName("Body")[0];
  var bodyImage = document.getElementsByClassName("body-image")[0];

  if (data["background-option"] === "color") {
    body.style.backgroundColor = data["background-color"];
  } else {
    bodyImage.src = data["background-image"];
    bodyImage.style.display = "block";
  }
}

function hasHeader() {
  var header = document.getElementsByClassName("header")[0];
  var floatSettings = document.getElementsByClassName("float-header")[0];
  if (data["show-header"]) {
    var dateHeader = document.getElementsByClassName("header-date")[0];
    var timeHeader = document.getElementsByClassName("header-time")[0];
    var headerInfo = document.getElementsByClassName("header-info-overlay")[0];
    header.style.display = "block";
    header.style.backgroundColor = data["header-background-color"];
    header.style.color = data["header-font-color"];
    loader.style.top = "40px";
    headerInfo.addEventListener("click", initLightBox);
    hasClock(dateHeader, timeHeader);
  } else {
    var dateHeader = document.getElementsByClassName("header-float-date")[0];
    var timeHeader = document.getElementsByClassName("header-float-time")[0];
    var floatInfo = document.getElementsByClassName("float-info-overlay")[0];
    floatSettings.style.display = "block";
    loader.style.top = "0px";
    floatInfo.addEventListener("click", initLightBox);
    hasClock(dateHeader, timeHeader);
  }
}

function hasClock(dateHeader, timeHeader) {
  if (data["show-clock"]) {
    initClock(dateHeader, timeHeader);
  } else {
    dateHeader.style.display = "none";
    timeHeader.style.display = "none";
  }
}

function initCards() {
  var cardGrid = document.getElementsByClassName("shortcut-grid")[0];
  var cardKeys = Object.keys(data["cards"]);
  initAddCard();

  loader.style.visibility = "visible";
  for (var i = 0; i < cardKeys.length; i++) {
    var html = "";
    html += "<li>";
    html += "<a class='shortcut-link' href=" + data["cards"][cardKeys[i]]["url"] + ">";
    html += "<div class='shortcut-card waves-effect waves-blue' draggable='true'>";
    html += "<img class='shortcut-icon' alt='" + data["cards"][cardKeys[i]]["name"] + " shortcut' src='" + data["cards"][cardKeys[i]]["icon"] + "' draggable='false' />";
    html += "<span class='shortcut-name'>" + data["cards"][cardKeys[i]]["name"] + "</span>";
    html += "<div class='shortcut-manager'>";
    html += "<img class='shortcut-edit' alt='Edit icon' src='images/add_icon.png'>";
    html += "<img class='shortcut-delete' alt='Delete icon' src='images/delete_icon.png'>";
    html += "</div>";
    html += "</div>";
    html += "</a>";
    html += "</li>";
    cardGrid.innerHTML += html;
  }
  loader.style.visibility = "hidden";

  Sortable.create(cardGrid, {
    animation: 150,
    onUpdate: function(evt) {
      updateData();
    }
  });

  initCardOptions();
  initCardManager();
}

function initAddCard() {
  var headerAdd = document.getElementsByClassName("header-add-overlay")[0];
  var floatAdd = document.getElementsByClassName("float-add-overlay")[0];
  headerAdd.addEventListener("click", function() {
    showSideContainer("add");
  });
  floatAdd.addEventListener("click", function() {
    showSideContainer("add");
  });
}

function addCard(imageData, title, url) {
  var cardIndex = (Object.keys(data["cards"]).length).toString();
  var cardGrid = document.getElementsByClassName("shortcut-grid")[0];
  var html = "";
  html += "<li>";
  html += "<a class='shortcut-link' href=" + url + ">";
  html += "<div class='shortcut-card waves-effect waves-blue' draggable='true'>";
  html += "<img class='shortcut-icon' alt='" + title + " icon' src='" + imageData + "' draggable='false' />";
  html += "<span class='shortcut-name'>" + title + "</span>";
  html += "<div class='shortcut-manager'>";
  html += "<img class='shortcut-edit' alt='Edit icon' src='images/add_icon.png'>";
  html += "<img class='shortcut-delete' alt='Delete icon' src='images/delete_icon.png'>";
  html += "</div>";
  html += "</div>";
  html += "</a>";
  html += "</li>";
  cardGrid.innerHTML += html;
  data["cards"][cardIndex] = {
    "name": title,
    "url": url,
    "icon": imageData
  };
  setData();
  initCardOptions();
  initCardManager();
}

function initCardManager() {
  var manager = document.getElementsByClassName("shortcut-manager");

  for (var i = 0; i < manager.length; i++) {
    manager[i].addEventListener("click", function(e) {
      e.preventDefault();
    });
  }

  initEditCard();
  initRemoveCard();
}

function initEditCard() {
  var edit = document.getElementsByClassName("shortcut-edit");

  for (var i = 0; i < edit.length; i++) {
    edit[i].addEventListener("click", function(e) {
      var grid = document.getElementsByClassName("shortcut-grid")[0];
      var element = e.currentTarget.parentElement.parentElement.parentElement.parentElement;
      var index = 0;

      for (var i = 0; i < grid.childNodes.length; i++) {
        if (grid.childNodes[i] === element) {
          index = i;
          break;
        }
      }

      showSideContainer("edit", index);
    });
  }
}

function initRemoveCard() {
  var remove = document.getElementsByClassName("shortcut-delete");
  for (var i = 0; i < remove.length; i++) {
    remove[i].addEventListener("click", function(e) {
      removeCard(e.currentTarget);
    });
  }
}

function removeCard(element) {
  if (confirm("Are you sure you want to delete the " + element.parentElement.parentElement.childNodes[1].innerHTML + " shortcut?")) {
    element.parentElement.parentElement.parentElement.parentElement.remove();
    updateData("remove");
  }
}

function initCardOptions() {
  var cards = document.getElementsByClassName("shortcut-card");
  var cardNames = document.getElementsByClassName("shortcut-name");
  var background = cardBackground();

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
    backgroundOpacity = data["card-background-opacity"];
    backgroundColor = data["card-background-color"];
    rgb = hexToRgb(backgroundColor);
    cssColor = "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + backgroundOpacity + ")";
    return cssColor;
  }

  setTimeout(function() {
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.remove("fade-in-card");
    }
  }, 300);
}

function updateData(action) {
  var cardGrid = document.getElementsByClassName("shortcut-grid")[0];
  var cardKeys = Object.keys(data["cards"]);
  var cardList = cardGrid.children;

  if (action === "remove") {
    delete data["cards"][cardKeys.length.toString() - 1];
    cardKeys = Object.keys(data["cards"]);
  }

  for (var i = 0; i < cardList.length; i++) {
    data["cards"][cardKeys[i]]["url"] = cardList[i].childNodes[0].href;
    data["cards"][cardKeys[i]]["icon"] = cardList[i].childNodes[0].childNodes[0].childNodes[0].src;
    data["cards"][cardKeys[i]]["name"] = cardList[i].childNodes[0].childNodes[0].childNodes[1].innerHTML;
  }
  setData();
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
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function initLightBox() {
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
    lightBox.classList.add("slide-out-fwd-top");
    overlay.classList.add("fade-out");
    setTimeout(function() {
      lightBox.classList.remove("slide-out-fwd-top");
      overlay.classList.remove("fade-out");
      lightBox.style.display = "none";
      overlay.style.display = "none";
    }, 200);
  }
}

function initSideContainer(type, index) {
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

  sideOverlay.addEventListener("click", function() {
    emptyFields();
    hideSideContainer();
  });

  closeBtn.addEventListener("click", function() {
    emptyFields();
    hideSideContainer();
  });

  if (type === "edit") {
    fillFields(index);
  }

  saveBtn.addEventListener("click", function() {
    var result = false;

    if (type === "add") {
      result = newCard();
    }

    if (type === "edit") {
      result = editCard(index);
    }

    if (result) {
      emptyFields();
      hideSideContainer();
    }
  });

  function newCard() {
    if (!validateFields()) {
      return false;
    }

    addCard(imageData, title, url);
    return true;
  }

  function editCard(index) {
    if (!validateFields()) {
      return false;
    }

    data["cards"][index - 1]["url"] = url;
    data["cards"][index - 1]["name"] = title;
    data["cards"][index - 1]["icon"] = imageData;
    setData();
    refreshCard(index);

    return true;
  }

  function validateFields() {
    if (url === "") {
      inputError.innerHTML = "Card requires a url :)";
      showError();
      return false;
    }

    if (url.indexOf("https://") === -1) {
      url = "https://" + url;
    }

    if (imageData === "") {
      imageData = data["card-default-icon"];
    }

    return true;
  }

  function fillFields(index) {
    url = data["cards"][index - 1]["url"];
    title = data["cards"][index - 1]["name"];
    imageData = data["cards"][index - 1]["icon"];
    inputURL.value = url;
    inputURL.text = url;
    inputTitle.value = title;
    inputTitle.text = title;
    previewTitle.innerHTML = title;
    previewImage.src = imageData;
  }

  function emptyFields() {
    inputURL.value = "";
    inputURL.text = "";
    previewImage.src = data["card-default-icon"];
    inputTitle.value = "";
    inputTitle.text = "";
    previewTitle.innerHTML = "Title";
    inputFile.files[0] = "";
    inputFileText.text = "";
    inputFileText.value = "";
    inputError.style.visibility = "hidden";
    title = "";
    imageData = "";
    url = "";
  }

  function showError() {
    inputError.style.visibility = "visible";
    inputError.classList.add("heartbeat");
    setTimeout(function() {
      inputError.classList.remove("heartbeat");
    }, 1500);
  }

  previewImage.addEventListener("click", function() {
    inputFile.click();
  });

  inputFile.addEventListener("change", function() {
    var file = inputFile.files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function() {
      previewImage.src = reader.result;
      imageData = reader.result;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  });

  inputTitle.addEventListener("change", function() {
    previewTitle.innerHTML = inputTitle.value;
    title = inputTitle.value;
  });

  inputURL.addEventListener("change", function() {
    url = inputURL.value;
  });

  document.addEventListener("keyup", function(e) {
    if (sideContainer.style.display === "block") {
      if (e.key === "Enter") {
        saveBtn.click();
      }

      if (e.key === "Escape") {
        hideSideContainer();
        emptyFields();
      }
    }
  });
}

function showSideContainer(type, index) {
  sideContainer.style.display = "block";
  sideOverlay.style.display = "block";
  sideContainer.classList.add("slide-in-right");
  sideOverlay.classList.add("fade-in");
  initSideContainer(type, index);
  setTimeout(function() {
    sideContainer.classList.remove("slide-in-right");
    sideOverlay.classList.remove("fade-in");
  }, 200);
}

function hideSideContainer() {
  sideContainer.classList.add("slide-out-right");
  sideOverlay.classList.add("fade-out");
  setTimeout(function() {
    sideContainer.classList.remove("slide-out-right");
    sideOverlay.classList.remove("fade-out");
    sideContainer.style.display = "none";
    sideOverlay.style.display = "none";
  }, 200);
}

function refreshCard(index) {
  var cardList = document.getElementsByClassName("shortcut-grid")[0];
  var card = cardList.childNodes[index];

  card.childNodes[0].href = data["cards"][index - 1]["url"];
  card.childNodes[0].childNodes[0].childNodes[0].src = data["cards"][index - 1]["icon"];
  card.childNodes[0].childNodes[0].childNodes[1].innerHTML = data["cards"][index - 1]["name"];
}
