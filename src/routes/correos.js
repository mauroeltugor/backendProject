const nodemailer = require("nodemailer");
// const password1="multiservicios1234"
const password = "dchg feqp grow rmes"
const correo = "parkinlocation753@gmail.com"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: correo,
    pass: password,
  },
});

async function sendConfirmationEmail(gmail) {
  try {
    await transporter.sendMail({
      from: "parkinlocation753@gmail.com",
      to: gmail,
      subject: "Confirmación de Registro",
      text: "¡Gracias por registrarte!",
      html:
        `
        <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4;">

    <div style="width: 100%; background-color: #ffffff; padding: 5rem 0;">
        <div style="max-width: 700px; background-color: #e0f7fa; margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <div style="width: 100%; background-color: #00bcd4; padding: 20px 0; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                <a href="#">
                    <img src="https://png.pngtree.com/png-clipart/20220228/original/pngtree-pin-location-with-3d-earth-globe-png-image_7326089.png" style="width: 100%; height: 70px; object-fit: contain;" alt="Logo de ParkingLocation">
                </a>
            </div>
            <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid;">
                <p style="font-weight: 800; font-size: 1.2rem; color: #1565c0; padding: 0 30px;">
                    ¡Gracias por tu suscripción a ParkingLocation!
                </p>
                <p style="padding: 0 30px; color: #333;">
                    Estimad@ Aventureros,
                    <br><br>
                    Queremos expresar nuestro sincero agradecimiento por unirte a nuestra comunidad de ParkingLocation. Estamos emocionados de tenerte con nosotros y esperamos que disfrutes de todos los beneficios que ofrece nuestro servicio.
                    <br><br>
                    Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nuestro equipo de soporte.
                    <br><br>
                    ¡Bienvenido a bordo!
                    <br><br>
                    Atentamente,
                    <br>
                    El equipo de ParkingLocation
                </p>
            </div>
        </div>
    </div>

</body>

      

      `,
    });
    console.log(`Correo de confirmación enviado ${gmail}`);
  } catch (error) {
    console.error("Error al enviar el correo de confirmación:", error);
  }
}

module.exports = sendConfirmationEmail;
