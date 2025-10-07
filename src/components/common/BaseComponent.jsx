import React from 'react';
import PropTypes from 'prop-types';

/**
 * Base component with common props and structure
 * Provides consistent component patterns across the application
 */
const BaseComponent = ({
  children,
  className = '',
  testId,
  ...props
}) => {
  return (
    <div
      className={className}
      data-testid={testId}
      {...props}
    >
      {children}
    </div>
  );
};

BaseComponent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  testId: PropTypes.string,
};

export default BaseComponent;
