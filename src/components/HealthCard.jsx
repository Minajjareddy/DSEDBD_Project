function HealthCard({ icon, title, value, description }) {
  return (
    <div className="health-card">
      <div className="health-card-icon">
        {icon}
      </div>

      <div>
        <h3>{title}</h3>

        <p className="health-card-value">
          {value}
        </p>

        <p className="health-card-description">
          {description}
        </p>
      </div>
    </div>
  );
}

export default HealthCard;