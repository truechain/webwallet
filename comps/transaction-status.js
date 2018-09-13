import I18n from '../util/i18n'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'

class TransactionStatus extends React.Component {
    constructor(props){
        super(props)
        this.state ={ 
            txhash:props.txhash,
            txBlockNum:0,
            from:'',
            to:'',
            sendNumText:'',
            sendStatusText:'',
            sendDescr:'',
            isMounted:false,
            showTransaction:false,
        }
        this.traceTransaction = this.traceTransaction.bind(this)
        this.handleTxhashInput = this.handleTxhashInput.bind(this)
        this.parseSendInfo = this.parseSendInfo.bind(this)
    }

    componentDidMount() {
        this.setState({isMounted:true})
        
        this.timer = setTimeout(()=>{
            if(this.state.txhash){
                this.traceTransaction(this.state.txhash)
            }
        },200)
        this.interval = setInterval(()=>{
            if(this.state.txhash){
                this.traceTransaction(this.state.txhash)
            }
        },3800)
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
        clearInterval(this.interval)
        this.setState({isMounted:false})
    }

    // 追踪交易
    traceTransaction(txhash){
        let ewj = eth_wallet_js
        let web3 = ewj.web3
        let txStatus = {}
        web3.eth.getTransactionReceipt(txhash)
        .then(rece=>{
            log('in get transaction receipt',rece)
            if(rece){              

                if(rece.blockNumber){ txStatus.txBlockNum= rece.blockNumber }
                let { from, to } = rece
                
                 // 得到eth发送数量
                 let sendNumText = ''
                 web3.eth.getTransaction(txhash)
                 .then(result=>{                

                    //解析发送的代币 的目标地址和发送数量
                    if( result.input.length > 100 ){ //log('in token')
                        web3.eth.getTransaction(txhash)
                        .then(result=>{
                            let toAndVal = this.parseSendInfo(result.input)
                            to = toAndVal.to
                            sendNumText = toAndVal.val
                            this.setState( { to, sendNumText,from:result.from, showTransaction:true } )
                        })
                    }
                    else{ //log('in ether')
                        sendNumText=  web3.utils.fromWei( result.value, 'ether')+' ether'  
                        this.setState({ sendNumText, to:result.to,from:result.from,showTransaction:true })                       
                    }         
                })                

                txStatus = { ...txStatus, from }
                if(rece.status){ 
                    txStatus.sendStatusText= '成功' 
                    web3.eth.getBlockNumber()
                    .then(blockNum=>{
                        let confrimNum = blockNum - txStatus.txBlockNum
                        if(confrimNum>0){ log('confrimNum',confrimNum)
                            txStatus.showTransaction = true
                            if(confrimNum>12){
                                txStatus.sendDescr ='已得到12次以上确认'                            
                                this.setState(txStatus)
                                clearInterval(this.interval)
                            }
                            else{
                                txStatus.sendDescr =`已得到${confrimNum}次确认`
                                this.setState(txStatus)
                            }
                        }
                    })
                }
                else{
                    txStatus.sendStatusText= '失败'
                    this.setState(txStatus)
                }                
            }          
        })
    }

    //校验交易哈希是否有效
    // 处理输入交易哈希
    handleTxhashInput(e){
        let val =  e.target.value
        if( (val.length ==64) && ( val.indexOf("0x") < 0 ) ){            
            val = "0x"+val
            this.setState({txhash:val})
            this.traceTransaction(val)    
        }
        if( (val.length == 66) && ( val.indexOf("0x") == 0 ) ){
            this.setState({txhash:val})
            this.traceTransaction(val)
        }
    }

    // 解析发送代币数据
    parseSendInfo(x){
        let ewj = eth_wallet_js
        let web3 = ewj.web3
        let to = "0x" + x.substring(34,74)
        let val = "0x" + x.substring(74)
        val = web3.utils.fromWei( web3.utils.hexToNumberString(val) )
        return {to,val}
    }

    render(){
        const { state,props } = this
        const { t, setLang } = props

        return (
            <div className="trans-status">
                <Card raised={true}>
                    <div className="trans-card">
                    {
                            !state.showTransaction ?
                            (
                                <TextField
                                    label={t.public_transaction_hash}
                                    // {'交易哈希'} 
                                    placeholder={t.public_txhash_tip}
                                    // {'交易哈希通常为0x开头的66位16进制字符串'} 
                                    fullWidth={true}
                                    type="text"
                                    onChange={this.handleTxhashInput}
                                    style={{margin:'35px 0px'}}
                                    // value={state.txhash}
                                />
                            ):
                            (
                                <div>
                                    <div className="trans-name">
                                        <p className="trans">
                                            {/* 交易哈希 */}
                                            {t.public_transaction_hash}
                                        </p>
                                        <p className="trans-txhash">{this.state.txhash}</p>
                                    </div>
                                    <div className="trans-from">
                                        <span className="meta-text">
                                            {/* 从 */}
                                            {t.public_from_words}
                                        </span>
                                        <span className="primary-text">{state.from}</span>
                                    </div>
                                    <div className="trans-descr">
                                        <span className="meta-text">
                                            {/* 发送 */}
                                            {t.public_send_words}
                                        </span>
                                        <span className="primary-text">{state.sendNumText}</span>
                                    </div>
                                    <div className="trans-to">
                                        <span className="meta-text">
                                            {/* 至 */}
                                            {t.public_to_words}
                                        </span>
                                        <span className="primary-text">{state.to}</span>
                                    </div>
                                    <p className="trans-sts-text">
                                        <span className="meta-text">
                                            {/* 交易状态： */}
                                            {t.public_transaction_status}
                                        </span>
                                        <span className="primary-text">{state.sendStatusText}</span>
                                    </p>
                                    <p className="trans-confirm">
                                        <span className="meta-text">{state.sendDescr}</span>
                                        <span className="primary-text"></span>
                                    </p>
                                </div>
                            )
                        }
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