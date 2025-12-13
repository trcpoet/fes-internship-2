import { AiFillFileText, AiFillBulb, AiFillAudio } from 'react-icons/ai';

const FEATURES = [
  { icon: <AiFillFileText />, title: 'Read or listen', text: 'Save time by getting the core ideas from the best books.' },
  { icon: <AiFillBulb />,     title: 'Find your next read', text: 'Explore book lists and personalized recommendations.' },
  { icon: <AiFillAudio />,    title: 'Briefcasts', text: 'Gain valuable insights from briefcasts.' }
];

export default function Features() {
  return (
    <section id="features">
      <div className="container">
        <div className="row">
          <div className="section__title">Understand books in few minutes</div>
          <div className="features__wrapper">
            {FEATURES.map(f => (
              <div className="features" key={f.title}>
                <div className="features__icon">{f.icon}</div>
                <div className="features__title">{f.title}</div>
                <div className="features__sub--title">{f.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
