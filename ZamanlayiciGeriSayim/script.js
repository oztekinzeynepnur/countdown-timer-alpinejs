function countdown() {
    return {
        minutes: 0,
        seconds: 0,
        timeLeft: 0,
        timer: null,
        isRunning: false,
        status: '',
        currentTheme: 'default',
        isFullscreen: false,
        soundEnabled: true,

        init() {
            // Tema tercihini localStorage'dan al
            const savedTheme = localStorage.getItem('timerTheme');
            if (savedTheme) {
                this.setTheme(savedTheme);
            }
            
            // Ses tercihini localStorage'dan al
            const savedSound = localStorage.getItem('timerSound');
            if (savedSound !== null) {
                this.soundEnabled = savedSound === 'true';
            }
        },

        startTimer() {
            this.timeLeft = this.minutes * 60 + this.seconds;
            if (this.timeLeft <= 0) {
                this.status = 'Lütfen süre girin!';
                return;
            }
            this.isRunning = true;
            this.status = 'Çalışıyor...';
            this.timer = setInterval(() => {
                if (this.timeLeft > 0) {
                    this.timeLeft--;
                } else {
                    this.stopTimer();
                    this.status = 'Süre doldu!';
                    if (this.soundEnabled) {
                        document.getElementById('alertSound').play();
                    }
                }
            }, 1000);
        },

        stopTimer() {
            clearInterval(this.timer);
            this.isRunning = false;
            this.status = 'Durduruldu';
        },

        resetTimer() {
            clearInterval(this.timer);
            this.isRunning = false;
            this.timeLeft = 0;
            this.minutes = 0;
            this.seconds = 0;
            this.status = '';
        },

        formatTime(t) {
            const m = String(Math.floor(t / 60)).padStart(2, '0');
            const s = String(t % 60).padStart(2, '0');
            return `${m}:${s}`;
        },

        setTheme(theme) {
            this.currentTheme = theme;
            document.body.className = theme;
            localStorage.setItem('timerTheme', theme);
        },

        toggleFullscreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                this.isFullscreen = true;
            } else {
                document.exitFullscreen();
                this.isFullscreen = false;
            }
        },

        setPresetTime(minutes) {
            this.minutes = minutes;
            this.seconds = 0;
            this.timeLeft = minutes * 60;
        }
    }
} 