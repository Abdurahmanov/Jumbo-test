import { createLocalVue, shallowMount } from '@vue/test-utils';
import StoreList from '@/components/StoreList';
import Vuex from 'vuex';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Market list', () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      getListRef: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  it('Should show "Not Found" if prop isNotFound is true', () => {
    const wrapper = shallowMount(StoreList, {
      propsData: {
        isNotFound: true,
        getSearch: [],
      },
      store,
      localVue,
    });

    expect(wrapper.find('div').text()).toBe('Not Found');
  });
});
