# Tutu.ru tests on JavaScript

## Fuzbuz задачи
## Задача №1
Написать функцию dscount, которая подсчитывает количество идущих подряд символов s1 и s2 в строке, без учёта регистра.

**Файл с решением: fuzbuz-task-1.js**
## Задача №2
Реализовать функцию `checkSyntax(string)`, проверяющую на синтаксическую верность последовательность скобок. Задача не сводится к простой проверке сбалансированности скобок. Нужно еще учитывать их последовательность (вложенность).

**Файл с решением: fuzbuz-task-2.js**
## Алгоритмы
## Задача №1
- Есть 2 сковороды для оладьев, каждая из которых вмещает ровно по 1 блинчику за 1 раз.
- Есть 3 панкейка (блинчика), которые надо пожарить.
- За 1 минуту жарится 1 сторона блинчика.
- Блинчики надо обжарить с 2х сторон.

Итерацией считать процесс жарки 1й стороны 2х блинчиков на 2х сковородах. Сколько нужно времени (итераций) при оптимальном распределении чтобы пожарить 3 панкейка?

**Текстовое решение**:

При оптимальном использовании сковородок потребуется 3 итерации на обжаривание панкейков. Алгоритм должен быть следующим:

1. Кладём 1-й и 2-й блинчик на сковородки, обжариваем их с одной стороны в течение 1 минуты.
2. Снимаем 1-й блинчик со сковороды, на его место кладём 3-й. 2-й блинчик переворачиваем, жарим 2-й и 3-й блинчики 1 минуту.
3. Снимаем 2-блинчик, кладём на его место 1-й необжаренной стороной, а 3-й блинчик переворачиваем. Жарим ещё 1 минуту.

**Файл с решением: algorithm.js**

## Рефакторинг
## Задача №1

Посмотрите на код:
```
function func(s, a, b) {

	if (s.match(/^$/)) {
		return -1;
	}
	
	var i = s.length -1;
	var aIndex =     -1;
	var bIndex =     -1;
	
	while ((aIndex == -1) && (bIndex == -1) && (i > 0)) {
	    if (s.substring(i, i +1) == a) {
	    	aIndex = i;
    	}
	    if (s.substring(i, i +1) == b) {
	    	bIndex = i;
    	}
	    i = i - 1;
	}
	
	if (aIndex != -1) {
	    if (bIndex == -1) {
	        return aIndex;
	    }
	    else {
	        return Math.max(aIndex, bIndex);
	    }
	}
	
	if (bIndex != -1) {
	    return bIndex;
	}
	else {
	    return -1;
	}
}
```

Что можно улучшить? Как бы вы его переписали?

**Файл с решением: refactoring-task-1.js**

## Задача №2
```
function drawRating(vote) {
	if (vote >= 0 && vote <= 20) {
    	return '★☆☆☆☆';
	}
	else if (vote > 20 && vote <= 40) {
		return '★★☆☆☆';
	}
	else if (vote > 40 && vote <= 60) {
		return '★★★☆☆';
	}
	else if (vote > 60 && vote <= 80) {
		return '★★★★☆';
	}
	else if (vote > 80 && vote <= 100) {
		return '★★★★★';
	}
}

// Проверка работы результата
console.log(drawRating(0) ); // ★☆☆☆☆
console.log(drawRating(1) ); // ★☆☆☆☆
console.log(drawRating(50)); // ★★★☆☆
console.log(drawRating(99)); // ★★★★★
```

Что можно улучшить? Как бы вы переписали функцию `drawRating` при условии что на вход функции `drawRating` должна приходить переменная vote, содержащая значение от 0 до 100. Интересует именно логика реализации функции, не визуальное отображение звезд.

**Файл с решением: refactoring-task-2.js**

## Практические задачи
## Задача №1

Реализуйте функцию `parseUrl(string)`, которая будет парсить URL строку и возвращать объект с распарсенными данными. Пример:

```
let a = parseUrl('http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo')

// Вернет объект, в котором будут следующие свойства:
console.log( a.href == "http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo" )
console.log( a.hash == "#foo" )
console.log( a.port == "8080" )
console.log( a.host == "tutu.ru:8080" )
console.log( a.protocol == "http:" )
console.log( a.hostname == "tutu.ru" )
console.log( a.pathname == "/do/any.php" )
console.log( a.origin == "http://tutu.ru:8080" )
```

**Файл с решением: practical-task-1.js**
## Задача №2

Необходимо разработать javascript-компонент для сортировки таблиц с данными.

## Функционал

- Сортировка по столбцам: при нажатии на название столбца строки таблицы сортируются по возрастанию, при повторном клике - по убыванию. Графическим элементом или текстовым сообщением указывается направление сортировки.
- Клиентская пагинация: данные необходимо отображать постранично, максимум 50 элементов на страницу. Необходимо предоставить пользовательскую навигацию для перехода по страницам.
- Фильтрация: компонент предоставляет текстовое поле, в которое пользователь может ввести текст и строки таблицы, данные которых не содержат подстроку, введённую пользователем, скрываются. Перефильтрация осуществляется по нажатию на кнопку Найти.
- По клике на строку таблицы значения полей выводятся в дополнительном блоке под таблицей.
- Данные в таблицу загружаются с сервера. Способ загрузки с сервера на ваш выбор.

Для демонстрации работы компонента необходимо сделать простую HTML страницу. Пользователю предлагается выбрать набор данных: маленький или большой. При выборе набора данных он загружается с сервера и по данным строится таблица.

**Файлы с решением: /practical-task-2/build (запуск страницы задания index.html)**

Комментарии: в коде программы были использованы нововведения ES6 (стрелочные ф-ции), ES7 (async/await), сборка осуществлялась с помощью Gulp'a, тестирование производилось через самописные JS-функции, наподобие тех, что применялись в предыдущих заданиях.

К станице была подключена легковесная JS-библиотека - jQuery. Она удобна в использовании и поддерживается большинством браузеров, в том числе IE9+ (для версии jQuery 3.0.0).

В разработке своих проектов использую редактор Sublime Text 3, для работы с git программу Git Extensions, для стилевых файлов - препроцессор Sass(Scss), инструмент автоматизации сборки Gulp. Тестирование провожу с помощью самописных JS-функций.
