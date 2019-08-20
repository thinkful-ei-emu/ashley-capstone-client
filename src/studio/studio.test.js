import React from 'react';
import Studio from './studio';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe(`Studio component`, () => {
  const props = {
    artwork: [
      {
        id: 1,
        title: 'Dogs',
        uploaded: '2019-01-03T00:00:00.000Z',
        gallery_id: 1,
        artpiece_image: 'placeholder.png'
      },
      {
        id: '2',
        title: 'Cats',
        uploaded: '2019-01-03T00:00:00.000Z',
        gallery_id: '2',
        artpiece_image: 'placeholder.png'
      },
      {
        id: '3',
        title: 'Silly Cats',
        uploaded: '2019-01-03T00:00:00.000Z',
        gallery_id: '2',
        artpiece_image: 'placeholder.png'
      }
    ],
    galleries: [
      {
        id: '1',
        name: 'Dogs'
      },
      {
        id: '2',
        name: 'Cats'
      },
      {
        id: '3',
        name: 'Birds'
      }
    ]
  };

  it('renders empty list', () => {
    //find array of children and look at length
    const wrapper = shallow(<Studio galleries={[]} />);
    expect(wrapper.find('art-gallery-select').children().length).toEqual(0);
  });

  it('renders a gallery option for each gallery in array', () => {
    const options = shallow(<Studio {...props} />).find('art-gallery-select');
    expect(toJson(options)).toMatchSnapshot();
  });
});
