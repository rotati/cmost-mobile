import I18n from 'react-native-i18n';

import en from './en'
import kh from './kh'

I18n.fallbacks = true

I18n.translations = {
  kh,
  en
};

I18n.defaultLocale = "kh"
I18n.locale = "kh"

export default I18n