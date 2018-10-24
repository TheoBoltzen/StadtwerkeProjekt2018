import * as React from 'react';
import {Members} from "./App";
import {List, ListItem, ListItemIcon} from "@material-ui/core";
import FaceIcon from '@material-ui/icons/Face';


interface Props {
    members: Members[]
}

export const MemberTest = (props: Props) => {
    const {members} = props

    return <div>
        <h2>Project Members</h2>
        <List>
            {members.map((i, index) => <ListItem key={index} className={'member-row'}>
                <ListItemIcon><FaceIcon/></ListItemIcon>{i.name}
            </ListItem>)}
        </List>
    </div>
}
