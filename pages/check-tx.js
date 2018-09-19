// import Layout from '../comps/layout'
// import TransactionStatus from '../comps/transaction-status'


const CheckTx = () =>(
    <Layout nav={'check-tx'}>
        <div className="transaction-status">
            <TransactionStatus></TransactionStatus>
        </div>	    
        <style jsx>{`
            .transaction-status {
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

export default CheckTx