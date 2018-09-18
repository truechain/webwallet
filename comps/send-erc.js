import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircle from '@material-ui/icons/AccountCircle'
import InputAdornment from '@material-ui/core/InputAdornment'
import ImportAccount from './import-account'
import TransactionStatus from './transaction-status'
import Snack from './snackbar'
import I18n from '../util/i18n'
const log = console.log

import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import DialogContent from '@material-ui/core/DialogContent'
import RingLoader from '../util/es6-ring-loader'
function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class SendErc extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            step:'send',
            currencyType:'option',
            currencies:[
                {label:'选择币种',value:'option'},
                {label:'ETH',value:'ether'},
                {label:'TRUE',value:'true'},
                // {label:'其它货币',value:'other'},
            ],
            sendTO:'',
            sendNum:'',
            showAccountSelect:false,
            accountAddress:'',
            isMounted:false,
            txhash:'',
            snackOpen:false,
            snackMessage:'',
            snackMessageType:'',
            txhash:'',
            openLoading:false,
        }
        this.handleCurrencySelect = this.handleCurrencySelect.bind(this)
        this.chooseAccountFocus = this.chooseAccountFocus.bind(this)
        this.send = this.send.bind(this)
        this.updateAddress = this.updateAddress.bind(this)
    }

    componentDidMount() {
        let storage = window.localStorage     
        let account = JSON.parse( storage.getItem('account') )
        if(account){
            this.setState({ 
                accountAddress:account.address,
                account, 
            })
        }
        this.timer = setTimeout(()=>{
            // 得到true web3智能合约对象
            eth_wallet_js.get_contract(
                '0xa4d17ab1ee0efdd23edc2869e7ba96b89eecf9ab',
                (r)=>{
                    if(this.state.isMounted){
                        this.setState({trueContract:r})
                    }                    
            })
        },200)
        this.setState({isMounted:true})
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
        this.setState({isMounted:false})
        this.setState = (state,callback)=>{
            return
        }
    }

    

    // 当导入了新的账户时更改使用的付款人地址
    updateAddress(address){
        this.setState({accountAddress:address})
        let storage = window.localStorage     
        let account = JSON.parse( storage.getItem('account') )
        if(account){
            this.setState({ 
                accountAddress:account.address,
                account, 
            })
        }
    }

    handleCurrencySelect(e){
        this.setState({currencyType:e.target.value})
    }

    chooseAccountFocus(e){
        this.setState({
            showAccountSelect:true
        })
    }

    // 发送代币或者以太坊
    send(){
        const { sendTO, sendNum,trueContract } = this.state
        const { privatekey } = this.state.account
        if(this.state.currencyType=='option'){
            this.setState({snackOpen:true,snackMessage:'请选择发送币种',snackMessageType:'warning'})
            return
        }
        this.setState({openLoading:true})
        if(this.state.currencyType=='ether'){                        
            eth_wallet_js.send_eth(
                {
                    to:sendTO,
                    privatekey,
                    val:sendNum,
                    val_type:'ether',
                },
                (r)=>{
                    log(r)
                    this.setState({openLoading:false}) 
                    if(r.err){
                        this.setState({snackOpen:true,snackMessage:'发送交易失败！',snackMessageType:'error'})
                    }else{
                        if(this.state.isMounted){
                            this.setState({ 
                                txhash:r.txhash,
                                snackOpen:true,snackMessage:'发送交易成功！',snackMessageType:'success'
                            })
                        }                        
                    }
                }
            )
        }
        if(this.state.currencyType=='true'){
            eth_wallet_js.send_token(
                {
                    to:sendTO,
                    val:sendNum,
                    contract:trueContract,
                    privatekey,
                },
                (r)=>{
                    this.setState({openLoading:false}) 
                    log(r)
                    if(r.err){
                        this.setState({snackOpen:true,snackMessage:'发送交易失败！',snackMessageType:'error'})
                    }else{
                        if(this.state.isMounted){
                            this.setState({ 
                                txhash:r.txhash,
                                snackOpen:true,snackMessage:'发送交易成功！等待区块确认...',snackMessageType:'success'
                            })
                        }                        
                    }
                }
            )
        }
    }

    render(){
        const { state, props } = this
        const { t, setLang } = props

        let { currencies } = state
        currencies.forEach(item=>{
            if(item.value=='option'){
                item.label = t.send_erc_select_currencies
            }
        })
        
        return (
            <div className='send-erc'>
                <Snack
                    message={state.snackMessage}
                    messageType={state.snackMessageType}
                    status={state.snackOpen}
                    closeSnack={ ()=>{ this.setState({snackOpen:false}) }}
                />
                <Dialog
                    open={state.openLoading}
                    TransitionComponent={Transition}
                    keepMounted
                >
                    <DialogContent>
                        <RingLoader color="#00ACC1" size="60px" margin="5px"/>
                    </DialogContent>
                </Dialog>    
                <Card raised={true} style={ { marginBottom:'20px' } } >
                { 
                    state.step =='send' &&
                    <div className='send-card'>
                        <TextField 
                            label={t.send_erc_send_input_label}
                            // {'发送至地址'} 
                            placeholder={t.public_account_address_tip_words}
                            // {'地址通常为0x开头的42位16进制字符串'} 
                            fullWidth={true}
                            type="text"
                            onChange={ e => state.sendTO = e.target.value }
                            style={{margin:'30px 0px 20px'}}
                        />
                        <div className='amount'>
                            <TextField 
                                label={t.public_amount}
                                // {'数额'} 
                                fullWidth={false} 
                                type="text"
                                onChange={ e => state.sendNum = e.target.value }
                                style={{margin:'0px 10px 30px 0px',flex:'2 1 auto'}}
                            />
                            <TextField
                                select
                                label={t.send_erc_send_select_currency_label}
                                // {'选择货币'}
                                value={state.currencyType}
                                onChange={this.handleCurrencySelect}
                                style={{margin:'0px 10px 30px',flex:'auto'}}
                            >
                                {state.currencies.map(item => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <TextField
                            label={t.send_erc_send_payer_label}
                            // "付款人"
                            fullWidth={true}
                            type={"text"}
                            placeholder={state.accountAddress}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                                endAdornment:(
                                    <InputAdornment position="start">
                                        {
                                            state.showAccountSelect &&
                                            <Button 
                                                variant="outlined" 
                                                color="primary"
                                                style={{marginBottom:'12px'}}
                                                onClick={()=>{ this.setState({showAccountSelect:false }) }}
                                            >
                                                {/* 关闭导入账户 */}
                                                {t.send_erc_close_import_account}
                                            </Button>
                                        }                                        
                                    </InputAdornment>
                                ),
                                readOnly: true,
                            }}
                            onFocus={this.chooseAccountFocus}
                        />
                        {
                            state.showAccountSelect &&
                            <ImportAccount notify={this.updateAddress}></ImportAccount>
                        }
                        <Button 
                            variant="contained" 
                            color="primary"
                            fullWidth={true}
                            style={{color:'#fff',margin:'25px 0px'}}
                            onClick={this.send}
                        >
                            {/* 发送交易 */}
                            {t.send_erc_btn_text}
                        </Button>
                    </div>
                }
                </Card>
                { 
                    state.txhash.length > 0 &&
                    <TransactionStatus txhash={state.txhash}></TransactionStatus>
                }
                
                <style jsx>{`
                    .send-erc {
                        display: flex;                
                        flex:auto;
                        flex-direction:column;
                        min-width:300px;
                        max-width:1000px;
                        maigin:20px
                    }
                    .send-card {
                        padding: 20px;
                    }
                    .amount {
                        display: flex;                
                        flex:auto;
                    }
                `}</style>
            </div>
        )
    }
}
    
  
export default I18n(SendErc) 