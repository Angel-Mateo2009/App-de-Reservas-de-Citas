const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.notificarNuevaCita = functions.firestore
.document("artifacts/{appId}/public/data/citas/{citaId}")
.onCreate(async (snap, context) => {

    const data = snap.data();

    const payload = {
        notification: {
            title: "Nueva cita en TEO MOTORS",
            body: `${data.nombre} agendó para ${data.fecha} a las ${data.hora}`,
            icon: "icono.png"
        }
    };

    const token = "cv0T8hQ9gbZCE2cDKaBwNC:APA91bE63_rc6EF6HlzbqUv4LMnwUSb2C9ss5HaS9pA2oeB0puX5s9QgDeyy34xNwyrVnVSLyJ3eYIdyBQUqZ7aBoGzRRJ4NXvgcRVqz2-zl3qWeY0cYflM";

    return admin.messaging().sendToDevice(token, payload);

});