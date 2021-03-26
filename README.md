# N-BAH

L'objectif est simple: Un CRUD fullstack permettant à plusieurs participants de stocker leurs scores! .

## 1. Data

```
User {
  id: number,
  username: string,
  password: string
}

Score {
  id: number
  userId: number
  point: number
  date: Date
}
```

## 2. Les étapes

### 2.1. Authentification

Je saisis un `username`et un `password` dans le formulaire, si le `username` n'existe pas en DB, je crée un nouvel utilisateur avec les données saisies. Si le `username` existe déjà en DB, je vérifie que le `password` saisi est le bon, dans le cas contraire => erreur ! Si les informations sont valides, je redirige mon utilisateur vers la page `/scores?token={myJWTToken}`

### 2.2 CRUD

#### 2.2.1 Un utilisateur peut créer de nouveau score

#### 2.2.2 Un utilisateur peut visionner la liste des scores de tout les utilisateurs sans restrictions

#### 2.2.3 Un utilisateur peut modifier / supprimer uniquement ses propres scores

### 2.3 Statistiques

#### 2.3.1 Afficher le score moyen des joueurs à une date donnée (input type="date")

#### 2.3.3 Répartition des 5 plus gros joueurs (diagramme / liste)

### 2.4 Docker

#### 2.4.1 Côté BACK : dockeriser API et DB

#### 2.4.2 Côté FRONT : dockeriser le client

### Petit bonus : l'interface n'est pas très belle, tu as carte blanche !

![Steps](https://i.imgur.com/Oi1QDgI.png)
