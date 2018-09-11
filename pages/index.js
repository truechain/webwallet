import Layout from '../comps/layout'
import CreateAccount from '../comps/create-account'
import ImportAccount from '../comps/import-account'
// import { withI18next } from '../util/withI18next'


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
                        margin:10px 10px 50px;
                    }
                `}</style>
            </Layout>
        )
    }
}


export default Index
// export default withI18next(['index','common'])(Index)