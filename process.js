import { Command } from "commander";
const program= new Command()
program
     .option('-d', 'variable para debug', false)
     .option('-p <port>', 'puerto del server', 8080)
     .option ('--mode <mode>', 'modo de trabajo de mi server', 'production')
     .option('-u <user>', 'usuario utilizando el aplicativo', 'no se ha declarado user')
     .option('-l , --letters[letters...]', 'specify letter' )

     program.parse()