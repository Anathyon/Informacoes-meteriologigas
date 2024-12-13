export const relogio = (p_lo_hrs: HTMLElement) => {
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    const dias_sema = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]
    
    const content_d_m_a = document.createElement("section")
    const s_hr = document.createElement("section")
    const s_min = document.createElement("section")
    const s_seg = document.createElement("section")
    
    s_hr.classList.add("relogio")
    s_hr.setAttribute("id","hora")
    s_min.classList.add("relogio")
    s_seg.classList.add("relogio")
    content_d_m_a.setAttribute("id", "calendario")

    const arelogio = () => {
        const tempo = new Date()
        const formatarNumero = (num: number) => (num < 10 ? "0" + num : num.toString())
        
        s_hr.textContent = formatarNumero(tempo.getHours())
        s_min.textContent = formatarNumero(tempo.getMinutes())
        s_seg.textContent = formatarNumero(tempo.getSeconds())
        content_d_m_a.textContent = `${dias_sema[tempo.getDay()]}, ${tempo.getDate()} de ${meses[tempo.getMonth()]} de ${tempo.getFullYear()}`

        p_lo_hrs.append(s_hr, s_min, s_seg, content_d_m_a)
        
        setTimeout(arelogio, 1000)
    }

    arelogio()
}

export const atualizartema = () => {
    const body = document.querySelector('body') as HTMLBodyElement
    const imgDiv = document.querySelector('#img') as HTMLDivElement

    const atualizar = () => {
        const now = new Date()
        const hour = now.getHours()

        body.className = hour >= 6 && hour < 12 ? 'manha' :
                         hour >= 12 && hour < 18 ? 'tarde' : 'noite'

        imgDiv.style.backgroundImage = getComputedStyle(body).getPropertyValue('--bg-url')
        setTimeout(atualizar, 3600000)
    }

    atualizar()
}

export const func_dialog = () => {
    const bt_abre = document.querySelector("#abre") as HTMLButtonElement;
    const bt_fecha = document.querySelector("#fecha") as HTMLButtonElement;
    const cx_historico = document.querySelector("#cx_historico") as HTMLDialogElement;

    bt_abre.addEventListener("click", () => {
        if (!cx_historico.open) {
            cx_historico.classList.remove("hide")
            cx_historico.showModal()
            setTimeout(() => {
                cx_historico.classList.add("show")
            }, 10)
        }
    })

    bt_fecha.addEventListener("click", () => {
        if (cx_historico.open) {
            cx_historico.classList.remove("show")
            cx_historico.classList.add("hide")
            setTimeout(() => {
                cx_historico.close()
                cx_historico.classList.remove("hide")
            }, 300)
        }
    })
}
        
const armazena = document.querySelector("#armazena") as HTMLElement

export const armazena_historico = (local: string) => {
    if (!armazena) {
        console.error("O elemento com o ID 'armazena' não foi encontrado.")
        return
    }

    const historico = JSON.parse(localStorage.getItem("historico_cidades") || "[]")

    if (historico.includes(local)) {
        console.log("A cidade já está no histórico.")
        return
    }

    historico.push(local)
    localStorage.setItem("historico_cidades", JSON.stringify(historico))

    const ne_local = document.createElement("p")
    ne_local.setAttribute("class", "list_p_locais")
    ne_local.textContent = local

    ne_local.addEventListener("click", () => {
        const elementos = armazena.querySelectorAll(".list_p_locais")
        elementos.forEach((el) => el.classList.remove("selecao"))
        ne_local.classList.add("selecao")
    })

    armazena.appendChild(ne_local)
}

export const carregar_historico = () => {

    if (!armazena) {
        console.error("O elemento com o ID 'armazena' não foi encontrado.")
        return
    }
    
    const historico = JSON.parse(localStorage.getItem("historico_cidades") || "[]")

    historico.forEach((local: string) => {
        const ne_local = document.createElement("p")
        ne_local.setAttribute("class", "list_p_locais")
        ne_local.textContent = local

        ne_local.addEventListener("click", () => {
            const elementos = armazena.querySelectorAll(".list_p_locais")
            elementos.forEach((el) => el.classList.remove("selecao"))
            ne_local.classList.add("selecao")
        })
        armazena.appendChild(ne_local)
    })
}
 
 const limpa_historico = () => {
    if (armazena.textContent === "") {
        alert("O histórico está vazio!")
    }else{
        armazena.innerHTML = ""   
        localStorage.clear()
    }
}

export const limpa = () => {
    const limpa = document.querySelector("#limpa")
    limpa?.addEventListener("click",limpa_historico)
}  

