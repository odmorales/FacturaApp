USE [master]
GO
/****** Object:  Database [FacturaDB]    Script Date: 27/06/2022 7:15:03 p. m. ******/
CREATE DATABASE [FacturaDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FacturaDB', FILENAME = N'D:\SQL\MSSQL15.SQLEXPRESS\MSSQL\DATA\FacturaDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'FacturaDB_log', FILENAME = N'D:\SQL\MSSQL15.SQLEXPRESS\MSSQL\DATA\FacturaDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [FacturaDB] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [FacturaDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [FacturaDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [FacturaDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [FacturaDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [FacturaDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [FacturaDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [FacturaDB] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [FacturaDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [FacturaDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [FacturaDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [FacturaDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [FacturaDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [FacturaDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [FacturaDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [FacturaDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [FacturaDB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [FacturaDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [FacturaDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [FacturaDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [FacturaDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [FacturaDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [FacturaDB] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [FacturaDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [FacturaDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [FacturaDB] SET  MULTI_USER 
GO
ALTER DATABASE [FacturaDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [FacturaDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [FacturaDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [FacturaDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [FacturaDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [FacturaDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [FacturaDB] SET QUERY_STORE = OFF
GO
USE [FacturaDB]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 27/06/2022 7:15:03 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Clientes]    Script Date: 27/06/2022 7:15:03 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clientes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](max) NULL,
	[Apellido] [nvarchar](max) NULL,
	[Direccion] [nvarchar](max) NULL,
	[Edad] [int] NOT NULL,
 CONSTRAINT [PK_Clientes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DetalleFacturas]    Script Date: 27/06/2022 7:15:03 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DetalleFacturas](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdProducto] [int] NOT NULL,
	[Cantidad] [int] NOT NULL,
	[Valor] [money] NOT NULL,
	[Total] [money] NOT NULL,
	[FacturaId] [int] NULL,
 CONSTRAINT [PK_DetalleFacturas] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Facturas]    Script Date: 27/06/2022 7:15:03 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Facturas](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdCliente] [int] NOT NULL,
	[FechaCompra] [datetime2](7) NOT NULL,
	[Total] [money] NOT NULL,
 CONSTRAINT [PK_Facturas] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Productos]    Script Date: 27/06/2022 7:15:03 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Productos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdTipoProducto] [int] NOT NULL,
	[Nombre] [nvarchar](max) NULL,
	[Descripcion] [nvarchar](max) NULL,
	[Existencia] [float] NOT NULL,
	[Valor] [money] NOT NULL,
 CONSTRAINT [PK_Productos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TipoProductos]    Script Date: 27/06/2022 7:15:03 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoProductos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](max) NULL,
	[Descripcion] [nvarchar](max) NULL,
 CONSTRAINT [PK_TipoProductos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 27/06/2022 7:15:03 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UsuNombre] [nvarchar](max) NULL,
	[UsuPass] [nvarchar](max) NULL,
	[Rol] [nvarchar](max) NULL,
 CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220626030629_InitialCreate', N'6.0.1')
GO
SET IDENTITY_INSERT [dbo].[Clientes] ON 

INSERT [dbo].[Clientes] ([Id], [Nombre], [Apellido], [Direccion], [Edad]) VALUES (1, N'Oscar David', N'Morales Ortiz', N'Calle2B #41-64', 23)
INSERT [dbo].[Clientes] ([Id], [Nombre], [Apellido], [Direccion], [Edad]) VALUES (4, N'Luis', N'Diaz', N'Calle', 22)
SET IDENTITY_INSERT [dbo].[Clientes] OFF
GO
SET IDENTITY_INSERT [dbo].[DetalleFacturas] ON 

