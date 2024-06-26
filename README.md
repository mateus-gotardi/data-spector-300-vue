# Data Spector 300 Front-End

 App desenvolvido como teste técnico para o Processo Seletivo de Desenvolvedor Full-stack da Copybase
 Este app Vue foi escrito para possibilitar o envio de uma ou mais planilhas para cálculo do MRR, Churn rate e mais algumas informações. Os dados são processados em um [BACK END PYTHON](https://github.com/mateus-gotardi/data-spector-300-python) e exibidos em forma de gráficos através do [Chart JS](https://www.chartjs.org)

## Deploy
O deploy do Front-end foi efetuado na [VERCEL](https://vercel.com/) e pode ser acessado pelo link: https://data-spector-300-vue.vercel.app

## Tecnologias utilizadas
 - VueJS
 - Pinia
 - ChartJS
 - Ant Design

# Setup do Projeto na sua máquina
clone ou baixe o repositório e instale as dependências utilizando
  
```sh
npm  install
```

### Defina as variáveis de ambiente
crie um arquivo .env ou .env.local e insira a URL do back end de acordo com o exemplo em .env.example

```sh
VITE_UPLOAD_URL  =  http://localhost:5000/upload
```
### Tenha certeza de que o back end está sendo executado na sua máquina
acesse o  [BACK END PYTHON](https://github.com/mateus-gotardi/data-spector-300-python)  e o execute conforme instruções do leia-me

### Rode o aplicativo Vue
utilize o seguinte comando no console na pasta do app
```sh
npm  run  dev
```
Acesse http://localhost:5173 no seu navegador para acessar o app