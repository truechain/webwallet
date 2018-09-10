import en from '../locales/en.js'
import zh from '../locales/zh.js'


const log = console.log

const Ri18n = (Wrapped)=>{
    log(en);log(zh);
    const langs = { zh, en }

    return class extends React.Component{

        constructor(props) {
            super(props)
            this.state = { 
                lang:langs['zh']  // 初始默认语言//相关语言里找不到对应key值时fallback回该语言
            }
            this.setLang = this.setLang.bind(this)
        }

        setLang(x){
            this.setState({ lang:langs[x] })
        }

        render() {
            const { lang } = this.state
            const props = {
                ...this.props,
                t:lang,
                setLang:this.setLang,
            }

            return <Wrapped {...props} />
        }
    }
}

export default Ri18n