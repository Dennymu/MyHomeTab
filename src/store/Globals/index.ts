import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "globals",
  initialState: {
    background_image: "",
    background_image_use_default: true,
    clock_format: "12",
    clock_show: true,
    clock_show_date: true,
    clock_show_time: true,
    modal_data: null,
    modal_show: false,
    modal_type: "",
    shortcuts: [
      {
        id: "1",
        name: "Google",
        url: "https://www.google.com/",
        icon: "images/google_icon.png",
      },
      {
        id: "2",
        name: "Gmail",
        url: "https://mail.google.com/",
        icon: "images/gmail_icon.png",
      },
      {
        id: "3",
        name: "Google Calendar",
        url: "https://calendar.google.com/",
        icon: "images/google_calendar_icon.png",
      },
      {
        id: "4",
        name: "Google Drive",
        url: "https://drive.google.com/",
        icon: "images/google_drive_icon.png",
      },
      {
        id: "5",
        name: "Google Maps",
        url: "https://www.google.com/maps/",
        icon: "images/maps_icon.png",
      },
      {
        id: "6",
        name: "Google Photos",
        url: "https://photos.google.com/",
        icon: "images/google_photos_icon.png",
      },
      {
        id: "7",
        name: "YouTube Music",
        url: "https://music.youtube.com/",
        icon: "images/Youtube_Music_icon.svg.png",
      },
      {
        id: "8",
        name: "Google Keep",
        url: "https://keep.google.com/",
        icon: "images/google_keep_icon.png",
      },
      {
        id: "9",
        name: "Youtube",
        url: "https://www.youtube.com/",
        icon: "images/youtube_icon.png",
      },
      {
        id: "10",
        name: "Amazon",
        url: "https://www.amazon.com/",
        icon: "images/amazon_icon.png",
      },
      {
        id: "11",
        name: "Facebook",
        url: "https://www.facebook.com/",
        icon: "images/facebook_icon.png",
      },
      {
        id: "12",
        name: "Twitter",
        url: "https://twitter.com/",
        icon: "images/twitter_icon.png",
      },
      {
        id: "13",
        name: "Instagram",
        url: "https://www.instagram.com/",
        icon: "images/instagram_icon.png",
      },
      {
        id: "14",
        name: "Reddit",
        url: "https://www.reddit.com/",
        icon: "images/reddit_icon.png",
      },
      {
        id: "15",
        name: "Netflix",
        url: "https://www.netflix.com/",
        icon: "images/netflix_icon.png",
      },
      {
        id: "16",
        name: "Hulu",
        url: "https://www.hulu.com/",
        icon: "images/hulu_icon.png",
      },
      {
        id: "17",
        name: "Disney",
        url: "https://www.disneyplus.com/home",
        icon: "images/disney_plus_icon.png",
      },
      {
        id: "18",
        name: "Max",
        url: "https://www.max.com/",
        icon: "images/max_icon.webp",
      },
      {
        id: "19",
        name: "F1TV",
        url: "https://f1tv.formula1.com/",
        icon: "images/f1_icon.png",
      },
      {
        id: "20",
        name: "Prime Video",
        url: "https://www.amazon.com/gp/video/storefront",
        icon: "images/prime_icon.png",
      },
      {
        id: "21",
        name: "Paramount+",
        url: "https://www.paramountplus.com/home/",
        icon: "images/paramount_plus_icon.png",
      },
      {
        id: "22",
        name: "Peacock",
        url: "https://www.peacocktv.com/",
        icon: "images/peacock_icon.jfif",
      },
    ],
    shortcuts_active_index: null,
    shortcuts_open_modal: false,
    shortcuts_show_edit: false,
    shortcuts_show_name: true,
    weather_link: "https://www.weather.com",
    weather_show: true,
    weather_unit: "F",
  },
  reducers: {
    setGlobals: (state, { payload }) => {
      if (typeof payload !== "undefined") {
        if ("background_image" in payload) {
          state.background_image = payload.background_image;
        }

        if ("background_image_use_default" in payload) {
          state.background_image_use_default =
            payload.background_image_use_default;
        }

        if ("clock_format" in payload) {
          state.clock_format = payload.clock_format;
        }

        if ("clock_show" in payload) {
          state.clock_show = payload.clock_show;
        }

        if ("clock_show_date" in payload) {
          state.clock_show_date = payload.clock_show_date;
        }

        if ("clock_show_time" in payload) {
          state.clock_show_time = payload.clock_show_time;
        }

        if ("modal_data" in payload) {
          state.modal_data = payload.modal_data;
        }

        if ("modal_show" in payload) {
          state.modal_show = payload.modal_show;
        }

        if ("modal_type" in payload) {
          state.modal_type = payload.modal_type;
        }

        if ("shortcuts" in payload) {
          state.shortcuts = payload.shortcuts;
        }

        if ("shortcuts_active_index" in payload) {
          state.shortcuts_active_index = payload.shortcuts_active_index;
        }

        if ("shortcuts_open_modal" in payload) {
          state.shortcuts_open_modal = payload.shortcuts_open_modal;
        }

        if ("shortcuts_show_edit" in payload) {
          state.shortcuts_show_edit = payload.shortcuts_show_edit;
        }

        if ("shortcuts_show_name" in payload) {
          state.shortcuts_show_name = payload.shortcuts_show_name;
        }

        if ("weather_link" in payload) {
          state.weather_link = payload.weather_link;
        }

        if ("weather_show" in payload) {
          state.weather_show = payload.weather_show;
        }

        if ("weather_unit" in payload) {
          state.weather_unit = payload.weather_unit;
        }
      }
    },
    unsetGlobals: (state) => {
      state.background_image = "";
      state.background_image_use_default = true;
      state.clock_format = "12";
      state.clock_show = true;
      state.clock_show_date = true;
      state.clock_show_time = true;
      state.modal_data = null;
      state.modal_show = false;
      state.modal_type = "";
      state.shortcuts_active_index = null;
      state.shortcuts_open_modal = false;
      state.shortcuts_show_edit = false;
      state.shortcuts_show_name = true;
      state.weather_link = "https://www.weather.com";
      state.weather_show = true;
      state.weather_unit = "F";
    },
    unsetShortcuts: (state) => {
      state.shortcuts = [
        {
          id: "1",
          name: "Google",
          url: "https://www.google.com/",
          icon: "images/google_icon.png",
        },
        {
          id: "2",
          name: "Gmail",
          url: "https://mail.google.com/",
          icon: "images/gmail_icon.png",
        },
        {
          id: "3",
          name: "Google Calendar",
          url: "https://calendar.google.com/",
          icon: "images/google_calendar_icon.png",
        },
        {
          id: "4",
          name: "Google Drive",
          url: "https://drive.google.com/",
          icon: "images/google_drive_icon.png",
        },
        {
          id: "5",
          name: "Google Maps",
          url: "https://www.google.com/maps/",
          icon: "images/maps_icon.png",
        },
        {
          id: "6",
          name: "Google Photos",
          url: "https://photos.google.com/",
          icon: "images/google_photos_icon.png",
        },
        {
          id: "7",
          name: "YouTube Music",
          url: "https://music.youtube.com/",
          icon: "images/Youtube_Music_icon.svg.png",
        },
        {
          id: "8",
          name: "Google Keep",
          url: "https://keep.google.com/",
          icon: "images/google_keep_icon.png",
        },
        {
          id: "9",
          name: "Youtube",
          url: "https://www.youtube.com/",
          icon: "images/youtube_icon.png",
        },
        {
          id: "10",
          name: "Amazon",
          url: "https://www.amazon.com/",
          icon: "images/amazon_icon.png",
        },
        {
          id: "11",
          name: "Facebook",
          url: "https://www.facebook.com/",
          icon: "images/facebook_icon.png",
        },
        {
          id: "12",
          name: "Twitter",
          url: "https://twitter.com/",
          icon: "images/twitter_icon.png",
        },
        {
          id: "13",
          name: "Instagram",
          url: "https://www.instagram.com/",
          icon: "images/instagram_icon.png",
        },
        {
          id: "14",
          name: "Reddit",
          url: "https://www.reddit.com/",
          icon: "images/reddit_icon.png",
        },
        {
          id: "15",
          name: "Netflix",
          url: "https://www.netflix.com/",
          icon: "images/netflix_icon.png",
        },
        {
          id: "16",
          name: "Hulu",
          url: "https://www.hulu.com/",
          icon: "images/hulu_icon.png",
        },
        {
          id: "17",
          name: "Disney",
          url: "https://www.disneyplus.com/home",
          icon: "images/disney_plus_icon.png",
        },
        {
          id: "18",
          name: "Max",
          url: "https://www.max.com/",
          icon: "images/max_icon.webp",
        },
        {
          id: "19",
          name: "F1TV",
          url: "https://f1tv.formula1.com/",
          icon: "images/f1_icon.png",
        },
        {
          id: "20",
          name: "Prime Video",
          url: "https://www.amazon.com/gp/video/storefront",
          icon: "images/prime_icon.png",
        },
        {
          id: "21",
          name: "Paramount+",
          url: "https://www.paramountplus.com/home/",
          icon: "images/paramount_plus_icon.png",
        },
        {
          id: "22",
          name: "Peacock",
          url: "https://www.peacocktv.com/",
          icon: "images/peacock_icon.jfif",
        },
      ];
    },
  },
});

export const selectGlobals = (state: {
  globals: {
    background_image: string;
    background_image_use_default: boolean;
    clock_format: string;
    clock_show: boolean;
    clock_show_date: boolean;
    clock_show_time: boolean;
    modal_data: object;
    modal_show: boolean;
    modal_type: string;
    shortcuts: [{ [key: string]: string; id: string }];
    shortcuts_active_index: number | null;
    shortcuts_open_modal: boolean;
    shortcuts_show_edit: boolean;
    shortcuts_show_name: boolean;
    weather_link: string;
    weather_show: boolean;
    weather_unit: string;
  };
}) => state.globals;

export const { setGlobals, unsetGlobals, unsetShortcuts } = slice.actions;

export default slice.reducer;
