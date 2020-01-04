import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getLogs } from "../../actions/logActions";
import PropTypes from "prop-types";
import LogItem from "./LogItem";
import Preloader from "../layout/Preloader";

const Logs = ({ log: { logs, loading, filtered }, getLogs }) => {
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  if (logs !== null && logs.length === 0 && !loading) {
    return <h4>No logs...</h4>
  }

  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="center">System Logs</h4>
      </li>
      {logs !== null && !loading ? (
        filtered !== null 
          ? filtered.map(log => (
            <LogItem key={log._id} log={log} />
            ))
          : logs.map(log => (
            <LogItem key={log._id} log={log} />
            ))
      ) : (
        <Preloader/>
      )}
    </ul>
  );
};



Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  log: state.log
});

export default connect(mapStateToProps, { getLogs })(Logs);
