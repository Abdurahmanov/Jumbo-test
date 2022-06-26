import dataStore from '../dataStore';
import { data, expectedSetData } from '@/store/modules/mock/mock';

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
});
