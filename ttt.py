ALTER TABLE salaire
        ADD Valide nvarchar(50) NULL --Or NOT NULL.
 
    DEFAULT ('pasvalide')--Optional Default-Constraint.
WITH VALUES --Add if Column is Nullable and you want the Default Value for Existing Records.