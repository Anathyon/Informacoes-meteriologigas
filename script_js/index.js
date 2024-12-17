import { relogio, atualizartema, func_dialog, armazena_historico, limpa, bt_remove_selecionado, bt_copia, carregar_historico } from './funcoes.js';
import { fetchclima, fetchunsplash, fetchCidadePorCoordenadas } from './api.js';
const p_lo_hrs = document.querySelector("#p_lo_hrs");
const weather = document.querySelector("#weather");
const input_busca = document.querySelector("#input_busca");
const bt_busca = document.querySelector("#bt_busca");
const e_cidade = document.createElement("p");
const e_temp = document.createElement("p");
const e_descri = document.createElement("p");
const e_umidade = document.createElement("p");
const e_vel_vento = document.createElement("p");
const e_sugestao = document.createElement("p");
const e_ic_descri_clima_limpo = document.createElement("img");
const e_ic_descri_clima_limpo_noite = document.createElement("img");
const e_ic_descri_clima_nublado = document.createElement("img");
const e_ic_descri_clima_chuvoso = document.createElement("img");
const e_ic_descri_clima_nevando = document.createElement("img");
const e_ic_descri_nuvens_dispersas = document.createElement("img");
const e_ic_descri_trovoadas = document.createElement("img");
const e_ic_nevoa = document.createElement("img");
const ic_umidade = document.createElement("img");
const ic_vel_vento = document.createElement("img");
const ic_ter_frio = document.createElement("img");
const ic_ter_quente = document.createElement("img");
const ic_ter_medio = document.createElement("img");
const ic_ter_chuva = document.createElement("img");
e_ic_descri_clima_limpo.src = "imagens/limpo.svg";
e_ic_descri_clima_limpo_noite.src = "imagens/cloudy-night-1.svg";
e_ic_descri_clima_nublado.src = "imagens/nublado.svg";
e_ic_descri_clima_chuvoso.src = "imagens/chuva.svg";
e_ic_descri_clima_nevando.src = "imagens/neve.svg";
e_ic_descri_nuvens_dispersas.src = "imagens/nuv_disp.svg";
e_ic_descri_trovoadas.src = "imagens/trovoadas.svg";
e_ic_nevoa.src = "imagens/nevoa.svg";
ic_umidade.src = "imagens/umidade.svg";
ic_vel_vento.src = "imagens/vel_vento.svg";
ic_ter_frio.src = "imagens/term_frio.svg";
ic_ter_quente.src = "imagens/term_quente.svg";
ic_ter_medio.src = "imagens/term_med.svg";
ic_ter_chuva.src = "imagens/term_chuva.svg";
e_ic_descri_clima_limpo.classList.add("tam_svg");
e_ic_descri_clima_limpo_noite.classList.add("tam_svg");
e_ic_descri_clima_nublado.classList.add("tam_svg");
e_ic_descri_clima_chuvoso.classList.add("tam_svg");
e_ic_descri_clima_nevando.classList.add("tam_svg");
e_ic_descri_nuvens_dispersas.classList.add("tam_svg");
e_ic_descri_trovoadas.classList.add("tam_svg");
e_ic_nevoa.classList.add("tam_svg");
ic_vel_vento.classList.add("tam_svg");
ic_umidade.classList.add("tam_svg");
ic_ter_frio.classList.add("tam_svg");
ic_ter_quente.classList.add("tam_svg");
ic_ter_medio.classList.add("tam_svg");
ic_ter_chuva.classList.add("tam_svg");
e_cidade.classList.add("tag_p_met");
e_temp.classList.add("tag_p_met");
e_descri.classList.add("tag_p_met");
e_umidade.classList.add("tag_p_met");
e_vel_vento.classList.add("tag_p_met");
e_sugestao.classList.add("tag_p_met");
relogio(p_lo_hrs);
atualizartema();
const imagem_de_fundo = async (cidade) => {
    try {
        const imagem_unsplash = await fetchunsplash(cidade);
        document.body.style.backgroundImage = `url(${imagem_unsplash})`;
    }
    catch (error) {
        console.error("Erro ao obter imagem de fundo!", error);
        atualizartema();
    }
};
const mostrar_clima = async (cidade) => {
    try {
        const weatherdata = await fetchclima(cidade);
        weather.innerHTML = "";
        const sugestao_climatica = () => {
            try {
                if (weatherdata.descricao.includes("chuva") || weatherdata.descricao.includes("chuviscos")) {
                    return "Melhor levar um guarda-chuva!";
                }
                else if (weatherdata.temperatura >= 20 && weatherdata.temperatura < 30 && weatherdata.descricao.includes("nublado")) {
                    return "Aproveite o clima, mas fique atento ao sair!";
                }
                else if (weatherdata.descricao.includes("garoa")) {
                    return "Melhor levar um guarda-chuva!";
                }
                else if (weatherdata.temperatura >= 30) {
                    return "Vista-se leve, o clima está quente!";
                }
                else if (weatherdata.temperatura >= 20 && weatherdata.temperatura < 30) {
                    return "Aproveite o clima para um passeio ao ar livre!";
                }
                else if (weatherdata.temperatura < 20 && weatherdata.temperatura > 10) {
                    return "Leve um agasalho ao sair!";
                }
                else {
                    return "Vista-se bem, está frio";
                }
            }
            catch (err) {
                console.error("Erro ao tentar fazer uma sugestão com base no clima", err);
                return null;
            }
        };
        e_cidade.textContent = `Local: ${weatherdata.cidade}`;
        e_temp.textContent = `Temperatura: ${weatherdata.temperatura}°C`;
        e_descri.textContent = `Descrição: ${weatherdata.descricao} `;
        e_umidade.textContent = `Umidade do ar: ${weatherdata.umidade}%`;
        e_vel_vento.textContent = `Velocidade do vento: ${weatherdata.vel_vento} m/s`;
        e_sugestao.textContent = sugestao_climatica();
        const dia_noite = () => {
            const hora = document.querySelector("#hora");
            const v_hora = parseInt(hora.textContent || "0", 10);
            if (v_hora >= 6 && v_hora <= 12) {
                if (weatherdata.descricao.includes("céu limpo")) {
                    return e_descri.appendChild(e_ic_descri_clima_limpo);
                }
            }
            else if (v_hora >= 12 && v_hora <= 18) {
                if (weatherdata.descricao.includes("céu limpo")) {
                    return e_descri.appendChild(e_ic_descri_clima_limpo);
                }
            }
            else {
                if (weatherdata.descricao.includes("céu limpo")) {
                    return e_descri.appendChild(e_ic_descri_clima_limpo_noite);
                }
            }
        };
        const ic_desc_clima = () => {
            dia_noite();
            if (weatherdata.descricao.includes("nublado") || weatherdata.descricao.includes("algumas nuvens")) {
                return e_descri.appendChild(e_ic_descri_clima_nublado);
            }
            else if (weatherdata.descricao.includes("neve")) {
                return e_descri.appendChild(e_ic_descri_clima_nevando);
            }
            else if (weatherdata.descricao.includes("chuva") || weatherdata.descricao.includes("garoa") || weatherdata.descricao.includes("chuviscos")) {
                return e_descri.appendChild(e_ic_descri_clima_chuvoso);
            }
            else if (weatherdata.descricao.includes("nuvens dispersas")) {
                return e_descri.appendChild(e_ic_descri_nuvens_dispersas);
            }
            else if (weatherdata.descricao.includes("névoa")) {
                return e_descri.appendChild(e_ic_nevoa);
            }
            else if (weatherdata.descricao.includes("trovoadas")) {
                return e_descri.appendChild(e_ic_descri_trovoadas);
            }
        };
        const ic_temperatura = () => {
            if (weatherdata.descricao.includes("nublado") || weatherdata.temperatura < 20 || weatherdata.descricao.includes("névoa")) {
                return e_temp.appendChild(ic_ter_chuva);
            }
            else if (weatherdata.descricao.includes("chuva") || weatherdata.descricao.includes("garoa") || weatherdata.descricao.includes("trovoadas") || weatherdata.descricao.includes("chuviscos")) {
                return e_temp.appendChild(ic_ter_chuva);
            }
            else if (weatherdata.descricao.includes("céu limpo") || weatherdata.descricao.includes("nuvens dispersas") || weatherdata.descricao.includes("algumas nuvens")) {
                return e_temp.appendChild(ic_ter_medio);
            }
            else if (weatherdata.descricao.includes("céu limpo") && weatherdata.temperatura > 30) {
                return e_temp.appendChild(ic_ter_quente);
            }
            else if (weatherdata.descricao.includes("neve")) {
                return e_temp.appendChild(ic_ter_frio);
            }
        };
        weather.append(e_cidade, e_temp, e_descri, e_umidade, e_vel_vento, e_sugestao);
        e_umidade.appendChild(ic_umidade);
        e_vel_vento.appendChild(ic_vel_vento);
        ic_desc_clima();
        ic_temperatura();
        imagem_de_fundo(cidade);
    }
    catch (error) {
        console.error("Erro ao coletar dados do clima!", error);
    }
};
navigator.geolocation.getCurrentPosition(async (position) => {
    const cidade = await fetchCidadePorCoordenadas(position.coords.latitude, position.coords.longitude);
    mostrar_clima(cidade);
}, (error) => {
    console.error("Erro ao acessar a localização do usuário:", error);
    const arry_estados_br = ["Acre", "Amapá", "Amazonas", "Pará", "Rondônia", "Roraima", "Tocantins", "Alagoas",
        "Bahia", "Ceará", "Maranhão", "Paraíba", "Pernambuco", "Piuaí", "Rio Grande do Norte", "Sergipe", "Goiás", "Mato Grosso",
        "Mato Grosso do Sul", "Distrito Federal", "Espírito Santo", "Minas Gerais", "São Paulo", "Rio de Janeiro", "Praná",
        "Rio Grande do Sul", "Santa Catarina"];
    const iterator = () => {
        const random_index = Math.floor(Math.random() * arry_estados_br.length);
        return arry_estados_br[random_index];
    };
    mostrar_clima(iterator());
});
bt_busca.addEventListener("click", (e) => {
    e.preventDefault();
    const cidade = input_busca.value.trim();
    if (cidade) {
        mostrar_clima(cidade);
        input_busca.value = "";
        imagem_de_fundo(cidade);
        armazena_historico(cidade);
    }
    else {
        alert("Insira um local antes de pesquisar!");
    }
});
func_dialog();
limpa();
bt_remove_selecionado();
bt_copia();
carregar_historico();
weather.addEventListener("drag", (e) => {
    e.preventDefault();
    const elementos = Array.from(weather.querySelectorAll(".tam_svg"));
    elementos.forEach((e) => {
        e.setAttribute("draggable", "false");
    });
});
weather.addEventListener("dragstart", (e) => {
    e.preventDefault();
});
