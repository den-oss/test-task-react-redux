import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;

//todo: connect to redux directly

export default class Profile extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      company: PropTypes.string,
      department: PropTypes.string,
      position: PropTypes.string,
      email: PropTypes.string,
    }),
    onSave: PropTypes.func.isRequired,
    isSaving: PropTypes.bool,
  }

  constructor(props) {
      super(props);
      
      this.state = {
        profile: Object.assign({}, props.profile || {}),
      };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props.profile) {
      this.setState({
        profile: Object.assign({}, nextProps.profile),
      })
    }
  }

  handleSaveClick = () => {
    let {profile} = this.state;
    let {onSave} = this.props;
    onSave(profile);
  }

  render() {
    let {profile} = this.state;
    let {isSaving} = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    //todo: validation
    //todo: use meta & inputs generator from that meta

    return (
      <Form className="profile-form">
        <FormItem {...formItemLayout} label="First Name" >
          <Input 
            className="firstName"
            placeholder="First Name" 
            value={profile.firstName || ""}
            onChange={(e) => this.setState({
              profile: {...profile, firstName: e.target.value}
            })}
          />
        </FormItem>
        <FormItem {...formItemLayout} label="Last Name">
          <Input 
            className="lastName"
            placeholder="Last Name" 
            value={profile.lastName || ""}
            onChange={(e) => this.setState({
              profile: {...profile, lastName: e.target.value}
            })}
          />
        </FormItem>
        <FormItem {...formItemLayout} label="Company">
          <Input 
            className="company"
            placeholder="Company" 
            value={profile.company || ""}
            onChange={(e) => this.setState({
              profile: {...profile, company: e.target.value}
            })}
          />
        </FormItem>
        <FormItem {...formItemLayout} label="Department">
          <Input 
            className="department"
            placeholder="Department" 
            value={profile.department || ""}
            onChange={(e) => this.setState({
              profile: {...profile, department: e.target.value}
            })}
          />
        </FormItem>
        <FormItem {...formItemLayout} label="Position">
          <Input 
            className="position"
            placeholder="Position" 
            value={profile.position || ""}
            onChange={(e) => this.setState({
              profile: {...profile, position: e.target.value}
            })}
          />
        </FormItem>
        <FormItem {...formItemLayout} label="Email">
          <Input 
            className="email"
            placeholder="Email" 
            type="email"
            value={profile.email || ""}
            onChange={(e) => this.setState({
              profile: {...profile, email: e.target.value}
            })}
          />
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" onClick={this.handleSaveClick} disabled={isSaving}>Save</Button>
        </FormItem>
      </Form>

    );
  }


}