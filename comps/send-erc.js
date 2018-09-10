import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircle from '@material-ui/icons/AccountCircle'
import InputAdornment from '@material-ui/core/InputAdornment';
import ImportAccount from './import-account'
const log = console.log



class SendErc extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            step:'send',
            currencyType:'option',
            currencies:[
                {label:'选择币种',value:'option'},
                {label:'ether',value:'ether'},
                {label:'true',value:'true'},
                // {label:'其它货币',value:'other'},
            ],
            sendTO:'',
            sendNum:'',
            showAccountSelect:false,
            accountAddress:''
        }
        this.handleCurrencySelect = this.handleCurrencySelect.bind(this)
        this.chooseAccountFocus = this.chooseAccountFocus.bind(this)
        this.send = this.send.bind(this)
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
        setTimeout(()=>{
            // 得到true web3智能合约对象
            eth_wallet_js.get_contract(
                '0xa4d17ab1ee0efdd23edc2869e7ba96b89eecf9ab',
                (r)=>{
                    this.setState({trueContract:r})
            })
        },200)
    }

    handleCurrencySelect(e){
        this.setState({currencyType:e.target.value})
    }

    chooseAccountFocus(e){
        this.setState({
            showAccountSelect:true
        })
    }

    send(){
        const { sendTO, sendNum,trueContract } = this.state
        const { privatekey } = this.state.account
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
                    log(r)
                }
            )
        }
    }

    render(){
        const { state, props } = this
        
        return (
            <div className='send-erc'>
                <Card raised={true}>
                { 
                    state.step =='send' &&
                    <div className='send-card'>
                        <TextField 
                            label={'发送至地址'} 
                            placeholder={'地址通常为0x开头的42位16进制字符串'} 
                            fullWidth={true}
                            type="text"
                            onChange={ e => state.sendTO = e.target.value }
                            style={{margin:'30px 0px 20px'}}
                        />
                        <div className='amount'>
                            <TextField 
                                label={'数额'} 
                                fullWidth={false} 
                                type="text"
                                onChange={ e => state.sendNum = e.target.value }
                                style={{margin:'0px 10px 30px 0px',flex:'2 1 auto'}}
                            />
                            <TextField
                                select
                                label={'选择货币'}
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
                            label="付款人"
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
                                                关闭导入账户
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
                            <ImportAccount></ImportAccount>
                        }
                        <Button 
                            variant="contained" 
                            color="primary"
                            fullWidth={true}
                            style={{color:'#fff',margin:'25px 0px'}}
                            onClick={this.send}
                        >
                            发送交易
                        </Button>
                    </div>
                }
                </Card>
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
    
  
export default SendErc 