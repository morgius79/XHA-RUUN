$basePath = "C:\Cloude\registry\lexemes"
$date = "2026-07-16"

$entries = @()

# ====== SECTION 4: L-000451 to L-000500 ======
# Society, technology, abstractions

# ---- Society terms (L-000451 to L-000475) ----
$entries += @{id="L-000451"; lex="xha-ruuni"; root=$false; pos="существительное"; trans="столица, главный город"; etym="xha- (разум) + ruun- (народ) + -i (место): центр разума народа"; ex1="Xha-ruuni thel ruuni-eth ran xha-ruun."; ex1t="Столица — поселение всего народа."; ex2="Xha-ruuni veni thero."; ex2t="В столице есть архив."; deriv="xharuunirae, xharuuniveni"}
$entries += @{id="L-000452"; lex="ruun-vokhri"; root=$false; pos="существительное"; trans="правительство, совет"; etym="ruun- (народ) + vokh- (порядок) + -i (место): место порядка народа"; ex1="Ruun-vokhri ruuno thero."; ex1t="Правительство проводит собрание."; ex2="Ruun-vokhri thel ruun-kel."; ex2t="Правительство есть высший совет."; deriv="ruunvokhriae"}
$entries += @{id="L-000453"; lex="ven-shari"; root=$false; pos="существительное"; trans="энциклопедия, свод знаний"; etym="ven- (истина) + sha- (слово) + -ri (место): место истинных слов"; ex1="Ven-shari thel veni."; ex1t="Энциклопедия — архив."; ex2="Vene pasho ven-shari."; ex2t="Мудрец пишет энциклопедию."; deriv="venshariveni"}
$entries += @{id="L-000454"; lex="zan-veni"; root=$false; pos="существительное"; trans="академия наук"; etym="zan- (знание) + ven- (истина) + -i (место)"; ex1="Zan-veni thel ruun-ven."; ex1t="Академия — храм мудрости."; ex2="Vene gatho zan-veni."; ex2t="Мудрецы собираются в академии."; deriv="zanvenirae"}
$entries += @{id="L-000455"; lex="ruun-thuli"; root=$false; pos="существительное"; trans="сенат, законодательный орган"; etym="ruun- (народ) + thul- (строение) + -i (место)"; ex1="Ruun-thuli kalo sha-ruun."; ex1t="Сенат создаёт законы."; ex2="Ruune gatho ruun-thuli."; ex2t="Общинники собираются в сенате."; deriv="ruunthulirae"}
$entries += @{id="L-000456"; lex="kal-vashi"; root=$false; pos="существительное"; trans="мастерская, цех, студия"; etym="kal- (творение) + vash- (камень/структура) + -i (место)"; ex1="Kal-vashi thel vashe ran."; ex1t="Мастерская — место строителя."; ex2="Vashe kalo khal kal-vashi."; ex2t="Строитель творит в мастерской."; deriv="kalvashiveni"}
$entries += @{id="L-000457"; lex="tal-veni"; root=$false; pos="существительное"; trans="библиотека, читальня"; etym="tal- (говорение/чтение) + ven- (истина) + -i (место)"; ex1="Tal-veni thel sha-ven."; ex1t="Библиотека — дом мудрости."; ex2="Vene pasho khal tal-veni."; ex2t="Мудрец пишет в библиотеке."; deriv="talvenirae"}
$entries += @{id="L-000458"; lex="ruun-veshi"; root=$false; pos="существительное"; trans="граница, предел, рубеж"; etym="ruun- (народ) + vesh- (покров) + -i (место)"; ex1="Ruun-veshi thali thero."; ex1t="Граница у горизонта."; ex2="Ruun-veshi thel the-rass."; ex2t="Рубеж — равнина."; deriv="ruunveshirae"}
$entries += @{id="L-000459"; lex="vash-thuli"; root=$false; pos="существительное"; trans="крепость, цитадель"; etym="vash- (камень) + thul- (строение) + -i (место)"; ex1="Vash-thuli ruuni theri."; ex1t="Крепость защищает поселение."; ex2="Vokhre baro khal vash-thuli."; ex2t="Страж охраняет в крепости."; deriv="vashthulirae"}
$entries += @{id="L-000460"; lex="zan-xhari"; root=$false; pos="существительное"; trans="школа, учебное заведение"; etym="zan- (знание) + xha- (разум) + -ri (место): место обучения разума"; ex1="Zan-xhari xhare talo."; ex1t="В школе учитель говорит."; ex2="Ruune zamo khal zan-xhari."; ex2t="Общинник учится в школе."; deriv="zanxharirae"}

