     window.eanHistory = [];

      function loadHistory() {
        var serializedHistory = localStorage.history;
        if (serializedHistory !== undefined) {
          eanHistory = JSON.parse(serializedHistory);
        }

        if (eanHistory.length > 0) {
          setEan(eanHistory[0]);
        }
      }

      function updateHistory() {
        localStorage.history = JSON.stringify(eanHistory);
        $("#history").empty();
        eanHistory.forEach(function(item) {
          $("#history").append("<li>" + item + "</li>");
        });
      }

      function setEan(ean) {
        $("#ean").val(ean);
        updateEan(ean);
      }

      function updateEan(ean) {
        ean = ean.trim();

        if (ean.length == 0) {
          return;
        }

        if (eanHistory.includes(ean)) {
          eanHistory.splice(eanHistory.indexOf(ean), 1);
        }

        var format = ean.length == 7 || ean.length == 8 ? "EAN8" :
          ean.length == 12 || ean.length == 13 ? "EAN13" : "CODE128";

        try {
          JsBarcode("#barcode", ean, {format: format});
        } catch (e) {
          console.log(e);
          updateHistory();
          return;
        }

        eanHistory.unshift(ean);

        if (eanHistory.length > 50) {
          eanHistory.splice(50);
        }

        updateHistory();
      }

      $(document).ready(function() {
        loadHistory();
        updateHistory();

        $("#ean").on("keyup", function() {
          updateEan($(this).val());
        });

        $("#ean").on("focus", function() {
            $(this).select();
        });

        $("#history").on("click", "li", function() {
          setEan($(this).text());
        });
      });