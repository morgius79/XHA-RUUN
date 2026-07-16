# Keitaro — полный гайд по установке и настройке

> Трекер для баинга: установка, офферы, потоки, postback, связка с Meta

---

## 1. ЧТО ТАКОЕ KEITARO И ЗАЧЕМ ОН НУЖЕН

Keitaro — это трекер (прокси-сервер для рекламного трафика). Он стоит между рекламной площадкой (Meta) и оффером (партнёркой).

**Схема работы:**
```
Пользователь → Meta (креатив) → Keitaro → Преленд → Keitaro → Оффер
                                 ↓
                           Сбор статистики:
                           клики, конверсии, ГЕО, 
                           устройство, источник
```

**Зачем нужен трекер:**
1. **Маскировка ссылки** — Meta не видит, куда ведёшь пользователя
2. **Распределение трафика** — можно отправлять разных пользователей на разные офферы
3. **Статистика** — видишь, какой креатив, канал, ГЕО, устройство дают конверсии
4. **Anti-cheat** — Keitaro отсекает ботов и мусорный трафик
5. **Postback** — передаёт данные о конверсиях обратно в Meta для оптимизации

---

## 2. ТРЕБОВАНИЯ К СЕРВЕРУ

| Параметр | Минимум | Рекомендуется |
|----------|---------|--------------|
| CPU | 1 ядро | 2+ ядра |
| RAM | 1 GB | 2–4 GB |
| Диск | 10 GB SSD | 20+ GB SSD |
| ОС | Ubuntu 20.04+ | Ubuntu 22.04 / Debian 11 |
| Nginx | да | да |
| PHP | 8.1+ | 8.2+ |
| MySQL | 5.7+ | 8.0+ |

**Где брать VPS:**
- DigitalOcean ($6/мес), Vultr ($6/мес), Hetzner (от $4/мес)
- Для гемблинга: выбирай страну, куда льёшь трафик
- Важно: IP сервера не должен быть забанен в Meta

---

## 3. УСТАНОВКА KEITARO

### Вариант A — Быстрая установка через скрипт (рекомендуется)

```bash
# Подключиться к серверу
ssh root@твой-сервер

# Скачать установщик
cd /opt
wget https://keitaro.io/download/keitaro-latest.zip
unzip keitaro-latest.zip -d keitaro
cd keitaro

# Запустить установку
chmod +x install.sh
./install.sh
```

Скрипт сам установит Nginx, PHP, MySQL и настроит Keitaro.

**Что спросят при установке:**
- Домен для панели (например, tracker.mydomain.com)
- Email админа
- Пароль админа

### Вариант B — Ручная установка (если что-то пошло не так)

```bash
# 1. Установка зависимостей
apt update
apt install -y nginx mysql-server php8.2-fpm php8.2-mysql php8.2-curl \
  php8.2-xml php8.2-mbstring php8.2-zip php8.2-gd php8.2-bcmath unzip wget

# 2. Скачать Keitaro
cd /var/www
wget https://keitaro.io/download/keitaro-latest.zip
unzip keitaro-latest.zip
mv keitaro tracker
chown -R www-data:www-data tracker

# 3. Настроить базу данных MySQL
mysql -u root -p
CREATE DATABASE keitaro;
CREATE USER 'keitaro_user'@'localhost' IDENTIFIED BY 'твой_пароль';
GRANT ALL PRIVILEGES ON keitaro.* TO 'keitaro_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# 4. Настроить Nginx
cat > /etc/nginx/sites-available/tracker.conf << 'EOF'
server {
    listen 80;
    server_name tracker.mydomain.com;
    root /var/www/tracker;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
EOF

ln -s /etc/nginx/sites-available/tracker.conf /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx

# 5. Открыть http://tracker.mydomain.com в браузере и пройти веб-установщик
```

### После установки

1. Зайди в панель: `http://tracker.mydomain.com/admin`
2. Логин/пароль (который ввёл при установке)
3. Смени пароль админа
4. Настрой часовой пояс под ГЕО куда льёшь

**Важно:** Закрой панель от чужих — добавь HTTP-авторизацию:
```bash
htpasswd -c /etc/nginx/.htpasswd admin
```

Добавь в Nginx-конфиг:
```nginx
location /admin {
    auth_basic "Restricted";
    auth_basic_user_file /etc/nginx/.htpasswd;
}
```

---

## 4. ОСНОВНЫЕ ПОНЯТИЯ KEITARO

```
OFFER (Оффер) — ссылка на ленд партнёрки
    ↓
STREAM (Поток) — правила распределения трафика: 
    какой трафик на какой оффер отправлять
    ↓
CAMPAIGN (Кампания) — твоя рекламная кампания в Meta
    ссылка из Keitaro → в объявление Meta
    ↓
STATS (Статистика) — клики, конверсии, доход, расход
```

---

## 5. НАСТРОЙКА ОФФЕРА

1. Зайди в **Offers** → **Add Offer**
2. Заполни:

