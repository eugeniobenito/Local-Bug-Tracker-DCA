const prompt = require('prompt-sync')({ sigint: true });
const User = require('./models/User.js')
const { Topic, Comment } = require('./models/Topic.js');

const Usuarios = [new User("admin", "admin"), new User("carlos97", "1234")];
const Comments = [new Comment(Usuarios[0], "Mensajeee"), new Comment(Usuarios[0], "Te callas la bocazaaaa payaso enenosdibvaudf aiusbasiub aisuhasih auais")];
const Topics = [new Topic("No funciona esto", "v1.0.0", Comments, Usuarios[0]), new Topic("Que es esto", "v2.0.0", [], Usuarios[0])];
Usuarios[0].setRol("admin");

const main_menu = "-------------------------------------\n 1. Iniciar sesión\n 2. Registrarse\n Opción: ";
const logged_menu = "> Selecciona un topic (Option) | Añadir un topic (0) | Salir (x): ";
const admin_logged_menu = "> Selecciona un topic (Option) | Salir (x): ";


const multiLinePrompt = ask => {
    const lines = ask.split(/\r?\n/);
    const promptLine = lines.pop();
    console.log(lines.join('\n'));
    return prompt(promptLine);
};

const login = () => {
    console.log("-------------------------------------LOGIN");
    const user_name = prompt("Usuario: ");
    const user_password = prompt("Contraseña: ");

    const first = Usuarios.find((user) => {
        return user.name === user_name && user.password === user_password;
    });

    return first;
}

const signin = () => {
    console.log("-------------------------------------SIGN IN");
    const user_name = prompt("Usuario: ");
    const user_password = prompt("Contraseña: ");

    const first = Usuarios.find((user) => {
        return user.name === user_name && user.password === user_password;
    });

    if (!first) {
        Usuarios.push(new User(user_name, user_password));
    }
}


module.exports = { multiLinePrompt, login, signin, Usuarios, Topics, Comments,
                    main_menu, logged_menu, admin_logged_menu, };