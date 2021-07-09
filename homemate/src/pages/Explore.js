import React from 'react';
import '../components/picture/picture.css';
import Picture from '../components/picture';

function Explore() {
  const posts = [
    {
      id: 1,
      post: 'https://dmhxz00kguanp.cloudfront.net/fotos/136023/quarto-infantil-estrelinha-rosa-291044.jpg',
      legend: 'Quarto',
    },
    {
      id: 2,
      post: 'https://images-americanas.b2w.io/produtos/01/00/img/84842/9/84842978_1GG.jpg',
      legend: 'Banheiro',
    },
  ];

  return (
    <div className="Picture">
      <h1>Show Picture Component of Homemate System</h1>
      <h3>Componente Exibir Foto do Sistema Homemate</h3>
      <Picture listPost={posts} />
    </div>
  );
}

export default Explore;
