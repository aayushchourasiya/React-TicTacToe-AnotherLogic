import React from 'react'

export const Block = (props) => {
    return (
            <div className="boxy" onClick={props.clickButton} style={{borderBottom: props.noBottomBorder && '0px', borderRight: props.noRightBorder && '0px', borderLeft:props.noLeftBorder && '0px', borderTop: props.noTopBorder && '0px', backgroundColor:props.isBackgroundColor && 'blue' , color: props.isColor && 'white'}}>{props.value}</div>
    )
}
