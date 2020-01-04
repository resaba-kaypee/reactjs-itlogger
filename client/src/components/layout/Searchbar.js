import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchLogs } from "../../actions/logActions";

const Searchbar = ({ log, searchLogs }) => {
  const text = useRef("");
  useEffect(() => {
    if (log.filtered === null) {
      text.current.value = "";
    }
  }, [log.filtered]);

  const onChange = e => {
    if(text.current.value !== ""){
      searchLogs(text.current.value);
    }
  };
  return (
    <nav style={{ marginBottom: "30px" }} className="blue">
      <div className="nav-wrapper">
        <i>
          <div className="input-field">
            <input
              id="search"
              type="search"
              placeholder="Search Logs..."
              ref={text}
              onChange={onChange}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </i>
      </div>
    </nav>
  );
};

Searchbar.propTypes = {
  searchLogs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  log: state.log
});

export default connect(mapStateToProps, { searchLogs })(Searchbar);
