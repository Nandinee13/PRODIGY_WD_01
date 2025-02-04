const container = document.querySelector('.container');
        const search = document.querySelector('.search-box button');
        const weatherBox = document.querySelector('.weather-box');
        const weatherDetails = document.querySelector('.weather-details');
        const error404 = document.querySelector('.not-found');

        search.addEventListener('click', () => {
            const APIKey = '5b1ad41e205cb68c0b8af57c3426f170';
            const city = document.querySelector('.search-box input').value;

            if (city === '')
                return;

            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
                if (json.cod == '404') {
                    container.style.height = '400px';
                    error404.classList.add('active');
                    weatherBox.classList.remove('active');
                    weatherDetails.classList.remove('active');
                    return;
                }

                container.style.height = '550px';
                error404.classList.remove('active');
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');

                const image = document.querySelector('.weather-box img');
                const temperature = document.querySelector('.weather-box .temperature');
                const description = document.querySelector('.weather-box .description');
                const humidity = document.querySelector('.weather-details .humidity span');
                const wind = document.querySelector('.weather-details .wind span');

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = '/images/clear.jpg';
                        break;
                    case 'Rain':
                        image.src = '/images/rain.jpg';
                        break;
                    case 'Clouds':
                        image.src = '/images/cloud.jpg';
                        break;
                    case 'Snow':
                        image.src = '/images/snow.jpg';
                        break;
                    case 'Haze':
                    case 'Mist':
                        image.src = '/images/wind.jpg';
                        break;
                    default:
                        image.src = '/images/cloud.jpg';
                }

                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
            }).catch(error => {
                console.error('Error fetching weather data:', error);
            });
        });