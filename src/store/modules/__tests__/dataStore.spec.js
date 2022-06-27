import dataStore from '../dataStore';
import { data, expectedGetUniqCities, expectedSetData, rootState } from '@/store/modules/mock/mock';

describe('dataStore', () => {
  it('Should change data and isLoading when mutation setData is called', () => {
    const state = {
      data: [],
      isLoading: true,
    };

    dataStore.mutations.setData(state, { result: data });

    expect(state).toEqual({
      isLoading: false,
      data: expectedSetData,
    });
  });

  it('Getter capitalizeFirstLetter should return string with first capitalize letter', () => {
    const result = dataStore.getters.capitalizeFirstLetter({}, {}, {})('test');
    expect(result).toEqual('Test');
  });

  it('Getter getSearchedLoading should return true true if at least one is true ', () => {
    const state = {
      isLoadingSearchedData: true,
      isLoadingUpdateSearchedData: false,
    };
    const result = dataStore.getters.getSearchedLoading(state, {}, {});
    expect(result).toEqual(true);
  });

  it('Getter getFilteredSearchedData should return all data except the one passed', () => {
    const state = {
      searchedData: ['test1', 'test2', 'test3'],
    };
    const result = dataStore.getters.getFilteredSearchedData(state, {}, {})('test2');
    expect(result).toEqual(['test1', 'test3']);
  });

  it('Getter getUniqueSearchedCities should return unique data with first capitalize letter', () => {
    const state = {
      searchedData: ['test1', 'test2', 'test3'],
    };
    const getters = {
      capitalizeFirstLetter: item => dataStore.getters.capitalizeFirstLetter({}, {}, {})(item),
    };
    const result = dataStore.getters.getUniqueSearchedCities(state, getters, {})('test2');
    expect(result).toEqual(['Test2', 'Test1', 'Test3']);
  });
});
