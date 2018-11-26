var data = null;
var defaultData = {
  "background-color": "#03a9f4",
  "background-image": "images/default_wallpaper.jpg",
  "background-option": "image",
  "card-background-color": "#ffffff",
  "card-background-opacity": "1",
  "card-border-radius": "5px",
  "card-default-icon": "images/shortcut_icon.png",
  "card-font-color": "#333333",
  "card-height": "90px",
  "card-opacity": "1",
  "card-reset": false,
  "card-shadow": false,
  "card-width": "100px",
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
  "header-font-color": "#333333",
  "header-float-font-color": "#ffffff",
  "header-weather-units": "Fahrenheit",
  "show-weather": true,
  "show-header": false,
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
var interval = null;

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
    initSettings();
  });
}

function setData(progress) {
  chrome.storage.local.set(data, function() {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError);
    }
    progress.style.visibility = "hidden";
  });
}

function initSettings() {
  getBackgroundOptions();
  getHeaderOptions();
  getShortcutOptions();
  initNavigation();

  setBackgroundOptions();
  setHeaderOptions();
  setShortcutOptions();

  manageData();

  document.addEventListener("keyup", function(e) {
    if (e.key === "Escape") {
      window.history.back();
    }
  });
  //Set header in New Tab Settings according to setting for main MyHomeTab
  //document.getElementById("settings-header").style.color = data["header-font-color"];
  //document.getElementById("settings-header").style.backgroundColor = data["header-background-color"];
}

function compareData() {
  var progress = document.getElementsByClassName("settings-progress-container")[0];
  var currentData;

  progress.style.visibility = "visible";

  chrome.storage.local.get(null, function(userData) {
    if (chrome.runtime.lastError) {
      currentData = defaultData;
      console.log(chrome.runtime.lastError);
      return;
    }

    if (Object.keys(userData).length === 0) {
      currentData = defaultData;
    } else {
      currentData = userData;
    }

    if (data["card-reset"]) {
      data["card-reset"] = false;
    } else {
      data["cards"] = currentData["cards"];
    }

    setData(progress);
  });
}

function getBackgroundOptions() {
  var radioColor = document.getElementById("background-color-option");
  var radioImage = document.getElementById("background-image-option");
  var color = document.getElementById("background-color");
  var colorLabel = document.getElementById("color-label");
  var backgroundFile = document.getElementById("background-image-btn");
  var backgroundText = document.getElementById("background-image-text");
  var backgroundColorPreview = document.getElementsByClassName("settings-background-preview")[0].childNodes[3];
  var backgroundImagePreview = backgroundColorPreview.childNodes[1];

  if (data["background-option"] === "color") {
    radioColor.checked = true;
    radioImage.checked = false;
    color.value = data["background-color"];
    backgroundFile.style.display = "none";
    backgroundText.style.display = "none";
    backgroundColorPreview.style.backgroundColor = data["background-color"];
  } else {
    radioColor.checked = false;
    radioImage.checked = true;
    color.value = data["background-color"];
    color.style.display = "none";
    colorLabel.style.display = "none";
    backgroundImagePreview.src = data["background-image"];
  }

  radioColor.addEventListener("click", function() {
    backgroundFile.style.display = "none";
    backgroundText.style.display = "none";
    color.style.display = "block";
    colorLabel.style.display = "block";
  });

  radioImage.addEventListener("click", function() {
    color.style.display = "none";
    colorLabel.style.display = "none";
    backgroundFile.style.display = "block";
    backgroundText.style.display = "block";
  })
}

