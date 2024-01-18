/*
SQLyog Community Edition- MySQL GUI v6.54
MySQL - 5.5.5-10.4.28-MariaDB : Database - repositorioprojetos
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`repositorioprojetos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `repositorioprojetos`;

/*Table structure for table `arquivos` */

DROP TABLE IF EXISTS `arquivos`;

CREATE TABLE `arquivos` (
  `id_arq` int(11) NOT NULL AUTO_INCREMENT,
  `nome_arq` varchar(255) NOT NULL,
  `descricao` text DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `id_projeto` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_arq`),
  KEY `id_projeto` (`id_projeto`),
  CONSTRAINT `arquivos_ibfk_1` FOREIGN KEY (`id_projeto`) REFERENCES `projetos` (`id_projeto`)
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `arquivos` */

insert  into `arquivos`(`id_arq`,`nome_arq`,`descricao`,`url`,`id_projeto`) values (127,'Resenhas.pdf',NULL,'app\\public\\uploads\\5\\1702238942394-Resenhas.pdf',5),(128,'Settings.pdf',NULL,'app\\public\\uploads\\5\\1702238942395-Settings.pdf',5),(129,'aaaa.txt',NULL,'app\\public\\uploads\\2\\1702238981029-aaaa.txt',2),(130,'aqqqq.png',NULL,'app\\public\\uploads\\2\\1702238981030-aqqqq.png',2),(131,'aaaa.txt',NULL,'app\\public\\uploads\\3\\1702238998029-aaaa.txt',3),(132,'LogoRepocitorio.png',NULL,'app\\public\\uploads\\3\\1702238998029-LogoRepocitorio.png',3),(133,'Documento sem tÃ­tulo (2).pdf',NULL,'app\\public\\uploads\\3\\1702238998030-Documento sem tÃ­tulo (2).pdf',3),(134,'Resenhas.pdf',NULL,'app\\public\\uploads\\7\\1702239052499-Resenhas.pdf',7),(135,'Settings.pdf',NULL,'app\\public\\uploads\\7\\1702239052501-Settings.pdf',7),(136,'Dialnet-LaInteligenciaArtificialGenerativaYSuImpactoEnLaCr-9132067 (1).pdf',NULL,'app\\public\\uploads\\7\\1702239052512-Dialnet-LaInteligenciaArtificialGenerativaYSuImpactoEnLaCr-9132067 (1).pdf',7),(137,'COMO_MIGRAR_PARA_UX_DESIGN_O_GUIA_DEFINI.pdf',NULL,'app\\public\\uploads\\6\\1702239074658-COMO_MIGRAR_PARA_UX_DESIGN_O_GUIA_DEFINI.pdf',6),(138,'Projeto de ExtensÃ£o TSI 2023_02 - UX Design(EDITADO1).docx',NULL,'app\\public\\uploads\\6\\1702239074662-Projeto de ExtensÃ£o TSI 2023_02 - UX Design(EDITADO1).docx',6),(139,'Projeto de ExtensÃ£o TSI 2023_02 - UX Design(EDITADO2).docx',NULL,'app\\public\\uploads\\6\\1702239074664-Projeto de ExtensÃ£o TSI 2023_02 - UX Design(EDITADO2).docx',6),(147,'tarefa.docx',NULL,'app\\public\\uploads\\5\\1702246795124-tarefa.docx',5);

/*Table structure for table `projetos` */

DROP TABLE IF EXISTS `projetos`;

CREATE TABLE `projetos` (
  `id_projeto` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `nome_projeto` varchar(255) NOT NULL,
  `data_inicio` date DEFAULT NULL,
  `disciplina` varchar(255) DEFAULT NULL,
  `orientador` varchar(255) DEFAULT NULL,
  `resumo` text DEFAULT NULL,
  PRIMARY KEY (`id_projeto`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `projetos_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `projetos` */

insert  into `projetos`(`id_projeto`,`id_user`,`nome_projeto`,`data_inicio`,`disciplina`,`orientador`,`resumo`) values (1,1,'Sistema de Gerenciamento de Biblioteca','2023-01-01','Engenharia de Software','Bruno','Desenvolvimento de um sistema abrangente para gerenciamento de bibliotecas, incluindo controle de empréstimos, cadastro de livros e gestão de usuários.'),(2,2,'Implementação de Rede Corporativa','2023-01-01','Redes de Computadores','Bruno','Projeto de implementação de uma rede corporativa para otimizar a comunicação e o compartilhamento de recursos entre os setores da empresa.'),(3,2,'Sistema de Gestão de Estoque','2020-03-01','Banco de Dados','Maycon','Desenvolvimento de um sistema eficiente para gestão de estoque, controle de inventário e previsão de reposição de produtos.'),(4,1,'Melhorias na Infraestrutura de Rede','2021-04-05','Redes de Computadores','Anderson','Implementação de melhorias na infraestrutura de rede existente, visando aumentar a velocidade, confiabilidade e segurança da rede.'),(5,2,'Chatbot com Inteligência Artificial','2023-05-01','Inteligência Artificial','Luiz','Desenvolvimento de um chatbot inteligente capaz de interagir de maneira natural com usuários, respondendo a perguntas e fornecendo informações úteis.'),(6,3,'Implementação de Firewall Avançado','2020-06-01','Segurança da Informação','Anderson','Implementação de um firewall avançado para proteger a rede contra ameaças externas e internas, garantindo a segurança dos dados.'),(7,3,'Desenvolvimento de Plataforma E-commerce','2023-06-06','Desenvolvimento Web','Luiz','Criação de uma plataforma de comércio eletrônico completa, incluindo recursos de carrinho de compras, pagamento online e gestão de pedidos.'),(8,4,'Otimização de Banco de Dados','2022-08-01','Banco de Dados','Maycon','Otimização e melhoria do desempenho do banco de dados existente, visando garantir um acesso rápido e eficiente aos dados.'),(9,5,'Website Responsivo para Comércio Eletrônico','2023-09-01','Desenvolvimento Web','Bruno','Desenvolvimento de um website responsivo para comércio eletrônico, proporcionando uma experiência de compra intuitiva em dispositivos móveis e desktop.'),(10,1,'Modelagem Matemática de Processos Biológicos','2023-10-11','Matemática','Ismail','Aplicação de técnicas avançadas de modelagem matemática para entender e simular processos biológicos complexos.');

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `usuarios` */

insert  into `usuarios`(`id_user`,`login`,`senha`,`nome`) values (1,'Pudizizo','123','Abner'),(2,'ana','123','Ana M'),(3,'pudim','321','Pedro'),(4,'paulo','123','Cesar'),(5,'diego','321','Diego'),(6,'rodrigo','123','Rodrigo'),(11,'Fabio','Fabio','Fabio'),(12,'Jorge','Jorge','Jorge'),(13,'abnergmj@gmail.com','123','Abner');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
