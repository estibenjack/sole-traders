const AboutSection = ({ traderBio }) => {
  return (
    <>
      <h2 className="profile-section-title">About</h2>
      <div className="bio-card">
        {traderBio ? (
          <p>{traderBio}</p>
        ) : (
          <p className="no-bio">This trader hasn't added a bio yet.</p>
        )}
      </div>
    </>
  );
};

export default AboutSection;
