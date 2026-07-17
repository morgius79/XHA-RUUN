$basePath = "C:\Cloude\registry\lexemes"
$date = "2026-07-16"

# Section 1: L-000001 to L-000100 — Basic roots and derivatives
# Each root has 5 entries: root + 4 derivations

$entries = @()

# Helper: consonant-ending root → -a, -e, -i, -o, -u, -ae
# Helper: vowel-ending root → -ra, -re, -ri, -ro, -ru, -rae

# 1. xa- (жизнь) — vowel-ending
$entries += @{id="L-000001"; lex="xa"; root=$true; pos="корень"; trans="жизнь"; etym="Праязыковый корень, обозначающий жизненную силу"; ex1="Xa theri vexo."; ex1t="Жизнь питает землю."; ex2="Xa kharo ruuna."; ex2t="Жизнь освещает общину."; deriv="xara, xare, xari, xaro"}
$entries += @{id="L-000002"; lex="xara"; root=$false; pos="существительное"; trans="жизненность, витальная сила"; etym="xa- + -ra (абстрактное понятие)"; ex1="Xara vokhro thera."; ex1t="Жизненность упорядочивает земное."; ex2="Kossi xara zhalo."; ex2t="Ледник хранит жизненность."; deriv="xarae"}
$entries += @{id="L-000003"; lex="xare"; root=$false; pos="существительное"; trans="живое существо, организм"; etym="xa- + -re (деятель)"; ex1="Xare mori zhalo."; ex1t="Существо дышит водою."; ex2="Xare kharu veno."; ex2t="Существо познаёт свет."; deriv="xareruun"}
$entries += @{id="L-000004"; lex="xari"; root=$false; pos="существительное"; trans="среда обитания, биом"; etym="xa- + -ri (место)"; ex1="Xari thel vexo."; ex1t="Биом питается силой."; ex2="Theri xari moru."; ex2t="Почва — среда воды."; deriv="xarivash"}
$entries += @{id="L-000005"; lex="xaro"; root=$false; pos="существительное"; trans="жизненный цикл, жизнедеятельность"; etym="xa- + -ro (процесс)"; ex1="Xaro thel thalu."; ex1t="Жизнь течёт к небу."; ex2="Xaro vexu mori."; ex2t="Цикл черпает силу из воды."; deriv="xarokel"}

# 2. xha- (разум/мысль) — vowel-ending
$entries += @{id="L-000006"; lex="xha"; root=$true; pos="корень"; trans="разум, мысль"; etym="Праязыковый корень, основа ментальной сферы"; ex1="Xha ruuni vokhro."; ex1t="Разум правит поселением."; ex2="Xha veni kharo."; ex2t="Разум освещает знание."; deriv="xhara, xhare, xhari, xharo"}
$entries += @{id="L-000007"; lex="xhara"; root=$false; pos="существительное"; trans="разумность, интеллект"; etym="xha- + -ra (абстрактное)"; ex1="Xhara thel vexo."; ex1t="Разумность — великая сила."; ex2="Xhara vokhro sha."; ex2t="Разумность упорядочивает язык."; deriv="xharae"}
$entries += @{id="L-000008"; lex="xhare"; root=$false; pos="существительное"; trans="мыслитель, мудрец"; etym="xha- + -re (деятель)"; ex1="Xhare veno thal."; ex1t="Мыслитель познаёт небо."; ex2="Xhare sha-ruun vokhro."; ex2t="Мудрец хранит язык народа."; deriv="xharexha"}
$entries += @{id="L-000009"; lex="xhari"; root=$false; pos="существительное"; trans="мозг, центр мысли, разумный центр"; etym="xha- + -ri (место/инструмент)"; ex1="Xhari vexo mor."; ex1t="Мозг питается водою."; ex2="Xhari sha-ruun theri."; ex2t="Разум — средоточие языка."; deriv="xhariven"}
$entries += @{id="L-000010"; lex="xharo"; root=$false; pos="существительное"; trans="мышление, процесс осмысления"; etym="xha- + -ro (процесс)"; ex1="Xharo thel kharu."; ex1t="Мысль достигает света."; ex2="Xharo venu mori."; ex2t="Мышление рождает истину."; deriv="xharokoss"}

