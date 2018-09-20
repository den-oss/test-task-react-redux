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


test('loads profile data into fields', async () => {
    const mockSave = jest.fn();
    let profile = {
        firstName: "denis",
        lastName: "oblogin",
        //company: "",
        department: "abc",
        position: "<b>def</b>",
        email: "ukrbublik@gmail.com"
    };
    const wrapper = shallow(<Profile
        profile={profile}
        onSave={mockSave}
    />);
    
    const firstName = wrapper.find('Input.firstName')
    const lastName = wrapper.find('Input.lastName')
    const company = wrapper.find('Input.company')
    const department = wrapper.find('Input.department')
    const position = wrapper.find('Input.position')
    const email = wrapper.find('Input.email')

    expect(firstName.props().placeholder).toEqual('First Name')
    expect(firstName.props().value).toEqual(profile.firstName || "")
    expect(lastName.props().value).toEqual(profile.lastName || "")
    expect(company.props().value).toEqual(profile.company || "")
    expect(department.props().value).toEqual(profile.department || "")
    expect(position.props().value).toEqual(profile.position || "")
    expect(email.props().value).toEqual(profile.email || "")
});
