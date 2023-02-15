export default class LocaleStorageApi {
  save = data => {
    try {
      const keys = Object.keys(data);
      keys.forEach(key => {
        // console.log('key :>> ', key);
        // console.log('keyValue :>> ', data[key]);
        const queuiedData = JSON.stringify(data[key]);

        localStorage.setItem(key, queuiedData);
      });
    } catch (error) {
      console.log('Error during save JSON :>> ', error);
    }
  };

  read = key => {
    try {
      const obj = localStorage.getItem(key);
      return obj === null ? [] : JSON.parse(obj);
    } catch (error) {
      console.log('Error JSON parse  :>> ', error);
    }
  };

  remove = key => {
    localStorage.removeItem(key);
  };
}

export const setLocalStorage = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

export const getLocalStorage = key => {
  try {
    const obj = localStorage.getItem(key);
    return obj === null ? [] : JSON.parse(obj);
  } catch (error) {}
};

export const removeLocalStorage = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};