function getHeaderOptions() {
  var fahrenheit = document.getElementById("weather-fahrenheit");
  var celsius = document.getElementById("weather-celsius");
  var headerBackgroundColor = document.getElementById("header-background-color");
  var headerFontColor = document.getElementById("header-font-color");
  var floatFontColor = document.getElementById("header-float-font-color");
  var header = document.getElementById("show-header");
  var weather = document.getElementById("show-weather");
  var clock = document.getElementById("show-clock");
  var format = document.getElementById("time-format");
  var weekday = document.getElementById("show-weekday");
  var month = document.getElementById("show-month");
  var day = document.getElementById("show-day");
  var year = document.getElementById("show-year");
  var time = document.getElementById("show-time");
  var timeOfDay = document.getElementById("show-timeofday");
  var headerPreview = document.getElementsByClassName("settings-header-preview")[0];
  var headerWeatherPreview = document.getElementsByClassName("header-weather")[0];
  var headerRightPreview = document.getElementsByClassName("header-right")[0];
  var headerDatePreview = document.getElementsByClassName("header-date")[0];
  var headerTimePreview = document.getElementsByClassName("header-time")[0];

  headerBackgroundColor.value = data["header-background-color"];
  headerPreview.style.backgroundColor = data["header-background-color"];
  headerFontColor.value = data["header-font-color"];
  headerPreview.style.color = data["header-font-colo"];
  floatFontColor.value = data["header-float-font-color"];

  if (data["header-weather-units"] === "Fahrenheit") {
    fahrenheit.checked = true;
    headerWeatherPreview.innerHTML = "999°F";
  }

  if (data["header-weather-units"] === "Celsius") {
    celsius.checked = true;
    headerWeatherPreview.innerHTML = "537.2°C";
  }

  if (data["show-weather"]) {
    weather.checked = true;
  }

  if (data["show-header"]) {
    header.checked = true;
  } else {
    headerPreview.style.backgroundColor = "#fafafa";
    headerPreview.style.color = data["header-float-font-color"];
  }

  if (data["show-clock"]) {
    clock.checked = true;
  } else {
    headerDatePreview.style.display = "none";
    headerTimePreview.style.display = "none";
  }

  if (data["time"]["timeFormat"] === "12") {
    format.checked = true;
  }

  if (data["time"]["show-weekday"]) {
    weekday.checked = true;
  }

  if (data["time"]["show-month"]) {
    month.checked = true;
  }

  if (data["time"]["show-day"]) {
    day.checked = true;
  }

  if (data["time"]["show-year"]) {
    year.checked = true;
  }

  if (data["time"]["show-time"]) {
    time.checked = true;
  }

  if (data["time"]["show-timeofday"]) {
    timeOfDay.checked = true;
  }

  initClock(headerDatePreview, headerTimePreview);
}

function getShortcutOptions() {
  var opacity = document.getElementById("card-opacity");

  var backgroundOpacity = document.getElementById("card-background-opacity");
  var backgroundColor = document.getElementById("card-background-color");
  var fontColor = document.getElementById("card-font-color");
  var height = document.getElementById("card-height");
  var width = document.getElementById("card-width");
  var shadow = document.getElementById("card-shadow");
  var borderRadius = document.getElementById("card-border-radius");
  var cardPreview = document.getElementsByClassName("shortcut-card-test")[0];
  var iconPreview = document.getElementsByClassName("shortcut-icon-test")[0];
  var namePreview = document.getElementsByClassName("shortcut-name-test")[0];

  opacity.value = parseFloat(data["card-opacity"], 10) * 100;
  cardPreview.style.opacity = data["card-opacity"];
  backgroundOpacity.value = parseFloat(data["card-background-opacity"], 10) * 100;
  backgroundColor.value = data["card-background-color"];
  cardPreview.style.backgroundColor = cardBackground();
  fontColor.value = data["card-font-color"];
  namePreview.style.color = data["card-font-color"];
  height.value = data["card-height"].slice(0, data["card-height"].length - 2);
  cardPreview.style.height = data["card-height"];
  width.value = data["card-width"].slice(0, data["card-width"].length - 2);
  cardPreview.style.width = data["card-width"];
  borderRadius.value = data["card-border-radius"].slice(0, data["card-border-radius"].length - 2);
  cardPreview.style.borderRadius = data["card-border-radius"];

  if (data["card-shadow"]) {
    shadow.checked = true;
  } else {
    cardPreview.style.boxShadow = "none";
  }

  if (parseInt(data["card-width"].substring(0, 3)) < 150) {
    cardPreview.childNodes[1].style.fontSize = "12px";
  }
}

