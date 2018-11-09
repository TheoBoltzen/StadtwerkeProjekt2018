import * as React from 'react';
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import FilledInput from "@material-ui/core/es/FilledInput/FilledInput";
import './ComposedTextField.css';

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

    handlePasswordChange = (event: any) => {
        this.setState({ passwort: event.target.value });
    };

    handleEmailChange = (event: any) => {
        this.setState({ email: event.target.value });
    };

    render() {
        return (
            <div className={'inputForm'}>
                <h1>Entwicklungsbogentool</h1>
                <FormControl className={'emailForm'} variant="filled">
                    <InputLabel htmlFor="component-filled">E-Mail</InputLabel>
                    <FilledInput id="component-filled" name= 'email' value={this.state.email} onChange={this.handleEmailChange}/>
                </FormControl>

                <FormControl className={'passwordForm'} variant="filled">
                    <InputLabel htmlFor="component-filled">Passwort</InputLabel>
                    <FilledInput id="component-filled" name= 'passwort' value={this.state.passwort} onChange={this.handlePasswordChange}/>
                </FormControl>
            </div>
        );
    }
}

export default ComposedTextField