import { createLocalVue, shallowMount } from "@vue/test-utils";
import MarketList from "@/components/MarketList";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Market list", () => {
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
    const wrapper = shallowMount(MarketList, {
      propsData: {
        isNotFound: true,
        getSearch: [],
      },
      store,
      localVue,
    });

    expect(wrapper.find("div").text()).toBe("Not Found");
  });
});
