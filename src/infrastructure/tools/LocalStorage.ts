import { useEffect, useState, useCallback, useRef } from "react";

const defaultStorageValues = {
  showMenu: false,
  showProductGrid: true,
};

type StorageType = typeof defaultStorageValues;
type StorageKeysType = keyof StorageType;
type StorageValuesType = StorageType[StorageKeysType];


const SETTINGS_KEY = 'AKDemoSettings';
const DISPATCH_EVENT_STORAGE_UPDATED = 'localStorageUpdated';

const getLocalStorageValue = (key: string): string | null => {
  return localStorage.getItem(key);
};

const setLocalStorageValue = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

const getUserSettings = (): StorageType => {
  const valueString = getLocalStorageValue(SETTINGS_KEY);
  if (valueString) {
    return (JSON.parse(valueString));
  }
  setLocalStorageValue(SETTINGS_KEY, JSON.stringify(defaultStorageValues));
  return defaultStorageValues;
};

const setUserSettings = (values: StorageType): void => {
  setLocalStorageValue(SETTINGS_KEY, JSON.stringify(values));
};

export const getUserSettingsValue = (key: StorageKeysType): StorageValuesType => {
  const settings = getUserSettings();
  return settings[key];
};

export const setUserSettingsValue = (key: StorageKeysType, value: StorageValuesType): void => {
  const settings = getUserSettings();
  const updatedSettings = { ...settings, [key]: value };
  setUserSettings(updatedSettings);
  window && window.dispatchEvent(new StorageEvent(
    DISPATCH_EVENT_STORAGE_UPDATED,
    { oldValue: JSON.stringify(settings), newValue: JSON.stringify(updatedSettings) }
  ));
};

export const useLocalStorageValues = (key?: StorageKeysType) => {
  const [values, setValues] = useState<StorageType>({} as StorageType);

  const storageUpdated = useCallback((event: StorageEvent) => {
    if (key) {
      const oldValue = event.oldValue ? JSON.parse(event.oldValue) : defaultStorageValues[key];
      const newValue = event.newValue ? JSON.parse(event.newValue) : defaultStorageValues[key];
      if (oldValue[key] !== newValue[key]) {
        setValues(newValue);
      }

    } else {
      setValues(getUserSettings());
    }
  }, [key]);

  useEffect(() => {
    setValues(getUserSettings());
  }, []);

  useEffect(() => {
    window.addEventListener(DISPATCH_EVENT_STORAGE_UPDATED as 'storage', storageUpdated);
    return () => {
      window.removeEventListener(DISPATCH_EVENT_STORAGE_UPDATED as 'storage', storageUpdated);
    };
  }, [storageUpdated]);

  return values;
};
