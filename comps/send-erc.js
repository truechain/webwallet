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
            showAccountSelect:false
        }
        this.handleCurrencySelect = this.handleCurrencySelect.bind(this)
        this.chooseAccountBlur = this.chooseAccountBlur.bind(this)
        this.chooseAccountFocus = this.chooseAccountFocus.bind(this)
    }

    handleCurrencySelect(e){
        this.setState({currencyType:e.target.value})
    }

    chooseAccountFocus(e){
        log('focus',e)
        this.setState({ 
            // accountAddress:'0x1234567',
            showAccountSelect:true
        })
    }

    chooseAccountBlur(e){
        log('blur',e)
        this.setState({
            // showAccountSelect:false
        })
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
                                readOnly: true,
                            }}
                            onFocus={this.chooseAccountFocus}
                            onBlur={this.chooseAccountBlur}
                        />
                        {
                            state.showAccountSelect &&
                            <ImportAccount></ImportAccount>
                        }
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