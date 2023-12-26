(function ($) {
  $.fn.counterHtml = function (options) {
    const settings = $.extend(
      {
        targetVal: 0,
        duration: 100,
      },
      options
    );

    return this.each(function () {
      const element = $(this);
      let targetValue = settings.targetVal;
      let currentValue = 0;
      let increment = 1;
      let interval = settings.duration;
      let counterInterval;

      function updateCounter() {
        element.text(currentValue);
        if (currentValue < targetValue) {
          currentValue += increment;
        } else {
          clearInterval(counterInterval);
        }
      }

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            counterInterval = setInterval(updateCounter, interval);
            observer.disconnect();
          }
        });
      });

      observer.observe(element[0]);
    });
  };

  $.fn.getTemplate = async function (options) {
    const { template, content } = options;
    if (!template) {
      console.error("Se requiere el nombre del template en las opciones.");
      return null;
    }

    const filename = template + ".html";
    const path = `../templates/${filename}`;

    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(
          `No se pudo cargar el template: ${response.statusText}`
        );
      }

      const data = await response.text();
      const $template = $(data);

      if (content) {
        for (const key in content) {
          const element = $template.find(`#${key}`);
          if (element.length) {
            element.html(content[key]);
          }
        }
      }

      this.append($template);

      return data;
    } catch (error) {
      console.error("Error al cargar el template:", error);
      return null;
    }
  };
})(jQuery);
