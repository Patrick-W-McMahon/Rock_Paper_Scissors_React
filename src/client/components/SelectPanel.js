import React from 'react';
import PropTypes from 'prop-types';

const selections = ['rock','paper','scissors'];

const SelectPanel = ({onSelection}) => (
    <div className="btn-group btn-group-lg shadow p-3 mb-5 bg-white rounded" role="group" aria-label="Basic example">
        {selections.map((option,key) => <button key={key} onClick={() => onSelection(`${option}`)} type="button" className="btn btn-secondary"><i className={`fas fa-5x fa-hand-${option}`}></i></button>)}
    </div>
);

SelectPanel.propTypes = {
    onSelection: PropTypes.func.isRequired
};

export default SelectPanel;