import React from 'react'
import { Popup } from 'semantic-ui-react'

const Tooltip = ({content, children}) => {
    return (
        <Popup
            trigger={children}
            content={content}
            basic>
        </Popup>
    )
}

export default Tooltip