# 3. ruun- (народ/сообщество) — consonant-ending
$entries += @{id="L-000011"; lex="ruun"; root=$true; pos="корень"; trans="народ, сообщество"; etym="Праязыковый корень, основа социальной организации"; ex1="Ruun xhari vokhro."; ex1t="Народ хранит разум."; ex2="Ruun thel vexo."; ex2t="Народ — великая сила."; deriv="ruuna, ruune, ruuni, ruuno"}
$entries += @{id="L-000012"; lex="ruuna"; root=$false; pos="существительное"; trans="общность, единство"; etym="ruun- + -a (абстрактное)"; ex1="Ruuna thel veno."; ex1t="Единство — великое знание."; ex2="Ruuna vokhro xha."; ex2t="Общность упорядочивает разум."; deriv="ruunae"}
$entries += @{id="L-000013"; lex="ruune"; root=$false; pos="существительное"; trans="член общины, соплеменник"; etym="ruun- + -e (деятель)"; ex1="Ruune thel kharo."; ex1t="Соплеменник видит свет."; ex2="Ruune sha-ruun xhari."; ex2t="Член общины хранит язык."; deriv="ruunever"}
$entries += @{id="L-000014"; lex="ruuni"; root=$false; pos="существительное"; trans="поселение, общинное место"; etym="ruun- + -i (место)"; ex1="Ruuni mor-ver theri."; ex1t="Поселение у водопада."; ex2="Ruuni vash-kel xhari."; ex2t="Поселение у скалистой вершины."; deriv="ruunivash"}
$entries += @{id="L-000015"; lex="ruuno"; root=$false; pos="существительное"; trans="объединение, собрание"; etym="ruun- + -o (процесс)"; ex1="Ruuno thel sha."; ex1t="Собрание говорит."; ex2="Ruuno veni vexo."; ex2t="Объединение усиливает знание."; deriv="ruunorass"}

# 4. khar- (свет/звезда) — consonant-ending
$entries += @{id="L-000016"; lex="khar"; root=$true; pos="корень"; trans="свет, звезда"; etym="Праязыковый корень, основа небесной сферы"; ex1="Khar thali vexo."; ex1t="Свет сияет в небе."; ex2="Khar thel moro."; ex2t="Звезда освещает воды."; deriv="khara, khare, khari, kharu"}
$entries += @{id="L-000017"; lex="khara"; root=$false; pos="существительное"; trans="светимость, излучение"; etym="khar- + -a (абстрактное)"; ex1="Khara thel thal."; ex1t="Свет наполняет небо."; ex2="Khara vexo ruuni."; ex2t="Свечение питает поселение."; deriv="kharae"}
$entries += @{id="L-000018"; lex="khare"; root=$false; pos="существительное"; trans="источник света, звезда-носитель"; etym="khar- + -e (деятель)"; ex1="Khare koss-thal vexo."; ex1t="Звезда зажигает сияние."; ex2="Khare ruuni thero."; ex2t="Светило согревает землю."; deriv="kharethuun"}
$entries += @{id="L-000019"; lex="khari"; root=$false; pos="существительное"; trans="светильник, маяк, фокус света"; etym="khar- + -i (место/инструмент)"; ex1="Khari mor-thal theri."; ex1t="Маяк стоит у океана."; ex2="Khari ruuno vexo."; ex2t="Светильник освещает собрание."; deriv="khariven"}
$entries += @{id="L-000020"; lex="kharu"; root=$false; pos="существительное"; trans="луч, световой поток"; etym="khar- + -u (результат)"; ex1="Kharu thal-rass thero."; ex1t="Луч пронзает космос."; ex2="Kharu thel xhari."; ex2t="Луч достигает разума."; deriv="kharuzhal"}

# 5. the- (земля/планета) — vowel-ending
$entries += @{id="L-000021"; lex="the"; root=$true; pos="корень"; trans="земля, планета"; etym="Праязыковый корень, основа материальной сферы"; ex1="The mori xaro."; ex1t="Земля и вода — жизнь."; ex2="The thal-vex theri."; ex2t="Земля держит небесную силу."; deriv="thera, there, theri, thero"}
$entries += @{id="L-000022"; lex="thera"; root=$false; pos="существительное"; trans="земность, материальность"; etym="the- + -ra (абстрактное)"; ex1="Thera vash-kel theri."; ex1t="Материя — основа скал."; ex2="Thera zhal-mor vexo."; ex2t="Земность смешивается с туманом."; deriv="therae"}
$entries += @{id="L-000023"; lex="there"; root=$false; pos="существительное"; trans="землянин, рождённый на планете"; etym="the- + -re (деятель)"; ex1="There thel moro."; ex1t="Землянин идёт к воде."; ex2="There ruuni kharo."; ex2t="Землянин строит поселение."; deriv="therexha"}
$entries += @{id="L-000024"; lex="theri"; root=$false; pos="существительное"; trans="почва, грунт, земная поверхность"; etym="the- + -ri (место)"; ex1="Theri xari thero."; ex1t="Почва питает жизнь."; ex2="Theri vashu thel."; ex2t="Земля — основа камня."; deriv="therivash"}
$entries += @{id="L-000025"; lex="thero"; root=$false; pos="существительное"; trans="земледелие, возделывание"; etym="the- + -ro (процесс)"; ex1="Thero ruuni vexo."; ex1t="Возделывание питает народ."; ex2="Thero thel xaro."; ex2t="Земледелие продлевает жизнь."; deriv="theromor"}

