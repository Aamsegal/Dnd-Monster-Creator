import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import ActionList from './actionList';

describe('First React component test with Enzyme', () => {
   it('renders without crashing', () => {
      <ActionList />;
    });
});