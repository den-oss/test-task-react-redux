import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './Profile';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
enzyme.configure({ adapter: new Adapter() });

test('should call onSave on button click', () => {
    const mockSave = jest.fn();
    let profile = { firstName: "denis" };
    const wrapper = shallow(<Profile
        profile={profile}
        onSave={mockSave}
    />);
    wrapper.find('Button').at(0).simulate('click');
    expect(mockSave).toHaveBeenCalled();
});
