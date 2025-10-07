import PropTypes from 'prop-types';

const Container = ({ 
  children, 
  className = '', 
  maxWidth = 'max-w-9xl',
  padding = 'px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16',
  ...props 
}) => {
  return (
    <div 
      className={`mx-auto ${maxWidth} ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  maxWidth: PropTypes.string,
  padding: PropTypes.string,
};

export default Container;
