<template>
  <div>
    <q-card class="cuaca">
      <q-card-section>
        <h1>Weather Widget</h1>
        <q-form @submit.prevent="updateWeather">
          <q-input
            v-model="city"
            placeholder="Masukkan Daerah yang Ingin Di Cek"
            outlined
            dense
            class="q-mb-md"
          />
          <q-btn type="submit" label="Search" color="primary" />
        </q-form>
      </q-card-section>
      <q-card-section v-if="weather">
        <p><strong>Lokasi:</strong> {{ weather.name }}</p>
        <p><strong>Suhu:</strong> {{ weather.main.temp }} °C</p>
        <p><strong>Cuaca:</strong> {{ weather.weather[0].description }}</p>
        <p v-if="uvIndex"><strong>UV Index:</strong> {{ uvIndex.level }}</p>
        <ul v-if="uvIndex">
          <li v-for="(recommendation, index) in uvIndex.recommendations" :key="index">
            {{ recommendation }}
          </li>
        </ul>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'WeatherWidget',
  data() {
    return {
      weather: null,
      city: localStorage.getItem('weather_city') || '',
      API_KEY: '2766fa1365c6f76bffbb56c65dca0377',
      BASE_URL: 'https://api.openweathermap.org/data/2.5/weather',
      UNITS: 'metric',
      uvIndex: null
    };
  },
  methods: {
    async fetchWeather() {
      if (!this.city) return;
      try {
        const response = await fetch(`${this.BASE_URL}?q=${this.city}&units=${this.UNITS}&appid=${this.API_KEY}`);
        const data = await response.json();
        this.weather = data;
        this.updateBackground(this.weather.main.temp);
        this.calculateUVIndex(this.weather.main.temp);
        localStorage.setItem('weather_city', this.city);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    },
    updateWeather() {
      this.fetchWeather();
    },
    updateBackground(temp) {
      const body = document.body;
      body.classList.remove('cold-weather', 'cool-weather', 'warm-weather', 'hot-weather');

      if (temp <= 0) {
        body.classList.add('cold-weather');
      } else if (temp > 0 && temp <= 20) {
        body.classList.add('cool-weather');
      } else if (temp > 20 && temp <= 30) {
        body.classList.add('warm-weather');
      } else {
        body.classList.add('hot-weather');
      }
    },
    calculateUVIndex(temp) {
      if (temp >= 10 && temp <= 20) {
        this.uvIndex = {
          level: 'Rendah (0-2)',
          recommendations: [
            'Tingkat bahaya rendah bagi orang banyak.',
            'Kenakan kacamata hitam pada hari yang cerah.',
            'Gunakan cairan pelembab tabir surya SPF 30+ bagi kulit sensitif.',
            'Permukaan yang cerah, seperti pasir, air, dan salju, akan meningkatkan paparan UV.'
          ]
        };
      } else if (temp > 20 && temp <= 25) {
        this.uvIndex = {
          level: 'Sedang (3-5)',
          recommendations: [
            'Tingkat bahaya sedang bagi orang yang terpapar matahari tanpa pelindung.',
            'Tetap di tempat teduh pada saat matahari terik siang hari.',
            'Kenakan pakaian pelindung matahari, topi lebar, dan kacamata hitam yang menghalangi sinar UV, pada saat berada di luar ruangan.',
            'Oleskan cairan pelembab tabir surya SPF 30+ setiap 2 jam bahkan pada hari berawan, setelah berenang atau berkeringat.',
            'Permukaan yang cerah, seperti pasir, air, dan salju, akan meningkatkan paparan UV.'
          ]
        };
      } else if (temp > 25 && temp <= 30) {
        this.uvIndex = {
          level: 'Tinggi (6-7)',
          recommendations: [
            'Tingkat bahaya tinggi bagi orang yang terpapar matahari tanpa pelindung, diperlukan tindakan pencegahan untuk menghindari kerusakan mata dan kulit.',
            'Kurangi waktu di bawah paparan matahari antara pukul 10 pagi hingga pukul 4 sore.',
            'Tetap di tempat teduh pada saat matahari terik siang hari.',
            'Kenakan pakaian pelindung matahari, topi lebar, dan kacamata hitam yang menghalangi sinar UV, pada saat berada di luar ruangan.',
            'Oleskan cairan pelembab tabir surya SPF 30+ setiap 2 jam bahkan pada hari berawan, setelah berenang atau berkeringat.',
            'Permukaan yang cerah, seperti pasir, air, dan salju, akan meningkatkan paparan UV.'
          ]
        };
      } else if (temp > 30 && temp <= 35) {
        this.uvIndex = {
          level: 'Sangat Tinggi (8-10)',
          recommendations: [
            'Tingkat bahaya tinggi bagi orang yang terpapar matahari tanpa pelindung, diperlukan tindakan pencegahan untuk menghindari kerusakan mata dan kulit.',
            'Kurangi waktu di bawah paparan matahari antara pukul 10 pagi hingga pukul 4 sore.',
            'Tetap di tempat teduh pada saat matahari terik siang hari.',
            'Kenakan pakaian pelindung matahari, topi lebar, dan kacamata hitam yang menghalangi sinar UV, pada saat berada di luar ruangan.',
            'Oleskan cairan pelembab tabir surya SPF 30+ setiap 2 jam bahkan pada hari berawan, setelah berenang atau berkeringat.',
            'Permukaan yang cerah, seperti pasir, air, dan salju, akan meningkatkan paparan UV.'
          ]
        };
      } else if (temp > 35) {
        this.uvIndex = {
          level: 'Ekstrem (11+)',
          recommendations: [
            'Tingkat bahaya ekstrem bagi orang yang terpapar matahari tanpa pelindung, diperlukan semua tindakan pencegahan karena kulit dan mata dapat rusak dengan cepat dan dalam hitungan menit.',
            'Hindari paparan matahari antara pukul 10 pagi hingga pukul 4 sore.',
            'Tetap di tempat teduh pada saat matahari terik siang hari.',
            'Kenakan pakaian pelindung matahari, topi lebar, dan kacamata hitam yang menghalangi sinar UV, pada saat berada di luar ruangan.',
            'Oleskan cairan pelembab tabir surya SPF 30+ setiap 2 jam bahkan pada hari berawan, setelah berenang atau berkeringat.',
            'Permukaan yang cerah, seperti pasir, air, dan salju, akan meningkatkan paparan UV.'
          ]
        };
      } else {
        this.uvIndex = null;
      }
    }
  },
  mounted() {
    this.fetchWeather();
  }
};
</script>