# 6. sha- (язык/слово) — vowel-ending
$entries += @{id="L-000026"; lex="sha"; root=$true; pos="корень"; trans="язык, слово"; etym="Праязыковый корень, основа коммуникации"; ex1="Sha ruuni vokhro."; ex1t="Язык объединяет народ."; ex2="Sha xhari thero."; ex2t="Слово рождается в разуме."; deriv="shara, share, shari, sharu"}
$entries += @{id="L-000027"; lex="shara"; root=$false; pos="существительное"; trans="речь, языковая система"; etym="sha- + -ra (абстрактное)"; ex1="Shara veni theri."; ex1t="Речь хранит истину."; ex2="Shara ruunae thel."; ex2t="Язык — достояние народа."; deriv="sharae"}
$entries += @{id="L-000028"; lex="share"; root=$false; pos="существительное"; trans="говорящий, сказитель"; etym="sha- + -re (деятель)"; ex1="Share ven-sha thero."; ex1t="Сказитель говорит правду."; ex2="Share ruuni xhari."; ex2t="Говорящий мыслит за народ."; deriv="shareruun"}
$entries += @{id="L-000029"; lex="shari"; root=$false; pos="существительное"; trans="словарь, лексикон, хранилище слов"; etym="sha- + -ri (место)"; ex1="Shari thel veno."; ex1t="Словарь — великое знание."; ex2="Shari xharu vokhro."; ex2t="Лексикон упорядочивает мысли."; deriv="shariven"}
$entries += @{id="L-000030"; lex="sharu"; root=$false; pos="существительное"; trans="высказывание, изречение"; etym="sha- + -ru (результат)"; ex1="Sharu xhari thero."; ex1t="Изречение рождается в мысли."; ex2="Sharu ven-sha thel."; ex2t="Слово несёт истину."; deriv="sharukhar"}

# 7. ven- (истина/знание) — consonant-ending
$entries += @{id="L-000031"; lex="ven"; root=$true; pos="корень"; trans="истина, знание"; etym="Праязыковый корень, основы познания"; ex1="Ven xhari thero."; ex1t="Истина рождается в разуме."; ex2="Ven ruuni vexo."; ex2t="Знание питает народ."; deriv="vena, vene, veni, veno"}
$entries += @{id="L-000032"; lex="vena"; root=$false; pos="существительное"; trans="истинность, достоверность"; etym="ven- + -a (абстрактное)"; ex1="Vena sha-ruun theri."; ex1t="Достоверность — основа языка."; ex2="Vena thel xharo."; ex2t="Истинность выше мысли."; deriv="venae"}
$entries += @{id="L-000033"; lex="vene"; root=$false; pos="существительное"; trans="мудрец, знающий, учёный"; etym="ven- + -e (деятель)"; ex1="Vene thal-rass veno."; ex1t="Мудрец познаёт космос."; ex2="Vene sha-ruun vokhro."; ex2t="Учёный хранит язык народа."; deriv="venethal"}
$entries += @{id="L-000034"; lex="veni"; root=$false; pos="существительное"; trans="архив, библиотека, хранилище знаний"; etym="ven- + -i (место)"; ex1="Veni thel sha-ruun."; ex1t="Библиотека хранит народную мудрость."; ex2="Veni xharo thero."; ex2t="В архиве рождается мысль."; deriv="venivash"}
$entries += @{id="L-000035"; lex="veno"; root=$false; pos="существительное"; trans="познание, изучение"; etym="ven- + -o (процесс)"; ex1="Veno thel kharu."; ex1t="Познание ведёт к свету."; ex2="Veno xhari vexo."; ex2t="Изучение укрепляет разум."; deriv="venokhar"}