function initNavigation() {
  var nav = document.getElementsByClassName("settings-nav")[0].children;
  var sections = document.getElementsByClassName("settings-section");
  var currentSection = 0;

  nav[currentSection].style.borderBottom = "2px solid #ffffff";
  sections[currentSection].style.display = "block";

  for (var i = 0; i < nav.length - 1; i++) {
    nav[i].addEventListener("click", navClick);
  }

  function navClick(e) {
    var nextSection = 0;
    for (var i = 0; i < nav.length - 1; i++) {
      if (e.target === nav[i]) {
        nextSection = i;
      }
    }

    if (nextSection === currentSection) { return; }

    if (nextSection < currentSection) {
      sections[currentSection].classList.add("slide-out-right-settings");
      setTimeout(function() {
        sections[currentSection].classList.remove("slide-out-right-settings");
        sections[currentSection].style.display = "none";
        nav[currentSection].style.borderBottom = "2px solid #0394D6";
        sections[nextSection].classList.add("slide-in-left-settings");
        sections[nextSection].style.display = "block";
        nav[nextSection].style.borderBottom = "2px solid #ffffff";
        setTimeout(function() {
          sections[nextSection].classList.remove("slide-in-left-settings");
          currentSection = nextSection;
        }, 100);
      }, 100);
    } else {
      sections[currentSection].classList.add("slide-out-left-settings");
      setTimeout(function() {
        sections[currentSection].classList.remove("slide-out-left-settings");
        sections[currentSection].style.display = "none";
        nav[currentSection].style.borderBottom = "2px solid #0394D6";
        sections[nextSection].classList.add("slide-in-right-settings");
        sections[nextSection].style.display = "block";
        nav[nextSection].style.borderBottom = "2px solid #ffffff";
        setTimeout(function() {
          sections[nextSection].classList.remove("slide-in-right-settings");
          currentSection = nextSection;
        }, 100);
      }, 100);
    }
  }
}

