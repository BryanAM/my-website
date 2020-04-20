import React from 'react';
import i18n from '../../i18n/index';
import { shallow } from 'enzyme';
import About from './About.jsx';
import { I18nextProvider } from 'react-i18next';

describe('About', () => {
  it('should render without issue', () => {
    const component = shallow(
      <I18nextProvider i18n={i18n}>
        <About />
      </I18nextProvider>
    );
    expect(component).toMatchSnapshot();
  });
});