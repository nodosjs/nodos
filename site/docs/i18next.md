---
id: i18next
title: API интернационализации Nodos (I18n)
sidebar_label: API интернационализации Nodos (I18n)
---

В Node.js пакет [i18next](https://www.i18next.com) (краткое наименование для internationalization), представляет простой и расширяемый фреймворк для перевода вашего приложения на отдельный другой язык, иной чем английский, или для предоставления поддержки многоязычности в вашем приложении.

Процесс "интернационализация" обычно означает извлечение всех строк и других специфичных для локали частей (таких как форматы даты и валюты) за рамки вашего приложения.

Процесс "локализация" означает предоставление переводов и локализованных форматов для этих частей.

### 1 Как работает i18next в Nodos

В процессе инициализации вы имеете полный доступ к i18next. i18next предоставляет [API](https://www.i18next.com/overview/api). В **config/application.js** можно менять настройии для i18next с помощью **app.i18nextConfig**, так же есть доступ к **app.i18next**:
```
app.i18nextConfig = {
  lng: 'ru,
};
app.i18next.use(<Plugin>)
```
:::note
В **config/application.js** i18next еще не проинициализированный.
:::
В процессе иницализации i18next использует следующие дефолтные параметры, вы их можете переопределить с помощью **i18nextConfig**:
  - fallbackLng = 'en'
  - lng = 'en'
  - debug = env === 'development'

Мы используем [i18next-node-fs-backend](https://github.com/i18next/i18next-fs-backend) для Backend'a. Все ресурсе загружаются из **config/locales/{{lng}}.yml**.
```yml
# en.yml
hello: Hello, everyone!
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
