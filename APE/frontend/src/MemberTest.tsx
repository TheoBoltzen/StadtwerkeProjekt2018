import * as React from 'react';
import {Items} from "./App";
import {List, ListItem, ListItemIcon} from "@material-ui/core";
import FaceIcon from '@material-ui/icons/Face';


interface Props {
    items: Items[]
}

export const MemberTest = (props: Props) => {
    const {items} = props

    return <div>
        <h2>Project Members</h2>
        <List>
            {items.map((i, index) => <ListItem key={index} className={'member-row'}>
                <ListItemIcon><FaceIcon/></ListItemIcon>{i.name}
            </ListItem>)}
        </List>
    </div>
}
