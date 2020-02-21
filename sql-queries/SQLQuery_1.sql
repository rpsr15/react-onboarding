CREATE TABLE Customer (
    Id INT IDENTITY NOT NULL,
    [Name] NVARCHAR(100) NOT NULL,
    [Address] NVARCHAR(200),
    PRIMARY KEY(Id)
);

CREATE TABLE Product (
    Id INT IDENTITY NOT NULL,
    [Name] NVARCHAR(100) NOT NULL,
    [Price] DECIMAL,
    PRIMARY KEY(Id)
);


-- Insert rows into table 'TableName' in schema '[dbo]'
-- Select rows from a Table or View '[TableOrViewName]' in schema '[dbo]'
SELECT * FROM [Product]

Insert into Product values('chair',345.5)
Insert into Product values('desk',45.5)
Insert into Product values('tv',745.5)

-- Store

-- Sale
