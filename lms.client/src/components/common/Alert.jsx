import { Alert } from 'react-bootstrap';

const AlertMessage = ({ variant, children, onClose }) => {
    return (
        <Alert variant={variant} onClose={onClose} dismissible>
            {children}
        </Alert>
    );
};

AlertMessage.defaultProps = {
    variant: 'info',
};

export default AlertMessage;