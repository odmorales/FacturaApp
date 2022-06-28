--Primer sentencia
Select Nombre, Valor from Productos

--Segunda sentncia
Select Nombre, Valor from Productos Where Existencia = 5

--Tercera sentencia
Select c.Nombre, c.Apellido,c.Edad, f.FechaCompra from Clientes c 
	INNER JOIN Facturas f
	ON c.Id = f.IdCliente Where (c.Edad <= 35) AND Convert(Date,f.FechaCompra)
	BETWEEN '2000-02-01' and '2000-05-25'

--Cuerta sentencia
Select p.Nombre, SUM(d.Total) As Total From Facturas f INNER JOIN DetalleFacturas d
ON f.Id = d.FacturaId INNER JOIN Productos p
ON d.IdProducto = p.Id WHERE YEAR(f.FechaCompra) = '2000'
GROUP BY p.Nombre

--Quinta sentencia

SELECT MAX(FechaCompra) As UtimaCompra, 
MIN(FechaCompra) As PrimeraCompra, 
IdCliente, 
DATEDIFF(DAY,MIN(FechaCompra), MAX(FechaCompra)) As Rango, 
COUNT(*) As NumeroCompra, 
(DATEDIFF(DAY,MIN(FechaCompra),MAX(FechaCompra))/COUNT(*)) As FrecuenciaCompra, 
DateADD(DAY,(DATEDIFF(DAY,MIN(FechaCompra), MAX(FechaCompra))/COUNT(*)),MAX(FechaCompra)) As ProximaCompra
FROM Facturas Where IdCliente = 4
GROUP BY IdCliente