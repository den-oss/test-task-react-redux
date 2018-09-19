import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchProfile, saveProfile, resetErrorMessage } from '../actions'
import Profile from '../components/Profile'
import { Alert } from 'antd';
import './App.css';

class App extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      company: PropTypes.string,
      department: PropTypes.string,
      position: PropTypes.string,
      email: PropTypes.string,
    }),
    errorMessage: PropTypes.string,
    isFetching: PropTypes.bool,
    isSaving: PropTypes.bool,

    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchProfile())
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(fetchProfile())
  }

  onSave = (profile) => {
    const { dispatch, isSaving } = this.props
    if (isSaving)
      return; //already saving
    dispatch(saveProfile(profile))
  }

  handleDismissClick = e => {
    const { dispatch } = this.props
    dispatch(resetErrorMessage());
    e.preventDefault()
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <Alert
        message={errorMessage}
        type="error"
        closable
        onClose={this.handleDismissClick}
      />
    );
  }

  render() {
    const { profile, isFetching, isSaving } = this.props

    return (
      <div>
          { false && !isFetching &&
            <button onClick={this.handleRefreshClick}>
              Refresh
            </button>
          }
          { true &&
            <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Profile 
                profile={profile}
                onSave={this.onSave}
                isSaving={isSaving}
              />
            </div>
          }
          { isFetching && <h2>Loading profile...</h2> }
          { isSaving && <h2>saving profile...</h2> }
          {this.renderErrorMessage()}
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(App)