$entries += @{id="L-000461"; lex="sha-pashi"; root=$false; pos="существительное"; trans="письменность, система письма"; etym="sha- (слово) + pash- (письмо) + -i (инструмент/место)"; ex1="Sha-pashi thel ven."; ex1t="Письменность — истина."; ex2="Xha-ruun maro sha-pashi."; ex2t="Народ имеет письменность."; deriv="shapashiveni"}
$entries += @{id="L-000462"; lex="ruun-bari"; root=$false; pos="существительное"; trans="убежище, приют, укрытие"; etym="ruun- (народ) + bar- (защита) + -i (место)"; ex1="Ruun-bari thel theli."; ex1t="Убежище — укрытие."; ex2="Ruune baro khal ruun-bari."; ex2t="Общинник укрывается в убежище."; deriv="ruunbarirae"}
$entries += @{id="L-000463"; lex="ven-nashi"; root=$false; pos="существительное"; trans="открытие, находка"; etym="ven- (истина) + nash- (открытие) + -i (результат/инструмент)"; ex1="Ven-nashi xhari thero."; ex1t="Открытие рождается в разуме."; ex2="Rasse nasho ven-nashi."; ex2t="Странник совершает открытие."; deriv="vennashiveni"}
$entries += @{id="L-000464"; lex="xha-gathi"; root=$false; pos="существительное"; trans="конгресс, ассамблея"; etym="xha- (разум) + gath- (сбор) + -i (место)"; ex1="Xha-gathi xhare gatho."; ex1t="На конгрессе мыслители собираются."; ex2="Xha-gathi talo ruun."; ex2t="Ассамблея говорит от народа."; deriv="xhagathiveni"}
$entries += @{id="L-000465"; lex="ruun-mari"; root=$false; pos="существительное"; trans="территория, земля народа"; etym="ruun- (народ) + mar- (владение) + -i (место)"; ex1="Ruun-mari thel the-rass."; ex1t="Территория — равнина."; ex2="Ruun-mari thali thero."; ex2t="Земля народа до горизонта."; deriv="ruunmariveni"}
$entries += @{id="L-000466"; lex="vex-xhari"; root=$false; pos="существительное"; trans="техника, технология"; etym="vex- (сила) + xha- (разум) + -ri (инструмент/место)"; ex1="Vex-xhari ruuni thero."; ex1t="Техника служит поселению."; ex2="Xha-ruun kalo vex-xhari."; ex2t="Народ создаёт технологию."; deriv="vexxhariveni"}
$entries += @{id="L-000467"; lex="khar-thuli"; root=$false; pos="существительное"; trans="маяк, башня света"; etym="khar- (свет) + thul- (строение) + -i (место)"; ex1="Khar-thul thali thero."; ex1t="Маяк сияет у горизонта."; ex2="Khar-thuli khari thero."; ex2t="Башня света — источник."; deriv="kharthuliveni"}
$entries += @{id="L-000468"; lex="mor-reni"; root=$false; pos="существительное"; trans="порт, гавань, причал"; etym="mor- (вода) + ren- (движение) + -i (место)"; ex1="Mor-reni mor-thal theri."; ex1t="Порт стоит у океана."; ex2="More thulo mor-reni."; ex2t="Моряк строит причал."; deriv="morreniveni"}
$entries += @{id="L-000469"; lex="thel-gathi"; root=$false; pos="существительное"; trans="колония, форпост"; etym="thel- (малый) + gath- (сбор) + -i (место)"; ex1="Thel-gathi thel ruuni."; ex1t="Колония — малое поселение."; ex2="Ruun thulo thel-gathi."; ex2t="Народ основывает колонию."; deriv="thelgathiveni"}
$entries += @{id="L-000470"; lex="ruun-kali"; root=$false; pos="существительное"; trans="культура, традиция"; etym="ruun- (народ) + kal- (творение) + -i (результат/место)"; ex1="Ruun-kali thel sha-ruun."; ex1t="Культура — язык народа."; ex2="Ruun-kali veni thero."; ex2t="Культура хранится в архиве."; deriv="ruunkaliveni"}

