import mapStore from '@/store/modules/mapStore';
import { expectedOpenUntil20, rootState } from '@/store/modules/mock/mock';

describe('mapStore', () => {
  it('Should change map when mutation setMap is called', () => {
    const state = {
      map: undefined,
    };
    const map = 'newMap';

    mapStore.mutations.setMap(state, { map });

    expect(state).toEqual({
      map: map,
    });
  });

  it('Should change listRef when mutation setListRef is called', () => {
    const state = {
      listRef: undefined,
    };
    const ref = 'newRef';

    mapStore.mutations.setListRef(state, { ref });

    expect(state).toEqual({
      listRef: ref,
    });
  });

  it('Should change listItemActiveIndex when mutation setListItemActiveIndex is called', () => {
    const state = {
      listItemActiveIndex: undefined,
    };
    const index = 1;

    mapStore.mutations.setListItemActiveIndex(state, { index });

    expect(state).toEqual({
      listItemActiveIndex: 1,
    });
  });

  it('Getter getSearchResult should return all data if an empty string is received', () => {
    const result = mapStore.getters.getSearchResult({}, {}, rootState)('');
    expect(result).toEqual(rootState.dataStore.data);
  });

  it('Getter getSearchResult should return filtered data if city string is not empty', () => {
    const result = mapStore.getters.getSearchResult({}, {}, rootState)('Test2');
    expect(result).toEqual([rootState.dataStore.data[1]]);
  });

  it('Getter getFilterStoresOpenUtilTime should return filtered data', () => {
    const result = mapStore.getters.getFilterStoresOpenUtilTime({}, {}, rootState)(20);
    expect(result).toEqual(expectedOpenUntil20);
  });

  it('Getter getFilters Should return data depending on the case type', () => {
    const resultSundayOpen = mapStore.getters.getFilters({}, {}, rootState)('sundayOpen');
    expect(resultSundayOpen).toEqual([rootState.dataStore.data[0]]);

    const resultNew = mapStore.getters.getFilters({}, {}, rootState)('new');
    expect(resultNew).toEqual([rootState.dataStore.data[1]]);
  });
});
