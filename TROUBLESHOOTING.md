# 🔧 Guide de dépannage - Timer Cycle PWA sur Android

## ❌ Le site ne fonctionne pas sur Chrome Android ?

### Solution 1 : Vider le cache (90% des cas)

Sur Chrome Android :
1. Ouvrez Chrome
2. Appuyez sur les 3 points (⋮) → **Paramètres**
3. **Confidentialité et sécurité** → **Effacer les données de navigation**
4. Sélectionnez **Images et fichiers en cache**
5. Cliquez sur **Effacer les données**
6. Rechargez votre site

### Solution 2 : Forcer le rechargement

1. Dans Chrome Android, ouvrez votre site
2. Appuyez longuement sur le bouton de rechargement (🔄)
3. Sélectionnez **"Rechargement forcé"** ou **"Vider le cache et actualiser"**

### Solution 3 : Vérifier l'URL

Assurez-vous d'utiliser **HTTPS** (pas HTTP) :
```
✅ Correct : https://votre-nom.github.io/timer-cycle/
❌ Incorrect : http://votre-nom.github.io/timer-cycle/
```

### Solution 4 : Désinstaller l'ancienne version

Si vous aviez déjà installé l'app :
1. Appuyez longuement sur l'icône de l'app
2. **Désinstaller** ou **Supprimer**
3. Retournez sur le site et réinstallez

### Solution 5 : Mettre à jour Chrome

1. Ouvrez **Google Play Store**
2. Recherchez **Chrome**
3. Cliquez sur **Mettre à jour** si disponible

## 🐛 Comment voir les erreurs sur Android

### Méthode 1 : Chrome DevTools (avec câble USB)

1. **Sur votre téléphone** :
   - Allez dans **Paramètres** → **À propos du téléphone**
   - Appuyez 7 fois sur **Numéro de build**
   - Revenez → **Options pour les développeurs**
   - Activez **Débogage USB**
   - Connectez votre téléphone au PC avec un câble USB

2. **Sur votre PC** :
   - Ouvrez Chrome
   - Allez à : `chrome://inspect/#devices`
   - Attendez que votre téléphone apparaisse
   - Cliquez sur **inspect** sous votre site
   - Regardez la console pour voir les erreurs

### Méthode 2 : Console mobile Eruda (sans câble)

Ajoutez temporairement ce code dans `index.html` avant `</body>` :

```html
<script src="https://cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>
```

Cela affichera une console de débogage directement sur votre téléphone.

## ✅ Checklist de vérification

- [ ] URL en **HTTPS** (GitHub Pages le fait automatiquement)
- [ ] Cache vidé sur Chrome Android
- [ ] Chrome à jour
- [ ] Tous les fichiers uploadés sur GitHub
- [ ] GitHub Pages activé dans Settings → Pages
- [ ] Attendu 2-3 minutes après activation
- [ ] Aucune erreur 404 dans la console

## 🆘 Problèmes spécifiques

### Le site charge mais rien ne s'affiche
➡️ Vérifiez que **tous les fichiers** sont bien uploadés :
- index.html
- manifest.json
- sw.js
- app.js
- style.css
- icon-192.png
- icon-512.png
- .nojekyll

### Les boutons ne répondent pas
➡️ Problème JavaScript :
1. Ouvrez la console (méthode ci-dessus)
2. Cherchez les erreurs en rouge
3. Vérifiez que `app.js` se charge bien

### Pas de son sur Android
➡️ Le son nécessite une interaction utilisateur :
1. Assurez-vous que le volume n'est pas à zéro
2. Le premier son ne jouera qu'après avoir cliqué sur "Démarrer"
3. Certains navigateurs bloquent l'audio automatique

### L'application ne s'installe pas
➡️ Conditions requises :
- Doit être en **HTTPS**
- Doit avoir un **manifest.json** valide
- Doit avoir un **Service Worker**
- Sur iOS, utilisez **Safari** (pas Chrome)

## 📱 Tests recommandés

1. **Test de base** : Ouvrez l'URL dans Chrome Android
   - Si ça ne marche pas → Vérifiez l'URL et le cache

2. **Test d'installation** : Menu → Installer l'application
   - Si pas disponible → Vérifiez HTTPS et manifest.json

3. **Test hors ligne** : Activez le mode avion
   - L'app devrait toujours fonctionner

## 💡 Astuce : Version sans Service Worker

Si le Service Worker pose problème, vous pouvez temporairement le désactiver :

Dans `index.html`, commentez cette section :
```javascript
// Commentez temporairement ces lignes
/*
if ('serviceWorker' in navigator) {
  // ... tout le code du Service Worker
}
*/
```

L'app fonctionnera quand même (juste pas en mode hors ligne).

## 🌐 Alternatives si GitHub Pages ne fonctionne pas

1. **Netlify** : [netlify.com/drop](https://app.netlify.com/drop)
   - Glissez-déposez le dossier
   - URL générée automatiquement

2. **Vercel** : [vercel.com](https://vercel.com)
   - Importez depuis GitHub
   - Déploiement automatique

3. **Cloudflare Pages** : [pages.cloudflare.com](https://pages.cloudflare.com)
   - Connectez GitHub
   - Gratuit et ultra-rapide

## 📞 Besoin d'aide ?

Partagez ces informations :
1. L'URL exacte de votre site
2. Version d'Android
3. Version de Chrome
4. Message d'erreur (si visible dans la console)
5. Ce qui se passe exactement (écran blanc, erreur, etc.)