$entries += @{id="L-000471"; lex="sha-thuli"; root=$false; pos="существительное"; trans="литература, корпус текстов"; etym="sha- (слово) + thul- (строение) + -i (результат)"; ex1="Sha-thuli thel veni."; ex1t="Литература — архив слов."; ex2="Xhare pasho sha-thuli."; ex2t="Мыслитель пишет литературу."; deriv="shathulirae"}
$entries += @{id="L-000472"; lex="ven-kari"; root=$false; pos="существительное"; trans="исследование, изыскание"; etym="ven- (истина) + kar- (поиск) + -i (процесс)"; ex1="Ven-kari xhari thero."; ex1t="Исследование — в разуме."; ex2="Vene karo ven-kari."; ex2t="Учёный ведёт исследование."; deriv="venkariveni"}
$entries += @{id="L-000473"; lex="xha-thuli"; root=$false; pos="существительное"; trans="традиция, обычай"; etym="xha- (разум) + thul- (строение) + -i (результат)"; ex1="Xha-thuli ruuni theri."; ex1t="Традиция держит поселение."; ex2="Ruun maro xha-thuli."; ex2t="Народ хранит традицию."; deriv="xhathulirae"}
$entries += @{id="L-000474"; lex="ruun-soni"; root=$false; pos="существительное"; trans="праздник, фестиваль"; etym="ruun- (народ) + son- (звук/песня) + -i (место/время)"; ex1="Ruun-soni ruuni thero."; ex1t="Праздник приходит в поселение."; ex2="Share sono khal ruun-soni."; ex2t="Сказитель поёт на празднике."; deriv="ruunsonirae"}
$entries += @{id="L-000475"; lex="xha-tali"; root=$false; pos="существительное"; trans="форум, место дискуссий"; etym="xha- (разум) + tal- (говорение) + -i (место)"; ex1="Xha-tali xhare talo."; ex1t="На форуме мыслители говорят."; ex2="Ruun gatho khal xha-tali."; ex2t="Народ собирается на форуме."; deriv="xhataliveni"}

# ---- Technology terms (L-000476 to L-000490) ----
$entries += @{id="L-000476"; lex="vex-vashi"; root=$false; pos="существительное"; trans="машина, механизм"; etym="vex- (сила) + vash- (камень/структура) + -i (инструмент)"; ex1="Vex-vashi ruuni vexo."; ex1t="Машина питает поселение."; ex2="Vashe kalo vex-vashi."; ex2t="Строитель создаёт машину."; deriv="vexvashiveni"}
$entries += @{id="L-000477"; lex="khar-vexi"; root=$false; pos="существительное"; trans="батарея, накопитель энергии"; etym="khar- (свет) + vex- (сила) + -i (место/инструмент)"; ex1="Khar-vexi vexi thero."; ex1t="Батарея — источник силы."; ex2="Khar-vexi vexo ruuni."; ex2t="Накопитель питает поселение."; deriv="kharvexiveni"}
$entries += @{id="L-000478"; lex="mor-vexi"; root=$false; pos="существительное"; trans="гидроэлектростанция"; etym="mor- (вода) + vex- (сила) + -i (место)"; ex1="Mor-vexi mor-vex thero."; ex1t="ГЭС рождает силу воды."; ex2="Mor-vexi ruuni vexo."; ex2t="Станция питает поселение."; deriv="morvexiveni"}
$entries += @{id="L-000479"; lex="zhal-vexi"; root=$false; pos="существительное"; trans="ветрогенератор, ветряк"; etym="zhal- (воздух) + vex- (сила) + -i (инструмент/место)"; ex1="Zhal-vexi zhal-vex thero."; ex1t="Ветряк рождает силу воздуха."; ex2="Zhal-vexi thali thero."; ex2t="Ветрогенератор на горизонте."; deriv="zhalvexiveni"}
$entries += @{id="L-000480"; lex="thal-reni"; root=$false; pos="существительное"; trans="космолёт, звездолёт"; etym="thal- (небо) + ren- (движение) + -i (инструмент)"; ex1="Thal-reni thal-rass thero."; ex1t="Космолёт летит в космос."; ex2="Rasse reno khal thal-reni."; ex2t="Странник летит на звездолёте."; deriv="thalreniveni"}

