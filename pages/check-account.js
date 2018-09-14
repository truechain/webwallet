import Layout from '../comps/layout'
import Account from '../comps/account'


const CheckAccount = () =>(
    <Layout nav={'check-account'}>
        <div className="check-account">
            <Account></Account>
        </div>
        <style jsx>{`
            .check-account {
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

export default CheckAccount