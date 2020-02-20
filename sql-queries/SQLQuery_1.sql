CREATE TABLE Customer (
    Id INT IDENTITY NOT NULL,
    [Name] NVARCHAR(100) NOT NULL,
    [Address] NVARCHAR(200),
    PRIMARY KEY(Id)
);


-- Insert rows into table 'TableName' in schema '[dbo]'
INSERT INTO [Customer](Name, Address) VALUES ("Ravi", "234 sadsf")