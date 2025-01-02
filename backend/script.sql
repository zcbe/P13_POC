-- Table Utilisateur
CREATE TABLE Utilisateur (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(255),
    mot_de_passe VARCHAR(255),
    date_de_naissance DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table Adresse
CREATE TABLE Adresse (
    id INT PRIMARY KEY AUTO_INCREMENT,
    rue VARCHAR(255),
    code_postal VARCHAR(20),
    ville VARCHAR(100),
    pays VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table Agence
CREATE TABLE Agence (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100),
    adresse_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (adresse_id) REFERENCES Adresse(id)
);

-- Table Vehicule
CREATE TABLE Vehicule (
    id INT PRIMARY KEY AUTO_INCREMENT,
    marque VARCHAR(100),
    modele VARCHAR(100),
    disponibilite BOOLEAN DEFAULT TRUE,
    agence_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (agence_id) REFERENCES Agence(id)
);

-- Table Reservation
CREATE TABLE Reservation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    utilisateur_id INT,
    vehicule_id INT,
    agence_id INT,
    date_debut DATETIME,
    date_fin DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (utilisateur_id) REFERENCES Utilisateur(id),
    FOREIGN KEY (vehicule_id) REFERENCES Vehicule(id),
    FOREIGN KEY (agence_id) REFERENCES Agence(id)
);

-- Table StatutReservation
CREATE TABLE StatutReservation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table Paiement
CREATE TABLE Paiement (
    id INT PRIMARY KEY AUTO_INCREMENT,
    reservation_id INT,
    montant DECIMAL(10, 2),
    statut_id INT,
    date_transaction DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (reservation_id) REFERENCES Reservation(id),
    FOREIGN KEY (statut_id) REFERENCES StatutReservation(id)
);

-- Table Support
CREATE TABLE Support (
    id INT PRIMARY KEY AUTO_INCREMENT,
    utilisateur_id INT,
    type_contact VARCHAR(50),
    message TEXT,
    date_contact DATETIME,
    statut VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (utilisateur_id) REFERENCES Utilisateur(id)
);
