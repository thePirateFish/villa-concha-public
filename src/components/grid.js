import React from 'react'

const Grid = ({ cols, rows, gap, children }) => {
    const gapOffset = gap * ((cols - 1) / cols)
    const gridStyle = {
        display: 'grid',
        gridGap: `${gap}px`,
        gridTemplateColumns: `repeat(${cols}, calc(${100 / cols}% - ${gapOffset}px))`,
        gridTemplateRows: `repeat(${rows}, ${100 / rows}%)`
    }

    return (
        <div style={gridStyle}>
            {children}
        </div>
    )
}

export default Grid