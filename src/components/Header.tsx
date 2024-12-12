// Importing react related
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Importing mantine
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

// Importing store
import { selectGlobals, setGlobals } from '../store/Globals';

// Importing ours
import { AddShortcutModal, SettingsModal } from '../components';

// Variables
let clockInterval: string | number | NodeJS.Timeout | undefined;

function Header() {
  // Required
  const dispatch = useDispatch();

  // Store
  const globals = useSelector(selectGlobals);

  // States
  const [weatherIcon, setWeatherIcon] = useState('sunny');
  const [weatherTitle, setWeatherTitle] = useState('Sunny');
  const [temperature, setTemperature] = useState(72);
  const [temperatureSymbol, setTemperatureSymbol] = useState('F');
  const [weatherLink, setWeatherLink] = useState('https://www.weather.com');
  const [showWeather, setShowWeather] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalType, setModalType] = useState('settings');
  const [date, setDate] = useState(new Date());

  // Get location/weather on first render
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => {
          getWeather(p.coords.latitude, p.coords.longitude);
        },
        () => {
          console.error('Location access not supported');
          setShowWeather(false);
          dispatch(setGlobals({ weather_show: false }));
        }
      );
      setShowWeather(true);
    } else {
      console.error('Location access not supported');
      setShowWeather(false);
      dispatch(setGlobals({ weather_show: false }));
    }

    function getWeather(lat: number, lon: number) {
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=9fe397f7ea57307ce1add4c7660c3a5d`;
      const xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {
        const weatherData = JSON.parse(xhr.responseText);
        const currentTime = new Date();
        const sunset = new Date(weatherData?.sys?.sunset * 1000);
        const sunrise = new Date(weatherData?.sys?.sunrise * 1000);
        const weather = weatherData?.weather?.[0]?.main || 'Clear';
        const temp = weatherData?.main?.temp;
        let adjustedTemp = temp || temp === 0 ? Math.round(temp) : 72;

        if (temperatureSymbol === 'C') {
          adjustedTemp = Math.floor((adjustedTemp - 32) * (5 / 9));
        }

        setTemperature(adjustedTemp);
        setWeatherTitle(weather);

        if (weather === 'Clear') {
          if (sunset < currentTime || sunrise > currentTime) {
            setWeatherIcon('bedtime');
          } else {
            setWeatherIcon('sunny');
          }
        } else if (weather === 'Rain' || weather === 'Drizzle') {
          setWeatherIcon('rainy');
        } else if (weather === 'Snow') {
          setWeatherIcon('weather_snowy');
        } else if (weather === 'Clouds') {
          setWeatherIcon('cloud');
        } else if (weather === 'Thunderstorm') {
          setWeatherIcon('thunderstorm');
        } else if (
          weather === 'Mist' ||
          weather === 'Smoke' ||
          weather === 'Haze' ||
          weather === 'Dust' ||
          weather === 'Fog' ||
          weather === 'Sand' ||
          weather === 'Dust'
        ) {
          setWeatherIcon('mist');
        } else if (weather === 'Ash') {
          setWeatherIcon('volcano');
        } else if (weather === 'Squall' || weather === 'Tornado') {
          setWeatherIcon('tornado');
        } else {
          if (sunset < currentTime || sunrise > currentTime) {
            setWeatherIcon('bedtime');
          } else {
            setWeatherIcon('sunny');
          }
          setWeatherTitle('Clear');
        }
      });

      xhr.open('GET', url);
      xhr.send();
    }
  }, [temperatureSymbol]);

  // Setting from globals
  useEffect(() => {
    if (globals.weather_link !== weatherLink) {
      setWeatherLink(globals.weather_link);
    }

    if (globals.weather_unit !== temperatureSymbol) {
      setTemperatureSymbol(globals.weather_unit);
    }

    if (globals.clock_show) {
      if (clockInterval) {
        clearInterval(clockInterval);
      }

      clockInterval = setInterval(() => {
        setDate(new Date());
      }, 1000);
    }
  }, [globals, temperatureSymbol, weatherLink]);

  const onClickSettings = () => {
    setModalType('settings');
    open();
  };

  const onClickAddShortcut = () => {
    setModalType('addShortcut');
    open();
  };

  const onClickEditShortcuts = () => {
    console.log('Edit shortcuts');
  };

  return (
    <div className="z-10 relative">
      <div className="flex justify-between px-4 py-2">
        <div>
          {globals.weather_show && (
            <a href={weatherLink} target="_blank" rel="noopener noreferrer">
              <div
                className={`flex items-center text-white hover:text-green-100 transition-colors cursor-pointer font-semibold text-xl ${
                  showWeather ? 'visible' : 'invisible'
                }`}
                title={weatherTitle}
              >
                <span className="material-symbols-outlined drop-shadow">
                  {weatherIcon}
                </span>
                <span className="ml-2 drop-shadow">
                  {temperature}°{temperatureSymbol}
                </span>
              </div>
            </a>
          )}
        </div>
        <div>
          {globals.clock_show && (
            <div className="text-white text-lg drop-shadow">
              {date
                .toLocaleString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour12: globals.clock_format === '12',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                })
                .replace('at', '')}
            </div>
          )}
        </div>
        <div className="flex">
          <div
            title="Add a shortcut"
            className="mr-2"
            onClick={onClickAddShortcut}
          >
            <span className="material-symbols-outlined opacity-50 hover:opacity-100 text-white hover:text-green-50 transition-all cursor-pointer">
              add
            </span>
          </div>
          <div
            title="Edit the shortcuts list"
            className="mr-2"
            onClick={onClickEditShortcuts}
          >
            <span className="material-symbols-outlined opacity-50 hover:opacity-100 text-white hover:text-green-50 transition-all cursor-pointer">
              edit
            </span>
          </div>
          <div title="Open the settings modal" onClick={onClickSettings}>
            <span className="material-symbols-outlined opacity-50 hover:opacity-100 text-white hover:text-green-50 transition-all cursor-pointer">
              tune
            </span>
          </div>
        </div>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        title={
          <div className="font-semibold text-text tracking-wider">
            {modalType === 'settings' ? 'Settings' : 'Add shortcut'}
          </div>
        }
        centered
        size={`${modalType === 'settings' ? 'lg' : 'sm'}`}
      >
        {modalType === 'settings' && <SettingsModal onClose={close} />}
        {modalType === 'addShortcut' && <AddShortcutModal onClose={close} />}
      </Modal>
    </div>
  );
}

export default Header;
