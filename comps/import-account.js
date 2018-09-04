import Card from '@material-ui/core/Card'

const ImportAccount = () =>(
    <Card raised={true}>
        <div className='import-account' >
            <p className='import-account-title'>导入账户</p>
        </div>
        <style jsx>{`
            .import-account {
                min-width:300px;
                padding:20px;
            }
            .import-account-title {
                color:#324057;
            }
        `}</style>
    </Card>
)

export default ImportAccount