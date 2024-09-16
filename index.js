//let meta = {
//value: "ler um livro todo mes",
//    checked: false,
//    isChecked: (info) => {
//        console.log(info)
//    }
//}
//
//let metas = [
//    meta,
//    {
//        value: "caminhar 10km",
//        checked: false
//    }
//]
//
//
//
//meta.isChecked(metas[0].value)


//const start = () => {
//    let count = 1
//    while(count <= 10) {
//        console.log(count)
//        count++
//    }
//}
//
//start()

// Biblioteca
const { select, input, checkbox } = require('@inquirer/prompts')
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
const fs = require("fs").promises

let mensagem = "Bem vindo ao App de Metas";

let metas

// Carregar metas
const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados) // parse: converte json em array
    }
    catch(erro) {
        metas = []
    }
}

// Salvar metas
const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

// Cadastrar metas
const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta:"})

    // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
    if(meta.length == 0) {
        mensagem = "A meta não pode ser vazia"
        return
    }

    metas.push(
        { value: meta, checked: false}
    )

    mensagem = "Meta cadastrada com sucesso!"
}

// Listar metas
const listarMetas = async () => {
    // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
    if(metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }

    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    // biome-ignore lint/complexity/noForEach: <explanation>
    metas.forEach((m) => {
        m.checked = false
    })

    // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
    if(respostas.length == 0) {
        mensagem = "Nenhuma meta selecionada"
        return
    }

    // biome-ignore lint/complexity/noForEach: <explanation>
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = "Meta(s) marcada(s) como concluída(s)"
}

// Metas realizadas
const metasRealizadas = async () => {
    // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
    if(metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }

    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
    if(realizadas.length == 0){
        mensagem = "Não existem metas realizadas!"
        return
    }

    await select({
        // biome-ignore lint/style/useTemplate: <explanation>
        message: "Metas realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}

// Metas abertas
const metasAbertas = async () => {
    // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
    if(metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }

    const abertas = metas.filter((meta) => {
        // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
        return meta.checked != true // Invertendo o booleano
    })

    // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
    if(abertas.length == 0) {
        mensagem = "Não existem metas abertas!"
        return
    }

    await select({
        // biome-ignore lint/style/useTemplate: <explanation>
        message: "Metas Abertas: " + abertas.length,
        choices: [...abertas]
    })
}

// Deletar metas
const deletarMetas = async () => {
    // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
    if(metas.length == 0) {
        mensagem = "Não existem metas!"
        return
    }

    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })

    const itensADeletar = await checkbox({
        message: "Selecione item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
    if(itensADeletar.length == 0) {
        mensagem = "Nenhum item para deletar!"
        return
    }

    // biome-ignore lint/complexity/noForEach: <explanation>
    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
            return meta.value != item
        })
    })

    mensagem = "Meta(s) deletada(s) com sucesso!"
}

// Mostrar mensagens
const mostrarMensagem = () => {
    console.clear();

    // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
    if(mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

// App
const start = async () => {
    await carregarMetas()

    while(true) {
        mostrarMensagem()
        await salvarMetas()

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
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })


        switch(opcao) {
            case "cadastrar":
                await cadastrarMeta()
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("Até a próxima!")
                return
        }
    }
}

start()