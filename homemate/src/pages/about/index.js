import { Tooltip } from '@material-ui/core';
import helenaImg from '../../img/helena.jpeg';
import gabrielImg from '../../img/gabriel.jpeg';
import thaynnaraImg from '../../img/thaynnara.jpeg';
import marianaImg from '../../img/mariana.jpeg';
import nicolyImg from '../../img/nicoly.jpeg';
import wesleyImg from '../../img/wesley.jpeg';

import './about.css';

function About() {
  return (
    <div className="body-container">
      <div className="homemate-title">Homemate</div>
      <div className="flex-container">
        <div className="about-side">
          <div className="about-title">Sobre</div>
          <a className="about-text" href="#">
            <span className="about-inner">
              Atualmente, dividir uma locação com outra pessoa já não é uma realidade apenas de
              estudantes, muitas pessoas optam por essa forma de viver por ser menos custosa, além
              de proporcionar o compartilhamento de experiências e aprendizado. Logo, cada vez mais
              pessoas se interessam em procurar por um(a) colega de apartamento, especialmente que
              seja compatível com seu modo de ser. Sabendo que essa busca não é trivial, o Homemate
              tem por objetivo facilitar esses encontros através da solução que faz uso de filtros e
              recomendações, explorando informações que vão ajudar os usuários a escolherem roomies
              que tenham afinidades semelhantes, aumentando as chances de uma boa convivência.
            </span>
          </a>
        </div>
        <div className="members-side">
          <div className="members-title">Membros</div>
          <div className="members-img">
            <Tooltip title="Homemate Helena">
              <img src={helenaImg} alt="Homemate Helena" width="100px" />
            </Tooltip>
            <Tooltip title="Homemate Gabriel">
              <img src={gabrielImg} alt="Homemate Gabriel" width="100px" />
            </Tooltip>
            <Tooltip title="Homemate Thaynnara">
              <img src={thaynnaraImg} alt="Homemate Thaynnara" width="100px" />
            </Tooltip>
            <Tooltip title="Homemate Mariana">
              <img src={marianaImg} alt="Homemate Mariana" width="100px" />
            </Tooltip>
            <Tooltip title="Homemate Nicoly">
              <img src={nicolyImg} alt="Homemate Nicoly" width="100px" />
            </Tooltip>
            <Tooltip title="Homemate Wesley">
              <img src={wesleyImg} alt="Homemate Wesley" width="100px" />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
