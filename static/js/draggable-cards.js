(function () {
    "use strict";
     const drake = dragula([
        document.querySelector('#row-container')
      ], {
        moves: function (el, container, handle) {
          return handle.classList.contains('handle');
        }
      });
})();



