import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './messages/en'
import zh from './messages/zh'
import Cookie from "js-cookie";

Vue.use(VueI18n)
export const messages = {
    en,
    zh
}
const i18n = new VueI18n({
  locale:Cookie.get('lang')||'zh',
  messages,
})

export default i18n