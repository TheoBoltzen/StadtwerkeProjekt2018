import * as React from 'react';
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import FilledInput from "@material-ui/core/es/FilledInput/FilledInput";

interface Props {

}

interface State {
    email: ''
    passwort: ''
}

class ComposedTextField extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            email: '',
            passwort: ''
        }
    }

    handleChange = event => {
        this.setState({
            email: event.target.value,
            passwort: event.target.value
        });
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.container}>
                <h1>Entwicklungsbogentool</h1>
                <FormControl className={classes.formControl} variant="filled">
                    <InputLabel htmlFor="component-filled">E-Mail</InputLabel>
                    <FilledInput id="component-filled" value={this.state.email} onChange={this.handleChange}/>
                </FormControl>

                <FormControl className={classes.formControl} variant="filled">
                    <InputLabel htmlFor="component-filled">Passwort</InputLabel>
                    <FilledInput id="component-filled" value={this.state.passwort} onChange={this.handleChange}/>
                </FormControl>
            </div>
        );
    }
}

export default ComposedTextField