function setBackgroundOptions() {
  var radioColor = document.getElementById("background-color-option");
  var radioImage = document.getElementById("background-image-option");
  var color = document.getElementById("background-color");
  var image = document.getElementById("background-image");
  var backgroundColorPreview = document.getElementsByClassName("settings-background-preview")[0].childNodes[3];
  var backgroundImagePreview = backgroundColorPreview.childNodes[1];

  radioColor.addEventListener("change", function() {
    if (radioColor.checked) {
      data["background-option"] = "color";
      backgroundImagePreview.src = "";
      backgroundColorPreview.style.backgroundColor = data["background-color"];
      compareData();
    }
  });

  radioImage.addEventListener("change", function() {
    if (radioImage.checked) {
      data["background-option"] = "image";
      backgroundImagePreview.src = data["background-image"]
      compareData();
    }
  });

  color.addEventListener("input", function() {
    if ((color.value.charAt(0) === "#" && color.value.length === 7) || (color.value.charAt(0) === "#" && color.value.length === 4)) {
      data["background-color"] = color.value;
      backgroundColorPreview.style.backgroundColor = data["background-color"];
      compareData();
    } else {
      data["background-color"] = "#03a9f4";
      compareData();
    }
  });

  image.addEventListener("change", function() {
    var file = image.files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function() {
      data["background-image"] = reader.result;
      backgroundImagePreview.src = data["background-image"];
      compareData();
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  });
}

function setHeaderOptions() {
  var fahrenheit = document.getElementById("weather-fahrenheit");
  var celsius = document.getElementById("weather-celsius");
  var headerBackgroundColor = document.getElementById("header-background-color");
  var headerFontColor = document.getElementById("header-font-color");
  var floatFontColor = document.getElementById("header-float-font-color");
  var header = document.getElementById("show-header");
  var weather = document.getElementById("show-weather");
  var clock = document.getElementById("show-clock");
  var format = document.getElementById("time-format");
  var weekday = document.getElementById("show-weekday");
  var month = document.getElementById("show-month");
  var day = document.getElementById("show-day");
  var year = document.getElementById("show-year");
  var time = document.getElementById("show-time");
  var timeOfDay = document.getElementById("show-timeofday");
  var headerWeatherPreview = document.getElementsByClassName("header-weather")[0];

  fahrenheit.addEventListener("change", function() {
    if (fahrenheit.checked) {
      data["header-weather-units"] = "Fahrenheit";
      headerWeatherPreview.innerHTML = "999°F";
      compareData();
    }
  });

  celsius.addEventListener("change", function() {
    if (celsius.checked) {
      data["header-weather-units"] = "Celsius";
      headerWeatherPreview.innerHTML = "537.2°C";
      compareData();
    }
  });

  headerBackgroundColor.addEventListener("input", function() {
    if ((headerBackgroundColor.value.charAt(0) === "#" && headerBackgroundColor.value.length === 7) || (headerBackgroundColor.value.charAt(0) === "#" && headerBackgroundColor.value.length === 4)) {
      data["header-background-color"] = headerBackgroundColor.value;
      updateHeaderPreview();
      compareData();
    } else {
      data["header-background-color"] = "#fafafa";
      updateHeaderPreview();
      compareData();
    }
  });

  headerFontColor.addEventListener("input", function() {
    if ((headerFontColor.value.charAt(0) === "#" && headerFontColor.value.length === 7) || (headerFontColor.value.charAt(0) === "#" && headerFontColor.value.length === 4)) {
      data["header-font-color"] = headerFontColor.value;
      updateHeaderPreview();
      compareData();
    } else {
      data["header-font-color"] = "#333333";
      updateHeaderPreview();
      compareData();
    }
  });

  floatFontColor.addEventListener("input", function() {
    if ((floatFontColor.value.charAt(0) === "#" && floatFontColor.value.length === 7) || (floatFontColor.value.charAt(0) === "#" && floatFontColor.value.length === 4)) {
      data["header-float-font-color"] = floatFontColor.value;
      updateHeaderPreview();
      compareData();
    } else {
      data["header-float-font-color"] = "#ffffff";
      updateHeaderPreview();
      compareData();
    }
  });

  header.addEventListener("change", function(e) {
    if (header.checked) {
      data["show-header"] = true;
      updateHeaderPreview();
      compareData();
    } else {
      data["show-header"] = false;
      updateHeaderPreview();
      compareData();
    }
  });

  weather.addEventListener("change", function(e) {
    if (weather.checked) {
      data["show-weather"] = true;
      headerWeatherPreview.style.display = "inherit";
      compareData();
    } else {
      data["show-weather"] = false;
      headerWeatherPreview.style.display = "none";
      compareData();
    }
  });

  clock.addEventListener("change", function(e) {
    if (clock.checked) {
      data["show-clock"] = true;
      updateHeaderPreview();
      compareData();
    } else {
      data["show-clock"] = false;
      updateHeaderPreview();
      compareData();
    }
  });

  format.addEventListener("change", function(e) {
    if (format.checked) {
      data["time"]["timeFormat"] = "12";
      updateHeaderPreview();
      compareData();
    } else {
      data["time"]["timeFormat"] = "24";
      updateHeaderPreview();
      compareData();
    }
  });

  weekday.addEventListener("change", function(e) {
    if (weekday.checked) {
      data["time"]["show-weekday"] = true;
      updateHeaderPreview();
      compareData();
    } else {
      data["time"]["show-weekday"] = false;
      updateHeaderPreview();
      compareData();
    }
  });

  month.addEventListener("change", function(e) {
    if (month.checked) {
      data["time"]["show-month"] = true;
      updateHeaderPreview();
      compareData();
    } else {
      data["time"]["show-month"] = false;
      updateHeaderPreview();
      compareData();
    }
  });

  day.addEventListener("change", function(e) {
    if (day.checked) {
      data["time"]["show-day"] = true;
      updateHeaderPreview();
      compareData();
    } else {
      data["time"]["show-day"] = false;
      updateHeaderPreview();
      compareData();
    }
  });

  year.addEventListener("change", function(e) {
    if (year.checked) {
      data["time"]["show-year"] = true;
      updateHeaderPreview();
      compareData();
    } else {
      data["time"]["show-year"] = false;
      updateHeaderPreview();
      compareData();
    }
  });

  time.addEventListener("change", function(e) {
    if (time.checked) {
      data["time"]["show-time"] = true;
      updateHeaderPreview();
      compareData();
    } else {
      data["time"]["show-time"] = false;
      updateHeaderPreview();
      compareData();
    }
  });

  timeOfDay.addEventListener("change", function(e) {
    if (timeOfDay.checked) {
      data["time"]["show-timeofday"] = true;
      updateHeaderPreview();
      compareData();
    } else {
      data["time"]["show-timeofday"] = false;
      updateHeaderPreview();
      compareData();
    }
  });

  function updateHeaderPreview() {
    var headerPreview = document.getElementsByClassName("settings-header-preview")[0];
    var headerRightPreview = document.getElementsByClassName("header-right")[0];
    var headerDatePreview = document.getElementsByClassName("header-date")[0];
    var headerTimePreview = document.getElementsByClassName("header-time")[0];

    if (data["show-header"]) {
      headerPreview.style.backgroundColor = data["header-background-color"];
      headerPreview.style.color = data["header-font-color"];
    } else {
      headerPreview.style.backgroundColor = "#fafafa";
      headerPreview.style.color = data["header-float-font-color"];
    }

    if (data["show-clock"]) {
      headerDatePreview.style.visibility = "visible";
      headerTimePreview.style.visibility = "visible";
    } else {
      headerDatePreview.style.visibility = "hidden";
      headerTimePreview.style.visibility = "hidden";
    }

    clearInterval(interval);
    initClock(headerDatePreview, headerTimePreview);
  }
}

function setShortcutOptions() {
  var opacity = document.getElementById("card-opacity");
  var backgroundOpacity = document.getElementById("card-background-opacity");
  var backgroundColor = document.getElementById("card-background-color");
  var fontColor = document.getElementById("card-font-color");
  var icon = document.getElementById("card-icon");
  var iconReset = document.getElementById("reset-icon");
  var height = document.getElementById("card-height");
  var width = document.getElementById("card-width");
  var resetCards = document.getElementById("reset-cards");
  var shadow = document.getElementById("card-shadow");
  var borderRadius = document.getElementById("card-border-radius");
  var cardPreview = document.getElementsByClassName("shortcut-card-test")[0];
  var iconPreview = document.getElementsByClassName("shortcut-icon-test")[0];
  var namePreview = document.getElementsByClassName("shortcut-name-test")[0];
  var numReg = /^\d+$/;

  opacity.addEventListener("change", function() {
    data["card-opacity"] = (opacity.value / 100).toString();
    cardPreview.style.opacity = data["card-opacity"];
    compareData();
  });

  backgroundOpacity.addEventListener("change", function() {
    data["card-background-opacity"] = (backgroundOpacity.value / 100).toString();
    cardPreview.style.backgroundColor = cardBackground();
    compareData();
  });

  backgroundColor.addEventListener("input", function() {
    if ((backgroundColor.value.charAt(0) === "#" && backgroundColor.value.length === 7) || (backgroundColor.value.charAt(0) === "#" && backgroundColor.value.length === 4)) {
      if (backgroundColor.value.length === 4 && backgroundColor.value.charAt(1) === backgroundColor.value.charAt(2) && backgroundColor.value.charAt(1) === backgroundColor.value.charAt(3)) {
        data["card-background-color"] = backgroundColor.value + backgroundColor.value.substring(1);
      } else {
        data["card-background-color"] = backgroundColor.value;
      }

      try {
        cardPreview.style.backgroundColor = cardBackground();
      } catch(e) {

      }

      compareData();
    } else {
      data["card-background-color"] = defaultData["card-background-color"];
      cardPreview.style.backgroundColor = cardBackground();
      compareData();
    }
  });

  fontColor.addEventListener("input", function() {
    if ((fontColor.value.charAt(0) === "#" && fontColor.value.length === 7) || (fontColor.value.charAt(0) === "#" && fontColor.value.length === 4)) {
      data["card-font-color"] = fontColor.value;
      namePreview.style.color = data["card-font-color"];
      compareData();
    } else {
      data["card-font-color"] = defaultData["card-font-color"];
      namePreview.style.color = data["card-font-color"];
      compareData();
    }
  });

  icon.addEventListener("change", function() {
    var file = icon.files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function() {
      data["card-default-icon"] = reader.result;
      iconPreview.src = data["card-default-icon"];
      compareData();
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  });

  iconReset.addEventListener("click", function() {
    data["card-default-icon"] = defaultData["card-default-icon"];
    iconPreview.src = data["card-default-icon"];
    compareData();
  });

  height.addEventListener("input", function() {
    if (numReg.test(height.value)) {
      data["card-height"] = height.value + "px";
      cardPreview.style.height = data["card-height"];
      compareData();
    } else {
      data["card-height"] = defaultData["card-height"];
      cardPreview.style.height = data["card-height"];
      compareData();
    }
  });

  width.addEventListener("input", function() {
    if (numReg.test(width.value)) {
      data["card-width"] =  width.value + "px";
      cardPreview.style.width = data["card-width"];
      if (parseInt(data["card-width"].substring(0, 3)) < 150) {
        namePreview.style.fontSize = "12px";
      } else {
        namePreview.style.fontSize = "16px";
      }
      compareData();
    } else {
      data["card-width"] = defaultData["card-width"];
      cardPreview.style.width = data["card-width"];
      namePreview.style.fontSize = "12px";
      compareData();
    }
  });

  shadow.addEventListener("change", function(e) {
    if (shadow.checked) {
      data["card-shadow"] = true;
      cardPreview.style.boxShadow = "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)";
      compareData();
    } else {
      data["card-shadow"] = false;
      cardPreview.style.boxShadow = "none";
      compareData();
    }
  });

  borderRadius.addEventListener("input", function() {
    if (numReg.test(borderRadius.value)) {
      data["card-border-radius"] =  borderRadius.value + "px";
      cardPreview.style.borderRadius = data["card-border-radius"];
      compareData();
    } else {
      data["card-border-radius"] = defaultData["card-border-radius"];
      cardPreview.style.borderRadius = data["card-border-radius"];
      compareData();
    }
  });

  resetCards.addEventListener("click", function() {
    if (confirm("Are you sure you'd like to reset your card settings to default? Note: This will not remove your custom shortcuts.")) {
      data["card-opacity"] = defaultData["card-opacity"];
      cardPreview.style.opacity = data["card-opacity"];
      opacity.value = parseFloat(defaultData["card-opacity"], 10) * 100;
      data["card-background-opacity"] = defaultData["card-background-opacity"];
      backgroundOpacity.value = parseFloat(defaultData["card-background-opacity"], 10) * 100;
      data["card-background-color"] = defaultData["card-background-color"];
      cardPreview.style.backgroundColor = cardBackground();
      backgroundColor.value = defaultData["card-background-color"];
      data["card-font-color"] = defaultData["card-font-color"];
      namePreview.style.color = data["card-font-color"];
      namePreview.style.fontSize = "12px";
      fontColor.value = defaultData["card-font-color"];
      data["card-default-icon"] = defaultData["card-default-icon"];
      iconPreview.src = data["card-default-icon"];
      data["card-height"] = defaultData["card-height"];
      cardPreview.style.height = data["card-height"];
      height.value = defaultData["card-height"].slice(0, defaultData["card-height"].length - 2);
      data["card-width"] = defaultData["card-width"];
      cardPreview.style.width = data["card-width"];
      width.value = defaultData["card-width"].slice(0, defaultData["card-width"].length - 2);
      data["card-shadow"] = false;
      cardPreview.style.boxShadow = "none";
      shadow.checked = false;
      data["card-border-radius"] = defaultData["card-border-radius"];
      cardPreview.style.borderRadius = data["card-border-radius"];
      borderRadius.value = data["card-border-radius"].slice(0, data["card-border-radius"].length - 2);
      compareData();
    }
  });
}

function manageData() {
  var reset = document.getElementById("reset-shortcuts");
  var resetAll = document.getElementById("reset-all");
  var delet = document.getElementById("delete-shortcuts");
  var download = document.getElementById("download-data");
  var upload = document.getElementById("upload-data");

  reset.addEventListener("click", function() {
    if (confirm("Are you sure you want to reset all of the shortcuts?")) {
      data["cards"] = defaultData["cards"];
      data["card-reset"] = true;
      compareData();
    }
  });

  resetAll.addEventListener("click", function() {
    if (confirm("Are you sure you want to reset all of your settings, including your shortcuts?")) {
      if (confirm("Are you really sure? It cannot be undone!")) {
        data = defaultData;
        data["card-reset"] = true;
        compareData();
        setTimeout(function() {
          window.location.reload();
        }, 1000);
      }
    }
  });

  delet.addEventListener("click", function() {
    if (confirm("Are you sure you want to delete all shortcuts?")) {
      data["cards"] = {};
      data["card-reset"] = true;
      compareData();
    }
  });

  download.addEventListener("click", function(e) {
    var uriContent = "data:text/plain," + encodeURIComponent(JSON.stringify(data));
    e.target.href = uriContent;
    e.target.download = "myhometabdata.json";
  });

  upload.addEventListener("change", function(e) {
    var reader = new FileReader();
    var file = e.target.files[0];
    var uploadData = "";

    reader.addEventListener("load", function(e) {
      uploadData = JSON.parse(reader.result);
      data = uploadData;
      data["card-reset"] = true;
      compareData();
      upload.value = "";
      alert("Your data has been uploaded.");
    }, false);

    if (file) {
      reader.readAsText(file);
    }
  });
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
      timeHeader.style.display = "initial";
    } else {
      timeHeader.style.display = "none";
    }

    dateHeader.innerHTML = dateString;
    timeHeader.innerHTML = timeString;
  }
  interval = setInterval(updateClock, 10000);
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

function cardBackground() {
  backgroundOpacity = data["card-background-opacity"];
  backgroundColor = data["card-background-color"];
  rgb = hexToRgb(backgroundColor);
  cssColor = "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + backgroundOpacity + ")";
  return cssColor;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
