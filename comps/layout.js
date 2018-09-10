import Head from 'next/head'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withRouter } from 'next/router'


const log = console.log



class Layout extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            nav: props.nav,
            gasPrice:'',
            openSnack:props.openSnack || false,
        }
        this.navChange = this.navChange.bind(this)
    }

    componentDidMount() { // 生命周期钩子 组件渲染完成后
       this.ewj = eth_wallet_js
       this.web3 = this.ewj.web3
       this.interval = setInterval(() => this.tick(), 1500);
    }

    componentWillUnmount() { // 生命周期钩子 组件卸载前清除定时器
        clearInterval(this.interval)
        clearTimeout(this.timer)
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
        this.timer = setTimeout( () => this.props.router.push('/'+val), 260 )
        e.preventDefault()
    }

    
    
    
    render(){
        const { state, props } = this
        const headerRight = [
            {descr:'当前语言',detail:'中文',key:'language'},
            {descr:'当前连接以太坊节点',detail:'infura',key:'node'},
            {descr:'当前网络平均gas价格',detail:state.gasPrice,key:'gasPrice'},
        ]
        const navs = [
            {label:'创建/导入钱包',val:'index'},
            {label:'发送以太坊/代币',val:'transfer'},
            {label:'检查交易状态',val:'check-tx'},
            {label:'查看账户',val:'check-account'},
            {label:'帮助中心',val:'helper'},
        ]

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
                            <div className='header-left-title'>在线钱包</div>
                            <div className='header-left-version'>v1.0.1</div>
                        </div>
                        <div className='header-right'>
                            { 
                                headerRight.map( item=> (
                                    <p key={item.descr}>
                                        <span className='header-right-descr'>{item.descr}</span>
                                        <span className='header-right-detail'>{item.detail}</span>
                                    </p>
                                ) ) 
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
                        margin: 0px 8px;
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
    
  
export default withRouter(Layout) 