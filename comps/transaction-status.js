import I18n from '../util/i18n'
import Card from '@material-ui/core/Card'

class TransactionStatus extends React.Component {
    constructor(props){
        super(props)
        this.state ={ }
    }

    render(){
        return (
            <div className="trans-status">
                <Card raised={true}>
                    <div className="trans-card">
                        <div className="trans-name">
                            <p className="trans">交易哈希</p>
                        </div>
                        <div className="trans-from">
                            <span className="meta-text">从</span>
                            <span className="primary-text">0xxxxx12122</span>
                        </div>
                        <div className="trans-descr">
                            <span className="meta-text">发送</span>
                            <span className="primary-text">5true</span>
                        </div>
                        <div className="trans-to">
                            <span className="meta-text">至</span>
                            <span className="primary-text">0xxxxc1213221</span>
                        </div>
                        <p className="trans-sts-text">
                            <span className="meta-text">交易状态：</span>
                            <span className="primary-text">成功</span>
                        </p>
                        <p className="trans-confirm">
                            <span className="meta-text">已得到5次确认</span>
                            <span className="primary-text"></span>
                        </p>
                    </div>
                </Card>
                <style jsx>{`
                    .trans-status {
                        display: flex;                
                        flex:auto;
                        flex-direction:column;
                        min-width:300px;
                        max-width:1000px;
                        maigin:20px
                    }
                    .trans-card {
                        padding: 20px;
                        text-align:center;
                    }
                    .meta-text {
                        margin: 0px 10px;
                        color:#324057;
                    }
                    .primary-text {
                        color:#00acc1;
                    }
                    .trans-name ,.trans-from,.trans-descr,trans-to,trans-sts-text,trans-confirm {
                        margin:15px 0px;
                    }
                `}</style>
            </div>
        )
    }
}

export default I18n( TransactionStatus )