# Timer Cycle - PWA (Progressive Web App)

## 📱 Application Web Progressive pour Android et iOS

Cette version PWA fonctionne sur **tous les appareils** : Android, iOS, ordinateur.

## ✨ Fonctionnalités

✅ **Installation native** - S'installe comme une vraie application
✅ **Fonctionne hors ligne** - Aucune connexion internet nécessaire après installation
✅ **Mode plein écran** - Expérience application native
✅ **4 boutons timer** - Chacun commence à 6 secondes, +1s par clic
✅ **Cycles continus** - Recommence automatiquement jusqu'à l'arrêt manuel
✅ **Chronomètre** - Démarre automatiquement, se réinitialise avec le bouton
✅ **Barre de progression** - Affiche la progression du timer actuel
✅ **Bip sonore** - À chaque changement de timer
✅ **Wake Lock** - Empêche la mise en veille pendant les cycles (Android)
✅ **Sauvegarde automatique** - Les timers sont sauvegardés automatiquement

## 🚀 Installation sur Android

### Méthode 1 : Chrome (Recommandé)

1. **Héberger les fichiers** :
   - Uploadez tous les fichiers sur un serveur web (GitHub Pages, Netlify, Vercel, etc.)
   - Ou utilisez un serveur local

2. **Ouvrir dans Chrome** :
   - Ouvrez Chrome sur votre Android
   - Allez sur l'URL de votre application

3. **Installer** :
   - Chrome affichera un bandeau "Ajouter à l'écran d'accueil"
   - OU appuyez sur les 3 points → "Installer l'application"
   - OU cliquez sur le bouton "Installer" dans l'application

4. **Lancez l'application** :
   - Une icône apparaît sur votre écran d'accueil
   - L'application s'ouvre en plein écran comme une app native

### Méthode 2 : Firefox, Edge, Samsung Internet

Les mêmes étapes fonctionnent avec ces navigateurs sur Android.

## 🍎 Installation sur iOS (iPhone/iPad)

1. **Ouvrir dans Safari** (Important : doit être Safari)
2. Appuyez sur le bouton de partage (carré avec flèche)
3. Sélectionnez "Sur l'écran d'accueil"
4. Nommez l'application et ajoutez

## 💻 Installation sur ordinateur

Fonctionne avec Chrome, Edge, Opera :
- Cliquez sur l'icône d'installation dans la barre d'adresse
- Ou Menu → "Installer Timer Cycle"

## 🌐 Hébergement rapide

### Option 1 : GitHub Pages (Gratuit)

```bash
1. Créez un repo GitHub
2. Uploadez tous les fichiers
3. Allez dans Settings → Pages
4. Activez GitHub Pages
5. Votre URL : https://votre-nom.github.io/timer-cycle/
```

### Option 2 : Netlify (Gratuit)

```bash
1. Glissez-déposez le dossier sur netlify.com
2. Netlify génère une URL automatiquement
```

### Option 3 : Serveur local (Pour tester)

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx serve

# Puis ouvrez : http://localhost:8000
```

## 📂 Structure des fichiers

```
timer-pwa/
├── index.html          # Page principale
├── manifest.json       # Configuration PWA
├── sw.js              # Service Worker (mode hors ligne)
├── app.js             # Logique de l'application
├── style.css          # Styles optimisés mobile
├── icon-192.png       # Icône 192x192
├── icon-512.png       # Icône 512x512
├── screenshot.png     # Capture d'écran
└── README.md          # Ce fichier
```

## 🔧 Fonctionnalités techniques

- **Service Worker** : Cache tous les fichiers pour le mode hors ligne
- **Web Audio API** : Sons natifs sans dépendances
- **Wake Lock API** : Empêche la mise en veille (Android uniquement)
- **LocalStorage** : Sauvegarde automatique de l'état
- **Responsive Design** : S'adapte à toutes les tailles d'écran
- **Touch-optimized** : Gestes tactiles optimisés

## 🎯 Utilisation

1. **Configurer** : Cliquez sur chaque timer pour augmenter sa durée
2. **Démarrer** : Le cycle parcourt les 4 timers séquentiellement
3. **Cycles continus** : Recommence automatiquement après le Timer 4
4. **Chronomètre** : Suit le temps total depuis l'ouverture
5. **Arrêter** : Interrompt les cycles
6. **Réinitialiser** : Remet tout à zéro et redémarre le chronomètre

## 🛠️ Dépannage

**L'application ne s'installe pas** :
- Vérifiez que vous utilisez HTTPS (ou localhost)
- Utilisez Chrome/Edge sur Android
- Utilisez Safari sur iOS

**Pas de son** :
- Vérifiez le volume de votre appareil
- Le son nécessite une interaction utilisateur (cliquez sur Démarrer)

**L'écran se met en veille** :
- Wake Lock nécessite HTTPS
- Pas supporté sur tous les navigateurs

## 📱 Compatibilité

- ✅ Android 5.0+ (Chrome, Firefox, Edge, Samsung Internet)
- ✅ iOS 11.3+ (Safari)
- ✅ Windows 10+ (Chrome, Edge)
- ✅ macOS (Chrome, Edge, Safari)
- ✅ Linux (Chrome, Firefox)

## 🔒 Confidentialité

- ✅ Fonctionne 100% localement
- ✅ Aucune donnée envoyée sur internet
- ✅ Pas de cookies
- ✅ Pas de tracking
- ✅ Open source

## 📄 Licence

Libre d'utilisation personnelle et commerciale.

---

**Créé avec ❤️ pour Android et tous les appareils**
