-- create ciprmt database
create database ciprmt;

-- setup table for client_profiles
create table client_profiles (
    id bigserial not null primary key,
    first_name varchar (20) not null,
    last_name varchar (20) not null,
    email varchar (50) not null,
    phone varchar (10) not null,
    date_of_birth date not null,
    occupation varchar (50) not null,
    massage_history varchar (200) not null,
    service varchar (50) not null,
    reason_for_massage varchar (50) not null,
    other_hcp varchar (200),
    doctor_name varchar (60),
    doctor_address varchar (100),
    cardio_none boolean,
    high_blood_pressure boolean,
    low_blood_pressure boolean,
    heart_attack boolean,
    vericose_veins boolean,
    stroke boolean,
    pacemaker boolean,
    heart_disease boolean,
    resp_none boolean,
    chronic_cough boolean,
    bronchitis boolean,
    asthma boolean,
    emphysema boolean,
    skin_conditions varchar (200),
    infectious_conditions varchar (200),
    diabetes boolean,
    epilepsy boolean,
    cancer boolean,
    arthritis boolean,
    chronic_headaches boolean,
    migraine_headaches boolean,
    vision_loss boolean,
    hearing_loss boolean,
    osteoporosis boolean,
    haemophilia boolean,
    medical_conditions varchar (500),
    loss_of_feeling boolean,
    allergies varchar (500),
    pregnant boolean,
    medications varchar (500),
    glutes boolean,
    inner_thighs boolean,
    abdomen boolean,
    chest_wall boolean,
    all_areas boolean,
    sensitive_areas varchar(100),
    privacy_policy boolean
);

-- setup table for health history
create table health_history_files (
    id bigserial not null primary key,
    client_id bigint not null references client_profiles(id),
    reason_for_massage varchar (50),
    other_hcp varchar (200),
    doctor_name varchar (60),
    doctor_phone int,
    cardio_none boolean,
    high_blood_pressure boolean,
    low_blood_pressure boolean,
    heart_attack boolean,
    vericose_veins boolean,
    stroke boolean,
    pacemaker boolean,
    heart_disease boolean,
    resp_none boolean,
    chronic_cough boolean,
    bronchitis boolean,
    asthma boolean,
    emphysema boolean,
    skin_conditions varchar (200),
    diabetes boolean,
    epilepsy boolean,
    cancer boolean,
    arthritis boolean,
    chronic_headaches boolean,
    migraine_headaches boolean,
    vision_loss boolean,
    hearing_loss boolean,
    osteoporosis boolean,
    haemophilia boolean,
    medical_conditions varchar (500),
    loss_of_feeling boolean,
    allgergies varchar (500),
    pregnant boolean,
    medications varchar (500),
    glutes boolean,
    inner_thighs boolean,
    abdomen boolean,
    chest_wall boolean,
    all_areas boolean

);

alter table client_profiles add column reason_for_massage varchar(200);

alter table client_profiles rename column allgergies to allergies;

alter table client_profiles add column sensitive_areas varchar(200), add column privacy_policy boolean;

create table appointments (
    id bigserial not null primary key,
    client_id bigint not null references client_profiles(id),
    appointment_date date not null,
    consent_for_treatment boolean,
    duration smallint not null,
    price smallint not null,
    reason_for_massage varchar(500) not null,
    findings varchar(2000) not null,
    treatment varchar(5000) not null,
    immediate_results varchar(2000) not null,
    remex varchar(5000),
    treatment_plan varchar(5000)
);

client_id, appointment_date, duration, price, treatment_purpose, findings, treatment, immediate_results, remex, treatment_plan

create table login (
    id bigserial not null primary key,
    username varchar(50) not null,
    password varchar(1000) not null
);

create table users (
    id bigserial not null primary key,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    email varchar (100) not null
);

delete from users where id = 