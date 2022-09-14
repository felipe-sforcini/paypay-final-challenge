import { parse } from "date-fns";

export function formatCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, "");

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function formatTel(telefone) {
    let tamanho = telefone.length;

    if (tamanho > 10) {
        return telefone = telefone.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (tamanho > 5) {
        return telefone = telefone.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (tamanho > 2) {
        return telefone = telefone.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
        return telefone = telefone.replace(/^(\d*)/, "($1");
    }
}

export function formatReal(valor) {
    const format = valor / 100
    const tmp = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(format)
    return tmp
}

export function formatDate(date, edit) {
    let data = new Date(date);
    if (edit) {
        data = parse(date, "yyyy-MM-dd", new Date());
        return data;
    }
    if (data.getUTCDate() === 1) {
        if (data.getMonth() === 11) {
            let dataFormatada = (data.getUTCDate()) + "/1/" + (data.getFullYear() + 1);
            return dataFormatada;
        }
        let dataFormatada = ((data.getUTCDate())) + "/" + ((data.getMonth() + 2)) + "/" + data.getFullYear();
        return dataFormatada
    }
    let dataFormatada = ((data.getUTCDate())) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
    return dataFormatada
}

export function chargeStatus(status) {
    if (status === 'pendente') {
        return (
            <p className='pendente'>Pendente</p>
        )
    }
    if (status === 'vencida') {
        return (
            <p className='vencida'>Vencida</p>
        )
    }

    return (
        <p className='paga'>Paga</p>
    )
}
