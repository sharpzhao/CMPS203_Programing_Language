import { connect } from 'react-redux';
import App from './App';
import { DriveSetTree } from './actions';

const mapStateToProps = state => ({
    drive: state.drive,
    loginStatus: state.login
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    folderIn: (drive, child) => {
        console.log("folderIN")
        dispatch(DriveSetTree({
            tree: child,
            parent: drive
        }));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

