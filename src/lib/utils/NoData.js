import React from 'react'
import { Grid, Icon } from 'semantic-ui-react'

const NoData = () => {
    return (
        <Grid.Column style={{ textAlign: 'center' }}>
            <Icon style={{ color: 'lightgrey' }} name="ban" size="massive" />
            <h1 style={{ color: 'lightgrey' }}>No data available</h1>
        </Grid.Column>
    )
}

export default NoData
