import { useParams } from "react-router-dom";

export default function Player() {
  const { id } = useParams();

  return (
    <div className="player__wrapper">
      <div className="summary">
        <div className="audio__book--summary" style={{ fontSize: 16 }}>
          <div className="audio__book--summary-title">
            <b>How to Win Friends and Influence People in the Digital Age</b>
          </div>
          <div className="audio__book--summary-text">
            How to Win Friends and Influence People is a timeless classic written by Dale Carnegie, first published in 1936. The book is widely regarded as one of the best self-help books ever written and has sold over 30 million copies worldwide. In 2011, a revised edition was published, titled How to Win Friends and Influence People in the Digital Age. The book was updated to address the challenges of the digital age and provide guidance on how to navigate the complexities of modern communication and social media.
            <br /><br />
            The original book focused on the art of human communication and provided readers with strategies for building strong relationships, overcoming interpersonal conflicts, and becoming more effective communicators. The revised edition builds on these principles and updates them for the digital age. The book recognizes that the proliferation of technology and social media has created new opportunities for communication and connection, but has also made it more difficult to connect with others on a deep and meaningful level.
            <br /><br />
            The first section of the book is devoted to building relationships in the digital age. The author argues that despite the abundance of social media platforms, people are more isolated than ever before. He suggests that the key to building strong relationships is to focus on the needs and desires of others. He encourages readers to listen actively and empathetically, to show genuine interest in others, and to be generous with their time and resources. These strategies apply both online and offline and are essential for building strong relationships in the digital age.
            <br /><br />
            The second section of the book focuses on communicating effectively in the digital age. The author acknowledges that modern communication technology has made it easier than ever to communicate with others, but has also made it more difficult to convey complex emotions and ideas. He suggests that the key to effective communication is to be clear and concise, to use simple language and avoid jargon, and to be mindful of the tone and style of your message. He also stresses the importance of using technology appropriately, and suggests that people should avoid using text messaging and email for important conversations, as they are less personal and can easily be misinterpreted.
            <br /><br />
            The third section of the book focuses on influencing others in the digital age. The author argues that in the digital age, influence is more important than ever before. He suggests that the key to influencing others is to be genuine and authentic, to communicate your message clearly and persuasively, and to be mindful of the needs and desires of your audience. He also stresses the importance of building a personal brand, and suggests that people should focus on developing a strong online presence that reflects their values and expertise.
            <br /><br />
            The final section of the book focuses on leadership in the digital age. The author argues that in the digital age, leaders must be able to inspire and motivate their followers, and must be able to navigate the complex and rapidly changing world of technology and social media. He suggests that the key to effective leadership is to be a good listener, to be open to new ideas and perspectives, and to be willing to take risks and try new approaches. He also stresses the importance of building a strong team, and suggests that leaders should focus on creating a culture of collaboration and innovation.
            <br /><br />
            Overall, How to Win Friends and Influence People in the Digital Age is an excellent guide for anyone looking to improve their communication skills, build strong relationships, and become more effective leaders in the digital age. The book provides readers with practical strategies and advice for navigating the complex world of modern communication and social media, and is an essential resource for anyone looking to succeed in today's rapidly changing world.
          </div>
        </div>
        <div className="audio__wrapper">
          <audio src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Faudios%2Fhow-to-win-friends-and-influence-people.mp3?alt=media&token=60872755-13fc-43f4-8b75-bae3fcd73991"></audio>
          <div className="audio__track--wrapper">
            <figure className="audio__track--image-mask">
              <figure className="book__image--wrapper" style={{ height: 48, width: 48, minWidth: 48 }}>
                <img
                  className="book__image"
                  src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fhow-to-win-friends-and-influence-people.png?alt=media&token=099193aa-4d85-4e22-8eb7-55f12a235fe2"
                  alt="book"
                  style={{ display: "block" }}
                />
              </figure>
            </figure>
            <div className="audio__track--details-wrapper">
              <div className="audio__track--title">How to Win Friends and Influence People in the Digital Age</div>
              <div className="audio__track--author">Dale Carnegie</div>
            </div>
          </div>
          <div className="audio__controls--wrapper">
            <div className="audio__controls">
              <button className="audio__controls--btn">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" stroke="#000" strokeWidth="2" d="M3.11111111,7.55555556 C4.66955145,4.26701301 8.0700311,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 L12,22 C6.4771525,22 2,17.5228475 2,12 M2,4 L2,8 L6,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"></path>
                </svg>
              </button>
              <button className="audio__controls--btn audio__controls--btn-play">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="audio__controls--play-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M96 448l320-192L96 64v384z"></path>
                </svg>
              </button>
              <button className="audio__controls--btn">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" stroke="#000" strokeWidth="2" d="M20.8888889,7.55555556 C19.3304485,4.26701301 15.9299689,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 L12,22 C17.5228475,22 22,17.5228475 22,12 M22,4 L22,8 L18,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="audio__progress--wrapper">
            <div className="audio__time">00:00</div>
            <input type="range" className="audio__progress--bar" defaultValue="0" max="204.048" style={{ background: "linear-gradient(to right, rgb(43, 217, 124) 0%, rgb(109, 120, 125) 0%)" }} />
            <div className="audio__time">03:24</div>
          </div>
        </div>
      </div>
    </div>
  );
}