$entries += @{id="L-000481"; lex="sha-vexi"; root=$false; pos="существительное"; trans="радио, передатчик (слово-сила)"; etym="sha- (слово) + vex- (сила) + -i (инструмент)"; ex1="Sha-vexi sharu thero."; ex1t="Радио передаёт слово."; ex2="Sha-vexi ruuni tala."; ex2t="Передатчик — голос поселения."; deriv="shavexiveni"}
$entries += @{id="L-000482"; lex="mer-vexi"; root=$false; pos="существительное"; trans="камера, телескоп (зрение-сила)"; etym="mer- (зрение) + vex- (сила) + -i (инструмент)"; ex1="Mer-vexi thali thero."; ex1t="Телескоп смотрит на горизонт."; ex2="Mer-vexi khar-vex mero."; ex2t="Камера видит звёзды."; deriv="mervexiveni"}
$entries += @{id="L-000483"; lex="son-vexi"; root=$false; pos="существительное"; trans="динамик, усилитель звука"; etym="son- (звук) + vex- (сила) + -i (инструмент)"; ex1="Son-vexi sono thali."; ex1t="Динамик звучит вдаль."; ex2="Son-vexi ruuni sono."; ex2t="Усилитель поёт народу."; deriv="sonvexiveni"}
$entries += @{id="L-000484"; lex="pash-vexi"; root=$false; pos="существительное"; trans="принтер, печатная машина"; etym="pash- (письмо) + vex- (сила) + -i (инструмент)"; ex1="Pash-vexi sha pasho."; ex1t="Принтер печатает слово."; ex2="Pash-vexi veni thero."; ex2t="Печатная машина — в архиве."; deriv="pashvexiveni"}
$entries += @{id="L-000485"; lex="ven-vashi"; root=$false; pos="существительное"; trans="компьютер, вычислитель"; etym="ven- (истина/знание) + vash- (камень/структура) + -i (инструмент)"; ex1="Ven-vashi ven thero."; ex1t="Компьютер обрабатывает знание."; ex2="Ven-vashi xhari vexo."; ex2t="Вычислитель — сила разума."; deriv="venvashiveni"}

$entries += @{id="L-000486"; lex="the-kali"; root=$false; pos="существительное"; trans="сельское хозяйство, агрокультура"; etym="the- (земля) + kal- (творение) + -i (процесс/место)"; ex1="The-kali theri thero."; ex1t="Агрокультура питает землю."; ex2="Ruun kalo the-kali."; ex2t="Народ занимается земледелием."; deriv="thekaliveni"}
$entries += @{id="L-000487"; lex="xhel-vexi"; root=$false; pos="существительное"; trans="тепловая станция, ТЭЦ"; etym="xhel- (жар) + vex- (сила) + -i (место)"; ex1="Xhel-vexi xhel-vex thero."; ex1t="ТЭЦ рождает силу тепла."; ex2="Xhel-vexi ruuni vexo."; ex2t="Станция питает поселение."; deriv="xhelvexiveni"}
$entries += @{id="L-000488"; lex="thal-vexi"; root=$false; pos="существительное"; trans="спутник, орбитальная станция"; etym="thal- (небо) + vex- (сила) + -i (инструмент/место)"; ex1="Thal-vexi seri thero."; ex1t="Спутник на орбите."; ex2="Thal-vexi sha-ruun tala."; ex2t="Спутник передаёт язык народа."; deriv="thalvexiveni"}
$entries += @{id="L-000489"; lex="sha-veni"; root=$false; pos="существительное"; trans="база данных, банк знаний"; etym="sha- (слово) + ven- (истина) + -i (место)"; ex1="Sha-veni thel ven-thul."; ex1t="База данных — система знаний."; ex2="Xha-ruun maro sha-veni."; ex2t="Народ имеет базу знаний."; deriv="shaveniveni"}
$entries += @{id="L-000490"; lex="mor-kali"; root=$false; pos="существительное"; trans="аквакультура, морское хозяйство"; etym="mor- (вода) + kal- (творение) + -i (процесс/место)"; ex1="Mor-kali mori thero."; ex1t="Аквакультура — в воде."; ex2="Ruun-mor kalo mor-kali."; ex2t="Морской народ занимается аквакультурой."; deriv="morkaliveni"}

