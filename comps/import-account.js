import Card from '@material-ui/core/Card'

const ImportAccount = () =>(
    <div style={{flex:'auto',margin:'20px'}}>
        <Card raised={true}>
            <div className='import-account' >
                <p className='import-account-title'>导入账户</p>
            </div>            
        </Card>
        <style jsx>{`
            .import-account {
                min-width:300px;
                padding:20px;
                flex:auto;
                margin:20px;
            }
            .import-account-title {
                color:#324057;
            }
        `}</style>
    </div>
)

export default ImportAccount