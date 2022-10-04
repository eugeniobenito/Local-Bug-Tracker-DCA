const prompt = require('prompt-sync')({ sigint: true });
const User = require('./models/User.js')
const Table = require('cli-table');
const Colors = require('colors');
const { Topic, Comment } = require('./models/Topic.js');
const { multiLinePrompt, login, signin } = require('./utils');
const { main_menu, logged_menu, admin_logged_menu } = require('./utils.js');

let { Usuarios, Topics, Comments } = require('./utils.js') 

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
                const ask = prompt("salir (x): ");
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