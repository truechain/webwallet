import Layout from '../comps/layout'
import CreateAccount from '../comps/create-account'
import ImportAccount from '../comps/import-account'

class Index extends React.Component{

    constructor(props) {
        super(props)
    }

    render(){
        const { state, props } = this
        return (
            <Layout nav={'index'}>
                <div className='index'>
                    <CreateAccount step='init'></CreateAccount>
                    <ImportAccount></ImportAccount>
                </div>
                <style jsx>{`
                    .index {
                        display: flex;
                        flex-direction:row;
                        flex-wrap:wrap;
                        justify-content:space-around;
                        align-items:flex-start;
                        max-width:1280px;
                        margin:10px;
                    }
                `}</style>
            </Layout>
        )
    }
}

export default Index