import FlipCard from '../components/flipCard';

const pictureUrl =
  'https://images.unsplash.com/photo-1529408686214-b48b8532f72c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=986e2dee5c1b488d877ad7ba1afaf2ec&auto=format&fit=crop&w=1350&q=80';
const props = {
  state: 'paríba',
  city: 'campina grande',
  district: 'centro',
  street: 'rua reputado álvaro gaudêncio',
  number: '434',
  pictureUrl,
  price: '821',
  people: 5,
  rooms: 6,
  beds: 6,
  bathrooms: 8,
  description: `
  And so, does the destination matter? Or is it the path we take? I declare that no accomplishment has substance nearly as great as the road used to achieve it. We are not creatures of destinations. It is the journey that shapes us. Our callused feet, our backs strong from carrying the weight of our travels, our eyes open with the fresh delight of experiences lived.
  `,
};

function About() {
  return <FlipCard {...props} />;
}

export default About;
