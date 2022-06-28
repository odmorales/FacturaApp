SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TRIGGER ActualizarInventario
   ON  DetalleFacturas
   AFTER INSERT, UPDATE
AS 
BEGIN
	DECLARE @idDetalle int
	SET NOCOUNT ON;
	
	SELECT @idDetalle = DetalleFacturas.Id FROM DetalleFacturas
		    INNER JOIN  inserted ON DetalleFacturas.Id = inserted.Id 
			WHERE DetalleFacturas.Id = inserted.Id;

    UPDATE p SET p.Existencia = (p.Existencia - d.Cantidad) FROM Productos p
		INNER JOIN DetalleFacturas d ON d.IdProducto = p.Id
		WHERE d.Id = @idDetalle;

END
GO