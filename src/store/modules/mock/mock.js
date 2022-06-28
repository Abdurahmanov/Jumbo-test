export const rootState = {
  dataStore: {
    data: [
      {
        city: 'test1',
        todayClose: '19:00',
        sundayOpen: true,
        newStore: 0,
      },
      {
        city: 'test2',
        todayClose: '20:00',
        sundayOpen: false,
        newStore: 1,
      },
      {
        city: 'test1',
        todayClose: '21:00',
        sundayOpen: false,
        newStore: 0,
      },
      {
        city: '',
        todayClose: '22:00',
        sundayOpen: false,
        newStore: 0,
      },
    ],
  },
};

export const expectedOpenUntil20 = [
  {
    city: 'test2',
    todayClose: '20:00',
    sundayOpen: false,
    newStore: 1,
  },
  {
    city: 'test1',
    todayClose: '21:00',
    sundayOpen: false,
    newStore: 0,
  },
  {
    city: '',
    todayClose: '22:00',
    sundayOpen: false,
    newStore: 0,
  },
];

export const expectedGetUniqCities = [
  {
    city: 'test1',
    stores: [
      {
        city: 'test1',
      },
    ],
    storesLength: 1,
  },
  {
    city: 'test2',
    stores: [
      {
        city: 'test2',
      },
    ],
    storesLength: 1,
  },
  {
    city: 'Without city name',
    stores: [
      {
        city: '',
      },
    ],
    storesLength: 1,
  },
];

export const expectedGetFilterStoresByCities = [
  {
    city: 'test1',
    newStore: 0,
    sundayOpen: true,
    todayClose: '19:00',
  },
  {
    city: 'test1',
    newStore: 0,
    sundayOpen: false,
    todayClose: '21:00',
  },
];

export const data = [
  {
    addressName: 'Jumbo Aalsmeer Ophelialaan.',
    city: '',
    collectionPoint: true,
    complexNumber: '33010',
    distance: 0,
    favourite: false,
    isHomeStore: false,
    latitude: '52.264417',
    locationType: 'SupermarktPuP',
    longitude: '4.762433',
    newStore: 0,
    postalCode: '',
    sapStoreID: '3629',
    showWarningMessage: true,
    street: 'Ophelialaan',
    street2: '124',
    street3: '',
    sundayOpen: true,
    todayClose: '22:00',
    todayOpen: '08:00',
    type: 'StoreListRO',
    uuid: 'gmcKYx4X5HEAAAFIdhIYwKxK',
  },
];

export const expectedSetData = [
  {
    addressName: 'Aalsmeer Ophelialaan.',
    city: '',
    collectionPoint: true,
    complexNumber: '33010',
    distance: 0,
    favourite: false,
    isHomeStore: false,
    latitude: '52.264417',
    locationType: 'SupermarktPuP',
    longitude: '4.762433',
    newStore: 0,
    position: {
      lat: 52.264417,
      lng: 4.762433,
    },
    postalCode: '',
    sapStoreID: '3629',
    showWarningMessage: true,
    street: 'Ophelialaan',
    street2: '124',
    street3: '',
    sundayOpen: true,
    todayClose: '22:00',
    todayOpen: '08:00',
    type: 'StoreListRO',
    uuid: 'gmcKYx4X5HEAAAFIdhIYwKxK',
  },
];
