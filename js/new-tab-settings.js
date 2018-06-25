var data = null;
var defaultData = {
  "background-color": "#03a9f4",
  "background-image": "0",
  "background-option": "color",
  "card-background-opacity": "1",
  "card-default-icon": "images/shortcut_icon.png",
  "card-opacity": "1",
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
    initSettings()
  });
}

function setData() {
  chrome.storage.local.set(data, function() {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError);
    }
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
  var headerColor = document.getElementById("header-background-color");
  var header = document.getElementById("show-header");
  var clock = document.getElementById("show-clock");
  var format = document.getElementById("time-format");
  var weekday = document.getElementById("show-weekday");
  var month = document.getElementById("show-month");
  var day = document.getElementById("show-day");
  var year = document.getElementById("show-year");
  var time = document.getElementById("show-time");
  var timeOfDay = document.getElementById("show-timeofday");

  headerColor.value = data["header-background-color"];

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

  opacity.value = parseFloat(data["card-opacity"], 10) * 100;
  backgroundOpacity.value = parseFloat(data["card-background-opacity"], 10) * 100;
  backgroundColor.value = data["card-background-color"];
}

function setBackgroundOptions() {
  var radioColor = document.getElementById("background-color-option");
  var radioImage = document.getElementById("background-image-option");
  var color = document.getElementById("background-color");
  var image = document.getElementById("background-image");

  radioColor.addEventListener("change", function() {
    if (radioColor.checked) {
      data["background-option"] = "color";
      setData();
    }
  });

  radioImage.addEventListener("change", function() {
    if (radioImage.checked) {
      data["background-option"] = "image";
      setData();
    }
  });

  color.addEventListener("input", function() {
    if (color.value.length === 7 || color.value.length === 4) {
      data["background-color"] = color.value;
      setData();
    } else {
      data["background-color"] = "#03a9f4";
      setData();
    }
  });

  image.addEventListener("change", function() {
    var file = image.files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function() {
      data["background-image"] = reader.result;
      setData();
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  });
}

function setHeaderOptions() {
  var headerColor = document.getElementById("header-background-color");
  var header = document.getElementById("show-header");
  var clock = document.getElementById("show-clock");
  var format = document.getElementById("time-format");
  var weekday = document.getElementById("show-weekday");
  var month = document.getElementById("show-month");
  var day = document.getElementById("show-day");
  var year = document.getElementById("show-year");
  var time = document.getElementById("show-time");
  var timeOfDay = document.getElementById("show-timeofday");

  headerColor.addEventListener("input", function() {
    if (headerColor.value.length === 7 || headerColor.value.length === 4) {
      data["header-background-color"] = headerColor.value;
      setData();
    } else {
      data["header-background-color"] = "#fafafa";
      setData();
    }
  });

  header.addEventListener("change", function(e) {
    if (header.checked) {
      data["show-header"] = true;
      setData();
    } else {
      data["show-header"] = false;
      setData();
    }
  });

  clock.addEventListener("change", function(e) {
    if (clock.checked) {
      data["show-clock"] = true;
      setData();
    } else {
      data["show-clock"] = false;
      setData();
    }
  });

  format.addEventListener("change", function(e) {
    if (format.checked) {
      data["time"]["timeFormat"] = "12";
      setData();
    } else {
      data["time"]["timeFormat"] = "24";
      setData();
    }
  });

  weekday.addEventListener("change", function(e) {
    if (weekday.checked) {
      data["time"]["show-weekday"] = true;
      setData();
    } else {
      data["time"]["show-weekday"] = false;
      setData();
    }
  });

  month.addEventListener("change", function(e) {
    if (month.checked) {
      data["time"]["show-month"] = true;
      setData();
    } else {
      data["time"]["show-month"] = false;
      setData();
    }
  });

  day.addEventListener("change", function(e) {
    if (day.checked) {
      data["time"]["show-day"] = true;
      setData();
    } else {
      data["time"]["show-day"] = false;
      setData();
    }
  });

  year.addEventListener("change", function(e) {
    if (year.checked) {
      data["time"]["show-year"] = true;
      setData();
    } else {
      data["time"]["show-year"] = false;
      setData();
    }
  });

  time.addEventListener("change", function(e) {
    if (time.checked) {
      data["time"]["show-time"] = true;
      setData();
    } else {
      data["time"]["show-time"] = false;
      setData();
    }
  });

  timeOfDay.addEventListener("change", function(e) {
    if (timeOfDay.checked) {
      data["time"]["show-timeofday"] = true;
      setData();
    } else {
      data["time"]["show-timeofday"] = false;
      setData();
    }
  });
}

function setShortcutOptions() {
  var opacity = document.getElementById("card-opacity");
  var backgroundOpacity = document.getElementById("card-background-opacity");
  var backgroundColor = document.getElementById("card-background-color");
  var icon = document.getElementById("card-icon");
  var iconReset = document.getElementById("reset-icon");

  opacity.addEventListener("change", function() {
    data["card-opacity"] = (opacity.value / 100).toString();
    setData();
  });

  backgroundOpacity.addEventListener("change", function() {
    data["card-background-opacity"] = (backgroundOpacity.value / 100).toString();
    setData();
  });

  backgroundColor.addEventListener("input", function() {
    if (backgroundColor.value.length === 7 || backgroundColor.value.length === 4) {
      data["card-background-color"] = backgroundColor.value;
      setData();
    } else {
      data["card-background-color"] = "#ffffff";
      setData();
    }
  });

  icon.addEventListener("change", function() {
    var file = icon.files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function() {
      data["card-default-icon"] = reader.result;
      setData();
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  });

  iconReset.addEventListener("click", function() {
    data["card-default-icon"] = "images/shortcut_icon.png";
    setData();
  });
}

function manageData() {
  var reset = document.getElementById("reset-shortcuts");
  var delet = document.getElementById("delete-shortcuts");
  var download = document.getElementById("download-data");
  var upload = document.getElementById("upload-data");

  reset.addEventListener("click", function() {
    if (confirm("Are you sure you want to reset all of the shortcuts?")) {
      data["cards"] = defaultData["cards"];
      setData();
    }
  });

  delet.addEventListener("click", function() {
    if (confirm("Are you sure you want to delete all shortcuts?")) {
      data["cards"] = {};
      setData();
    }
  });

  download.addEventListener("click", function(e) {
    var uriContent = "data:application/octet-stream," + encodeURIComponent(JSON.stringify(data));
    e.target.href = uriContent;
    e.target.download = "myhometabdata.txt";
  });

  upload.addEventListener("change", function(e) {
    var reader = new FileReader();
    var file = e.target.files[0];
    var uploadData = "";

    reader.addEventListener("load", function(e) {
      uploadData = JSON.parse(reader.result);
      data = uploadData;
      setData();
    }, false);

    if (file) {
      reader.readAsText(file);
    }
  });
}
