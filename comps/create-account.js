import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


class CreateAccount extends React.Component{

    constructor(props) {
        super(props)
        this.state = { }
    }

    render(){
        const { state, props } = this
        
        return (    
            <Card raised={true}>
                <div className="create-account">
                    <p className='create-account-title'>新建账户</p>
                    <TextField 
                        label={'设置密码（可选）'} 
                        placeholder={'建议设置9位或以上的强密码'} 
                        fullWidth={true} 
                        id="pwd" 
                        type="password" 
                    />
                    <Button 
                        variant="contained" 
                        color="primary"
                        fullWidth={true}
                        style={{color:'#fff',margin:'25px 0px'}}
                    >
                        生成账户
                    </Button>            
                </div>
                <style jsx>{`
                    .create-account {
                        min-width:300px;
                        padding:20px;
                    }
                    .create-account-title {
                        color:#324057;
                    }
                    .create-account-btn {
                        color:#fff;
                    }
                `}</style>
            </Card>
        )
    }
}


export default CreateAccount