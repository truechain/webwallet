import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';

import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };

const log = console.log

const styles1 = theme => ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.dark,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing.unit,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
})

function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];
  
    return (
      <SnackbarContent
        className={classNames(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    );
}
const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

class Snack extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            open:false
        }
        this.handleSnackClose = this.handleSnackClose.bind(this)
    }

    static getDerivedStateFromProps(props, state){
        if(state.fromSelf){
            return {open:state.open,fromSelf:false}
        }
        else{
            return { 
                open:props.status,fromSelf:false,
            }

        }
    }

    handleSnackClose(){
        this.setState({ open:false,fromSelf:true })
    }


    render(){
        const { state,props } = this
        return (
            <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={state.open}
                autoHideDuration={3800}
                onClose={this.handleSnackClose}
            >
                <MySnackbarContentWrapper
                    onClose={this.handleSnackClose}
                    variant={props.messageType}
                    message={props.message}
                />
            </Snackbar>
            <style jsx>{`
                .snack-btn{
                    width:12px;
                    height:12px;
                }
            `}</style>
            </div>
        )
    }
}

export default Snack