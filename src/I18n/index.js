import I18n     from 'react-native-i18n'
import Database from '../config/Database'

import en from './en'
import kh from './kh'

I18n.fallbacks = true

I18n.translations = {
  kh,
  en
};

I18n.defaultLocale = "en"

const langSetting = Database.objects('Setting').filtered('key = $0', 'language')[0]
if (langSetting === undefined) {
  I18n.locale = "en"
} else {
  I18n.locale = langSetting.value
}

export default I18n