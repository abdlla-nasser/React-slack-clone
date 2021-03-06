import React from 'react';
import { Grid } from 'semantic-ui-react';

import {ColorPanel} from './color panel/ColorPanel'
import {SidePanel} from './side panel/SidePanel'
import {MetaPanel} from './meta panel/MetaPanel'
import {Messages} from './Messages/Messages'

import './App.css';

const App = () => {
  return (
    <Grid columns="equal" className="app" style={{ background: '#eee'}}>
      <ColorPanel />
      <SidePanel />
      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
}

export default App;
