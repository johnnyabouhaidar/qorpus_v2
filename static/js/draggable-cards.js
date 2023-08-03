(function () {
    "use strict";

    dragula([
        document.querySelector('#kpi-1'), 
        document.querySelector('#kpi-2'),
         document.querySelector('#kpi-3'), 
         document.querySelector('#kpi-4'), 
         document.querySelector('#kpi-5'), 
         document.querySelector('#kpi-6'), 
         document.querySelector('#kpi-7'), 
         document.querySelector('#kpi-8'), 
         document.querySelector('#chart-1'), 
         document.querySelector('#chart-2'), 
         document.querySelector('#chart-3'), 
         document.querySelector('#chart-4'), 
         document.querySelector('#table-1'), 
         document.querySelector('#table-2'), 
         document.querySelector('#table-3'),
          document.querySelector('#table-4'), 
          document.querySelector('#table-5'),
           document.querySelector('#table-6')],
           {


            moves: function (el, container, handle) {
                return handle.classList.contains('handle');
            }
        });
})();

