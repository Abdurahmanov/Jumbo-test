import store from '../cityStore';
import { rootState, expectedGetUniqCities, expectedGetFilterStoresByCities } from '@/store/modules/mock/mock';

describe('cityStore', () => {
  it('Should change activeIndex when mutation setActiveIndex is called', () => {
    const index = 1;
    const state = {
      activeIndex: undefined,
    };

    store.mutations.setActiveIndex(state, { index });

    expect(state).toEqual({
      activeIndex: 1,
    });
  });

  it('Getter getFilterStoresByCities should return filtered data by cities', () => {
    const result = store.getters.getFilterStoresByCities({}, {}, rootState)('test1');
    expect(result).toEqual(expectedGetFilterStoresByCities);
  });

  it('Getter getUniqCities should return uniq cities with stores in this cities', () => {
    const getters = {
      getFilterStoresByCities: city => [{ city: city }],
    };

    const result = store.getters.getUniqCities({}, getters, rootState);
    expect(result).toEqual(expectedGetUniqCities);
  });

  it('Getter getCitySearchResult should return all data if an empty string is received', () => {
    const getters = {
      getUniqCities: () => expectedGetUniqCities,
    };

    const result = store.getters.getCitySearchResult({}, getters, rootState)('');
    expect(result).toEqual(getters.getUniqCities);
  });

  it('Getter getCitySearchResult should return filtered data if city string is not empty', () => {
    const getters = {
      getUniqCities: expectedGetUniqCities,
    };

    const result = store.getters.getCitySearchResult({}, getters, rootState)('TeSt1');
    expect(result).toEqual([expectedGetUniqCities[0]]);
  });
});