# ---- Abstract concepts (L-000491 to L-000500) ----
$entries += @{id="L-000491"; lex="ruun-xhara"; root=$false; pos="существительное"; trans="идеология, мировоззрение народа"; etym="ruun- (народ) + xha- (разум) + -ra (абстрактное)"; ex1="Ruun-xhara ruuni thero."; ex1t="Идеология ведёт народ."; ex2="Ruun-xhara thel ven-xha."; ex2t="Мировоззрение — философия."; deriv="ruunxhararae"}
$entries += @{id="L-000492"; lex="ven-xhara"; root=$false; pos="существительное"; trans="наука, систематическое знание"; etym="ven- (истина) + xha- (разум) + -ra (абстрактное)"; ex1="Ven-xhara thel ven-thul."; ex1t="Наука — система истин."; ex2="Ven-xhara ruuni vexo."; ex2t="Наука питает народ."; deriv="venxhararae"}
$entries += @{id="L-000493"; lex="xha-ruuna"; root=$false; pos="существительное"; trans="цивилизация, разумное общество"; etym="xha- (разум) + ruun- (народ) + -a (абстрактное)"; ex1="Xha-ruuna thel vokh-rass."; ex1t="Цивилизация — космический порядок."; ex2="Xha-ruuna thali thero."; ex2t="Цивилизация смотрит в небо."; deriv="xharuunarae"}
$entries += @{id="L-000494"; lex="sha-xhara"; root=$false; pos="существительное"; trans="логика, стройность речи"; etym="sha- (слово) + xha- (разум) + -ra (абстрактное)"; ex1="Sha-xhara thel ven-sha."; ex1t="Логика — путь к истине."; ex2="Xhare maro sha-xhara."; ex2t="Мыслитель владеет логикой."; deriv="shaxhararae"}
$entries += @{id="L-000495"; lex="vokh-xhara"; root=$false; pos="существительное"; trans="системность, упорядоченность"; etym="vokh- (порядок) + xha- (разум) + -ra (абстрактное)"; ex1="Vokh-xhara thel ruun-vokh."; ex1t="Системность — общественный строй."; ex2="Vokh-xhara veni thero."; ex2t="Системность — в архиве."; deriv="vokhxhararae"}
$entries += @{id="L-000496"; lex="vex-ruuna"; root=$false; pos="существительное"; trans="республика, народовластие"; etym="vex- (сила) + ruun- (народ) + -a (абстрактное)"; ex1="Vex-ruuna thel ruun-vex."; ex1t="Республика — сила народа."; ex2="Ruun maro vex-ruuna."; ex2t="Народ владеет республикой."; deriv="vexruunarae"}
$entries += @{id="L-000497"; lex="khar-xhara"; root=$false; pos="существительное"; trans="просвещение, образование"; etym="khar- (свет) + xha- (разум) + -ra (абстрактное)"; ex1="Khar-xhara thel ven-xhara."; ex1t="Просвещение — наука."; ex2="Khar-xhara ruuni vexo."; ex2t="Образование питает народ."; deriv="kharxhararae"}
$entries += @{id="L-000498"; lex="thal-ruuna"; root=$false; pos="существительное"; trans="федерация, союз народов"; etym="thal- (небо) + ruun- (народ) + -a (абстрактное)"; ex1="Thal-ruuna ruun-eth gatho."; ex1t="Федерация объединяет народы."; ex2="Thal-ruuna thel vokh-rass."; ex2t="Федерация — гармония пространств."; deriv="thalruunarae"}
$entries += @{id="L-000499"; lex="mor-xhara"; root=$false; pos="существительное"; trans="адаптация, гибкость"; etym="mor- (вода) + xha- (разум) + -ra (абстрактное): разумная гибкость воды"; ex1="Mor-xhara thel xha-mor."; ex1t="Адаптация — интуиция."; ex2="Xha-ruun maro mor-xhara."; ex2t="Народ обладает адаптивностью."; deriv="morxhararae"}
$entries += @{id="L-000500"; lex="ven-xharu"; root=$false; pos="существительное"; trans="идея истины, научная парадигма"; etym="ven- (истина) + xha- (разум) + -ru (результат): рождённая истина"; ex1="Ven-xharu xhari thero."; ex1t="Парадигма рождается в разуме."; ex2="Ven-xharu ruuni thero."; ex2t="Идея истины ведёт народ."; deriv="venxharurae"}

# Generate files
foreach ($e in $entries) {
    $rootFlag = if ($e.root) { "да" } else { "нет" }
    $content = @"
# $($e.id): $($e.lex)

**Корень:** $rootFlag
**Часть речи:** $($e.pos)
**Перевод:** $($e.trans)
**Статус:** active
**Создан:** $date

## Этимология

$($e.etym)

## Примеры

1. $($e.ex1) — $($e.ex1t)
2. $($e.ex2) — $($e.ex2t)

## Производные

$($e.deriv)
"@
    $filePath = Join-Path $basePath "$($e.id).md"
    Set-Content -Path $filePath -Value $content -Encoding UTF8
    Write-Output "Created $($e.id)"
}
