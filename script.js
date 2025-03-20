// 📌 Создаём массив для хранения фильмов и сериалов
const movies = [];

// 📌 Функция для создания объекта фильма/сериала и добавления его в массив
function createMovie(title, year, rating, type, perEpisode, episodes = 1) {
    const movie = {
        title,
        year,
        rating,
        type,
        duration: {
            episodes,
            perEpisode
        },
        getInfo() {
            console.log(`${this.title} (${this.year}) - ${this.type === 'film' ? 'Фильм' : 'Сериал'}`);
            console.log(`Рейтинг: ${this.rating}`);
        },
        getTotalDuration() {
            const total = this.duration.episodes * this.duration.perEpisode;
            console.log(`Общая длительность: ${total} минут`);
        }
    };
    
    movies.push(movie);
    renderMovies(); // Обновляем список на странице
}

// 📌 Добавляем обработчик события для изменения типа (чтобы показывать/скрывать поле "Количество серий")
document.getElementById('type').addEventListener('change', function () {
    const episodesInput = document.getElementById('episodes');
    episodesInput.style.display = this.value === 'сериал' ? 'block' : 'none';
    if (this.value !== 'сериал') {
        episodesInput.value = ''; // Если снова выбрали "Фильм", сбрасываем поле серий
    }
});

// 📌 Функция для сортировки фильмов и сериалов
function sortMovies(criteria) {
    if (criteria === 'year') {
        movies.sort((a, b) => a.year - b.year);
    } else if (criteria === 'rating') {
        movies.sort((a, b) => b.rating - a.rating);
    } else if (criteria === 'duration') {
        movies.sort((a, b) => (a.duration.episodes * a.duration.perEpisode) - (b.duration.episodes * b.duration.perEpisode));
    } else {
        console.log('Ошибка: критерий должен быть "year", "rating" или "duration"');
        return;
    }
    renderMovies(); // Перерисовываем список
}

// 📌 Функция для отображения списка фильмов на странице
function renderMovies() {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = ''; // Очищаем контейнер перед обновлением
    
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <h3>${movie.title} (${movie.year})</h3>
            <p>Рейтинг: ${movie.rating}</p>
            <p>Тип: ${movie.type === 'фильм' ? 'Фильм' : 'Сериал'}</p>
            <p>Длительность: ${movie.duration.episodes * movie.duration.perEpisode} мин.</p>
        `;
        movieList.appendChild(movieItem);
    });
}

// 📌 Добавляем обработчик события для кнопки "Добавить"
document.getElementById('addMovie').addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const type = document.getElementById('type').value;
    const year = parseInt(document.getElementById('year').value);
    const rating = parseFloat(document.getElementById('rating').value);
    const duration = parseInt(document.getElementById('duration').value);
    const episodes = type === 'film' ? 1 : parseInt(document.getElementById('episodes').value) || 1;
    
    if (!title || isNaN(year) || isNaN(rating) || isNaN(duration)) {
        alert('Заполните все поля корректно!');
        return;
    }
    
    createMovie(title, year, rating, type, duration, episodes);

    
    // Очищаем поля ввода после добавления
    document.getElementById('title').value = '';
    document.getElementById('year').value = '';
    document.getElementById('rating').value = '';
    document.getElementById('duration').value = '';
    document.getElementById('episodes').value = '';
});

// 📌 Добавляем обработчик события для кнопки "Сортировать"
document.getElementById('sortMovies').addEventListener('click', () => {
    const criteria = document.getElementById('sort').value;
    sortMovies(criteria);
});

// 📌 Инициализируем начальные фильмы
createMovie('Интерстеллар', 2014, 8.6, 'фильм', 169);
createMovie('Во все тяжкие', 2008, 9.5, 'сериал', 47, 62);
createMovie('Джон Уик', 2014, 7.4, 'фильм', 101);
createMovie('Шерлок', 2010, 9.1, 'сериал', 88, 13);