INSERT [dbo].[DetalleFacturas] ([Id], [IdProducto], [Cantidad], [Valor], [Total], [FacturaId]) VALUES (28, 9, 2, 1000.0000, 2000.0000, 19)
INSERT [dbo].[DetalleFacturas] ([Id], [IdProducto], [Cantidad], [Valor], [Total], [FacturaId]) VALUES (29, 9, 2, 1000.0000, 2000.0000, 19)
INSERT [dbo].[DetalleFacturas] ([Id], [IdProducto], [Cantidad], [Valor], [Total], [FacturaId]) VALUES (30, 9, 10, 34000.0000, 340000.0000, 20)
INSERT [dbo].[DetalleFacturas] ([Id], [IdProducto], [Cantidad], [Valor], [Total], [FacturaId]) VALUES (31, 9, 2, 3000.0000, 6000.0000, 21)
INSERT [dbo].[DetalleFacturas] ([Id], [IdProducto], [Cantidad], [Valor], [Total], [FacturaId]) VALUES (32, 9, 6, 2000.0000, 12000.0000, 22)
INSERT [dbo].[DetalleFacturas] ([Id], [IdProducto], [Cantidad], [Valor], [Total], [FacturaId]) VALUES (33, 10, 2, 3000.0000, 6000.0000, 23)
INSERT [dbo].[DetalleFacturas] ([Id], [IdProducto], [Cantidad], [Valor], [Total], [FacturaId]) VALUES (34, 10, 2, 3000.0000, 6000.0000, 23)
INSERT [dbo].[DetalleFacturas] ([Id], [IdProducto], [Cantidad], [Valor], [Total], [FacturaId]) VALUES (35, 9, 1, 1000.0000, 1000.0000, 24)
INSERT [dbo].[DetalleFacturas] ([Id], [IdProducto], [Cantidad], [Valor], [Total], [FacturaId]) VALUES (36, 8, 2, 1000.0000, 2000.0000, 25)
INSERT [dbo].[DetalleFacturas] ([Id], [IdProducto], [Cantidad], [Valor], [Total], [FacturaId]) VALUES (37, 8, 1, 1.0000, 1.0000, 26)
SET IDENTITY_INSERT [dbo].[DetalleFacturas] OFF
GO
SET IDENTITY_INSERT [dbo].[Facturas] ON 

INSERT [dbo].[Facturas] ([Id], [IdCliente], [FechaCompra], [Total]) VALUES (19, 4, CAST(N'2022-06-22T05:00:00.0000000' AS DateTime2), 4000.0000)
INSERT [dbo].[Facturas] ([Id], [IdCliente], [FechaCompra], [Total]) VALUES (20, 4, CAST(N'2022-06-24T05:00:00.0000000' AS DateTime2), 340000.0000)
INSERT [dbo].[Facturas] ([Id], [IdCliente], [FechaCompra], [Total]) VALUES (21, 4, CAST(N'2022-06-27T05:00:00.0000000' AS DateTime2), 6000.0000)
INSERT [dbo].[Facturas] ([Id], [IdCliente], [FechaCompra], [Total]) VALUES (22, 1, CAST(N'2000-02-02T05:00:00.0000000' AS DateTime2), 12000.0000)
INSERT [dbo].[Facturas] ([Id], [IdCliente], [FechaCompra], [Total]) VALUES (23, 1, CAST(N'2000-02-04T05:00:00.0000000' AS DateTime2), 12000.0000)
INSERT [dbo].[Facturas] ([Id], [IdCliente], [FechaCompra], [Total]) VALUES (24, 1, CAST(N'2000-03-15T05:00:00.0000000' AS DateTime2), 1000.0000)
INSERT [dbo].[Facturas] ([Id], [IdCliente], [FechaCompra], [Total]) VALUES (25, 1, CAST(N'2022-06-27T05:00:00.0000000' AS DateTime2), 2000.0000)
INSERT [dbo].[Facturas] ([Id], [IdCliente], [FechaCompra], [Total]) VALUES (26, 1, CAST(N'2022-06-27T05:00:00.0000000' AS DateTime2), 1.0000)
SET IDENTITY_INSERT [dbo].[Facturas] OFF
GO
SET IDENTITY_INSERT [dbo].[Productos] ON 

INSERT [dbo].[Productos] ([Id], [IdTipoProducto], [Nombre], [Descripcion], [Existencia], [Valor]) VALUES (8, 4, N'Coca-Cola', N'De litro', 5, 1000.0000)
INSERT [dbo].[Productos] ([Id], [IdTipoProducto], [Nombre], [Descripcion], [Existencia], [Valor]) VALUES (9, 4, N'Coca-Cola-Zero', N'Sin azucar ', 977, 2000.0000)
INSERT [dbo].[Productos] ([Id], [IdTipoProducto], [Nombre], [Descripcion], [Existencia], [Valor]) VALUES (10, 4, N'Alcohol', N'Contiene alcohol', 996, 2000.0000)
INSERT [dbo].[Productos] ([Id], [IdTipoProducto], [Nombre], [Descripcion], [Existencia], [Valor]) VALUES (11, 5, N'Redmi Note 8 Pro', N'Buen equipo', 5, 640000.0000)
SET IDENTITY_INSERT [dbo].[Productos] OFF
GO
SET IDENTITY_INSERT [dbo].[TipoProductos] ON 

