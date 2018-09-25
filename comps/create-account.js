import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Split from './split-line'
import Snack from './snackbar'
import I18n from '../util/i18n'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'


import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import RingLoader from '../util/es6-ring-loader'

const log = console.log

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class CreateAccount extends React.Component{

    constructor(props) {
        super(props)
        this.state = { 
            step:props.step,
            accountPwd:'',
            openSnack:false,
            openLoading:false,  // 打开dialog
            showPassword: false,
        }
        /**step：
         *  'init':初始页面
         *  'save':保存账户
         */
        this.createEthAccount = this.createEthAccount.bind(this)
        this.downloadKeystore = this.downloadKeystore.bind(this)
        this.closeLoading = this.closeLoading.bind(this)
    }

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return
        }        
    }

    // 关闭loading框
    closeLoading(){
        this.setState({openLoading:false})
    }

    // 创建账户
    createEthAccount(){
        const { t } = this.props
        this.setState({openLoading:true})
        eth_wallet_js.gen_wallet(this.state.accountPwd,res=>{

            let { privatekey,address,mnemonic,keystore } = res
            this.setState({
                step:'save',
                accountPrivatekey:privatekey,
                accountAddress:address,
                accountMnemonic:mnemonic,
                accountKeystore:keystore,
                openSnack:true,
                message:t.create_account_success_message, //'创建账户成功！',
                messageType:'success',
                openLoading:false
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
        const { t,setLang } = props
        let orWords = t.public_or_words // 或者

        return (
            <div style={{flex:'auto',margin:'20px',maxWidth:'600px'}}>
                <Dialog
                    open={state.openLoading}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                        <RingLoader color="#00ACC1" size="60px" margin="5px"/>
                        <DialogContentText id="alert-dialog-slide-description">
                            {/* 加载中... */}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>    
                <Card raised={true}>
                {
                    state.step == 'init' &&
                    <div className="create-account">
                        <p className="create-account-title">
                            {/* 新建账户 */}
                            {t.create_account_title}
                        </p>                        
                        <TextField 
                            // {'设置密码（可选）'} 
                            label={t.create_account_input_set_pwd_tip}                            
                            placeholder={t.create_account_input_set_pwd_suggest}
                            // {'建议设置9位或以上的强密码'} 
                            fullWidth={true} 
                            id="pwd" 
                            type={this.state.showPassword ? 'text' : 'password'}
                            onChange={ e => state.accountPwd = e.target.value }
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment variant="filled" position="end">
                                    <IconButton
                                      aria-label="Toggle password visibility"
                                      onClick={
                                          ()=>this.setState( state => ({ showPassword: !state.showPassword }) )
                                      }
                                    >
                                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                        />
                        <Button 
                            variant="contained" 
                            color="primary"
                            fullWidth={true}
                            style={{color:'#fff',margin:'25px 0px'}}
                            onClick={this.createEthAccount}
                        >
                            {/* {t('gen_account')} */}
                            { t.gen_account }
                            {/* 生成账户 */}
                        </Button>            
                    </div>    
                }
                {
                    state.step == 'save' &&
                    <div className="save-account">
                        <p className="save-account-title">
                            {/* 保存账户 */}
                            {t.create_account_save_title}
                        </p>
                        <p className="title">
                            {/* 保存好你的私钥 */}
                            {t.create_account_save_privatekey}
                        </p>
                        <p className="bk-text">{state.accountPrivatekey}</p>
                        <p className="title">
                            {/* 你的地址 */}
                            {t.create_account_show_your_address}
                        </p>
                        <p className="bk-text">{state.accountAddress}</p>
                        <Split width="120px" color="#8492A6" text={orWords} />
                        <p className="title">
                            {/* 抄写下你的助记词 */}
                            {t.create_account_copy_your_mnemonic}
                        </p>
                        <p className="bk-text">{state.accountMnemonic}</p>
                        <Split width="120px" color="#8492A6" text={orWords} />
                        <Button 
                            variant="contained" 
                            color="primary"
                            fullWidth={true}
                            style={{color:'#fff',margin:'25px 0px'}}
                            onClick={this.downloadKeystore}
                        >
                            {/* 下载你的keystore文件 */}
                            { t.create_account_download_your_keystore }
                        </Button>
                    </div>
                }                                  
                </Card>
                <Snack 
                    status={state.openSnack} 
                    message={state.message} 
                    messageType={state.messageType} 
                    closeSnack={ ()=>this.setState({openSnack:false}) } 
                />
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

export default I18n(CreateAccount)
// export default translate('common')(CreateAccount)