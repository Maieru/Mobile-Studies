const express = require("express");
const cors = require('cors');
const server = express(); 
server.use(express.json());
server.use(cors());

server.get('/teste', (req, res)=> {
  res.send('<marquee><center><h1> tudo certo com a api!!!! ( gloria a deus )</h1></center></marquee>');
});  

const AlunoRoutes = require('./routes/AlunoRouter');
const SolicitacaoLancheRoutes = require('./routes/SolicitacaoLancheRouter');

server.use('/aluno', AlunoRoutes);
server.use('/solicitacaoLanche', SolicitacaoLancheRoutes);

const listRoutes = (app) => {
  app._router.stack.forEach((middleware) => {
      if (middleware.route) { // Rota registrada diretamente no app
          console.log(middleware.route);
      } else if (middleware.name === 'router') { // Rota registrada em um roteador
          middleware.handle.stack.forEach((handler) => {
              const route = handler.route;
              if (route) {
                  console.log(route);
              }
          });
      }
  });
};

listRoutes(server);

server.listen(3000, () => {
    console.log('API online');
});