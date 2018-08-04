import React from 'react';
import PropTypes from 'prop-types';

const ComputerFace = ({face}) => (
    <div className="computerFace panel panel-default">
        <div className="panel-heading">Computer Player</div>
        <div className="panel-body">
            <i className={`far fa-${face || 'meh'} fa-10x`}></i>
        </div>
    </div>
);

ComputerFace.defaultProps = { face: 'meh' };

ComputerFace.propTypes = {
    face: PropTypes.string
};

export default ComputerFace;