| Поле | Что вводить |
|------|------------|
| **Name** | Название (Casino ID, например) |
| **Offer URL** | Ссылка с партнёрки (с подстановками: `{clickid}`) |
| **Offer Status** | Active |
| **Country** | ГЕО оффера |
| **Payout** | Выплата (потом подставится) |

**Offer URL обычно выглядит так:**
```
https://partner.casino.com/click?subid={clickid}&campaign=123
```

Параметр `{clickid}` — это ID клика в Keitaro. Партнёрка передаст его обратно при конверсии → Keitaro поймёт, какой клик сконвертился.

---

## 6. НАСТРОЙКА ПОТОКА (STREAM)

Поток определяет, как трафик распределяется между офферами.

1. Зайди в **Streams** → **Add Stream**
2. Заполни:

| Поле | Что вводить |
|------|------------|
| **Name** | Название потока (например, "FB → Casino ID → Преленд") |
| **Flow Type** | Simple (одно направление) или Advanced (с условиями) |
| **Offer** | Выбери оффер, который создал |

3. **Настройка преленда:**
   - В **Landings** добавь URL преленда
   - В потоке укажи: трафик → Landing (преленд) → Offer (оффер)

4. **Настройка трекинг-токенов:**
   - В параметры потока добавь токены из Meta
   - `{source}` → для источника трафика
   - `{campaign}` → для ID кампании
   - `{creative}` → для ID креатива

5. Сохрани поток → получишь ссылку вида:
```
http://tracker.mydomain.com/click/XXXXX
```

Эту ссылку вставишь в объявление Meta.

---

## 7. НАСТРОЙКА КАМПАНИИ В KEITARO

Кампания в Keitaro = твоя рекламная кампания в Meta.

1. Зайди в **Campaigns** → **Add Campaign**
2. Заполни:

| Поле | Что вводить |
|------|------------|
| **Name** | Название (ID кампании из Meta) |
| **Campaign URL** | Ссылка из потока (http://tracker/click/XXXXX) |
| **Traffic Source** | Facebook |
| **Stream** | Выбери поток |

**Важно:** Campaign URL — это ссылка, которую ты вставишь в объявление Meta. Meta → Keitaro → преленд → оффер.

---

## 8. POSTBACK — САМОЕ ВАЖНОЕ

Postback — это механизм, который передаёт данные о конверсии из партнёрки в Keitaro, а из Keitaro в Meta.

### Зачем:
- Meta узнаёт, какие конверсии принесли её клики
- Meta оптимизирует показы под конверсии
- Ты видишь реальную статистику по кампаниям

### Схема postback:
```
Пользователь → Meta → Keitaro → Оффер → Регистрация/Депозит
                                              ↓
Партнёрка отправляет callback с clickid → Keitaro
                                              ↓
Keitaro передаёт конверсию → Meta (через pixel/CAPI)
```

### Настройка postback в Keitaro

1. Зайди в **Offers** → выбери оффер → **Postback**

2. Добавь postback URL от партнёрки (у каждой партнёрки свой формат):
```
https://partner.casino.com/postback?clickid={clickid}&payout={payout}&status={status}
```

3. В настройках укажи параметры:
   - **Click ID token:** `{clickid}` (Keitaro передаёт в Offer URL)
   - **Payout token:** `{payout}` (Keitaro передаёт в postback URL)

### Настройка postback из Keitaro в Meta

Для передачи конверсий обратно в Meta используй **FB Pixel** или **Conversions API (CAPI)**:

**Вариант 1 — FB Pixel (проще):**
1. Создай пиксель в Meta Events Manager
2. Вставь код пикселя на преленд или в Keitaro (Postback → Pixel)
3. Keitaro будет отправлять события Purchase/Lead в Meta

**Вариант 2 — CAPI Server (надёжнее, Meta меньше блокирует):**
1. Получи токен доступа CAPI в Meta
2. В Keitaro: Settings → Integrations → Facebook CAPI
3. Вставь Pixel ID + Access Token
4. Настрой, какие события отправлять (Purchase, Lead)

---

## 9. ПРИВЯЗКА META → KEITARO → ОФФЕР

### Пошаговая инструкция

**Шаг 1 — Создаёшь поток в Keitaro:**
- Stream → Add → выбери оффер → добавь преленд → сохрани
- Получи ссылку: `http://tracker.mydomain.com/click/XXXXX`

**Шаг 2 — Создаёшь кампанию в Meta:**
- В объявлении вставь ссылку из Keitaro: `http://tracker.mydomain.com/click/XXXXX`
- Добавь UTM-метки (Meta добавляет автоматически)

**Шаг 3 — Настраиваешь postback:**
- В оффере Keitaro укажи postback URL от партнёрки
- Настрой отправку конверсий в Meta (Pixel / CAPI)

### Как Meta узнаёт, кто конвертился

```
Meta показывает креатив Пете
  → Петя кликает, Meta записывает click_id
  → Петя попадает в Keitaro, click_id сохраняется
  → Keitaro перенаправляет Петю на преленд → оффер
  → Петя регистрируется и делает депозит
  → Партнёрка шлёт callback в Keitaro: "click_id XXX сконвертился"
  → Keitaro шлёт конверсию в Meta: "click_id XXX → конверсия"
  → Meta видит: "объявление YYY привело конверсию"
  → Meta оптимизирует показы под таких как Петя
```

---

## 10. СТАТИСТИКА В KEITARO

### Основные колонки

| Колонка | Что показывает |
|---------|---------------|
| **Impressions** | Показы |
| **Clicks** | Клики |
| **CTR** | Кликабельность |
| **CR** | Конверсия (% от кликов) |
| **CPA** | Цена конверсии |
| **CPC** | Цена клика |
| **EPC** | Доход с клика |
| **ROI** | Окупаемость |
| **Revenue** | Доход (с postback) |
| **Cost** | Расход (если ввести руками) |
| **Profit** | Чистая прибыль |

### Отчёты

Keitaro позволяет смотреть статистику в разрезе:

- **By Campaign** — эффективность кампаний
- **By Stream** — эффективность потоков
- **By Offer** — какой оффер лучше
- **By Landing** — какой преленд/ленд лучше
- **By Source** — эффективность источников трафика
- **By Country** — по странам
- **By OS / Browser** — по устройствам

### Загрузка расходов (Cost Import)

Чтобы Keitaro считал ROI, нужно загрузить расходы:

1. Скачай отчёт из Meta Ads Manager (CSV)
2. Зайди в Keitaro: **Reports → Cost Import**
3. Загрузи CSV с колонками: Date, Campaign, Cost

Или используй интеграцию с Meta (если настроена):
- **Settings → Integrations → Facebook**
- Подключи аккаунт → Keitaro сам загружает расходы

---

## 11. ТИПИЧНЫЕ ПРОБЛЕМЫ И РЕШЕНИЯ

### Проблема 1 — Meta не принимает ссылку Keitaro
**Причина:** Домен не верифицирован или забанен
**Решение:**
- Используй свой домен (не IP)
- SSL-сертификат (Let's Encrypt — бесплатно)
- Домен должен быть "чистым" (не светился в казино)

### Проблема 2 — Postback не работает
**Причина:** Несовпадение параметров clickid
**Решение:**
- Проверь, что партнёрка получает `{clickid}` в Offer URL
- Проверь, что партнёрка отправляет `{clickid}` обратно
- Проверь формат postback URL (спроси у менеджера партнёрки)

### Проблема 3 — Конверсии есть в Keitaro, но нет в Meta
**Причина:** Не настроена интеграция Meta
**Решение:**
- Настрой FB Pixel на преленде
- Или подключи CAPI Server
- Проверь, что события отправляются (тестовый клик)

### Проблема 4 — Keitaro тормозит / медленно грузится
**Причина:** Мало RAM на VPS
**Решение:**
- Увеличь RAM до 2–4 GB
- Включи Redis (Settings → Cache → Redis)
- Оптимизируй MySQL (my.cnf)

---

## 12. SSL-СЕРТИФИКАТ (HTTPS)

Meta требует HTTPS для ссылок. Let's Encrypt — бесплатно:

```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d tracker.mydomain.com
```

Сертификат обновляется автоматически.

---

## 13. ЧЕК-ЛИСТ НАСТРОЙКИ KEITARO

**Установка:**
- [ ] VPS арендован (2+ GB RAM, SSD)
- [ ] Домен привязан к VPS
- [ ] Keitaro установлен
- [ ] SSL-сертификат (HTTPS)
- [ ] Админ-панель закрыта паролем

**Офферы:**
- [ ] Оффер создан в Keitaro
- [ ] Offer URL содержит `{clickid}`
- [ ] Выплата указана

**Поток:**
- [ ] Поток создан
- [ ] Преленд добавлен (если нужен)
- [ ] Ссылка потока скопирована

**Meta:**
- [ ] Ссылка из Keitaro вставлена в объявление
- [ ] FB Pixel стоит на преленде
- [ ] (Или CAPI Server настроен)

**Postback:**
- [ ] Postback URL от партнёрки добавлен
- [ ] Тестовая конверсия прошла
- [ ] Конверсии видны в Keitaro
- [ ] Конверсии видны в Meta

---

## 14. БЕЗОПАСНОСТЬ

- **Закрой admin-панель** — HTTP-авторизация или доступ только по IP
- **Регулярно обновляй Keitaro** — новые версии закрывают уязвимости
- **Не используй один домен для панели и трек-ссылок** — трек ссылки (click/XXXXX) на поддомене, панель на другом
- **Бэкапы** — хотя бы раз в неделю дамп БД

```bash
# Бэкап базы данных
mysqldump -u root keitaro > /backup/keitaro_$(date +%Y%m%d).sql

# Восстановление
mysql -u root keitaro < /backup/keitaro_20250101.sql
```
