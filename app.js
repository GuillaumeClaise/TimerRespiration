// Variables pour les timers (en secondes)
let timers = [5, 5, 5, 5];
let isRunning = false;
let currentTimerIndex = 0;
let currentSeconds = 0;
let intervalId = null;

// Variables pour le chronomètre
let chronoStartTime = null;
let chronoElapsed = 0;
let chronoIntervalId = null;

// Contexte audio
let audioContext = null;

// Couleurs pour chaque timer
const timerColors = ['#22c55e', '#3b82f6', '#f97316', '#a855f7'];
// Timer 1: Vert, Timer 2: Bleu, Timer 3: Orange, Timer 4: Violet

// Fonction pour générer un favicon avec une couleur spécifique
function generateFavicon(color) {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  // Fond coloré
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 64, 64);

  // Cercle blanc
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(32, 32, 20, 0, Math.PI * 2);
  ctx.fill();

  // Cercle jaune au centre
  ctx.fillStyle = '#ffd700';
  ctx.beginPath();
  ctx.arc(32, 32, 12, 0, Math.PI * 2);
  ctx.fill();

  return canvas.toDataURL('image/png');
}

// Fonction pour changer l'icône et la couleur de l'onglet du navigateur
function updateThemeColor(timerIndex) {
  if (timerIndex >= 0 && timerIndex < 4) {
    const color = timerColors[timerIndex];

    // Changer la couleur du thème (pour mobile)
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', color);
    }

    // Changer le favicon (pour desktop et mobile)
    const faviconUrl = generateFavicon(color);
    let favicon = document.querySelector('link[rel="icon"]');

    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      document.head.appendChild(favicon);
    }

    favicon.href = faviconUrl;
  }
}

// Initialiser le contexte audio (nécessaire pour certains navigateurs mobiles)
function initAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  // Reprendre le contexte s'il est suspendu (requis par certains navigateurs)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
}

// Fonction pour émettre un bip
function playBeep() {
  initAudioContext();
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 800; // Fréquence du bip
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.2);
}

// Empêcher la mise en veille de l'écran (pour Android)
let wakeLock = null;

async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator) {
      wakeLock = await navigator.wakeLock.request('screen');
      console.log('Wake Lock activé');
    }
  } catch (err) {
    console.log('Wake Lock non supporté:', err);
  }
}

function releaseWakeLock() {
  if (wakeLock !== null) {
    wakeLock.release();
    wakeLock = null;
    console.log('Wake Lock désactivé');
  }
}

// Mettre à jour l'affichage des timers
function updateDisplay() {
  for (let i = 0; i < 4; i++) {
    document.getElementById(`time${i + 1}`).textContent = timers[i];
  }
}

// Mettre à jour le statut
function updateStatus(text) {
  document.getElementById('statusText').textContent = text;
}

// Mettre à jour la barre de progression (progression du timer actuel uniquement)
function updateProgress() {
  if (currentTimerIndex < 4 && timers[currentTimerIndex] > 0) {
    const progress = (currentSeconds / timers[currentTimerIndex]) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
  } else {
    document.getElementById('progressFill').style.width = '0%';
  }
}

// Formater le temps du chronomètre en HH:MM:SS
function formatChronoTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Démarrer le chronomètre
function startChronometer() {
  if (chronoIntervalId !== null) return;
  
  chronoStartTime = Date.now() - (chronoElapsed * 1000);
  
  chronoIntervalId = setInterval(() => {
    chronoElapsed = Math.floor((Date.now() - chronoStartTime) / 1000);
    document.getElementById('chronoDisplay').textContent = formatChronoTime(chronoElapsed);
  }, 1000);
}

// Arrêter le chronomètre
function stopChronometer() {
  if (chronoIntervalId !== null) {
    clearInterval(chronoIntervalId);
    chronoIntervalId = null;
  }
}

// Réinitialiser le chronomètre
function resetChronometer() {
  stopChronometer();
  chronoElapsed = 0;
  chronoStartTime = null;
  document.getElementById('chronoDisplay').textContent = '00:00:00';
  startChronometer(); // Redémarrer immédiatement
}

// Réinitialiser les boutons actifs
function resetActiveButtons() {
  document.querySelectorAll('.button-row').forEach(row => {
    row.classList.remove('active');
  });
}

