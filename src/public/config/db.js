import Firebase from 'firebase'

let config = {
    apiKey: "AIzaSyBWNNUl1ub1ZjQjUG54ALhykh9AFHSzZ4s",
    authDomain: "messeji.firebaseapp.com",
    databaseURL: "https://messeji.firebaseio.com",
    projectId: "messeji",
    storageBucket: "messeji.firebaseio.com",
    messagingSenderId: "163671866124",
    appId: "1:163671866124:web:65d66f17be155b04"
}

let app = Firebase.initializeApp(config)

export const Database = app.database()
export const Auth = app.auth()