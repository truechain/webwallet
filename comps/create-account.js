import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Split from './split-line'
import Snack from './snackbar'

const log = console.log



class CreateAccount extends React.Component{

    constructor(props) {
        super(props)
        this.state = { 
            step:props.step,
            accountPwd:'',
            openSnack:false,
        }
        /**step：
         *  'init':初始页面
         *  'save':保存账户
         */
        log(this)
        this.createEthAccount = this.createEthAccount.bind(this)
        this.downloadKeystore = this.downloadKeystore.bind(this)
    }

    createEthAccount(){
        eth_wallet_js.gen_wallet(this.state.accountPwd,res=>{

            let { privatekey,address,mnemonic,keystore } = res
            this.setState({
                step:'save',
                accountPrivatekey:privatekey,
                accountAddress:address,
                accountMnemonic:mnemonic,
                accountKeystore:keystore,
                openSnack:true,
                message:'创建账户成功！',
                messageType:'success'
            })
            let storage = window.localStorage
            storage.setItem( 'account', JSON.stringify(res) )
        })
    }

    downloadKeystore(){
        let keystore = this.state.accountKeystore
        eth_wallet_js.download_keystore_file({ data:keystore })
    }

    render(){
        const { state, props } = this

        return (
            <div style={{flex:'auto',margin:'20px',maxWidth:'600px'}}>    
                <Card raised={true}>
                {
                    state.step == 'init' &&
                    <div className="create-account">
                        <p className="create-account-title">新建账户</p>                        
                        <TextField 
                            label={'设置密码（可选）'} 
                            placeholder={'建议设置9位或以上的强密码'} 
                            fullWidth={true} 
                            id="pwd" 
                            type="password"
                            onChange={ e => state.accountPwd = e.target.value }
                        />
                        <Button 
                            variant="contained" 
                            color="primary"
                            fullWidth={true}
                            style={{color:'#fff',margin:'25px 0px'}}
                            onClick={this.createEthAccount}
                        >
                            生成账户
                        </Button>            
                    </div>    
                }
                {
                    state.step == 'save' &&
                    <div className="save-account">
                        <p className="save-account-title">保存账户</p>
                        <p className="title">保存好你的私钥</p>
                        <p className="bk-text">{state.accountPrivatekey}</p>
                        <p className="title">你的地址</p>
                        <p className="bk-text">{state.accountAddress}</p>
                        <Split width="120px" color="#8492A6" text="或者" />
                        <p className="title">抄写下你的助记词</p>
                        <p className="bk-text">{state.accountMnemonic}</p>
                        <Split width="120px" color="#8492A6" text="或者" />
                        <Button 
                            variant="contained" 
                            color="primary"
                            fullWidth={true}
                            style={{color:'#fff',margin:'25px 0px'}}
                            onClick={this.downloadKeystore}
                        >
                            下载你的keystore文件
                        </Button>
                    </div>
                }                                  
                </Card>
                <Snack status={state.openSnack} message={state.message} messageType={state.messageType} />
                <style jsx>{`
                    .create-account {
                        min-width:300px;
                        padding:20px;
                    }
                    .create-account-title {
                        color:#324057;
                    }
                    .save-account {
                        min-width:300px;
                        padding:20px;
                        word-break:break-all;
                    }
                    .save-account-title {
                        color:#324057;
                    }
                    .title {
                        color:rgba(0, 0, 0, 0.54);
                        font-size:18px;
                    }
                    .bk-text {
                        color:white;
                        background-color:#475669;
                        padding:20px 15px;
                    }  
                `}</style>
            </div>
        )
    }
}


export default CreateAccount