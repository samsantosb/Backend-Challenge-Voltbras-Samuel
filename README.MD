# Backend-Challenge Voltbras Recharging Stations

## Como rodar o projeto

1. **Instalar as dependências**:

`npm install`

2. **Rodar a aplicação localmente**:

`npm run dev`

3. **rodar a aplicação no container Docker**

`docker-composer up`

4. **MongoDB URL**

Uma boa opção aqui é criar uma conta em:

https://www.mongodb.com/

e no próprio passo a passo do sistema é possível criar um banco e pegar uma URL
utilizando a interface do Mongo Atlas

5. **Testes**

Para executa-los: `npm run test`
coverage: `npm run test:coverage`

6. **Documentação dos Endpoints**

www.linkdovideo.com

## Requisitos

[✅] Crie o schema GraphQL com uma query suitablePlanets: que retorna os dados dos planetas com gravidade alta.

[✅] Crie uma mutation installStation: que dado um planeta, instala uma estação de carregamento no planeta.

[✅] Crie uma query stations: que irá listar todas as estações instaladas nos planetas.

[✅] Crie uma mutation recharge: que dado uma estação e um datetime de quanto a recarga irá finalizar, realiza uma recarga, começando a partir do momento em que a mutation foi chamada e finalizando com a datetime passada.

[✅] Documentação do projeto: explicação de como rodá-lo.

[✅] Repositório privado no GitHub ou GitLab.

[✅] Vídeo curto demonstrando o funcionamento básico do sistema.
Requisitos Extras

## Requisitos Extras

[✅] Adicione testes usando Jest ou qualquer outro framework para testes.

[✅] Usar Typescript.

[✅] Docker-compose para simplificar a execução do servidor e do DB.

[✅] ORM (Foi usada Mongoose): Usamos prisma mas sinta-se livre para usar qualquer ORM.

[✅] Adicione autenticação: apenas um usuário autenticado poderá fazer uma recarga ou uma reserva.

[✅] Crie uma mutation reservation: que dado uma estação, um usuário e um intervalo de tempo, cria uma reserva da estação para o usuário naquele determinado intervalo de tempo.

[✅] Crie uma query stationHistory: onde será possível visualizar o histórico de recargas de uma estação (mostrar o horário, o tempo de duração da recarga e o usuário que realizou-a).

## Observações

- Todos os campos exceto login e createUser estão com autenticação

- Há um serviço dentro do módulo de recharges (Agenda) configurado
  para a cada 15 segundos (para fins de demonstração) que verifica o
  status das recharges e atualiza no banco

- Há também alguns endpoints extras e testados, principalmente no módulo
  de users e de stations