# 📘 Projeto de Testes Automatizados com Cypress

Este projeto tem como objetivo testar uma aplicação utilizando o **Cypress**, com geração de relatórios em HTML utilizando o **Mochawesome**.


---

## ⚙️ Instalação do Projeto

Antes de começar, é necessário ter o [Node.js](https://nodejs.org/) instalado na máquina.

Depois, siga os passos abaixo para instalar as dependências necessárias:

### 1. Instalar o Cypress

```bash
npm install cypress --save-dev
```

## Instalar o Mochawesome Reporter para Cypress

```bash
npm install cypress-mochawesome-reporter --save-dev
```

## Instalar o pacote para mesclar os relatórios

```bash
npm install mochawesome-merge --save-dev
```

## Instalar o gerador de relatório HTML

```bash
npm install mochawesome-report-generator --save-dev
```

## 🚀 Executando os Testes
▶️ Abrir o Cypress com interface gráfica (modo interativo)

```bash
npx cypress open
```

## 🧪 Executar todos os testes em modo headless (terminal)

```bash
npx cypress run --reporter mochawesome
```

## 🧾 Gerar Relatório Final em HTML

# Mesclar os relatórios .json

```bash
npx mochawesome-merge cypress/reports/*.json > cypress/reports/merged-report.json
```

# Gerar o relatório HTML

```bash
npx marge cypress/reports/merged-report.json --reportDir cypress/reports --reportFilename final-report
```

📂 O relatório final estará disponível em:

cypress/reports/final-report.html
