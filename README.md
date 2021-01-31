# send.alexeylesin.ru

Простая опенсорсная альтернатива сервисам по типу Dropbox или WeTransfer. Основан на [psitransfer](https://github.com/psi-4ward/psitransfer). На данный момент неактуален. Если вы хотите посмотреть исходники новой версии, вам в [данный](https://github.com/alexeylesin/send) репозиторий.

* Никаких аккаунтов и авторизаций
* Полноценный перевод на русский язык
* Использование темной темы по дефолту
* Интерфейс оптимизирован под мобильные устройства
* Поддерживает отправку больших файлов
* Возобновляемые загрузки файлов ([tus.io](https://tus.io))
* Возможность установки пароля на контейнер
* Единоразовые загрузки (удаление после скачивания)
* Скачивание всех файлов в zip/tar.gz архивах
* Возможность посмотреть превью файлов
* Поддерживает NodeJS версии >=12, либо используйте флаг `--harmony-async-await`
* Защищённый паролем список загрузок ([AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard))
* Админ-панель (`/admin`) с информацией о контейнерах (_выключена пока вы не замените `adminPass` с false на пароль в конфиге_)
* Легковесный фронтенд на [Vue](https://vuejs.org). Сжат (по дефолту) меньше чем в 100k

## Быстрый старт

### Вручную, из готового релиза

```bash
# Убедитесь, что ваша версия NodeJS >= 12
$ node -v
v12.4.0

# Скачайте и распакуйте архив
# https://github.com/alexeylesin/old-send/releases

# Установите зависимости и запустите приложение
$ NODE_ENV=production npm install
$ npm start
```

### Вручную, сборка из исходников

```bash
# Скомпилируйте фронтенд
$ cd app
$ npm install
$ npm run build

# Установите зависимости
$ cd ..
$ npm install
$ npm start
```

### Конфигурация

В файле `config.js` есть несколько настроек, таких как порт и директория загрузок.
Вы можете:
* Отредактировать `config.js` **(не рекомендуется)**
* Создать файл `config.production.js`, где `production` это значение из `NODE_ENV`
  Смотрите `config.dev.js`
* Указать переменные среды по типу `PSITRANSFER_UPLOAD_DIR` для установки директории загрузок
* Для защиты LesinSend от загрузок, сделанных посторонними людьми, используйте данную переменную среды - `PSITRANSFER_UPLOAD_PASS`.

### Кастомизация

`public/pug/upload.pug` и `download.pug` остаются простыми.
Вы можете кастомизировать данные файлы и поменять всё под себя.
Пожалуйста, сохраните надпись *Powered by PsiTransfer* :)

### Отладка

LesinSend использует [debug](https://github.com/visionmedia/debug):

```bash
DEBUG=psitransfer:* npm start
```

## Доп. информация

* **Здесь (пока что) нет двустороннего (end-to-end) шифрования**.
* `Скачать всё как ZIP-архив` пока не поддерживает продолжение загрузки.

Хотите поддержать оригинального автора PsiTransfer? [![Задонатить](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RTWDCH74TJN54&item_name=psitransfer)

## Лицензия

[BSD](LICENSE)
