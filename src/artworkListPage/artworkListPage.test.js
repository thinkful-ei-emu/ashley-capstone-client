import React from 'react';
import ReactDOM from 'react-dom';
import ArtworkListPage from './artwortListPage';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';

describe(`ArtworkListPage component`, () => {
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
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <ArtworkListPage {...props} />
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders empty list', () => {
    //find array of children and look at length
    const wrapper = shallow(<ArtworkListPage artwork={[]} />);
    expect(wrapper.find('gallery-list').children().length).toEqual(0);
  });

  it('renders a link in ul for each artpiece in array', () => {
    const ul = shallow(<ArtworkListPage {...props} />).find('ul');
    expect(toJson(ul)).toMatchSnapshot();
  });
});