<style scoped>
.cuaca {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 26px;
  color: white;
  padding: 16px;
  margin: 50px auto; 
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.7;
  text-shadow: 1px 1px 2px black;
  background-color: rgba(0, 0, 0, 0.5);
  width: 500px;
}

h1 {
  font-size: 24px;
  text-align: center;
  text-shadow: 1px 1px 2px black;
}

form {
  margin-bottom: 16px;
  text-align: center;
  text-shadow: 1px 1px 2px black;
}

.q-input {
  padding: 8px;
  margin-right: 8px;
  border: 1px solid #ccc;
  border-radius: 10px;
  color: white; 
  background-color: transparent; 
  text-shadow: 1px 1px 2px black;
}

.q-mb-md {
  margin-bottom: 16px; 
  color: white;
  background-color: white;
  text-shadow: 1px 1px 2px black;
}

.q-btn {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-shadow: 1px 1px 2px black;
}

.q-btn:hover {
  background-color: #0056b3;
  text-shadow: 1px 1px 2px black;
}

ul {
  margin-top: 8px;
  text-shadow: 1px 1px 2px black;
}

li {
  margin-bottom: 4px;
  text-shadow: 1px 1px 2px black;
}

.card-section {
  margin-top: 16px;
  text-shadow: 1px 1px 2px black;
}
</style>