// Démarrer le cycle
function startCycle() {
  if (isRunning) return;
  
  // Initialiser le contexte audio au premier démarrage
  initAudioContext();
  
  isRunning = true;
  currentTimerIndex = 0;
  currentSeconds = 0;
  
  document.getElementById('startCycle').disabled = true;
  document.getElementById('stopCycle').disabled = false;
  
  resetActiveButtons();
  document.querySelectorAll('.button-row')[currentTimerIndex].classList.add('active');

  updateStatus(`Timer ${currentTimerIndex + 1} - ${currentSeconds}/${timers[currentTimerIndex]}s`);
  updateProgress();
  updateThemeColor(currentTimerIndex); // Changer la couleur de l'onglet

  playBeep(); // Bip au début
  requestWakeLock(); // Empêcher la mise en veille
  
  intervalId = setInterval(() => {
    currentSeconds++;
    
    updateStatus(`Timer ${currentTimerIndex + 1} - ${currentSeconds}/${timers[currentTimerIndex]}s`);
    updateProgress();
    
    // Vérifier si le timer actuel est terminé
    if (currentSeconds >= timers[currentTimerIndex]) {
      currentTimerIndex++;
      currentSeconds = 0;
      
      // Vérifier si tous les timers sont terminés
      if (currentTimerIndex >= 4) {
        // Redémarrer le cycle au lieu de s'arrêter
        currentTimerIndex = 0;
        playBeep(); // Bip entre les cycles
        resetActiveButtons();
        document.querySelectorAll('.button-row')[currentTimerIndex].classList.add('active');
        updateStatus(`Timer ${currentTimerIndex + 1} - ${currentSeconds}/${timers[currentTimerIndex]}s`);
        updateProgress();
        updateThemeColor(currentTimerIndex); // Changer la couleur de l'onglet
        return;
      }

      // Passer au timer suivant
      resetActiveButtons();
      document.querySelectorAll('.button-row')[currentTimerIndex].classList.add('active');
      playBeep(); // Bip à chaque changement de timer
      updateStatus(`Timer ${currentTimerIndex + 1} - ${currentSeconds}/${timers[currentTimerIndex]}s`);
      updateThemeColor(currentTimerIndex); // Changer la couleur de l'onglet
    }
  }, 1000);
}

// Arrêter le cycle
function stopCycle() {
  if (!isRunning) return;

  isRunning = false;
  clearInterval(intervalId);
  intervalId = null;

  document.getElementById('startCycle').disabled = false;
  document.getElementById('stopCycle').disabled = true;

  resetActiveButtons();
  releaseWakeLock(); // Permettre la mise en veille

  if (currentTimerIndex < 4) {
    updateStatus('Cycle arrêté');
  }

  // Réinitialiser la couleur de l'onglet et l'icône à la couleur par défaut
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', '#667eea');
  }

  // Restaurer le favicon par défaut
  const faviconUrl = generateFavicon('#667eea');
  let favicon = document.querySelector('link[rel="icon"]');
  if (favicon) {
    favicon.href = faviconUrl;
  }

  currentTimerIndex = 0;
  currentSeconds = 0;
}

// Réinitialiser tous les timers
function resetAll() {
  stopCycle();
  timers = [5, 5, 5, 5];
  updateDisplay();
  updateStatus('En attente');
  document.getElementById('progressFill').style.width = '0%';
  resetChronometer(); // Réinitialiser le chronomètre
}

// Sauvegarder l'état dans localStorage
function saveState() {
  localStorage.setItem('timers', JSON.stringify(timers));
  localStorage.setItem('chronoElapsed', chronoElapsed);
}

// Charger l'état depuis localStorage
function loadState() {
  const savedTimers = localStorage.getItem('timers');
  const savedChrono = localStorage.getItem('chronoElapsed');
  
  if (savedTimers) {
    timers = JSON.parse(savedTimers);
    updateDisplay();
  }
  
  if (savedChrono) {
    chronoElapsed = parseInt(savedChrono);
    document.getElementById('chronoDisplay').textContent = formatChronoTime(chronoElapsed);
  }
}

// Sauvegarder périodiquement
setInterval(saveState, 5000);

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  // Charger l'état sauvegardé
  loadState();
  
  // Mettre à jour l'affichage initial
  updateDisplay();
  
  // Démarrer le chronomètre dès l'ouverture
  startChronometer();
  
  // Ajouter les événements de clic pour les boutons d'incrémentation
  document.querySelectorAll('.increment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!isRunning) {
        const timerIndex = parseInt(btn.getAttribute('data-timer'));
        const incrementValue = parseInt(btn.getAttribute('data-value'));
        timers[timerIndex] += incrementValue;
        updateDisplay();
        saveState();
      }
    });
  });
  
  // Boutons de contrôle
  document.getElementById('startCycle').addEventListener('click', startCycle);
  document.getElementById('stopCycle').addEventListener('click', stopCycle);
  document.getElementById('resetAll').addEventListener('click', resetAll);
  
  // Gérer la visibilité de la page (pour Android)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      saveState();
    }
  });
});

// Sauvegarder avant de quitter
window.addEventListener('beforeunload', saveState);
