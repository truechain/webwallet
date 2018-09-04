import Layout from '../comps/layout'
import CreateAccount from '../comps/create-account'
import ImportAccount from '../comps/import-account'

const Index = () =>(
    <Layout nav={'index'}>
	    <div className='index'>
            <CreateAccount></CreateAccount>
            <ImportAccount></ImportAccount>
        </div>
        <style jsx>{`
            .index {
                display: flex;
                flex-direction:row;
                flex-wrap:wrap;
                justify-content:space-around;
                align-items:flex-start;
                max-width:1200px;
                margin:10px;
            }
        `}</style>
    </Layout>
)

export default Index