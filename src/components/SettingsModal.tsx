// Importing react related
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Importing mantine
import {
  Checkbox,
  Input,
  Radio,
  Switch,
  FileInput,
  Accordion,
  Button,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

// Importing store
import {
  selectGlobals,
  setGlobals,
  unsetGlobals,
  unsetShortcuts,
} from "../store/Globals";

type Props = {
  onClose: () => void;
};

const SettingsModal = ({ onClose }: Props) => {
  // Required
  const dispatch = useDispatch();

  // Store
  const globals = useSelector(selectGlobals);

  // State
  const [useDefaultBackgroundImage, setUseDefaultBackgroundImage] = useState(
    globals.background_image_use_default
  );
  const [backgroundImage, setBackgroundImage] = useState(
    globals.background_image
  );
  const [showClock, setShowClock] = useState(globals.clock_show);
  const [showDate, setShowDate] = useState(globals.clock_show_date);
  const [showTime, setShowTime] = useState(globals.clock_show_time);
  const [clockFormat, setClockFormat] = useState(globals.clock_format);
  const [showWeather, setShowWeather] = useState(globals.weather_show);
  const [weatherUnit, setWeatherUnit] = useState(globals.weather_unit);
  const [weatherLink, setWeatherLink] = useInputState(globals.weather_link);
  const [shortcutsShowName, setShortcutsShowName] = useState(
    globals.shortcuts_show_name
  );

  const onClickReset = () => {
    dispatch(unsetGlobals());
    onClose();
  };

  const onClickResetShortcuts = () => {
    dispatch(unsetShortcuts());
    onClose();
  };

  return (
    <div>
      <div className="mb-5">
        <Accordion>
          <Accordion.Item value="background">
            <Accordion.Control>
              <h3 className="uppercase tracking-widest font-semibold text-text pb-2 text-sm">
                Background
              </h3>
            </Accordion.Control>
            <Accordion.Panel>
              <Input.Wrapper label="Use default sharky" className="mb-4">
                <Checkbox
                  checked={useDefaultBackgroundImage}
                  onChange={() => {
                    dispatch(
                      setGlobals({
                        background_image_use_default:
                          !useDefaultBackgroundImage,
                      })
                    );
                    setUseDefaultBackgroundImage(!useDefaultBackgroundImage);
                  }}
                />
              </Input.Wrapper>
              <Input.Wrapper label="Upload image">
                <FileInput
                  placeholder="Upload image"
                  onChange={(file) => {
                    if (!file) {
                      notifications.show({
                        color: "red",
                        title: "Error",
                        message: "No file found",
                      });
                      return;
                    }

                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                      console.log(typeof reader.result);
                      if (typeof reader.result === "string") {
                        const result = reader.result;
                        const encoder = new TextEncoder();
                        const resultSize = encoder.encode(result).length;

                        if (resultSize > 4000000) {
                          notifications.show({
                            color: "red",
                            title: "Error",
                            message: "Image too large",
                          });
                          return;
                        }

                        setBackgroundImage(result);
                        dispatch(setGlobals({ background_image: result }));
                      }
                    };
                  }}
                />
              </Input.Wrapper>
              <p className="text-xs mt-2">
                Images are Base64 encoded and saved to local storage, thus they
                must be less than 4MB. However, due to their encoding the images
                are likely to be encoded in a larger size than what appears when
                directly checking their size. Images 3MB and less are
                recommended.
              </p>
              <div className="mt-4">
                <div className="text-sm font-semibold text-text tracking-wider">
                  Current uploaded image preview
                </div>
                <div className="flex justify-center mt-4">
                  <div
                    className="h-40 w-40 bg-no-repeat bg-center bg-cover"
                    style={{
                      backgroundImage: backgroundImage
                        ? `url('${backgroundImage}')`
                        : undefined,
                    }}
                  >
                    {!backgroundImage && "N/A"}
                  </div>
                </div>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="mb-5">
        <Accordion>
          <Accordion.Item value="clock">
            <Accordion.Control>
              <h3 className="uppercase tracking-widest font-semibold text-text pb-2 text-sm">
                Clock
              </h3>
            </Accordion.Control>
            <Accordion.Panel>
              <div>
                <Input.Wrapper label="Display clock" className="mb-4">
                  <Switch
                    checked={showClock}
                    onChange={() => {
                      dispatch(setGlobals({ clock_show: !showClock }));
                      setShowClock(!showClock);
                    }}
                  />
                </Input.Wrapper>
                <Input.Wrapper label="Display date" className="mb-4">
                  <Switch
                    checked={showDate}
                    onChange={() => {
                      dispatch(setGlobals({ clock_show_date: !showDate }));
                      setShowDate(!showDate);
                    }}
                  />
                </Input.Wrapper>
                <Input.Wrapper label="Display time" className="mb-4">
                  <Switch
                    checked={showTime}
                    onChange={() => {
                      dispatch(setGlobals({ clock_show_time: !showTime }));
                      setShowTime(!showTime);
                    }}
                  />
                </Input.Wrapper>
                <Input.Wrapper label="Clock format" className="mb-4">
                  <Radio.Group
                    className="flex-row"
                    value={clockFormat}
                    onChange={(val) => {
                      dispatch(setGlobals({ clock_format: val }));
                      setClockFormat(val);
                    }}
                  >
                    <Radio value="12" label="12" className="mr-4" />
                    <Radio value="24" label="24" />
                  </Radio.Group>
                </Input.Wrapper>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="mb-5">
        <Accordion>
          <Accordion.Item value="shortcuts">
            <Accordion.Control>
              <h3 className="uppercase tracking-widest font-semibold text-text pb-2 text-sm">
                Shortcuts
              </h3>
            </Accordion.Control>
            <Accordion.Panel>
              <div>
                <Input.Wrapper label="Display shortcut names" className="mb-4">
                  <Switch
                    checked={shortcutsShowName}
                    onChange={() => {
                      dispatch(
                        setGlobals({ shortcuts_show_name: !shortcutsShowName })
                      );
                      setShortcutsShowName(!shortcutsShowName);
                    }}
                  />
                </Input.Wrapper>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="mb-5">
        <Accordion>
          <Accordion.Item value="weather">
            <Accordion.Control>
              <h3 className="uppercase tracking-widest font-semibold text-text pb-2 text-sm">
                Weather
              </h3>
            </Accordion.Control>
            <Accordion.Panel>
              <div>
                <Input.Wrapper label="Display weather" className="mb-4">
                  <Switch
                    checked={showWeather}
                    onChange={() => {
                      dispatch(setGlobals({ weather_show: !showWeather }));
                      setShowWeather(!showWeather);
                    }}
                  />
                </Input.Wrapper>
                <Input.Wrapper label="Temperature unit" className="mb-4">
                  <Radio.Group
                    className="flex-row"
                    value={weatherUnit}
                    onChange={(val) => {
                      dispatch(setGlobals({ weather_unit: val }));
                      setWeatherUnit(val);
                    }}
                  >
                    <Radio value="C" label="C" className="mr-4" />
                    <Radio value="F" label="F" />
                  </Radio.Group>
                </Input.Wrapper>
                <Input.Wrapper label="Weather url" className="mb-4">
                  <Input value={weatherLink} onChange={setWeatherLink} />
                </Input.Wrapper>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="flex justify-evenly">
        <div>
          <Button
            component="a"
            href="https://www.paypal.com/paypalme/dennymu"
            target="_blank"
            className="flex items-center w-fit"
            radius="xl"
          >
            <span className="material-symbols-outlined text-sm mr-2">
              favorite
            </span>
            Donate
          </Button>
        </div>
        <div>
          <Button
            className="flex items-center w-fit"
            radius="xl"
            onClick={onClickReset}
          >
            <span className="material-symbols-outlined text-sm mr-2">
              restart_alt
            </span>
            Reset settings
          </Button>
        </div>
        <div>
          <Button
            className="flex items-center w-fit"
            radius="xl"
            onClick={onClickResetShortcuts}
          >
            <span className="material-symbols-outlined text-sm mr-2">
              reset_focus
            </span>
            Reset shortcuts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
