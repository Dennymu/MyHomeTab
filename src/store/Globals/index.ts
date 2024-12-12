import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'globals',
  initialState: {
    background_image: '',
    background_image_use_default: true,
    clock_format: '12',
    clock_show: true,
    modal_data: null,
    modal_show: false,
    modal_type: '',
    shortcuts: [
      {
        name: 'Google',
        url: 'https://www.google.com/',
        icon: 'images/google_icon.png',
      },
      {
        name: 'Gmail',
        url: 'https://mail.google.com/',
        icon: 'images/gmail_icon.png',
      },
      {
        name: 'Google Calendar',
        url: 'https://calendar.google.com/',
        icon: 'images/google_calendar_icon.png',
      },
      {
        name: 'Google Drive',
        url: 'https://drive.google.com/',
        icon: 'images/google_drive_icon.png',
      },
      {
        name: 'Google Maps',
        url: 'https://www.google.com/maps/',
        icon: 'images/maps_icon.png',
      },
      {
        name: 'Google Photos',
        url: 'https://photos.google.com/',
        icon: 'images/google_photos_icon.png',
      },
      {
        name: 'YouTube Music',
        url: 'https://music.youtube.com/',
        icon: 'images/Youtube_Music_icon.svg.png',
      },
      {
        name: 'Google Keep',
        url: 'https://keep.google.com/',
        icon: 'images/google_keep_icon.png',
      },
      {
        name: 'Youtube',
        url: 'https://www.youtube.com/',
        icon: 'images/youtube_icon.png',
      },
      {
        name: 'Amazon',
        url: 'https://www.amazon.com/',
        icon: 'images/amazon_icon.png',
      },
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/',
        icon: 'images/facebook_icon.png',
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com/',
        icon: 'images/twitter_icon.png',
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/',
        icon: 'images/instagram_icon.png',
      },
      {
        name: 'Reddit',
        url: 'https://www.reddit.com/',
        icon: 'images/reddit_icon.png',
      },
      {
        name: 'Netflix',
        url: 'https://www.netflix.com/',
        icon: 'images/netflix_icon.png',
      },
    ],
    shortcuts_show_name: true,
    weather_link: 'https://www.weather.com',
    weather_show: true,
    weather_unit: 'F',
  },
  reducers: {
    setGlobals: (state, { payload }) => {
      if (typeof payload !== 'undefined') {
        if ('background_image' in payload) {
          state.background_image = payload.background_image;
        }

        if ('background_image_use_default' in payload) {
          state.background_image_use_default =
            payload.background_image_use_default;
        }

        if ('clock_format' in payload) {
          state.clock_format = payload.clock_format;
        }

        if ('clock_show' in payload) {
          state.clock_show = payload.clock_show;
        }

        if ('modal_data' in payload) {
          state.modal_data = payload.modal_data;
        }

        if ('modal_show' in payload) {
          state.modal_show = payload.modal_show;
        }

        if ('modal_type' in payload) {
          state.modal_type = payload.modal_type;
        }

        if ('shortcuts' in payload) {
          state.shortcuts = payload.shortcuts;
        }

        if ('shortcuts_show_name' in payload) {
          state.shortcuts_show_name = payload.shortcuts_show_name;
        }

        if ('weather_link' in payload) {
          state.weather_link = payload.weather_link;
        }

        if ('weather_show' in payload) {
          state.weather_show = payload.weather_show;
        }

        if ('weather_unit' in payload) {
          state.weather_unit = payload.weather_unit;
        }
      }
    },
    unsetGlobals: (state) => {
      state.background_image = '';
      state.background_image_use_default = true;
      state.clock_format = '12';
      state.clock_show = true;
      state.modal_data = null;
      state.modal_show = false;
      state.modal_type = '';
      state.shortcuts_show_name = true;
      state.weather_link = 'https://www.weather.com';
      state.weather_show = true;
      state.weather_unit = 'F';
    },
    unsetShortcuts: (state) => {
      state.shortcuts = [
        {
          name: 'Google',
          url: 'https://www.google.com/',
          icon: 'images/google_icon.png',
        },
        {
          name: 'Gmail',
          url: 'https://mail.google.com/',
          icon: 'images/gmail_icon.png',
        },
        {
          name: 'Google Calendar',
          url: 'https://calendar.google.com/',
          icon: 'images/google_calendar_icon.png',
        },
        {
          name: 'Google Drive',
          url: 'https://drive.google.com/',
          icon: 'images/google_drive_icon.png',
        },
        {
          name: 'Google Maps',
          url: 'https://www.google.com/maps/',
          icon: 'images/maps_icon.png',
        },
        {
          name: 'Google Photos',
          url: 'https://photos.google.com/',
          icon: 'images/google_photos_icon.png',
        },
        {
          name: 'YouTube Music',
          url: 'https://music.youtube.com/',
          icon: 'images/Youtube_Music_icon.svg.png',
        },
        {
          name: 'Google Keep',
          url: 'https://keep.google.com/',
          icon: 'images/google_keep_icon.png',
        },
        {
          name: 'Youtube',
          url: 'https://www.youtube.com/',
          icon: 'images/youtube_icon.png',
        },
        {
          name: 'Amazon',
          url: 'https://www.amazon.com/',
          icon: 'images/amazon_icon.png',
        },
        {
          name: 'Facebook',
          url: 'https://www.facebook.com/',
          icon: 'images/facebook_icon.png',
        },
        {
          name: 'Twitter',
          url: 'https://twitter.com/',
          icon: 'images/twitter_icon.png',
        },
        {
          name: 'Instagram',
          url: 'https://www.instagram.com/',
          icon: 'images/instagram_icon.png',
        },
        {
          name: 'Reddit',
          url: 'https://www.reddit.com/',
          icon: 'images/reddit_icon.png',
        },
        {
          name: 'Netflix',
          url: 'https://www.netflix.com/',
          icon: 'images/netflix_icon.png',
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
    modal_data: object;
    modal_show: boolean;
    modal_type: string;
    shortcuts: [{ [key: string]: string }];
    shortcuts_show_name: boolean;
    weather_link: string;
    weather_show: boolean;
    weather_unit: string;
  };
}) => state.globals;

export const { setGlobals, unsetGlobals, unsetShortcuts } = slice.actions;

export default slice.reducer;
