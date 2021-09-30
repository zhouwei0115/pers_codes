CREATE DATABASE BootcampDB;
GO
USE BootcampDB;
GO
CREATE TABLE Users
(
    userId nvarchar(50) NOT NULL PRIMARY KEY,
    description nvarchar(255),
    personnelId nvarchar(50) NOT NULL,
);
CREATE TABLE VarianceReasonCodes
(
    sfc nvarchar(50) NOT NULL PRIMARY KEY,
    varianceReasonCode nvarchar(50) NOT NULL,
    personnelId nvarchar(50) NOT NULL
);
GO
INSERT INTO Users
    (userId, personnelId)
VALUES("user1", "personnel1")
INSERT INTO Users
    (userId, personnelId)
VALUES("user2", "personnel2")
GO
