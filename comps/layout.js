import Head from 'next/head'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withRouter } from 'next/router'
import I18n from '../util/i18n'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const log = console.log



class Layout extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            nav: props.nav,
            gasPrice:'',
            openSnack:false,
            anchorEl: null,
            langLabel:'', //当前语言
            langCode: I18n.langCode,
            langs:[
                {label:'中文',val:'zh'},
                {label:'English',val:'en'},
            ] 
        }
        this.navChange = this.navChange.bind(this)
        this.selectLang = this.selectLang.bind(this)
        this.setLang = this.setLang.bind(this)
    }

    componentDidMount() { // 生命周期钩子 组件渲染完成后
       this.ewj = eth_wallet_js
       this.web3 = this.ewj.web3
       this.interval = setInterval(() => this.tick(), 1500);
       this.state.langs.forEach(item=>{
           if(this.state.langCode == item.val){
               this.setState({langLabel:item.label})
           }
       })
    }

    componentWillUnmount() { // 生命周期钩子 组件卸载前清除定时器
        clearInterval(this.interval)
        clearTimeout(this.timer)
        this.setState = (state,callback)=>{
            return;
        }
    }

    tick() {        
        this.setState({
            gasPrice: this.ewj.gas_price_gwei+'gwei'
        });
    }

    navChange(e,val){
        this.setState(
            { nav:val }
        )
        this.timer = setTimeout( () => this.props.router.push('/'+val), 160 )
        e.preventDefault()
    }
    
    // 点击时弹出选择语言
    selectLang(e){
        this.setState({ anchorEl: e.currentTarget });
    }

    // 具体语言被选择
    setLang(langCode){
        this.props.setLang(langCode)
        let lang = {}
        this.state.langs.forEach(item=>{
            if(item.val == langCode){ 
                lang = item
            }
        })
        let { label, val } = lang
        this.setState({ anchorEl: null,langLabel:label,langCode:val });
    }

    
    
    
    render(){
        const { state, props } = this
        let { t,setLang } = props
        const headerRight = [
            { descr:t.layout_current_language, detail:state.langLabel, key:'language' },
            { descr:t.layout_current_node, detail:'infura', key:'node' },
            { descr:t.layout_current_average_gas_price, detail:state.gasPrice, key:'gasPrice' },
        ]
        const navs = [
            { label:t.layout_nav_index, val:'index' },
            { label:t.layout_nav_send_erc, val:'transfer' },
            { label:t.layout_nav_check_tx, val:'check-tx' },
            { label:'查看账户', val:'check-account' },
            { label:'帮助中心', val:'helper' },
        ]

        const { langs, anchorEl } = state;

        return (
            <div className='layout'>
                <Head>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                    />
                    <script type="text/javascript" src="/static/lightwallet.min.js" ></script>
                    <script src="/static/web3.min.js"></script>
                    <script src="/static/eth-wallet-js.js"></script>
                </Head>
                <div className='header-wrapper'>
                    <div className='header'>
                        <div className='header-left'>
                            <div className='header-left-title'>
                                {/* 在线钱包 */}
                                {t.layout_app_name}
                            </div>
                            <div className='header-left-version'>v1.0.1</div>
                        </div>
                        <div className='header-right'>
                            { 
                                headerRight.map( item=> {
                                    if(item.key=='language'){
                                        return (
                                            <p key={item.descr}>
                                                <span className='header-right-descr'>{item.descr}</span>
                                                <span className='header-right-detail'></span>
                                                <Button
                                                    aria-owns={anchorEl ? 'simple-menu' : null}
                                                    aria-haspopup="true"
                                                    onClick={this.selectLang}
                                                    style={{color:'white'}}
                                                >
                                                    {state.langLabel}
                                                </Button>
                                                <Menu
                                                    id="simple-menu"
                                                    anchorEl={anchorEl}
                                                    open={Boolean(anchorEl)}
                                                    // onClose={this.close}
                                                >
                                                { 
                                                    langs.map( lang => (
                                                        <MenuItem key={lang.val} onClick={()=>{this.setLang(lang.val)} }>{lang.label}</MenuItem>
                                                    ) ) 
                                                }
                                                </Menu>
                                            </p>
                                        )
                                    }else{
                                        return (
                                            <p key={item.descr}>
                                            <span className='header-right-descr'>{item.descr}</span>
                                            <span className='header-right-detail'>{item.detail}</span>
                                            </p>
                                        )
                                    }                                    
                                })  
                            }
                        </div>
                    </div>
                </div>        
                <div>
                    <Tabs
                        value={state.nav}
                        onChange={this.navChange}
                        scrollable={true}
                        scrollButtons="auto"
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        {
                            navs.map( item=>(<Tab key={item.val} value={item.val} label={item.label} />) )
                        }
                    </Tabs>
                </div>
                <div>
                    {props.children}
                </div>                
                <style jsx global>{`
                    body {
                        margin:0px;
                        padding:0px;
                        background-color:#eee;
                    }
                `}</style>                
                <style jsx>{`
                    .layout {
                        display: flex;                
                        flex:1;
                        flex-direction:column;
                    }
                    .header-wrapper {
                        background-color:#00ACC1;                
                    }
                    .header {
                        display: flex;
                        flex-direction:row;
                        flex-wrap:wrap;
                        justify-content:space-between;
                        align-items:center;
                        max-width:1200px;
                        margin:0px auto;
                        color:white;
                    }
                    .header-left {
                        padding: 15px;
                    }
                    .header-left-title {
                        font-size:26px;
                        line-height:50px;
                        font-weight:600;
                    }
                    .header-left-version {
                        color: #ddd;
                        font-size:14px;
                        line-height:26px;
                    }
                    .header-right {
                        flex-direction:column;
                        justify-content:center;
                        align-items:flex-start;
                        padding:15px;
                        color:white;
                    }
                    .header-right-descr {
                        font-size:13px;
                        margin: 0px 5px;
                    }
                    .header-right-detail {
                        font-size:16px;
                        font-weigth:600;
                    }                    
                `}</style>
            </div>
        )
    }
}
    
  
export default withRouter( I18n( Layout ) ) 