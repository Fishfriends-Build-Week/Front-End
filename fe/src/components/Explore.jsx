import React, { useEffect } from 'react';
import {
  NavLink,
  // Link
} from 'react-router-dom';
import { connect } from "react-redux";

import {
  apiAction
} from './actions';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

library.add(faEdit, faTrashAlt);

const Explore = (props) => {
  //#region useEffect monitor(s)
  useEffect(() => {
    console.log(`Explore -> props`, props);
  }, [props]);

  useEffect(() => {
    if (props.loggedIn) {
      props.apiAction('get', '/logs', null);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(`Explore -> exploreData`, props.logsData);
  }, [props.logsData]);
  //#endregion useEffect monitor(s)

  //#region JSX
  return (
    <div>
      {props.loggedIn ? (
        <>
          <h4>Find &amp; view fishing locations &amp; great catches by other users:</h4>
          {props.isLoading ? (
            <h5>Loading...</h5>
          ) : (
            props.logsData && props.logsData.length > 0 &&
              <div className="logsResults">
                {props.logsData.map(l => (
                  <div className="log" key={l.log_id}>
                    <div className="created_at">Logged: {l.created_at}</div>
                    <div className="time_spent">Time spent: {l.time_spent} hours</div>
                    <div className="location_name">Location: <a href={"/locations/"+l.location_id}>{l.location_name}</a></div>
                    <div className="username">Logged by: <a href={"/accounts/"+l.account_id}>{l.username}</a></div>
                    <div className="iconGroup">
                      <div className="icon edit" onClick={() => {
                        // props.editLog(l)  //TODO
                      }}>
                        <FontAwesomeIcon icon={faEdit} />&nbsp;Edit
                      </div>
                      <div className="icon delete" onClick={() => {
                        props.apiAction('delete', '/logs/'+l.log_id, null);
                      }}>
                        <FontAwesomeIcon icon={faTrashAlt} />&nbsp;Delete
                      </div>
                    </div>
                    &nbsp;
                  </div>
                ))}
              </div>
          )}
        </>
      ) : (
        <h4>
          <NavLink to='/signup'>Sign Up</NavLink> or <NavLink to='/login'>Login</NavLink> to find &amp; view fishing locations &amp; great catches by other users!
        </h4>
      )}
    </div>
  );
  //#endregion JSX
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    isError: state.isError,
    errors: state.errors,
    isLoggingIn: state.isLoggingIn,
    loggedIn: state.loggedIn,
    loginError: state.loginError,
    loginInfo: state.loginInfo,
    logsData: state.logsData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // login: (credentials) => dispatch(login(credentials))
    apiAction: (action, endpoint, body) => dispatch(apiAction(action, endpoint, body))
  };
};

export default connect(
  mapStateToProps
  ,mapDispatchToProps
)(Explore);
