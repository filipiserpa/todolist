import React from 'react';
import { FaPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './Form.css';

export default function Form({ handleChange, handleSubmit, newTask }) {
  return (
    <form onSubmit={handleSubmit} action="#" className="form">
      <input
        className="inputMain"
        type="text"
        onChange={handleChange}
        value={newTask}
      ></input>
      <button type="submit">
        <FaPlus />
      </button>
    </form>
  );
}

Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  newTask: PropTypes.string.isRequired,
};
