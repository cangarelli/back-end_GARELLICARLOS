const { Command } = require ("commander")

const program = new Command ()

program
    .option("--mode <mode>", "modo de manejo de entornos", "development")
    .parse()

module.exports = {
    program
}