export const bt_copia = () => {
    const verifica_mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const copia = document.querySelector("#copia") as HTMLButtonElement
    const suportaClipboard = !!navigator.clipboard?.writeText
    
    if (!copia) {
        console.error("O botão de copiar não foi encontrado.")
        return
    }

    copia.addEventListener("click", () => {
        if (!suportaClipboard) {
            alert("Seu navegador não suporta a funcionalidade de copiar para a área de transferência.")
            return
        }
        const elementosSelecionados = document.querySelectorAll(".list_p_locais.selecao")
        if (elementosSelecionados.length === 0) {
            alert("Nenhum elemento destacado foi encontrado para copiar.")
            return
        }
        elementosSelecionados.forEach((elemento) => {
            const text = elemento.textContent || ""
            if (text) {
                try {
                    navigator.clipboard.writeText(text)
                    if (verifica_mobile) {
                        alert("Texto copiado para a área de transferência (Mobile)!")
                    } else {
                        alert("Texto copiado para a área de transferência!")
                    }
                } catch (err) {
                    alert("Erro ao copiar o texto!")
                    console.error("Erro ao copiar o texto: ", err)
                }
            } else {
                alert("O elemento selecionado não contém texto para copiar.")
            }
        })
    })
}


export const bt_remove_selecionado = () => {
    const remo_selecionado = document.querySelector("#remo_selecionado") as HTMLButtonElement
    const armazena = document.querySelector("#armazena") as HTMLElement

    if (!remo_selecionado || !armazena) {
        console.error("Botão ou container de elementos não encontrado.")
        return
    }

    remo_selecionado.addEventListener("click", () => {
        const i_selecao = armazena.querySelectorAll(".list_p_locais.selecao")

        if (i_selecao.length === 0) {
            alert("Nenhum item está selecionado para remover.")
            return
        }
        const historico = JSON.parse(localStorage.getItem("historico_cidades") || "[]")

        i_selecao.forEach((item) => {
            const texto = item.textContent?.trim()
            const index = historico.indexOf(texto)
            if (index !== -1) {
                historico.splice(index, 1)
                localStorage.setItem("historico_cidades", JSON.stringify(historico))
            }
            armazena.removeChild(item)
        })
    })
}

const cx_historico = document.querySelector("#cx_historico") as HTMLDialogElement

cx_historico.addEventListener("keydown", (e) => {
    e.preventDefault()
    const elementos = Array.from(
        armazena.querySelectorAll<HTMLElement>(".list_p_locais")
    )

    const atual = elementos.findIndex((el) => el.classList.contains("selecao"))

    if (e.key === "ArrowDown") {
        if (atual >= 0) {
            elementos[atual].classList.remove("selecao")
        }

        const proximoIndice = atual === elementos.length - 1 ? 0 : atual + 1
        elementos[proximoIndice].classList.add("selecao")
        elementos[proximoIndice].focus()
    } else if (e.key === "ArrowUp") {
        if (atual >= 0) {
            elementos[atual].classList.remove("selecao")
        }

        const anteriorIndice = atual <= 0 ? elementos.length - 1 : atual - 1;
        elementos[anteriorIndice].classList.add("selecao")
        elementos[anteriorIndice].focus()
    } else if (e.key === "Enter") {
        const selecionados = elementos.filter((el) =>
            el.classList.contains("selecao")
        )

        if (selecionados.length > 0) {
            const suportaClipboard = !!navigator.clipboard?.writeText
            if (!suportaClipboard) {
                alert(
                    "Seu navegador não suporta a funcionalidade de copiar para a área de transferência."
                )
                return
            }

            selecionados.forEach((elemento) => {
                const texto = elemento.textContent || ""
                if (texto) {
                    try {
                        navigator.clipboard.writeText(texto);
                        const verificaMobile = /iPhone|iPad|iPod|Android/i.test(
                            navigator.userAgent
                        )
                        alert(
                            `Texto copiado para a área de transferência! ${
                                verificaMobile ? "(Mobile)" : ""
                            }`
                        )
                    } catch (err) {
                        console.error("Erro ao copiar o texto: ", err)
                        alert("Erro ao copiar o texto!")
                    }
                } else {
                    alert(
                        "O elemento selecionado não contém texto para copiar."
                    )
                }
            })
        }
    }else if (e.key === "Esc"){
        
    const bt_fecha = document.querySelector("#fecha") as HTMLButtonElement;
    const cx_historico = document.querySelector("#cx_historico") as HTMLDialogElement;


    bt_fecha.addEventListener("click", () => {
        if (cx_historico.open) {
            cx_historico.classList.remove("show")
            cx_historico.classList.add("hide")
            setTimeout(() => {
                cx_historico.close()
                cx_historico.classList.remove("hide")
            }, 300)
        }
    })


    }
})

cx_historico.addEventListener("wheel",(e)=>{
      e.preventDefault()
      const elementos = Array.from (
        armazena.querySelectorAll<HTMLElement>(".list_p_locais")
      )

      const atual = elementos.findIndex((el) => el.classList.contains("selecao"))
    
      if (e.deltaY > 0) {   
        if (atual >= 0) {
            elementos[atual].classList.remove("selecao")  
        }
      
      const proximoIndice = atual === elementos.length - 1 ? 0 : atual + 1
      elementos[proximoIndice].classList.add("selecao")
      elementos[proximoIndice].focus()
      
    }else if (e.deltaY < 0) {
        if (atual >= 0) {
            elementos[atual].classList.remove("selecao")  
        }
        
        const anteriorIndice = atual <= 0 ? elementos.length - 1 : atual - 1;
        elementos[anteriorIndice].classList.add("selecao")
        elementos[anteriorIndice].focus()

      }

})