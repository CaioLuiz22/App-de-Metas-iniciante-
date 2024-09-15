## Arrays

Métodos de array: push(append), [find, forEach, filter, map] : HOF (Higher Order Functions, funções que rodam funções)

## Fases da resolução de problemas

Coletar os dados
Processar os dados(manipular, alterar, ...)
Apresentar os dados

## Estrutura de repetição

const start = () => {
    let count = 1
    while(count <= 10) {
        console.log(count)
        count++
    }
}

## Condicional if/else

if(meta.length == 0) {
        console.log("A meta não pode ser vazia")
        return
    }


## Condicional switch

const start = () => {

    while(true) {
        let opcao = "sair"
        switch(opcao) {
            case "cadastrar":
                console.log("vamos cadastrar")
                break
            case "listar":
                console.log("vamos listar")
                break
            case "sair":
                return
        }
    }
}

start()

## Módulos em JS

- Importação de módulos (require, CommonJS)
- Biblioteca 'inquirer' para criar prompts interativos
    const { select } = require('@inquirer/prompts')

const { select } = require('@inquirer/prompts')
# Esta constante esta pedindo da biblioteca require uma funcao de prompts chamada select

const start = async () => {
# Aqui, a funcao precisa ser async porque ela precisa retornar uma promise, que pode ser utilizada por um await ou .then

    while(true) {
        
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })



        switch(opcao) {
            case "cadastrar":
                console.log("vamos cadastrar")
                break
            case "listar":
                console.log("vamos listar")
                break
            case "sair":
                console.log("Até a próxima!")
                return
        }
    }
}

## Funções assíncronas e promises

Promise vem de promessa, uma promessa de que o usuario vai escolher algo, ou seja, com o await, o programa sabe que precisa esperar por algo

Síncrona - direta, programa executa linha por linha sem parar
Assíncrona - idem, porém, pode parar para receber uma informação