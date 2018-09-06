const Split = props =>{
    
    return (
        <div className="split-line">
            <span className="left"></span>
            <span className="text">{props.text}</span>
            <span className="right"></span>
            <style jsx>{`
                .split-line {
                    color:${props.color};
                    text-align:center;
                    line-height:42px
                }
                .left,.right {
                    display:inline-block;
                    vertical-align:top;
                    width:${props.width};
                    height:1px;
                    background-color:${props.color};
                    margin-top:21px;
                }
                .text {
                    margin:0px 10px;
                }
            `}</style>
        </div>
    )
}

export default Split