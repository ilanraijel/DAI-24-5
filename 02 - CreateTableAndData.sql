USE [DAI-Personaje]
GO

/****** Object:  Table [dbo].[Personajes]    Script Date: 3/5/2022 08:55:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Personajes](
	[Id] [int] NULL,
	[Imagen] [varchar](max) NULL,
	[Nombre] [varchar](250) NULL,
	[Edad] [int] NULL,
	[Peso] [int] NULL,
	[Historia] [varchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO