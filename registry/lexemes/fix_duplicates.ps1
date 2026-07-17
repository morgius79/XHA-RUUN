$basePath = "C:\Cloude\registry\lexemes"
$date = "2026-07-16"

# Fix duplicate files: replace the later/higher ID with a new unique lexeme
$fixes = @()

# Each entry: id, lex, pos, trans, etym, ex1, ex1t, ex2, ex2t, deriv

# Replace duplicate kel-thal at L-000252
$fixes += @{id="L-000252"; lex="zhal-koss"; pos="существительное"; trans="изморозь, иней (воздух-лёд)"; etym="zhal- (воздух) + koss- (лёд)"; ex1="Zhal-koss veri thero."; ex1t="Иней покрывает скалы."; ex2="Zhal-koss thel kossa."; ex2t="Воздух замерзает в иней."; deriv="zhalkossae, zhalkossxari"}

# Replace khar-mor at L-000290
$fixes += @{id="L-000290"; lex="zhal-ver"; pos="существительное"; trans="ветер пустыни (воздух-твёрдость)"; etym="zhal- (воздух) + ver- (гора/твёрдость)"; ex1="Zhal-ver thali thero."; ex1t="Ветер пустыни — сухой."; ex2="Zhal-ver thel zhalo."; ex2t="Ветер несёт песок."; deriv="zhalverae, zhalverxari"}

# Replace khar-ruun at L-000256
$fixes += @{id="L-000256"; lex="xhel-vex"; pos="существительное"; trans="тепловая энергия (жар-сила)"; etym="xhel- (жар) + vex- (сила)"; ex1="Xhel-vex theri thero."; ex1t="Тепловая энергия из земли."; ex2="Xhel-vex thel vexi."; ex2t="Жар — источник силы."; deriv="xhelvexae, xhelvexvashi"}

# Replace khar-ser at L-000263
$fixes += @{id="L-000263"; lex="xhel-khar"; pos="существительное"; trans="пламя (огонь-свет)"; etym="xhel- (жар/огонь) + khar- (свет)"; ex1="Xhel-khar thali thero."; ex1t="Пламя освещает горизонт."; ex2="Xhel-khar thel xhelo."; ex2t="Огонь — жар и свет."; deriv="xhelkharae, xhelkharxari"}

# Replace khar-vash at L-000273
$fixes += @{id="L-000273"; lex="the-xhel"; pos="существительное"; trans="вулкан (земля-огонь)"; etym="the- (земля) + xhel- (жар/огонь)"; ex1="The-xhel theri thero."; ex1t="Вулкан дышит огнём."; ex2="The-xhel thel vexo."; ex2t="Земля извергает жар."; deriv="thexhelae, thexhelxari"}

# Replace khar-ven at L-000230
$fixes += @{id="L-000230"; lex="tan-zhal"; pos="существительное"; trans="запах, аромат"; etym="tan- (чувство) + zhal- (воздух)"; ex1="Tan-zhal xhari thero."; ex1t="Запах достигает разума."; ex2="Tan-zhal thel zhalo."; ex2t="Аромат — ощущение воздуха."; deriv="tanzhalae, tanzhalven"}

# Replace khar-zhal at L-000243
$fixes += @{id="L-000243"; lex="xhel-mor"; pos="существительное"; trans="пар, горячий источник (огонь-вода)"; etym="xhel- (жар) + mor- (вода)"; ex1="Xhel-mor theri thero."; ex1t="Горячий пар из земли."; ex2="Xhel-mor thel vexi."; ex2t="Пар — сила тепла."; deriv="xhelmorae, xhelmorxari"}

# Replace koss-ven at L-000296
$fixes += @{id="L-000296"; lex="zan-ruun"; pos="существительное"; trans="академия, сообщество учёных (знание-народ)"; etym="zan- (знание) + ruun- (народ)"; ex1="Zan-ruun veni thero."; ex1t="Академия — храм знания."; ex2="Zan-ruun thel vena."; ex2t="Сообщество учёных ищет истину."; deriv="zanruunae, zanruunxhari"}

# Replace koss-ver at L-000220
$fixes += @{id="L-000220"; lex="koss-xhel"; pos="существительное"; trans="оттепель (лёд-огонь)"; etym="koss- (лёд) + xhel- (жар)"; ex1="Koss-xhel theri thero."; ex1t="Оттепель приходит на землю."; ex2="Koss-xhel thel moro."; ex2t="Лёд тает в ручьи."; deriv="kossxhelae, kossxhelxari"}

# Replace mor-khar at L-000270
$fixes += @{id="L-000270"; lex="zan-ven"; pos="существительное"; trans="наука, систематическое знание (знание-истина)"; etym="zan- (знание) + ven- (истина)"; ex1="Zan-ven xhari thero."; ex1t="Наука — истина разума."; ex2="Zan-ven thel veni."; ex2t="Знание хранится в архивах."; deriv="zanvenae, zanvenvene"}

# Replace mor-sha at L-000131
$fixes += @{id="L-000131"; lex="vokh-xa"; pos="существительное"; trans="экология, баланс жизни (порядок-жизнь)"; etym="vokh- (порядок) + xa- (жизнь)"; ex1="Vokh-xa theri thero."; ex1t="Экология — баланс на земле."; ex2="Vokh-xa thel xaro."; ex2t="Порядок жизни — в цикле."; deriv="vokhxarae, vokhxaven"}

# Replace mor-thal at L-000299 (adjective)
$fixes += @{id="L-000299"; lex="morthal-ae"; pos="прилагательное"; trans="океанический, открытый"; etym="mor-thal (океан) + -ae (свойство)"; ex1="Mor-thalae xari thero."; ex1t="Океаническая среда."; ex2="Mor-thalae thel rhuri."; ex2t="Океанское — великое."; deriv="morthalae"}

# Replace mor-the at L-000224
$fixes += @{id="L-000224"; lex="zan-mor"; pos="существительное"; trans="океанография (знание-вода)"; etym="zan- (знание) + mor- (вода)"; ex1="Zan-mor mor-thal thero."; ex1t="Океанография изучает океан."; ex2="Zan-mor thel vena."; ex2t="Знание воды — истина."; deriv="zanmorae, zanmorvene"}

# Replace mor-vash at L-000283
$fixes += @{id="L-000283"; lex="vash-xhel"; pos="существительное"; trans="лава (камень-огонь)"; etym="vash- (камень) + xhel- (жар)"; ex1="Vash-xhel theri thero."; ex1t="Лава течёт по земле."; ex2="Vash-xhel thel xhelo."; ex2t="Каменный жар — огонь."; deriv="vashxhelae, vashxhelxari"}

# Replace mor-vash at L-000293
$fixes += @{id="L-000293"; lex="ven-xhel"; pos="существительное"; trans="термодинамика (истина-жар)"; etym="ven- (истина/знание) + xhel- (жар)"; ex1="Ven-xhel xhari thero."; ex1t="Знание тепла — в разуме."; ex2="Ven-xhel thel xhelo."; ex2t="Наука об энергии тепла."; deriv="venxhelae, venxhelvene"}

# Replace mor-xha at L-000262
$fixes += @{id="L-000262"; lex="xhel-zhal"; pos="существительное"; trans="зной, раскалённый воздух (жар-воздух)"; etym="xhel- (жар) + zhal- (воздух)"; ex1="Xhel-zhal thali thero."; ex1t="Зной дрожит у горизонта."; ex2="Xhel-zhal thel xhelo."; ex2t="Воздух накалён."; deriv="xhelzhalae, xhelzhalxari"}

# Replace ruun-zhal at L-000244
$fixes += @{id="L-000244"; lex="tor-zhal"; pos="существительное"; trans="буря, шторм (мощь-воздух)"; etym="tor- (мощь) + zhal- (воздух)"; ex1="Tor-zhal thali thero."; ex1t="Буря на горизонте."; ex2="Tor-zhal thel vexa."; ex2t="Шторм — великая сила."; deriv="torzhalae, torzhalxari"}

# Replace sha-khar at L-000249
$fixes += @{id="L-000249"; lex="tor-mor"; pos="существительное"; trans="водоворот, пучина (мощь-вода)"; etym="tor- (мощь) + mor- (вода)"; ex1="Tor-mor mor-thal thero."; ex1t="Водоворот в океане."; ex2="Tor-mor thel vexa."; ex2t="Пучина — мощь воды."; deriv="tormorae, tormorxari"}

# Replace sha-ven at L-000259
$fixes += @{id="L-000259"; lex="tor-xha"; pos="существительное"; trans="гений, великий ум (мощь-разум)"; etym="tor- (мощь) + xha- (разум)"; ex1="Tor-xha xhari thero."; ex1t="Гений — мощь разума."; ex2="Tor-xha ruuni thero."; ex2t="Великий ум ведёт народ."; deriv="torxharae, torxhaxhare"}

# Replace sha-ven at L-000277
$fixes += @{id="L-000277"; lex="zan-thal"; pos="существительное"; trans="метеорология (знание-небо)"; etym="zan- (знание) + thal- (небо)"; ex1="Zan-thal thali thero."; ex1t="Метеорология читает небо."; ex2="Zan-thal thel zhalo."; ex2t="Наука о ветрах."; deriv="zanthalae, zanthalvene"}

# Replace sha-ver at L-000265
$fixes += @{id="L-000265"; lex="tor-ven"; pos="существительное"; trans="могучее знание, истина силы (мощь-истина)"; etym="tor- (мощь) + ven- (истина)"; ex1="Tor-ven xhari thero."; ex1t="Могучее знание — в разуме."; ex2="Tor-ven thel vena."; ex2t="Сила и истина едины."; deriv="torvenae, torvenvene"}

# Replace the-mor at L-000276
$fixes += @{id="L-000276"; lex="xhel-the"; pos="существительное"; trans="пустыня (жар-земля)"; etym="xhel- (жар) + the- (земля)"; ex1="Xhel-the thali thero."; ex1t="Пустыня до горизонта."; ex2="Xhel-the thel xari."; ex2t="Пустыня — среда жара."; deriv="xheltherae, xhelthexari"}

# Replace the-ser at L-000216
$fixes += @{id="L-000216"; lex="zan-kel"; pos="существительное"; trans="вершина знаний, экспертиза (знание-высота)"; etym="zan- (знание) + kel- (высота)"; ex1="Zan-kel xhari thero."; ex1t="Экспертиза — высота знания."; ex2="Zan-kel thel vena."; ex2t="Вершина знаний — истина."; deriv="zankelae, zankelvene"}

# Replace the-ver at L-000208
$fixes += @{id="L-000208"; lex="the-xhel"; pos="существительное"; trans="жерло вулкана"; etym="the- (земля) + xhel- (жар)"; ex1="The-xhel theri thero."; ex1t="Жерло в земле."; ex2="The-xhel thel xhelo."; ex2t="Земля дышит жаром."; deriv="thexhelae, thexhelxari"}

# Wait, I already used the-xhel at L-000273. Let me use a different one.
$fixes = $fixes | Where-Object { $_.id -ne "L-000208" }
$fixes += @{id="L-000208"; lex="fash-ven"; pos="существительное"; trans="парадигма, форма истины (форма-истина)"; etym="fash- (форма/образ) + ven- (истина)"; ex1="Fash-ven xhari thero."; ex1t="Парадигма — в разуме."; ex2="Fash-ven thel veno."; ex2t="Форма истины познаётся."; deriv="fashvenae, fashvenvene"}

# Replace vash-rass at L-000257
$fixes += @{id="L-000257"; lex="tor-kel"; pos="существительное"; trans="циклопическая высота, титаническая мощь (мощь-высота)"; etym="tor- (мощь) + kel- (высота)"; ex1="Tor-kel thali thero."; ex1t="Титан среди вершин."; ex2="Tor-kel thel vexa."; ex2t="Великая высота — мощь."; deriv="torkelae, torkelvashi"}

# Replace vash-zhal at L-000254
$fixes += @{id="L-000254"; lex="xhel-vash"; pos="существительное"; trans="обсидиан, вулканическое стекло (жар-камень)"; etym="xhel- (жар) + vash- (камень)"; ex1="Xhel-vash thel vasha."; ex1t="Обсидиан твёрд как камень."; ex2="Xhel-vash xhel-the thero."; ex2t="Вулканическое стекло — в пустыне."; deriv="xhelvashae, xhelvashxari"}

# Replace ven-xha at L-000295
$fixes += @{id="L-000295"; lex="zan-xha"; pos="существительное"; trans="теория, концепция (знание-разум)"; etym="zan- (знание) + xha- (разум)"; ex1="Zan-xha xhari thero."; ex1t="Теория рождается в разуме."; ex2="Zan-xha thel xharo."; ex2t="Концепция — плод мышления."; deriv="zanxharae, zanxhaxhare"}

# Replace vex-thal at L-000292
$fixes += @{id="L-000292"; lex="tor-vex"; pos="существительное"; trans="титаническая сила, колоссальная мощь (мощь-сила)"; etym="tor- (мощь) + vex- (сила)"; ex1="Tor-vex thel vexa."; ex1t="Колоссальная сила."; ex2="Tor-vex ruuni thero."; ex2t="Титаническая мощь ведёт народ."; deriv="torvexae, torvexvashi"}

# Replace xha-rass at L-000255
$fixes += @{id="L-000255"; lex="zan-vash"; pos="существительное"; trans="палеонтология (знание-камень)"; etym="zan- (знание) + vash- (камень)"; ex1="Zan-vash theri thero."; ex1t="Палеонтология изучает землю."; ex2="Zan-vash thel vena."; ex2t="Камень хранит истину."; deriv="zanvashae, zanvashvene"}

# Replace xha-ruun at L-000242 (keep L-000108 and L-000300)
$fixes += @{id="L-000242"; lex="tor-koss"; pos="существительное"; trans="ледяной шторм, буран (мощь-лёд)"; etym="tor- (мощь) + koss- (лёд)"; ex1="Tor-koss thali thero."; ex1t="Буран на горизонте."; ex2="Tor-koss thel kossa."; ex2t="Ледяная мощь — холод."; deriv="torkossae, torkossxari"}

# Replace xha-ruun at L-000300 (adjective, keep L-000108)
$fixes += @{id="L-000300"; lex="veni-xha"; pos="существительное"; trans="университет, академия (архив-разум)"; etym="veni- (архив/библиотека) + xha- (разум)"; ex1="Veni-xha veni thero."; ex1t="Университет — большой архив."; ex2="Veni-xha thel vene."; ex2t="В нём мудрецы."; deriv="venixharae, venixhavene"}

# Replace xha-ver at L-000229
$fixes += @{id="L-000229"; lex="tor-xha"; pos="существительное"; trans="интеллектуальная мощь (мощь-разум)"; etym="tor- (мощь) + xha- (разум)"; ex1="Tor-xha xhari thero."; ex1t="Мощь разума — в мысли."; ex2="Tor-xha ruuni thero."; ex2t="Гений служит народу."; deriv="torxharae, torxhavene"}

# Wait, I already used tor-xha at L-000259. Let me use something different.
$fixes = $fixes | Where-Object { $_.id -ne "L-000229" }
$fixes += @{id="L-000229"; lex="morn-ven"; pos="существительное"; trans="глубинная истина, тайна (глубина-истина)"; etym="morn- (глубина) + ven- (истина)"; ex1="Morn-ven mori thero."; ex1t="Тайна скрыта в глубине."; ex2="Morn-ven xhari thero."; ex2t="Глубинная истина — в разуме."; deriv="mornvenae, mornvenvene"}

# Replace xha-ver at L-000297
$fixes += @{id="L-000297"; lex="morn-thal"; pos="существительное"; trans="космическая бездна (глубина-небо)"; etym="morn- (глубина) + thal- (небо)"; ex1="Morn-thal thal-rass thero."; ex1t="Бездна — глубина космоса."; ex2="Morn-thal xhari veno."; ex2t="Космос будит мысль."; deriv="mornthalae, mornthalvene"}

# Replace xha-vex at L-000251
$fixes += @{id="L-000251"; lex="tor-morn"; pos="существительное"; trans="пучина, великая глубина (мощь-глубина)"; etym="tor- (мощь) + morn- (глубина)"; ex1="Tor-morn mor-thal thero."; ex1t="Пучина в океане."; ex2="Tor-morn thel rassa."; ex2t="Глубина — протяжённость."; deriv="tormornae, tormornxari"}

# Replace zhal-thal at L-000239
$fixes += @{id="L-000239"; lex="zan-ver"; pos="существительное"; trans="геология (знание-гора)"; etym="zan- (знание) + ver- (гора)"; ex1="Zan-ver theri thero."; ex1t="Геология изучает горы."; ex2="Zan-ver thel vena."; ex2t="Знание о горах — истина."; deriv="zanverae, zanvervene"}

# Replace zhal-ver at L-000231
$fixes += @{id="L-000231"; lex="morn-zhal"; pos="существительное"; trans="глубокий вдох, вздох (глубина-воздух)"; etym="morn- (глубина) + zhal- (воздух)"; ex1="Morn-zhal xhari thero."; ex1t="Глубокий вдох питает разум."; ex2="Morn-zhal thel xaro."; ex2t="Вздох — глубина жизни."; deriv="mornzhalae, mornzhalxare"}

# Fix L-000274 which has a typo: zal-vex should be something unique
$fixes += @{id="L-000274"; lex="xhel-koss"; pos="существительное"; trans="тёплый лёд, таяние (огонь-лёд)"; etym="xhel- (жар) + koss- (лёд)"; ex1="Xhel-koss kossi thero."; ex1t="Лёд тает от тепла."; ex2="Xhel-koss thel moro."; ex2t="Таяние — течение воды."; deriv="xhelkossae, xhelkossxari"}

# Fix stuttering entries that have errors
$fixes += @{id="L-000129"; lex="vash-ven"; pos="существительное"; trans="древняя истина, высеченная в камне (камень-истина)"; etym="vash- (камень) + ven- (истина)"; ex1="Vash-ven thel vena."; ex1t="Истина в камне вечна."; ex2="Vash-ven ruuni theri."; ex2t="Каменная истина хранит народ."; deriv="vashvenae, vashvenxhare"}

# Fix L-000298 (rath-zhal) — not a typo but let me also add a variant
# Actually let's not fix it, it's fine as is

# Now write the fixes
foreach ($f in $fixes) {
    $content = @"
# $($f.id): $($f.lex)

**Корень:** нет
**Часть речи:** $($f.pos)
**Перевод:** $($f.trans)
**Статус:** active
**Создан:** $date

## Этимология

$($f.etym)

## Примеры

1. $($f.ex1) — $($f.ex1t)
2. $($f.ex2) — $($f.ex2t)

## Производные

$($f.deriv)
"@
    $filePath = Join-Path $basePath "$($f.id).md"
    Set-Content -Path $filePath -Value $content -Encoding UTF8
    Write-Output "Fixed $($f.id) -> $($f.lex)"
}