# 8. mor- (вода/океан) — consonant-ending
$entries += @{id="L-000036"; lex="mor"; root=$true; pos="корень"; trans="вода, океан"; etym="Праязыковый корень, основа водной стихии"; ex1="Mor theri thero."; ex1t="Вода питает землю."; ex2="Mor thal-rass vexo."; ex2t="Океан простирается к небу."; deriv="mora, more, mori, moro"}
$entries += @{id="L-000037"; lex="mora"; root=$false; pos="существительное"; trans="влажность, водность"; etym="mor- + -a (абстрактное)"; ex1="Mora zhal-mor theri."; ex1t="Влажность стоит в тумане."; ex2="Mora thel xaro."; ex2t="Влага питает жизнь."; deriv="morae"}
$entries += @{id="L-000038"; lex="more"; root=$false; pos="существительное"; trans="пловец, моряк, водный странник"; etym="mor- + -e (деятель)"; ex1="More mor-thal thero."; ex1t="Моряк пересекает океан."; ex2="More mori xaro."; ex2t="Пловец живёт в воде."; deriv="morexha"}
$entries += @{id="L-000039"; lex="mori"; root=$false; pos="существительное"; trans="водоём, бассейн, водное пространство"; etym="mor- + -i (место)"; ex1="Mori thel xa."; ex1t="Водоём полон жизни."; ex2="Mori vash-mor theri."; ex2t="Озеро покоится на дне."; deriv="morivash"}
$entries += @{id="L-000040"; lex="moro"; root=$false; pos="существительное"; trans="течение, поток"; etym="mor- + -o (процесс)"; ex1="Moro thel kossi."; ex1t="Течение уходит в ледник."; ex2="Moro thal-vex thero."; ex2t="Поток несёт энергию."; deriv="morokel"}

# 9. vash- (камень/структура) — consonant-ending
$entries += @{id="L-000041"; lex="vash"; root=$true; pos="корень"; trans="камень, структура"; etym="Праязыковый корень, основа твёрдой материи"; ex1="Vash theri thero."; ex1t="Камень лежит в земле."; ex2="Vash thel ruuni."; ex2t="Камень служит народу."; deriv="vasha, vashe, vashi, vashu"}
$entries += @{id="L-000042"; lex="vasha"; root=$false; pos="существительное"; trans="твёрдость, прочность"; etym="vash- + -a (абстрактное)"; ex1="Vasha thel kel-ver."; ex1t="Прочность — основа гор."; ex2="Vasha ruuni theri."; ex2t="Твёрдость держит поселение."; deriv="vashae"}
$entries += @{id="L-000043"; lex="vashe"; root=$false; pos="существительное"; trans="строитель, зодчий"; etym="vash- + -e (деятель)"; ex1="Vashe ruuni thero."; ex1t="Строитель возводит поселение."; ex2="Vashe vash-ven theri."; ex2t="Зодчий знает структуру истины."; deriv="vashexha"}
$entries += @{id="L-000044"; lex="vashi"; root=$false; pos="существительное"; trans="здание, постройка, сооружение"; etym="vash- + -i (место)"; ex1="Vashi thel ruuni."; ex1t="Здание служит народу."; ex2="Vashi veni theri."; ex2t="Постройка стоит на знании."; deriv="vashiven"}
$entries += @{id="L-000045"; lex="vashu"; root=$false; pos="существительное"; trans="фундамент, основание"; etym="vash- + -u (результат)"; ex1="Vashu thel vashi."; ex1t="Фундамент держит здание."; ex2="Vashu ruuni theri."; ex2t="Основание — опора народа."; deriv="vashuthal"}

# 10. thal- (небо/простор) — consonant-ending
$entries += @{id="L-000046"; lex="thal"; root=$true; pos="корень"; trans="небо, простор"; etym="Праязыковый корень, основа небесной сферы"; ex1="Thal thel khar."; ex1t="Небо вмещает свет."; ex2="Thal mor-thal thero."; ex2t="Небо простирается над океаном."; deriv="thala, thale, thali, thalo"}
$entries += @{id="L-000047"; lex="thala"; root=$false; pos="существительное"; trans="бескрайность, безбрежность"; etym="thal- + -a (абстрактное)"; ex1="Thala thel rass."; ex1t="Бескрайность — само пространство."; ex2="Thala xhari thero."; ex2t="Безбрежность рождает мысль."; deriv="thalae"}
$entries += @{id="L-000048"; lex="thale"; root=$false; pos="существительное"; trans="небожитель, парящий"; etym="thal- + -e (деятель)"; ex1="Thale thal-rass thero."; ex1t="Парящий пересекает небо."; ex2="Thale khar-thal veno."; ex2t="Небожитель знает свет неба."; deriv="thalexha"}
$entries += @{id="L-000049"; lex="thali"; root=$false; pos="существительное"; trans="горизонт, небосвод"; etym="thal- + -i (место)"; ex1="Thali thel mor-thal."; ex1t="Горизонт там, где океан."; ex2="Thali khar-vex thero."; ex2t="Небосвод рождает звёзды."; deriv="thaliven"}
$entries += @{id="L-000050"; lex="thalo"; root=$false; pos="существительное"; trans="полёт, парение"; etym="thal- + -o (процесс)"; ex1="Thalo thel zhal."; ex1t="Полет — стихия воздуха."; ex2="Thalo ruuni vexo."; ex2t="Парение несёт свободу."; deriv="thalokel"}

