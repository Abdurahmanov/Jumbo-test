import { mount } from '@vue/test-utils';
import TableStores from '@/components/TableStores';

describe('Table stores', () => {
  it('Should show "Please click on the item on the left" if prop item is undefined', () => {
    const item = undefined;
    const wrapper = mount(TableStores, {
      propsData: {
        item: item,
      },
    });

    expect(wrapper.find('div').text()).toBe('Please click on the item on the left');
  });

  it('Should show table if prop item has a data', () => {
    const item = {
      city: 'Aalsmeer',
      stores: [
        {
          addressName: 'Aalsmeer Ophelialaan',
          sundayOpen: true,
          todayClose: '22:00',
          todayOpen: '08:00',
        },
      ],
    };
    const wrapper = mount(TableStores, {
      propsData: {
        item: item,
      },
    });

    expect(wrapper.find('td').text()).toBe('Aalsmeer Ophelialaan');
  });
});
