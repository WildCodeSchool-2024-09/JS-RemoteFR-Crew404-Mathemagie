import "./avatar.css";

const Avatar = () => {
  return (
    <>
      <section className="pagetotale">
        <h2>Avatar</h2>

        <section className="questions-creation">
          <p>Comment souhaites-tu que je t'appelle ?</p>
          <input
            type="text"
            placeholder="Je m'appelle..."
            className="input-bulle"
          />
          <p>Dans quelle classe es-tu?</p>
          <input
            type="text"
            placeholder="Je suis en..."
            className="input-bulle"
          />
          <p>Quelle est ta date de naissance?</p>
          <div className="anniv">
            <select className="input-anniv">
              <option value="">Jour</option>
              {[...Array(31).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select className="input-anniv">
              <option value="">Mois</option>
              {[...Array(12).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select className="input-anniv">
              <option value="">Année</option>
              {[...Array(2025 - 2000 + 1).keys()].map((i) => (
                <option key={2000 + i} value={2000 + i}>
                  {2000 + i}
                </option>
              ))}
            </select>
          </div>
        </section>
        <section className="creation-button">
          <button className="validate-button">Je valide!</button>
        </section>
      </section>
    </>
  );
};

export default Avatar;
