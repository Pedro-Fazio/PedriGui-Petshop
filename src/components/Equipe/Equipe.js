import React from "react";
import "./Equipe.scss";
import img1 from "../../Images/Imagens uteis/guilherme.jpg";
import img2 from "../../Images/Imagens uteis/pedro.jpg";

const Equipe = ({ title }) => {
  const members = [
    {
      name: "Pedro Fazio",
      content: "Pedro é um cara muito legal",
      img: img2,
    },
    {
      name: "Guilherme Queiroz",
      content: "Guilherme é um cara muito bacana",
      img: img1,
    },
  ];

  const generateMembers = (members) =>
    members.map((member, i) => (
      <div key={"member" + i} className="member">
        <div className="member-img">
          <img src={member.img} alt={"member foto"} />
        </div>
        <div className="member-content">
          <h3>{member.name}</h3>
          <p>{member.content}</p>
        </div>
      </div>
    ));
  return (
    <div className="Equipe">
      <div className="Equipe-container">
        <a href="/sobrenos" style={{"textDecoration": 'None', color: 'black'}}>
          <h1 className="title">{title}</h1>
        </a>

        <div className="members-box">{generateMembers(members)}</div>
      </div>
    </div>
  );
};

export default Equipe;
