(function() {
  "use strict";

  // Оптимальное решение
  function drawRating(vote) {
    var point = (vote !== 0) ? Math.ceil(vote / 20) : 1;
    return Array(point + 1).join('★') + Array(6 - point).join('☆');
  }

  // Грубое решение
  function drawRating(vote) {
    switch (true) { 
      case vote >= 0 && vote <= 20:
        return '★☆☆☆☆';
        break;
      case vote > 20 && vote <= 40:
        return '★★☆☆☆';
        break;
      case vote > 40 && vote <= 60:
        return '★★★☆☆';
        break;
      case vote > 60 && vote <= 80:
        return '★★★★☆';
        break;
      case vote > 80 && vote <= 100:
        return '★★★★★';
        break;
    }
  };

  // Проверка работы результата
  console.log(drawRating(0)); // ★☆☆☆☆
  console.log(drawRating(1)); // ★☆☆☆☆
  console.log(drawRating(50)); // ★★★☆☆
  console.log(drawRating(99)); // ★★★★★
})();