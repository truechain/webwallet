import Layout from "../comps/layout";
import SendErc from "../comps/send-erc";

class Transfer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout nav={"transfer"}>
        <div className="send">
          <SendErc />
        </div>
        <style jsx>{`
          .send {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: flex-start;
            max-width: 1280px;
            margin: 10px auto 50px;
            padding: 10px 15px;
          }
        `}</style>
      </Layout>
    );
  }
}
export default Transfer;
