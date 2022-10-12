import React from 'react'

const GridItem = ({ col, row, children }) => {

    const gridItemStyle = {
        gridColumn: col,
        gridRow: row
    }

    return (
        <div style={gridItemStyle}>
            {children}
        </div>
    )
}

export default GridItem