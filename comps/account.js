import I18n from '../util/i18n'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'

class Account extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            accountAddress:'',
            accountEthBalance:0,
            accountTrueBalance:0,            
            accountTtrBalance:0,
            accountTruebetaBalance:0,
            showAccount:false,
            isMounted:false,
        }
        this.handleAddressInput = this.handleAddressInput.bind(this)
        this.balanceOf = this.balanceOf.bind(this)
    }

    componentDidMount() {
        this.setState({isMounted:true})
        this.timer = setTimeout( ()=>{
            // 得到true web3智能合约对象
            eth_wallet_js.get_contract(
                '0xa4d17ab1ee0efdd23edc2869e7ba96b89eecf9ab',
                (r)=>{
                    if(this.state.isMounted){
                        this.setState({trueContract:r})
                    }                    
            })
            // 得到ttr web3智能合约对象
            eth_wallet_js.get_contract(
                '0xf2bb016e8c9c8975654dcd62f318323a8a79d48e',
                (r)=>{
                    this.setState({ttrContract:r})
            })
        }, 200 )
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
        this.setState({isMounted:false})
        this.setState = (state,callback)=>{
            return
        }
    }

    // 输入地址时
    handleAddressInput(e){
        let val =  e.target.value
        if( (val.length ==40) && ( val.indexOf("0x") < 0 ) ){            
            val = "0x" + val
            this.balanceOf( val )
        }
        if( (val.length == 42) && ( val.indexOf("0x") == 0 ) ){
            this.balanceOf( val )
        }
    }

    // 根据地址获取账户余额
    balanceOf(address){
        let accountState = {}
        if(this.state.trueContract){
            eth_wallet_js.get_balance(
                {
                    address,
                    contract:this.state.trueContract
                },
                r=>{
                    accountState = { 
                        showAccount:true, accountAddress:address,
                        accountEthBalance:r.ether  
                    }
                    if(r.token){ accountState.accountTrueBalance = r.token }                      
                    this.setState( accountState )
            })
        }
        if(this.state.ttrContract){
            eth_wallet_js.get_balance(
                {
                    address,
                    contract:this.state.ttrContract
                },
                r=>{
                    if(r.token){ 
                        accountState.accountTtrBalance = r.token 
                        this.setState( accountState )
                    } 
                }
            )
        }
        let web3 = eth_wallet_js.web3
        let useprotocol = window.location.protocol
        let truebetaurl = ''
        // truebetaurl = 'https://www.truescan.net/rpc/'
        truebetaurl = useprotocol+'//www.truewallet.net/true-beta-node/'
        let truebeta = new Web3.modules.ETrue(truebetaurl)
        truebeta.getBalance(address)
        .then((res)=>{
            if(res){
                accountState.accountTruebetaBalance = web3.utils.fromWei(res)
                this.setState( accountState )
            }
        })
    }

    render(){
        const { state,props } = this
        const { t,setLang } = props

        return (
            <div className="account">
                <Card raised={true}>
                    <div className="account-card">
                        {
                            !state.showAccount ?
                            (
                                <TextField
                                    label={t.public_account_address_words}
                                    // {'输入账户地址'} 
                                    placeholder={t.public_account_address_tip_words}
                                    // {'地址通常为0x开头的42位16进制字符串'} 
                                    fullWidth={true}
                                    type="text"
                                    onChange={this.handleAddressInput}
                                    style={{margin:'35px 0px'}}
                                />
                            ):
                            (
                                <div>
                                    <p>
                                        {/* 账户信息 */}
                                        {t.public_account_info_words}
                                    </p>
                                    <AccountCircleIcon color="primary" style={{fontSize:'80px'}}></AccountCircleIcon>
                                    <p className="account-address">
                                        <span className="meta-text" >
                                            {/* 账户地址： */}
                                            {t.public_account_address_words}:
                                        </span>
                                        <span className="primary-text" >{state.accountAddress}</span>
                                    </p>
                                    <p className="balance">
                                        <span className="meta-text">{t.eth_balance}：</span>
                                        <span className="primary-text">{state.accountEthBalance}</span>
                                        <span className="meta-text">
                                            {/* True余额： */}
                                            {t.true_balance}:
                                        </span>
                                        <span className="primary-text">{state.accountTrueBalance}</span>
                                        <span className="meta-text">
                                            {/* TTR余额： */}
                                            {t.ttr_balance}:
                                        </span>
                                        <span className="primary-text">{state.accountTtrBalance}</span>
                                        <span className="meta-text">
                                            {/* TRUe： */}
                                            True beta:
                                        </span>
                                        <span className="primary-text">{state.accountTruebetaBalance}</span>
                                    </p>
                                </div>
                            )
                        }                        
                    </div>
                </Card>
                <style jsx>{`
                    .account {
                        display: flex;                
                        flex:auto;
                        flex-direction:column;
                        min-width:300px;
                        max-width:1000px;
                        maigin:20px
                    }
                    .account-card {
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
                `}</style>
            </div>
        )
    }
}

export default I18n( Account )