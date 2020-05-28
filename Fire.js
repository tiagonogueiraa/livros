import firebaseKeys from "./firebaseConnection"

import firebase from 'firebase'

class Fire {
    constructor(){
        firebase.initializeApp(firebaseKeys)
    }

    addPost = async ({ text, localUri }) => {
        const remoteUri = await this.uploadPhotoAsync(localUri, `photos/${this.uid}/${Date.now()}`)

        return new Promise((res, rej) => {
            this.firestore
            .collection("posts")
            .add({
                text,
                uid: this.uid,
                timestamp: this.timestamp,
                image: remoteUri
            })
            .then(ref => {
                res(ref)
            })
            .catch(error => {
                rej(error)
            })
        })
    }

    addLivro = async ({ text, localUri, livro, sinopse, autor, acao }) => {
        const remoteUri = await this.uploadPhotoAsyncLivro(localUri, `livros/${this.uid}/${Date.now()}`)

        return new Promise((res, rej) => {
            this.firestore
            .collection("livros")
            .add({
                text,
                uid: this.uid,
                timestamp: this.timestamp,
                image: remoteUri,
                livro: livro,
                sinopse: sinopse,
                autor: autor,
                acao: acao
            })
            .then(ref => {
                res(ref)
            })
            .catch(error => {
                rej(error)
            })
        })
    }

    uploadPhotoAsync = async (uri, filename) => {
        // const path = `photos/${this.uid}/${Date.now()}.jpg`
        const path = 'photos/${this.uid}/${Date.now()}.jpg'

        return new Promise(async(res, rej) => {
            const response = await fetch(uri)
            const file = await response.blob()

            let upload = firebase
            .storage()
            .ref(filename)
            .put(file)

            upload.on(
                "state_changed",
                snapshot => {},
                err => {
                    rej (err)
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL()
                    res(url)
                }
            )

        })
    }

    uploadPhotoAsyncLivro = async (uri, filename) => {
        // const path = `photos/${this.uid}/${Date.now()}.jpg`
        const path = 'livros/${this.uid}/${Date.now()}.jpg'

        return new Promise(async(res, rej) => {
            const response = await fetch(uri)
            const file = await response.blob()

            let upload = firebase
            .storage()
            .ref(filename)
            .put(file)

            upload.on(
                "state_changed",
                snapshot => {},
                err => {
                    rej (err)
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL()
                    res(url)
                }
            )

        })
    }

    //create user
    createUser = async user => {
        let remoteUri = null
    
        try {
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)

            let db = this.firestore.collection("users").doc(this.uid)

            db.set({
                name: user.name,
                email: user.email,
                avatar: null
            })

            if(user.avatar){
                remoteUri = await this.uploadPhotoAsync(user.avatar, `avatars/${this.uid}`)

                db.set({avatar: remoteUri}, {merge: true})
            }
        } catch (error) {
            alert("Error: ", error);
        }
    }

    signOut = () => {
        firebase.auth().signOut();
    }
    get firestore() {
        return firebase.firestore()
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }

    get timestamp(){
        return Date.now()
    }

    //funcoes RegisterScreen

    
//   addPhotoPerfil = async ({ localUri }) => {

//     const remoteUri = await this.uploadPhotoAsyncPerfil(localUri)

//     return new Promise((res, rej) => {
//       this.firestore
//       .collection("perfil")
//       .add({        
//         uid: this.uid,
//         timestamp: this.timestamp,
//         image: remoteUri
//       })
//       .then(ref => {
//         res(ref)
//       })
//       .catch(error => {
//         rej(error)
//       })
//     })
//   }

//   uploadPhotoAsyncPerfil = async uri => {
//     const path = 'photosperfil/${this.uid}/${Date.now()}.jpg'

//     return new Promise(async(res, rej) => {
//       const response = await fetch(uri)
//       const file = await response.blob()

//       let upload = firebase
//       .storage()
//       .ref(path)
//       .put(file)

//       upload.on(
//         "state_changed",
//         snapshot => {},
//         err => {
//           rej (err)
//         },
//         async() => {
//           const url = await upload.snapshot.ref.getDownloadURL()
//           res(uri)
//         }
//       )
//     })
//   }


// addPhotoPerfil = async ({ localUri }) => {
//     const remoteUri = await this.uploadPhotoAsyncPerfil(localUri)

//     console.log('chegou na funcao addfotoperfil')

//     return new Promise((res, rej) => {
//         this.firestore
//         .collection("perfil")
//         .add({
            
//             uid: this.uid,
//             timestamp: this.timestamp,
//             image: remoteUri
//         })
//         .then(ref => {
//             res(ref)
//         })
//         .catch(error => {
//             rej(error)
//         })
//     })
// }

// uploadPhotoAsyncPerfil = async uri => {
//     // const path = `photos/${this.uid}/${Date.now()}.jpg`
//     const path = 'photosPerfil/${this.uid}/${Date.now()}.jpg'

//     return new Promise(async(res, rej) => {
//         const response = await fetch(uri)
//         const file = await response.blob()

//         let upload = firebase
//         .storage()
//         .ref(path)
//         .put(file)

//         upload.on(
//             "state_changed",
//             snapshot => {},
//             err => {
//                 rej (err)
//             },
//             async () => {
//                 const url = await upload.snapshot.ref.getDownloadURL()
//                 res(url)
//             }
//         )

//     })
// }

}

Fire.shared = new Fire()
export default Fire;
