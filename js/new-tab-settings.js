var data = null;
var defaultData = {
  "background-color": "#03a9f4",
  "background-image": "0",
  "background-option": "color",
  "card-background-color": "#ffffff",
  "card-background-opacity": "1",
  "card-default-icon": "images/shortcut_icon.png",
  "card-font-color": "#333333",
  "card-height": "140px",
  "card-opacity": "1",
  "card-reset": false,
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
  "header-font-color": "#333333",
  "header-float-font-color": "#ffffff",
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

  if (data["background-option"] === "color") {
    radioColor.checked = true;
    radioImage.checked = false;
    color.value = data["background-color"];
  } else {
    radioColor.checked = false;
    radioImage.checked = true;
    color.value = data["background-color"];
  }
}

function getHeaderOptions() {
  var headerBackgroundColor = document.getElementById("header-background-color");
  var headerFontColor = document.getElementById("header-font-color");
  var floatFontColor = document.getElementById("header-float-font-color");
  var header = document.getElementById("show-header");
  var clock = document.getElementById("show-clock");
  var format = document.getElementById("time-format");
  var weekday = document.getElementById("show-weekday");
  var month = document.getElementById("show-month");
  var day = document.getElementById("show-day");
  var year = document.getElementById("show-year");
  var time = document.getElementById("show-time");
  var timeOfDay = document.getElementById("show-timeofday");

  headerBackgroundColor.value = data["header-background-color"];
  headerFontColor.value = data["header-font-color"];
  floatFontColor.value = data["header-float-font-color"];

  if (data["show-header"]) {
    header.checked = true;
  }

  if (data["show-clock"]) {
    clock.checked = true;
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
}

function getShortcutOptions() {
  var opacity = document.getElementById("card-opacity");
  var backgroundOpacity = document.getElementById("card-background-opacity");
  var backgroundColor = document.getElementById("card-background-color");
  var fontColor = document.getElementById("card-font-color");
  var height = document.getElementById("card-height");
  var width = document.getElementById("card-width");

  opacity.value = parseFloat(data["card-opacity"], 10) * 100;
  backgroundOpacity.value = parseFloat(data["card-background-opacity"], 10) * 100;
  backgroundColor.value = data["card-background-color"];
  fontColor.value = data["card-font-color"];
  height.value = data["card-height"].slice(0, data["card-height"].length - 2);
  width.value = data["card-width"].slice(0, data["card-width"].length - 2);
}

function setBackgroundOptions() {
  var radioColor = document.getElementById("background-color-option");
  var radioImage = document.getElementById("background-image-option");
  var color = document.getElementById("background-color");
  var image = document.getElementById("background-image");

  radioColor.addEventListener("change", function() {
    if (radioColor.checked) {
      data["background-option"] = "color";
      compareData();
    }
  });

  radioImage.addEventListener("change", function() {
    if (radioImage.checked) {
      data["background-option"] = "image";
      compareData();
    }
  });

  color.addEventListener("input", function() {
    if ((color.value.charAt(0) === "#" && color.value.length === 7) || (color.value.charAt(0) === "#" && color.value.length === 4)) {
      data["background-color"] = color.value;
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
      compareData();
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  });
}

function setHeaderOptions() {
  var headerBackgroundColor = document.getElementById("header-background-color");
  var headerFontColor = document.getElementById("header-font-color");
  var floatFontColor = document.getElementById("header-float-font-color");
  var header = document.getElementById("show-header");
  var clock = document.getElementById("show-clock");
  var format = document.getElementById("time-format");
  var weekday = document.getElementById("show-weekday");
  var month = document.getElementById("show-month");
  var day = document.getElementById("show-day");
  var year = document.getElementById("show-year");
  var time = document.getElementById("show-time");
  var timeOfDay = document.getElementById("show-timeofday");

  headerBackgroundColor.addEventListener("input", function() {
    if ((headerBackgroundColor.value.charAt(0) === "#" && headerBackgroundColor.value.length === 7) || (headerBackgroundColor.value.charAt(0) === "#" && headerBackgroundColor.value.length === 4)) {
      data["header-background-color"] = headerBackgroundColor.value;
      compareData();
    } else {
      data["header-background-color"] = "#fafafa";
      compareData();
    }
  });

  headerFontColor.addEventListener("input", function() {
    if ((headerFontColor.value.charAt(0) === "#" && headerFontColor.value.length === 7) || (headerFontColor.value.charAt(0) === "#" && headerFontColor.value.length === 4)) {
      data["header-font-color"] = headerFontColor.value;
      compareData();
    } else {
      data["header-font-color"] = "#333333";
      compareData();
    }
  });

  floatFontColor.addEventListener("input", function() {
    if ((floatFontColor.value.charAt(0) === "#" && floatFontColor.value.length === 7) || (floatFontColor.value.charAt(0) === "#" && floatFontColor.value.length === 4)) {
      data["header-float-font-color"] = floatFontColor.value;
      compareData();
    } else {
      data["header-float-font-color"] = "#ffffff";
      compareData();
    }
  });

  header.addEventListener("change", function(e) {
    if (header.checked) {
      data["show-header"] = true;
      compareData();
    } else {
      data["show-header"] = false;
      compareData();
    }
  });

  clock.addEventListener("change", function(e) {
    if (clock.checked) {
      data["show-clock"] = true;
      compareData();
    } else {
      data["show-clock"] = false;
      compareData();
    }
  });

  format.addEventListener("change", function(e) {
    if (format.checked) {
      data["time"]["timeFormat"] = "12";
      compareData();
    } else {
      data["time"]["timeFormat"] = "24";
      compareData();
    }
  });

  weekday.addEventListener("change", function(e) {
    if (weekday.checked) {
      data["time"]["show-weekday"] = true;
      compareData();
    } else {
      data["time"]["show-weekday"] = false;
      compareData();
    }
  });

  month.addEventListener("change", function(e) {
    if (month.checked) {
      data["time"]["show-month"] = true;
      compareData();
    } else {
      data["time"]["show-month"] = false;
      compareData();
    }
  });

  day.addEventListener("change", function(e) {
    if (day.checked) {
      data["time"]["show-day"] = true;
      compareData();
    } else {
      data["time"]["show-day"] = false;
      compareData();
    }
  });

  year.addEventListener("change", function(e) {
    if (year.checked) {
      data["time"]["show-year"] = true;
      compareData();
    } else {
      data["time"]["show-year"] = false;
      compareData();
    }
  });

  time.addEventListener("change", function(e) {
    if (time.checked) {
      data["time"]["show-time"] = true;
      compareData();
    } else {
      data["time"]["show-time"] = false;
      compareData();
    }
  });

  timeOfDay.addEventListener("change", function(e) {
    if (timeOfDay.checked) {
      data["time"]["show-timeofday"] = true;
      compareData();
    } else {
      data["time"]["show-timeofday"] = false;
      compareData();
    }
  });
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
  var numReg = /^\d+$/;

  opacity.addEventListener("change", function() {
    data["card-opacity"] = (opacity.value / 100).toString();
    compareData();
  });

  backgroundOpacity.addEventListener("change", function() {
    data["card-background-opacity"] = (backgroundOpacity.value / 100).toString();
    compareData();
  });

  backgroundColor.addEventListener("input", function() {
    if (backgroundColor.value.charAt(0) === "#" && backgroundColor.value.length === 7) {
      data["card-background-color"] = backgroundColor.value;
      compareData();
    } else {
      data["card-background-color"] = defaultData["card-background-color"];
      compareData();
    }
  });

  fontColor.addEventListener("input", function() {
    if (fontColor.value.charAt(0) === "#" && fontColor.value.length === 7) {
      data["card-font-color"] = fontColor.value;
      compareData();
    } else {
      data["card-font-color"] = defaultData["card-font-color"];
      compareData();
    }
  });

  icon.addEventListener("change", function() {
    var file = icon.files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function() {
      data["card-default-icon"] = reader.result;
      compareData();
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  });

  iconReset.addEventListener("click", function() {
    data["card-default-icon"] = defaultData["card-default-icon"];
    compareData();
  });

  height.addEventListener("input", function() {
    if (numReg.test(height.value)) {
      data["card-height"] = height.value + "px";
      compareData();
    } else {
      data["card-height"] = defaultData["card-height"];
      compareData();
    }
  });

  width.addEventListener("input", function() {
    if (numReg.test(width.value)) {
      data["card-width"] =  width.value + "px";
      compareData();
    } else {
      data["card-width"] = defaultData["card-width"];
      compareData();
    }
  });

  resetCards.addEventListener("click", function() {
    if (confirm("Are you sure you'd like to reset your card settings to default? Note: This will not remove your custom shortcuts.")) {
      data["card-opacity"] = defaultData["card-opacity"];
      opacity.value = parseFloat(defaultData["card-opacity"], 10) * 100;
      data["card-background-opacity"] = defaultData["card-background-opacity"];
      backgroundOpacity.value = parseFloat(defaultData["card-background-opacity"], 10) * 100;
      data["card-background-color"] = defaultData["card-background-color"];
      backgroundColor.value = defaultData["card-background-color"];
      data["card-font-color"] = defaultData["card-font-color"];
      fontColor.value = defaultData["card-font-color"];
      data["card-default-icon"] = defaultData["card-default-icon"];
      data["card-height"] = defaultData["card-height"];
      height.value = defaultData["card-height"].slice(0, defaultData["card-height"].length - 2);
      data["card-width"] = defaultData["card-width"];
      width.value = defaultData["card-width"].slice(0, defaultData["card-width"].length - 2);
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
    var uriContent = "data:application/octet-stream," + encodeURIComponent(JSON.stringify(data));
    e.target.href = uriContent;
    e.target.download = "myhometabdata";
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
      alert("Your data has been uploaded.");
    }, false);

    if (file) {
      reader.readAsText(file);
    }
  });
}
