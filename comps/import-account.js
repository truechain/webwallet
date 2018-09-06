import Card from '@material-ui/core/Card'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TextField from '@material-ui/core/TextField'
// import DropzoneComponent from 'react-dropzone-component'
import { UploadField } from '@navjobs/upload'

const log = console.log

class ImportAccount extends React.Component{

    constructor(props) {
        super(props)
        this.state = { 
            value:'privatekey',
            index:0,
            importWays:[
                {label:'私钥',val:'privatekey'},
                {label:'助记词',val:'mnemonic'},
                {label:'keystore',val:'keystore'},
            ],
        }
        /**step：
         *  'init':初始页面
         *  'save':保存账户
         */
        log(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeIndex = this.handleChangeIndex.bind(this)
    }

    handleChange = (event, value) => {
        log(value)
        this.state.importWays.forEach( (item,index)=>{
            if(item.val == value){
                this.setState({ index,value })
            }
        } )
        
    };

    handleChangeIndex = index => {
        let val = this.state.importWays[index].val
        log(val)
        this.setState({ value: val });
    };

    render(){
        const { state, props } = this

        return (
            <div style={{flex:'auto',margin:'20px'}}>
                <Card raised={true}>
                    <div className="import-account" >
                        <p className="import-account-title">导入账户</p>
                        <p className="title">你将怎样使用账户?</p>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={state.value}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                fullWidth
                            >
                            {
                                state.importWays.map( item=>(
                                    <Tab key={item.val} value={item.val} label={item.label} />
                                ) )
                            }
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={'x'}
                            index={state.index}
                            onChangeIndex={this.handleChangeIndex}
                        >
                        {
                            state.importWays.map( item=>(
                                <div key={item.val} className={item.val}>
                                {
                                    item.val == 'privatekey' &&
                                    <TextField 
                                        placeholder={'私钥内容'} 
                                        fullWidth={true}
                                        type="password"
                                        onChange={ e => state.accountPwd = e.target.value }
                                        style={{margin:'35px 0px'}}
                                    />
                                }
                                {
                                    item.val == 'mnemonic' &&
                                    <TextField 
                                        placeholder={'助记词'} 
                                        fullWidth={true}
                                        type="password"
                                        onChange={ e => state.accountPwd = e.target.value }
                                        style={{margin:'35px 0px'}}
                                    />
                                }
                                {
                                    item.val == 'keystore' &&
                                    <div style={{margin:'35px 0px'}}>
                                    <UploadField
                                        onFiles={ files =>{} }
                                        containerProps={{className: 'resume_import'}}
                                        uploadProps={{
                                            accept: '*/*',
                                        }}
                                    >
                                        <div className="uploader">
                                            <p>点击上传或者拖拽keystore文件到这里</p>
                                        </div>
                                    </UploadField>
                                    </div>
                                }
                                </div>
                            ) )
                        }
                        </SwipeableViews>
                    </div>            
                </Card>
                <style jsx>{`
                    .import-account {
                        min-width:300px;
                        padding:20px;
                        flex:auto;
                        margin:20px;
                        max-width:500px;
                    }
                    .import-account-title {
                        color:#324057;
                    }
                    .title {
                        color:rgba(0, 0, 0, 0.54);
                        font-size:18px;
                    }
                    .resume_import {
                        margin-top:35px 0px;
                    }
                    .uploader {
                        border: 3px dashed #C7C7C7;
                        padding: 20px;
                        border-radius:8px;
                        background-color:#E1E1E1;
                        text-align:center;
                    }
                `}</style>
            </div>
        )
    }
}

export default ImportAccount