INSERT [dbo].[TipoProductos] ([Id], [Nombre], [Descripcion]) VALUES (4, N'Bebidas', N'Azucaradas')
INSERT [dbo].[TipoProductos] ([Id], [Nombre], [Descripcion]) VALUES (5, N'Equipos', N'Tecnologia ')
SET IDENTITY_INSERT [dbo].[TipoProductos] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuarios] ON 

INSERT [dbo].[Usuarios] ([Id], [UsuNombre], [UsuPass], [Rol]) VALUES (1, N'Oscar', N'12345', N'ADMIN')
SET IDENTITY_INSERT [dbo].[Usuarios] OFF
GO
/****** Object:  Index [IX_DetalleFacturas_FacturaId]    Script Date: 27/06/2022 7:15:03 p. m. ******/
CREATE NONCLUSTERED INDEX [IX_DetalleFacturas_FacturaId] ON [dbo].[DetalleFacturas]
(
	[FacturaId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_DetalleFacturas_IdProducto]    Script Date: 27/06/2022 7:15:03 p. m. ******/
CREATE NONCLUSTERED INDEX [IX_DetalleFacturas_IdProducto] ON [dbo].[DetalleFacturas]
(
	[IdProducto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Facturas_IdCliente]    Script Date: 27/06/2022 7:15:03 p. m. ******/
CREATE NONCLUSTERED INDEX [IX_Facturas_IdCliente] ON [dbo].[Facturas]
(
	[IdCliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Productos_IdTipoProducto]    Script Date: 27/06/2022 7:15:03 p. m. ******/
CREATE NONCLUSTERED INDEX [IX_Productos_IdTipoProducto] ON [dbo].[Productos]
(
	[IdTipoProducto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[DetalleFacturas]  WITH CHECK ADD  CONSTRAINT [FK_DetalleFacturas_Facturas_FacturaId] FOREIGN KEY([FacturaId])
REFERENCES [dbo].[Facturas] ([Id])
GO
ALTER TABLE [dbo].[DetalleFacturas] CHECK CONSTRAINT [FK_DetalleFacturas_Facturas_FacturaId]
GO
ALTER TABLE [dbo].[DetalleFacturas]  WITH CHECK ADD  CONSTRAINT [FK_DetalleFacturas_Productos_IdProducto] FOREIGN KEY([IdProducto])
REFERENCES [dbo].[Productos] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[DetalleFacturas] CHECK CONSTRAINT [FK_DetalleFacturas_Productos_IdProducto]
GO
ALTER TABLE [dbo].[Facturas]  WITH CHECK ADD  CONSTRAINT [FK_Facturas_Clientes_IdCliente] FOREIGN KEY([IdCliente])
REFERENCES [dbo].[Clientes] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Facturas] CHECK CONSTRAINT [FK_Facturas_Clientes_IdCliente]
GO
ALTER TABLE [dbo].[Productos]  WITH CHECK ADD  CONSTRAINT [FK_Productos_TipoProductos_IdTipoProducto] FOREIGN KEY([IdTipoProducto])
REFERENCES [dbo].[TipoProductos] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Productos] CHECK CONSTRAINT [FK_Productos_TipoProductos_IdTipoProducto]
GO
/****** Object:  StoredProcedure [dbo].[SP_Prueba]    Script Date: 27/06/2022 7:15:03 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Prueba]
AS
PRINT 'Hola Mundo'
GO
/****** Object:  StoredProcedure [dbo].[SP_Prueba1]    Script Date: 27/06/2022 7:15:03 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Prueba1]
@fechaCompra as Date
AS
Select Convert(Date,FechaCompra)As Fecha, COUNT(@fechaCompra) As Total FROM Facturas
GROUP BY Convert(Date,FechaCompra)
GO
USE [master]
GO
ALTER DATABASE [FacturaDB] SET  READ_WRITE 
GO
