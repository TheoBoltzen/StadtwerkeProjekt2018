import * as React from 'react';
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import FilledInput from "@material-ui/core/es/FilledInput/FilledInput";
import PropTypes from 'prop-types';

class ComposedTextField extends React.Component {
    state = {
        email: 'E-Mail',
        passwort: 'Passwort'
    };

    componentDidMount() {
        this.forceUpdate();
    }

    handleChange = event => {
        this.setState({ name: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <h1>Entwicklungsbogentool</h1>
                <FormControl className={classes.formControl} variant="filled">
                    <InputLabel htmlFor="component-filled">E-Mail</InputLabel>
                    <FilledInput id="component-filled" value={this.state.email} onChange={this.handleChange} />
                </FormControl>

                <FormControl className={classes.formControl} variant="filled">
                    <InputLabel htmlFor="component-filled">Passwort</InputLabel>
                    <FilledInput id="component-filled" value={this.state.passwort} onChange={this.handleChange} />
                </FormControl>
            </div>
        );
    }
}

ComposedTextField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default ComposedTextField
