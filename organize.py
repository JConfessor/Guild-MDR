import json
import re

def converter_para_json(arquivo_entrada, arquivo_saida):
    # Abre o arquivo de entrada para leitura
    with open(arquivo_entrada, 'r', encoding='utf-8') as f:
        conteudo = f.read()

    # Expressão regular para capturar ID, Pergunta e Resposta
    padrao = r"Questão (\d+)\n(.*?)\nR: (.*?)\n"
    dados = []

    # Procura todas as correspondências no arquivo
    for correspondencia in re.findall(padrao, conteudo, re.DOTALL):
        id_pergunta, pergunta, resposta = correspondencia
        dados.append({
            "id": int(id_pergunta),
            "pergunta": pergunta.strip(),
            "resposta": resposta.strip()
        })

    # Salva os dados em um arquivo JSON
    with open(arquivo_saida, 'w', encoding='utf-8') as f:
        json.dump(dados, f, ensure_ascii=False, indent=2)

    print(f"Conversão concluída! Dados salvos em {arquivo_saida}")

# Caminho para o arquivo de texto com as perguntas
arquivo_entrada = 'perguntas.txt'  # Altere para o nome do seu arquivo
arquivo_saida = 'perguntas.json'

converter_para_json(arquivo_entrada, arquivo_saida)