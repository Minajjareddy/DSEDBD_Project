CREATE DATABASE ai_health_assistant;

USE ai_health_assistant;
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    date_of_birth DATE,
    gender VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE health_profiles (
    profile_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    blood_group VARCHAR(10),
    height_cm DECIMAL(5,2),
    weight_kg DECIMAL(5,2),
    allergies TEXT,
    chronic_conditions TEXT,
    emergency_contact VARCHAR(100),
    emergency_phone VARCHAR(15),

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);
CREATE TABLE symptoms (
    symptom_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    symptom_name VARCHAR(100) NOT NULL,
    description TEXT,
    severity VARCHAR(20),
    start_date DATE,
    status VARCHAR(30) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);
CREATE TABLE medications (
    medication_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    medicine_name VARCHAR(100) NOT NULL,
    dosage VARCHAR(50),
    frequency VARCHAR(50),
    start_date DATE,
    end_date DATE,
    instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);
CREATE TABLE appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    doctor_name VARCHAR(100) NOT NULL,
    hospital_name VARCHAR(150),
    appointment_date DATE NOT NULL,
    appointment_time TIME,
    reason TEXT,
    status VARCHAR(30) DEFAULT 'Scheduled',

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);
CREATE TABLE daily_activities (
    activity_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_date DATE NOT NULL,
    sleep_hours DECIMAL(4,2),
    water_intake_liters DECIMAL(4,2),
    steps INT,
    mood VARCHAR(30),
    notes TEXT,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);
CREATE TABLE ai_insights (
    insight_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    input_text TEXT,
    insight_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);
CREATE TABLE reminders (
    reminder_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    reminder_type VARCHAR(50),
    title VARCHAR(150) NOT NULL,
    description TEXT,
    reminder_date DATE,
    reminder_time TIME,
    status VARCHAR(30) DEFAULT 'Pending',

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

CREATE TABLE medical_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    condition_name VARCHAR(150) NOT NULL,
    diagnosis_date DATE,
    treatment TEXT,
    doctor_name VARCHAR(100),
    notes TEXT,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);
SHOW TABLES;
