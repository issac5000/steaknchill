# Configuration n8n + Telegram pour les réservations

Guide étape par étape pour connecter le formulaire de réservation de Steak N' Chill à Telegram via n8n.

---

## 1. Créer un bot Telegram

1. Ouvrir Telegram et chercher **@BotFather**
2. Envoyer `/newbot`
3. Choisir un nom (ex : `Steak N' Chill Réservations`)
4. Choisir un username (ex : `steaknchill_resa_bot`)
5. **Copier le token** affiché (format : `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

## 2. Récupérer le Chat ID

Le Chat ID identifie la conversation (privée ou groupe) où le bot enverra les messages.

**Option A — Chat privé :**
1. Envoyer un message au bot depuis votre compte Telegram
2. Ouvrir dans le navigateur : `https://api.telegram.org/bot<VOTRE_TOKEN>/getUpdates`
3. Chercher `"chat":{"id":` dans la réponse — c'est votre Chat ID

**Option B — Groupe :**
1. Ajouter le bot au groupe
2. Envoyer un message dans le groupe
3. Ouvrir `https://api.telegram.org/bot<VOTRE_TOKEN>/getUpdates`
4. Le Chat ID du groupe commence par `-` (ex : `-1001234567890`)

## 3. Configurer les credentials dans n8n

1. Dans n8n, aller dans **Settings > Credentials**
2. Cliquer **Add Credential** > chercher **Telegram**
3. Coller le **Bot Token** obtenu à l'étape 1
4. Sauvegarder

### Variable d'environnement pour le Chat ID

Dans les variables d'environnement de n8n, ajouter :
```
TELEGRAM_CHAT_ID=votre_chat_id
```

Ou bien remplacer `{{ $env.TELEGRAM_CHAT_ID }}` par votre Chat ID directement dans le node Telegram du workflow.

## 4. Importer le workflow

1. Dans n8n, cliquer **Add Workflow** (ou le `+` en haut)
2. Cliquer sur les **3 points (...)** en haut à droite > **Import from File**
3. Sélectionner le fichier `reservation-workflow.json`
4. Dans le node **Envoyer Telegram** :
   - Sélectionner le credential Telegram créé à l'étape 3
   - Vérifier que le Chat ID est correct
5. **Activer** le workflow (toggle en haut à droite)

## 5. Configurer la variable d'environnement

### En local

Le fichier `.env.local` contient déjà un placeholder. Remplacer par l'URL réelle du webhook :

```
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://votre-instance-n8n.com/webhook/steaknchill-reservation
```

L'URL du webhook se trouve dans le node **Webhook** du workflow n8n (onglet "Production URL" une fois le workflow activé).

### Sur Vercel

```bash
npx vercel@latest env add NEXT_PUBLIC_N8N_WEBHOOK_URL
```

Coller l'URL du webhook quand demandé. Sélectionner les environnements **Production**, **Preview**, et **Development**.

Puis redéployer :
```bash
npx vercel@latest --yes --scope ashots-projects-c4d91a4b --prod
```

## 6. Test end-to-end

### Test rapide avec webhook.site
1. Aller sur [webhook.site](https://webhook.site)
2. Copier l'URL unique fournie
3. La coller dans `.env.local` comme `NEXT_PUBLIC_N8N_WEBHOOK_URL`
4. Lancer `npm run dev`, aller sur `/contact`, soumettre le formulaire
5. Vérifier sur webhook.site que le payload arrive correctement

### Test complet
1. S'assurer que le workflow n8n est **activé**
2. Mettre la vraie URL du webhook dans `.env.local`
3. Lancer `npm run dev`
4. Remplir le formulaire sur `/contact` et soumettre
5. Vérifier la réception du message Telegram

### Payload envoyé par le formulaire
```json
{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "phone": "+32 470 123 456",
  "guests": "4",
  "date": "2026-04-25",
  "message": "Anniversaire, terrasse si possible",
  "submittedAt": "2026-04-19T18:30:00.000Z"
}
```

---

## Dépannage

| Problème | Solution |
|----------|----------|
| Erreur CORS | Le workflow inclut les headers CORS. Vérifier que le node Webhook a `allowedOrigins: *` |
| Webhook ne répond pas | Vérifier que le workflow est **activé** (toggle vert en haut à droite) |
| Message Telegram non reçu | Vérifier le credential Telegram et le Chat ID |
| `URL du webhook non configurée` | La variable `NEXT_PUBLIC_N8N_WEBHOOK_URL` n'est pas définie dans `.env.local` |