# 11. ser- (спутник/луна) — consonant-ending
$entries += @{id="L-000051"; lex="ser"; root=$true; pos="корень"; trans="спутник, луна"; etym="Праязыковый корень, обозначающий небесное тело-спутник"; ex1="Ser thali thero."; ex1t="Луна восходит к горизонту."; ex2="Ser thel koss-thal."; ex2t="Спутник видит сияние."; deriv="sera, sere, seri, sero"}
$entries += @{id="L-000052"; lex="sera"; root=$false; pos="существительное"; trans="цикличность, периодичность"; etym="ser- + -a (абстрактное)"; ex1="Sera thel moro."; ex1t="Цикличность подобна течению."; ex2="Sera xhari thero."; ex2t="Периодичность рождает порядок."; deriv="serae"}
$entries += @{id="L-000053"; lex="sere"; root=$false; pos="существительное"; trans="спутник, сопровождающий"; etym="ser- + -e (деятель)"; ex1="Sere thel there."; ex1t="Спутник идёт с землянином."; ex2="Sere ser-thal thero."; ex2t="Спутник странствует в ночи."; deriv="serexha"}
$entries += @{id="L-000054"; lex="seri"; root=$false; pos="существительное"; trans="орбита, путь обращения"; etym="ser- + -i (место)"; ex1="Seri thel ser-thal."; ex1t="Орбита — путь луны."; ex2="Seri thel-rhu vexo."; ex2t="Путь имеет великую силу."; deriv="seriven"}
$entries += @{id="L-000055"; lex="sero"; root=$false; pos="существительное"; trans="вращение, оборот"; etym="ser- + -o (процесс)"; ex1="Sero thel xaro."; ex1t="Вращение подобно жизни."; ex2="Sero thali thero."; ex2t="Оборот совершается у горизонта."; deriv="serokel"}

# 12. vex- (сила/энергия) — consonant-ending
$entries += @{id="L-000056"; lex="vex"; root=$true; pos="корень"; trans="сила, энергия"; etym="Праязыковый корень, основа энергетической сферы"; ex1="Vex thel xaro."; ex1t="Сила питает жизнь."; ex2="Vex ruuni thero."; ex2t="Энергия строит народ."; deriv="vexa, vexe, vexi, vexo"}
$entries += @{id="L-000057"; lex="vexa"; root=$false; pos="существительное"; trans="мощность, интенсивность"; etym="vex- + -a (абстрактное)"; ex1="Vexa thel khar-vex."; ex1t="Мощность — в звезде."; ex2="Vexa ruuni theri."; ex2t="Сила держит народ."; deriv="vexae"}
$entries += @{id="L-000058"; lex="vexe"; root=$false; pos="существительное"; trans="носитель силы, энергет"; etym="vex- + -e (деятель)"; ex1="Vexe thel khar-vex."; ex1t="Носитель силы — звезда."; ex2="Vexe ruuni vexo."; ex2t="Энергет питает поселение."; deriv="vexevar"}
$entries += @{id="L-000059"; lex="vexi"; root=$false; pos="существительное"; trans="генератор, источник энергии"; etym="vex- + -i (место/инструмент)"; ex1="Vexi thel ruuni."; ex1t="Генератор служит народу."; ex2="Vexi khar-thal thero."; ex2t="Источник силы — в рассвете."; deriv="vexivash"}
$entries += @{id="L-000060"; lex="vexo"; root=$false; pos="существительное"; trans="ускорение, движение силы"; etym="vex- + -o (процесс)"; ex1="Vexo thel thalo."; ex1t="Ускорение подобно полёту."; ex2="Vexo ruuni thero."; ex2t="Движение силы строит народ."; deriv="vexokhar"}

# 13. koss- (холод/лёд) — consonant-ending
$entries += @{id="L-000061"; lex="koss"; root=$true; pos="корень"; trans="лёд, холод"; etym="Праязыковый корень, основа криогенной сферы"; ex1="Koss thel mor."; ex1t="Лёд — застывшая вода."; ex2="Koss kel-ver theri."; ex2t="Лёд лежит на вершинах."; deriv="kossa, kosse, kossi, kosso"}
$entries += @{id="L-000062"; lex="kossa"; root=$false; pos="существительное"; trans="холодность, стужа"; etym="koss- + -a (абстрактное)"; ex1="Kossa thel zhal."; ex1t="Стужа — в воздухе."; ex2="Kossa mor-koss theri."; ex2t="Холод скован во льду."; deriv="kossae"}
$entries += @{id="L-000063"; lex="kosse"; root=$false; pos="существительное"; trans="существо холода, ледяной дух"; etym="koss- + -e (деятель)"; ex1="Kosse koss-thal thero."; ex1t="Дух холода танцует в сиянии."; ex2="Kosse kossi xaro."; ex2t="Ледяное существо живёт в леднике."; deriv="kossezhal"}
$entries += @{id="L-000064"; lex="kossi"; root=$false; pos="существительное"; trans="ледник, мерзлота"; etym="koss- + -i (место)"; ex1="Kossi thel mor-koss."; ex1t="Ледник — замёрзшая вода."; ex2="Kossi kel-ver theri."; ex2t="Ледник лежит в горах."; deriv="kossivash"}
$entries += @{id="L-000065"; lex="kosso"; root=$false; pos="существительное"; trans="замерзание, оледенение"; etym="koss- + -o (процесс)"; ex1="Kosso mori thero."; ex1t="Замерзание сковывает воду."; ex2="Kosso thel koss-thal."; ex2t="Оледенение длится в полярную ночь."; deriv="kossokhar"}

