import { Geolocation } from '../types';

export const getUserLocation = (): Promise<Geolocation> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          reject(new Error('Unable to retrieve your location. Please enable location services.'));
        }
      );
    }
  });
};
