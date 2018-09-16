import Layout from '../comps/layout'
import CreateAccount from '../comps/create-account'
import ImportAccount from '../comps/import-account'
// import { withI18next } from '../util/withI18next'
// import RingLoader from 'halogen/RingLoader'
// let RingLoader = require('halogen/RingLoader')
import RingLoader from '../util/es6-ring-loader'


class Index extends React.Component{

    constructor(props) {
        super(props)
    }

    render(){
        const { state, props } = this
        return (            
            <Layout nav={'index'}>
                <div className='index'>
                    <RingLoader color="#26A65B" size="60px" margin="4px"/>
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
                        margin:10px auto 50px;
                        padding:10px 15px;
                    }
                `}</style>
            </Layout>
        )
    }
}


export default Index
// export default withI18next(['index','common'])(Index)