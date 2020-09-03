import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// bir kullanıcının id sinden ismini almaya yarar
function getUserNameFromId(uid) {
  if (uid == auth().currentUser.uid) {
    return new Promise((resolve, reject) => {
      resolve(auth().currentUser.displayName);
    });
  } else {
    return getUser(uid)
      .get()
      .then((documentSnapshot) => {
        return documentSnapshot.data().displayName;
      });
  }
}

// bir kullanıcının yüklediği fotoğrafların dökümanlarını döndürür
function getUserImages(uid) {
  return firestore().collection("images").where("creator", "==", uid);
}

// tüm fotoğrafları yüklendikleri zamana göre sıralayıp döndürür
function getAllImages() {
  return firestore().collection("images").orderBy("timestamp", "desc");
}

// bir fotoğrafın bilgilerini (yükleyen kişi, beğenenler, ne zaman yüklendiği) içeren dökümanı döndürür
function getImageDetails(id) {
  return firestore().collection("images").doc(id);
}

// bir kullanıcının beğendiği fotoğrafların dökümanlarını döndürür
function getUserLikes(uid) {
  return firestore().collection("images").where("likes", "array-contains", uid);
}

// databaseden bir kullanıcının bilgilerini içeren dökümanı döndürür
function getUser(uid) {
  return firestore().collection("users").doc(uid);
}

// bir fotoğrafı beğenmeye yarıyor
function likeImage(id, likes) {
  getImageDetails(id).update({
    likes: [...likes, auth().currentUser.uid],
  });
}

// beğenilen bir fotoğraftaki beğeniyi kaldırmaya yarıyor
function unLikeImage(id, likes) {
  getImageDetails(id).update({
    likes: likes.filter((val) => {
      return val != auth().currentUser.uid;
    }),
  });
}

export {
  getUserNameFromId,
  getUserImages,
  getAllImages,
  getImageDetails,
  getUserLikes,
  getUser,
  likeImage,
  unLikeImage,
};
