import React from 'react';
import PropTypes from 'prop-types';

const ResultsPanel = ({player,computer,result}) => (
    <div className="resultsPanel container">
        <div className="panel panel-default">
            <div className="panel-heading">Game Results</div>
            <div className="panel-body">
                <ul className="resultsPanel">
                    <li>{`You Picked: ${player}`}</li>
                    <li>{`I picked: ${computer}`}</li> 
                    <li>{`You ${result}`}</li> 
                </ul>
            </div>
        </div>
    </div>
);

ResultsPanel.propTypes = {
    player: PropTypes.string,
    computer: PropTypes.string,
    result: PropTypes.string
};

export default ResultsPanel;