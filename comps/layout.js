import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withRouter } from 'next/router'

const log = console.log

class Layout extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            nav: props.nav
        }
        this.navChange = this.navChange.bind(this)
    }

    navChange(e,val){
        this.setState(
            { nav:val }
        )
        setTimeout( () => this.props.router.push('/'+val), 260 )
        e.preventDefault()
    }
    
    render(){
        const { state, props } = this

        return (
            <div className='layout'>
                <Head>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                    />
                </Head>
                <div className='header-wrapper'>
                    <div className='header'>
                        <div className='header-left'>
                            <div className='header-left-title'>在线钱包</div>
                            <div className='header-left-version'>v1.0.1</div>
                        </div>
                        <div className='header-right'>
                            <p>
                                <span className='header-right-descr'>当前语言</span>
                                <span className='header-right-detail'>中文</span>
                            </p>
                            <p>
                                <span className='header-right-descr'>当前连接以太坊节点</span>
                                <span className='header-right-detail'>infura</span>
                            </p>
                            <p>
                                <span className='header-right-descr'>当前网络平均gas价格</span>
                                <span className='header-right-detail'>4gwei</span>
                            </p>
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
                        <Tab value='index' label="创建/导入钱包" />
                        <Tab value='transfer' label="发送以太坊/代币" />
                        <Tab value='check-tx' label="检查交易状态" />
                        <Tab value='check-account' label="查看账户" />
                        <Tab value='helper' label="帮助中心" />
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