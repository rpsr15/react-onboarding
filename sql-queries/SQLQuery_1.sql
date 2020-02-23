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
Insert into Product values('laptop',345.5)
Insert into Product values('mobile',45.5)
Insert into Product values('watch',745.5)

-- Store

-- Sale


CREATE TABLE Store
(
    [Id] INT IDENTITY NOT NULL PRIMARY KEY, -- Primary Key column
    [Name] NVARCHAR(50) NOT NULL,
    [Address] NVARCHAR(50)
    -- Specify more columns here
);
Insert into Store values('kmart', 'keysborough')
Insert into Store values('coles', 'springvale')
Insert into Store values('officeworks', 'heidleberg')
Insert into Store values('woolies', 'bundoora')

select * from Store;



-- Sales

-- Create the table in the specified schema
CREATE TABLE Sales
(
    [Id] INT IDENTITY NOT NULL PRIMARY KEY, -- Primary Key column
    [ProductId] INT NOT NULL FOREIGN KEY REFERENCES Product(Id),
    [ColumnName3] NVARCHAR(50) NOT NULL
    -- Specify more columns here
);
GO