# 14. zhal- (газ/воздух) — consonant-ending
$entries += @{id="L-000066"; lex="zhal"; root=$true; pos="корень"; trans="газ, воздух"; etym="Праязыковый корень, основа воздушной стихии"; ex1="Zhal thel thalo."; ex1t="Воздух — среда полёта."; ex2="Zhal thel xaro."; ex2t="Воздух необходим жизни."; deriv="zhala, zhale, zhali, zhalo"}
$entries += @{id="L-000067"; lex="zhala"; root=$false; pos="существительное"; trans="газообразность, летучесть"; etym="zhal- + -a (абстрактное)"; ex1="Zhala thel zhal-mor."; ex1t="Летучесть — в тумане."; ex2="Zhala thal-rass theri."; ex2t="Газообразность — в космосе."; deriv="zhalae"}
$entries += @{id="L-000068"; lex="zhale"; root=$false; pos="существительное"; trans="летун, птица, воздушное существо"; etym="zhal- + -e (деятель)"; ex1="Zhale thali thero."; ex1t="Птица парит у горизонта."; ex2="Zhale zhal-mor vexo."; ex2t="Летун рассекает туман."; deriv="zhalevar"}
$entries += @{id="L-000069"; lex="zhali"; root=$false; pos="существительное"; trans="атмосфера, воздушный слой"; etym="zhal- + -i (место)"; ex1="Zhali thel the-ral."; ex1t="Атмосфера над равниной."; ex2="Zhali thal-rass theri."; ex2t="Слой воздуха разделяет небо и космос."; deriv="zhaliven"}
$entries += @{id="L-000070"; lex="zhalo"; root=$false; pos="существительное"; trans="дыхание, ветер"; etym="zhal- + -o (процесс)"; ex1="Zhalo thel xaro."; ex1t="Дыхание — признак жизни."; ex2="Zhalo mor-thal thero."; ex2t="Ветер дует над океаном."; deriv="zhalokel"}

# 15. rhu- (великий/огромный) — vowel-ending
$entries += @{id="L-000071"; lex="rhu"; root=$true; pos="корень"; trans="величие, огромность"; etym="Праязыковый корень, обозначающий масштаб"; ex1="Rhu thel thal-rass."; ex1t="Великое — в космосе."; ex2="Rhu thel kel-ver."; ex2t="Великое — в горах."; deriv="rhura, rhure, rhuri, rhuro"}
$entries += @{id="L-000072"; lex="rhura"; root=$false; pos="существительное"; trans="грандиозность, колоссальность"; etym="rhu- + -ra (абстрактное)"; ex1="Rhura thel rass."; ex1t="Грандиозность — в пространстве."; ex2="Rhura thel xhara."; ex2t="Колоссальность — в разуме."; deriv="rhurae"}
$entries += @{id="L-000073"; lex="rhure"; root=$false; pos="существительное"; trans="гигант, великан"; etym="rhu- + -re (деятель)"; ex1="Rhure thel kel-rhu."; ex1t="Гигант — величайшая гора."; ex2="Rhure mor-thal thero."; ex2t="Великан пересекает океан."; deriv="rhurevash"}
$entries += @{id="L-000074"; lex="rhuri"; root=$false; pos="существительное"; trans="простор, открытое пространство"; etym="rhu- + -ri (место)"; ex1="Rhuri thel thal-rass."; ex1t="Простор — это космос."; ex2="Rhuri xhari thero."; ex2t="Простор рождает мысль."; deriv="rhuriven"}
$entries += @{id="L-000075"; lex="rhuro"; root=$false; pos="существительное"; trans="расширение, рост"; etym="rhu- + -ro (процесс)"; ex1="Rhuro thel rasso."; ex1t="Расширение подобно движению."; ex2="Rhuro ruuni vexo."; ex2t="Рост питает народ."; deriv="rhuromor"}

