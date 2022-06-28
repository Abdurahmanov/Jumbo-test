import { shallowMount } from '@vue/test-utils';
import CityList from '@/components/CityList';

describe('CityList', () => {
  it('Should show "Not Found" if prop isNotFound is true', () => {
    const wrapper = shallowMount(CityList, {
      propsData: {
        isNotFound: true,
        list: [],
      },
    });

    expect(wrapper.find('div').text()).toBe('Not Found');
  });
});
