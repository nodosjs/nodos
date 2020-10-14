---
id: i18next
title: API интернационализации Nodos (I18n)
sidebar_label: API интернационализации Nodos (I18n)
---

В Node.js пакет [i18next](https://www.i18next.com) (краткое наименование для internationalization), представляет простой и расширяемый фреймворк для перевода вашего приложения на отдельный другой язык, иной чем английский, или для предоставления поддержки многоязычности в вашем приложении.

Процесс "интернационализация" обычно означает извлечение всех строк и других специфичных для локали частей (таких как форматы даты и валюты) за рамки вашего приложения.

Процесс "локализация" означает предоставление переводов и локализованных форматов для этих частей.

### 1 Как работает i18next в Nodos

В процессе инициализации вы имеете полный доступ к i18next. i18next предоставляет [API](https://www.i18next.com/overview/api). В **config/application.js** можно менять настройии для i18next:
```
app.i18next.changeLanguage('ru');
```
:::note
В **config/application.js** i18next уже проинициализированный.
:::
В процессе иницализации i18next устанавливает следующие параметры:
  - fallbackLng = 'en'
  - lng = 'en'
  - debug = env === 'development'

Все ресурсе загружаются из **config/locales/index.js** в процессе инициализации. Вы должны предоставить интерфейс для загрузки такой как:
```javascript
// en.js
export default {
  translation: {},
};
// index.js
import en from './en.js';
export default { en };
```

В контроллерах i18next так же доступен
```javascript
export const build = (request, response, { i18next }) => {};
```

Во вью доступна функция для перевода [t](https://www.i18next.com/overview/api#t)
```
h1
  = t('hello')
```
