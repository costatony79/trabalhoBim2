const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const notifier = require('node-notifier');
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//conexão com o banco de dados
const connection = require("./database/database");
connection.authenticate().then(() => {
        console.log("Conexão com o banco trabalho_sexto_ano realizada.");
    }).catch((msgErro) => {
        console.log(msgErro);
    });
//model do BD para criar a tabela no banco de dados
const Bim2 = require("./database/Bim2");

//servidor
app.listen(1515, ()=>{
    console.log("Servidor Rodando na porta 1515");
});

//rotas
app.get("/", (req, res) => {
    res.render("index");
});

//Rota para receber o gabarito
app.post("/gabarito_bim2", (req, res) => {
    var nome = req.body.name;
    var turma = req.body.turma;
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var q6 = req.body.q6;
    var q7 = req.body.q7;
    var q8 = req.body.q8;
    var q9 = req.body.q9;
    var q10 = req.body.q10;
    var q11 = req.body.q11;
    var q12 = req.body.q12;
    var q13 = req.body.q13;
    var q14 = req.body.q14;
    var q15 = req.body.q15;
    var q16 = req.body.q16;
    var q17 = req.body.q17;
    var q18 = req.body.q18;
    var q19 = req.body.q19;
    var q20 = req.body.q20;
    if(nome==""||turma==""||q1==""||q2==""||q3==""||q4==""||q5==""||q6==""
    ||q7==""||q8==""||q9==""||q10==""||q11==""||q12==""||q13==""||q14==""||q15==""||q16==""||q17==""||q18==""||q19==""||q20=="" ){
        notifier.notify({
            title: 'RESPONDA TODAS AS PERGUNTAS',
            message: 'Você não pode deixar nenhum campo em branco.'
          });
        res.redirect("/");
    }else {
        Bim2.create({
            nome: nome.toUpperCase(),
            turma: turma.toUpperCase(),
            q1: q1.toUpperCase(),
            q2: q2.toUpperCase(),
            q3: q3.toUpperCase(),
            q4: q4.toUpperCase(),
            q5: q5.toUpperCase(),
            q6: q6.toUpperCase(),
            q7: q7.toUpperCase(),
            q8: q8.toUpperCase(),
            q9: q9.toUpperCase(),
            q10: q10.toUpperCase(),
            q11: q11.toUpperCase(),
            q12: q12.toUpperCase(),
            q13: q13.toUpperCase(),
            q14: q14.toUpperCase(),
            q15: q15.toUpperCase(),
            q16: q16.toUpperCase(),
            q17: q17.toUpperCase(),
            q18: q18.toUpperCase(),
            q19: q19.toUpperCase(),
            q20: q20.toUpperCase()
        }).then(() => {
            notifier.notify({
                title: 'GABARITO SALVO COM SUCESSO',
                message: 'Parabéns você preencheu tudo.'
              });
            res.send("Você respondeu todas as questões");
        });
    }
});

app.get("/respostas", (req, res) => {
    var total = 0;
    Bim2.findAll({order: [['turma', 'ASC']]}).then(res_atividade => {
    res.render("respostas", 
       {   
         res_atividade: res_atividade,
         total: total                             
        });
    }); 
});

//rota para apagar um registro da tabela
app.post("/deletar_res", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        Bim2.destroy({
            where: {
                id: id
            }
            
        }).then(()=>{
            res.redirect("/respostas");
        });
    }
    
    });