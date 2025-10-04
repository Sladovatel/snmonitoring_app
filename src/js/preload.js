    (function() {
        // Создаем и добавляем прелоадер
        const preloader = document.createElement('div');
        preloader.innerHTML = `
            <div class="preloader" id="preloader">
                <img src="img/snloading.gif" class="preloader-gif" alt="Загрузка"
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjQwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iOCIvPjwvc3ZnPg=='">
            </div>
        `;
        document.body.appendChild(preloader.firstElementChild);

        const startTime = Date.now();
        const preloaderElement = document.getElementById('preloader');

        // Функция скрытия прелоадера
        function hidePreloader() {
            if (!preloaderElement) return;
            
            const elapsed = Date.now() - startTime;
            const waitTime = Math.max(0, 500 - elapsed);
            
            setTimeout(() => {
                preloaderElement.classList.add('hidden');
                setTimeout(() => {
                    if (preloaderElement.parentNode) {
                        preloaderElement.parentNode.removeChild(preloaderElement);
                    }
                }, 500);
            }, waitTime);
        }

        // Проверка загрузки
        function checkLoad() {
            const images = Array.from(document.images);
            return images.every(img => img.complete);
        }

        // Запуск проверки
        window.addEventListener('load', () => {
            if (checkLoad()) {
                hidePreloader();
            } else {
                const interval = setInterval(() => {
                    if (checkLoad()) {
                        clearInterval(interval);
                        hidePreloader();
                    }
                }, 100);
                
                setTimeout(() => {
                    clearInterval(interval);
                    hidePreloader();
                }, 5000);
            }
        });

        // Фолбэк
        setTimeout(hidePreloader, 10000);
    })();