# 16. kel- (высота/гора) — consonant-ending
$entries += @{id="L-000076"; lex="kel"; root=$true; pos="корень"; trans="высота, гора"; etym="Праязыковый корень, основа вертикального измерения"; ex1="Kel thel thal."; ex1t="Высота уходит в небо."; ex2="Kel veri thero."; ex2t="Гора стоит на скале."; deriv="kela, kele, keli, kelo"}
$entries += @{id="L-000077"; lex="kela"; root=$false; pos="существительное"; trans="высотность, возвышенность"; etym="kel- + -a (абстрактное)"; ex1="Kela thel kel-ver."; ex1t="Высотность — свойство гор."; ex2="Kela thel-rass theri."; ex2t="Возвышенность поднимается к небу."; deriv="kelae"}
$entries += @{id="L-000078"; lex="kele"; root=$false; pos="существительное"; trans="альпинист, восходитель"; etym="kel- + -e (деятель)"; ex1="Kele kel-rhu thero."; ex1t="Восходитель покоряет вершину."; ex2="Kele veri vexo."; ex2t="Альпинист черпает силу в скалах."; deriv="kelekoss"}
$entries += @{id="L-000079"; lex="keli"; root=$false; pos="существительное"; trans="вершина, пик"; etym="kel- + -i (место)"; ex1="Keli thel kharu."; ex1t="Вершина встречает луч."; ex2="Keli kossi thero."; ex2t="Пик возвышается над ледником."; deriv="keliven"}
$entries += @{id="L-000080"; lex="kelo"; root=$false; pos="существительное"; trans="восхождение, подъём"; etym="kel- + -o (процесс)"; ex1="Kelo thel rhuro."; ex1t="Восхождение подобно росту."; ex2="Kelo veri vexo."; ex2t="Подъём требует силы."; deriv="kelomor"}

# 17. vokh- (гармония/порядок) — consonant-ending
$entries += @{id="L-000081"; lex="vokh"; root=$true; pos="корень"; trans="гармония, порядок"; etym="Праязыковый корень, основа упорядоченности"; ex1="Vokh thel ruuna."; ex1t="Гармония — основа общности."; ex2="Vokh xhari thero."; ex2t="Порядок рождается в разуме."; deriv="vokhra, vokhre, vokhri, vokhro"}
$entries += @{id="L-000082"; lex="vokhra"; root=$false; pos="существительное"; trans="упорядоченность, организованность"; etym="vokh- + -a (абстрактное)"; ex1="Vokhra thel ven."; ex1t="Упорядоченность — путь истины."; ex2="Vokhra ruuni theri."; ex2t="Организованность держит народ."; deriv="vokhrae"}
$entries += @{id="L-000083"; lex="vokhre"; root=$false; pos="существительное"; trans="хранитель порядка, страж"; etym="vokh- + -e (деятель)"; ex1="Vokhre ruuni vokhro."; ex1t="Страж хранит поселение."; ex2="Vokhre ven-sha theri."; ex2t="Хранитель блюдёт истину."; deriv="vokhrevar"}
$entries += @{id="L-000084"; lex="vokhri"; root=$false; pos="существительное"; trans="храм гармонии, место порядка"; etym="vokh- + -i (место)"; ex1="Vokhri thel ruuni."; ex1t="Храм — сердце поселения."; ex2="Vokhri xharu thero."; ex2t="В храме рождаются идеи."; deriv="vokhriven"}
$entries += @{id="L-000085"; lex="vokhro"; root=$false; pos="существительное"; trans="упорядочивание, организация"; etym="vokh- + -o (процесс)"; ex1="Vokhro thel ruuno."; ex1t="Организация — путь к единству."; ex2="Vokhro shari thero."; ex2t="Упорядочивание создаёт словарь."; deriv="vokhromor"}

# 18. rass- (пространство/измерение) — consonant-ending
$entries += @{id="L-000086"; lex="rass"; root=$true; pos="корень"; trans="пространство, измерение"; etym="Праязыковый корень, основа пространственных понятий"; ex1="Rass thel thal."; ex1t="Пространство — это небо."; ex2="Rass thel rhuri."; ex2t="Измерение — это простор."; deriv="rassa, rasse, rassi, rasso"}
$entries += @{id="L-000087"; lex="rassa"; root=$false; pos="существительное"; trans="протяжённость, протяжение"; etym="rass- + -a (абстрактное)"; ex1="Rassa thel thal-rass."; ex1t="Протяжённость — свойство космоса."; ex2="Rassa thel mor-thal."; ex2t="Протяжение — в океане."; deriv="rassae"}
$entries += @{id="L-000088"; lex="rasse"; root=$false; pos="существительное"; trans="путешественник, странник"; etym="rass- + -e (деятель)"; ex1="Rasse thal-rass thero."; ex1t="Странник пересекает космос."; ex2="Rasse the-rass veno."; ex2t="Путешественник познаёт равнины."; deriv="rassexha"}
$entries += @{id="L-000089"; lex="rassi"; root=$false; pos="существительное"; trans="портал, переход, стык миров"; etym="rass- + -i (место)"; ex1="Rassi thel thel-rass."; ex1t="Портал соединяет миры."; ex2="Rassi thel-rass veno."; ex2t="Переход ведёт к новому знанию."; deriv="rassiven"}
$entries += @{id="L-000090"; lex="rasso"; root=$false; pos="существительное"; trans="перемещение, переход"; etym="rass- + -o (процесс)"; ex1="Rasso thel thalo."; ex1t="Перемещение подобно полёту."; ex2="Rasso the-rass thero."; ex2t="Путь лежит через равнины."; deriv="rassokel"}

