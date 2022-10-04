const prompt = require('prompt-sync')({ sigint: true });
const User = require('./models/User.js')
const Table = require('cli-table');
const Colors = require('colors');
const { Topic, Comment } = require('./models/Topic.js');
const { multiLinePrompt } = require('./utils');

/*
const multiLinePrompt = ask => {
    const lines = ask.split(/\r?\n/);
    const promptLine = lines.pop();
    console.log(lines.join('\n'));
    return prompt(promptLine);
};*/

let Usuarios = [new User("admin", "admin"), new User("carlos97", "1234")];
Usuarios[0].setRol("admin");

let Comments = [new Comment(Usuarios[0], "Mensajeee"), new Comment(Usuarios[0], "Te callas la bocazaaaa payaso enenosdibvaudf aiusbasiub aisuhasih auais")];
let Topics = [new Topic("No funciona esto", "v1.0.0", Comments, Usuarios[0]), new Topic("Que es esto", "v2.0.0", [], Usuarios[0])];

const main_menu = "-------------------------------------\n 1. Iniciar sesión\n 2. Registrarse\n Opción: ";
logged_menu = "> Selecciona un topic (Option) | Añadir un topic (0) | Salir (x): ";
admin_logged_menu = "> Selecciona un topic (Option) | Salir (x): ";

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

const sub_menu = (usuario) => {

    do {
        console.clear();
        var table = new Table({ head: ["Versión", "Topic", "State", "Posted by", "Option"] });
        for (var i = 0; i < Topics.length; i++) {
            var state = (Topics[i].state == "open") ? 'open'.green : 'closed'.red;
            table.push([Topics[i].version, Topics[i].name, state, Topics[i].user.name, i + 1]);
        }
        console.log(table.toString());
        var menu = (usuario.rol == 'admin') ? admin_logged_menu : logged_menu;
        var option = prompt(menu);

        if (option > 0 && option < Topics.length + 1) {
            var state = (Topics[option - 1].state == "open") ? 'open'.green : 'closed'.red;
            console.log(Topics[option - 1].name.bold + " " + state);
            var table = new Table({ chars: { 'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' } });
            for (comment of Topics[option - 1].comments) {
                const name = (comment.user.rol == "admin") ? comment.user.name.yellow.underline : comment.user.name.blue.underline
                table.push([name, comment.message]);
            }
            console.log(table.toString());

            if (Topics[option - 1].state == 'open') {
                const ask = prompt("¿Responder? [y/N]: ");

                if (ask == 'y') {
                    const response = prompt("> ");
                    Topics[option - 1].addComment(new Comment(usuario, response));
                }

                if (usuario.rol == 'admin') {
                    const close = prompt("¿Cerrar topic? [y/N]: ");

                    if (close == 'y') {
                        Topics[option - 1].switchState();
                    }
                }
            }
            else if (usuario.rol == 'admin') {
                const close = prompt("¿Abrir topic? [y/N]: ");

                if (close == 'y') {
                    Topics[option - 1].switchState();
                }
            }
            else { 
                const ask = prompt("salir (0): ");
            }
        }
        else if (Number(option) == 0 && usuario.rol == 'client') {
            const topic_version = prompt("Versión del software (vMAJOR.MINOR.PATCH): ");
            const topic_name = prompt("Título del topic: ");
            Topics.push(new Topic(topic_name, topic_version, [], usuario));
        }
        else if (option == 'x') {
            break;
        }
    } while (option != 'x');
}

do {
    var option = multiLinePrompt(main_menu);

    if (Number(option) == 1) {
        const user = login();

        if (user) {
            sub_menu(user);
        }
        else {
            console.log("No existe este usuario");
        }

    }
    else if (Number(option) == 2) {
        signin();
        console.clear();
    }

} while (Number(option) != 0);