// Importing react related
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Importing mantine
import { Input, Button, FileInput, Switch, Accordion } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

// Importing store
import { selectGlobals, setGlobals } from '../store/Globals';

type Props = {
  onClose: () => void;
};

const AddShortcutModal = ({ onClose }: Props) => {
  // Required
  const dispatch = useDispatch();

  // Store
  const globals = useSelector(selectGlobals);

  // State
  const [shortcuts, setShortcuts] = useState([...globals.shortcuts]);
  const [image, setImage] = useState('images/shortcut_icon.png');
  const [retrievedImage, setRetrievedImage] = useState('');
  const [name, setName] = useInputState('');
  const [url, setUrl] = useInputState('');
  const [useUploadImagePreview, setUseUploadImagePreview] = useState(false);

  const onClickAddShortcut = () => {
    // Add shortcut to shortcuts list and dispatch to global, also hide
    const tempShortcuts = [...shortcuts];

    tempShortcuts.push({
      url: url,
      name: name,
      icon: useUploadImagePreview && image ? image : retrievedImage || '',
    });

    setShortcuts(tempShortcuts);
    dispatch(setGlobals({ shortcuts: tempShortcuts }));
    onClose();
  };

  const onChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUrl(val);

    // Check the url for a favicon and try to load it
    if (!isValidUrl(val)) {
      setRetrievedImage('');
      return;
    }

    try {
      const imageUrl = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${val}&size=64`;
      const newImage = new Image();

      newImage.onload = () => {
        setRetrievedImage(imageUrl);
      };

      newImage.onerror = () => {
        console.warn(`Retrieved image doesn't exist: ${imageUrl}`);
        setRetrievedImage('');
      };

      newImage.src = imageUrl;
    } catch (err) {
      console.warn('Unable to get image, err:', err);
    }
  };

  return (
    <div>
      <div>
        <div className="mt-4">
          <div className="text-sm font-semibold text-text tracking-wider">
            Retrieved image preview
          </div>
          <div className="flex justify-center mt-4">
            <div
              className="h-14 w-14 bg-no-repeat bg-center bg-cover"
              style={{
                backgroundImage: retrievedImage
                  ? `url('${retrievedImage}')`
                  : undefined,
              }}
            ></div>
          </div>
        </div>
        <Input.Wrapper label="Url" className="mb-4 mt-4">
          <Input value={url} onChange={onChangeUrl} />
        </Input.Wrapper>

        <Input.Wrapper label="Name" className="mb-4">
          <Input value={name} onChange={setName} />
        </Input.Wrapper>
        <Accordion>
          <Accordion.Item value="uploadImage">
            <Accordion.Control>Upload image</Accordion.Control>
            <Accordion.Panel>
              <Input.Wrapper label="Upload image">
                <FileInput
                  placeholder="Upload image"
                  onChange={(file) => {
                    if (!file) {
                      notifications.show({
                        color: 'red',
                        title: 'Error',
                        message: 'No file found',
                      });
                      return;
                    }

                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                      console.log(typeof reader.result);
                      if (typeof reader.result === 'string') {
                        const result = reader.result;
                        const encoder = new TextEncoder();
                        const resultSize = encoder.encode(result).length;

                        if (resultSize > 500000) {
                          notifications.show({
                            color: 'red',
                            title: 'Error',
                            message: 'Image too large',
                          });
                          return;
                        }

                        setImage(result);
                      }
                    };
                  }}
                />
              </Input.Wrapper>
              <p className="text-xs mt-2">
                If possible, we'll try to pull the favicon from the url as seen
                in the retrieved image preview. Otherwise, uploaded images are
                Base64 encoded and saved to local storage, thus they must be
                less than 500KB. However, due to their encoding the images are
                likely to be encoded in a larger size than what appears when
                directly checking their size. Very small images are preferred
                for shortcuts.
              </p>
              <div className="mt-4">
                <div className="text-sm font-semibold text-text tracking-wider">
                  Uploaded image preview
                </div>
                <div className="flex justify-center mt-4">
                  <div
                    className="h-14 w-14 bg-no-repeat bg-center bg-cover"
                    style={{
                      backgroundImage: image ? `url('${image}')` : undefined,
                    }}
                  >
                    {!image && 'N/A'}
                  </div>
                </div>
              </div>
              <Input.Wrapper label="Use uploaded image" className="mt-4">
                <Switch
                  checked={useUploadImagePreview}
                  onChange={() => {
                    setUseUploadImagePreview(!useUploadImagePreview);
                  }}
                />
              </Input.Wrapper>
              <p className="text-xs mt-2">
                If enabled, will use manually uploaded image or placeholder
                image.
              </p>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
      <div className="flex justify-end mt-10">
        <Button
          className="flex items-center w-fit"
          radius="xl"
          onClick={onClickAddShortcut}
        >
          <span className="material-symbols-outlined text-sm mr-1">add</span>
          Add shortcut
        </Button>
      </div>
    </div>
  );
};

function isValidUrl(s: string) {
  let url: URL;

  try {
    url = new URL(s);
    console.log('Url:', url);
    return true;
  } catch (err: unknown) {
    console.warn('Invalid url:', s, 'err:', err);
    return false;
  }
}

export default AddShortcutModal;
