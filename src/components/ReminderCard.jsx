function ReminderCard({ title, time, type }) {
  return (
    <div className="reminder-card">

      <div className="reminder-icon">
        ⏰
      </div>

      <div className="reminder-info">
        <h3>{title}</h3>
        <p>{time}</p>
        <span>{type}</span>
      </div>

    </div>
  );
}

export default ReminderCard;