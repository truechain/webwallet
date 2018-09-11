import en from '../locales/en.js'
import zh from '../locales/zh.js'

const log = console.log

function getRandomInt(min, max){
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

const I18n = (Wrapped)=>{
    
    I18n.langs = { zh, en }  //当前的语言文件
    I18n.defaultLang = I18n.langs['zh'] //相关语言里找不到对应key值时fallback回该语言
    I18n.langCode = 'zh'  // 初始默认语言
    I18n.chooseLang = I18n.langs[ I18n.langCode ]  //当前选择的语言
    I18n.lang = { ...I18n.defaultLang, ...I18n.chooseLang }   // 当前的最终语言内容
    I18n.comps = { } 

    return class extends React.Component{

        constructor(props) {
            super(props)
            this.state = { 
                lang:I18n.lang  
            }
            this.setLang = this.setLang.bind(this)
            this.i18nCompKey = new Date().getTime().toString()+( getRandomInt(100000,999999).toString() )
            I18n.comps[this.i18nCompKey] = this
        }

        setLang(x){
            I18n.langCode = x
            I18n.chooseLang = I18n.langs[ I18n.langCode ]
            I18n.lang = { ...I18n.defaultLang, ...I18n.chooseLang }
            for(let compKey in I18n.comps){
                if(!I18n.comps.hasOwnProperty(compKey) ){ continue; }  // 跳过原型链上继承过来的属性
                
                if(I18n.comps[compKey].setState){
                    I18n.comps[compKey].setState({ lang:I18n.lang })
                }              
            }
        }

        componentWillUnmount() {
            if(this.comp.componentWillUnmount){
                this.comp.componentWillUnmount()
            }            
            delete I18n.comps[this.i18nCompKey]
        }


        render() {
            const { lang } = this.state
            const props = {
              ...this.props,
              t:lang,
              setLang:this.setLang,
            }
            return <Wrapped {...props} ref={comp=>{this.comp=comp}} />
        }
    }
}

export default I18n