# 19. ver- (гора) — consonant-ending
$entries += @{id="L-000091"; lex="ver"; root=$true; pos="корень"; trans="гора, твёрдость"; etym="Праязыковый корень, обозначающий горный массив"; ex1="Ver thel kel."; ex1t="Гора — это высота."; ex2="Ver thal-rass thero."; ex2t="Гора уходит в небо."; deriv="vera, vere, veri, vero"}
$entries += @{id="L-000092"; lex="vera"; root=$false; pos="существительное"; trans="несокрушимость, твёрдость духа"; etym="ver- + -a (абстрактное)"; ex1="Vera thel vash."; ex1t="Несокрушимость — в камне."; ex2="Vera thel xhara."; ex2t="Твёрдость духа — в разуме."; deriv="verae"}
$entries += @{id="L-000093"; lex="vere"; root=$false; pos="существительное"; trans="горный житель, верховец"; etym="ver- + -e (деятель)"; ex1="Vere kel-ver thero."; ex1t="Верховец живёт в горах."; ex2="Vere kossi veno."; ex2t="Горный житель знает ледники."; deriv="verexha"}
$entries += @{id="L-000094"; lex="veri"; root=$false; pos="существительное"; trans="скала, утёс"; etym="ver- + -i (место)"; ex1="Veri thel vash."; ex1t="Скала — чистый камень."; ex2="Veri mor-ver theri."; ex2t="Утёс стоит у водопада."; deriv="veriven"}
$entries += @{id="L-000095"; lex="vero"; root=$false; pos="существительное"; trans="возвышение, поднятие"; etym="ver- + -o (процесс)"; ex1="Vero thel kelo."; ex1t="Возвышение подобно восхождению."; ex2="Vero theri thero."; ex2t="Земля поднимается."; deriv="veromor"}

# 20. thel- (спутник/малый) — consonant-ending
$entries += @{id="L-000096"; lex="thel"; root=$true; pos="корень"; trans="малость, спутник"; etym="Праязыковый корень, обозначающий малое или сопровождающее"; ex1="Thel thel ser."; ex1t="Малое подобно луне."; ex2="Thel xari thero."; ex2t="Малое живёт в биоме."; deriv="thela, thele, theli, thelo"}
$entries += @{id="L-000097"; lex="thela"; root=$false; pos="существительное"; trans="миниатюрность, малость"; etym="thel- + -a (абстрактное)"; ex1="Thela thel seri."; ex1t="Малость — на орбите."; ex2="Thela xhari thero."; ex2t="Малое рождает великие мысли."; deriv="thelae"}
$entries += @{id="L-000098"; lex="thele"; root=$false; pos="существительное"; trans="спутник, помощник, младший"; etym="thel- + -e (деятель)"; ex1="Thele sere thero."; ex1t="Помощник идёт за спутником."; ex2="Thele ruuni vexo."; ex2t="Младший служит народу."; deriv="thelexha"}
$entries += @{id="L-000099"; lex="theli"; root=$false; pos="существительное"; trans="укрытие, малое место, нора"; etym="thel- + -i (место)"; ex1="Theli thel xari."; ex1t="Укрытие — малая среда."; ex2="Theli thel kossi."; ex2t="Нора прячет от стужи."; deriv="theliven"}
$entries += @{id="L-000100"; lex="thelo"; root=$false; pos="существительное"; trans="уменьшение, сжатие"; etym="thel- + -o (процесс)"; ex1="Thelo thel rhuro."; ex1t="Сжатие противоположно росту."; ex2="Thelo vexi thero."; ex2t="Уменьшение снижает силу."; deriv="thelomor"}

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

- $($e.deriv)
"@
    $filePath = Join-Path $basePath "$($e.id).md"
    Set-Content -Path $filePath -Value $content -Encoding UTF8
    Write-Output "Created $($e.id)"
}
