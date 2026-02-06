-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-02-2026 a las 21:17:15
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `foottech_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrenador_jugadores`
--

CREATE TABLE `entrenador_jugadores` (
  `id_entrenador` int(11) DEFAULT NULL,
  `id_jugador` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `entrenador_jugadores`
--

TRUNCATE TABLE `entrenador_jugadores`;
--
-- Volcado de datos para la tabla `entrenador_jugadores`
--

INSERT INTO `entrenador_jugadores` (`id_entrenador`, `id_jugador`, `id`) VALUES
(40, 39, 38);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `roles`
--

TRUNCATE TABLE `roles`;
--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'entrenador'),
(3, 'jugador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncar tablas antes de insertar `usuarios`
--

TRUNCATE TABLE `usuarios`;
--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `password`, `email`, `created_at`, `role_id`) VALUES
(13, 'Urko Arroyo Rivas', '$2b$10$3YdWsapN2Hnj84lTr9N.SuEvJ26q5x8ThQEA5TwM/w2kVTHYAqmG2', 'urkoarroyorivas@gmail.com', '2026-01-19 00:51:14.453648', 1),
(38, 'Ilerna Admin 1', '$2b$10$rdO6191nnP0IgYRKBywPHO0j6ywQxgPSvAglDR33EzEu84i9FCE0C', 'ilernaadmin1@gmail.com', '2026-02-03 20:32:33.235302', 1),
(39, 'Ilerna Jugador 3 ', '$2b$10$.FJ/NyZzs4cEc6KU1Sid9.hk0nR6zrQ/xq92nP7yga157nGDTLidG', 'ilernajugador3@gmail.com', '2026-02-03 20:32:50.856303', 3),
(40, 'Ilerna Entrenador 1 ', '$2b$10$hCrw1aX2M0XE5P5F0znU5OUycvHpZQzKpH.zcRNI3k2jic9Ad0aZ6', 'ilernaentrenador1@gmail.com', '2026-02-03 20:33:09.370229', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `entrenador_jugadores`
--
ALTER TABLE `entrenador_jugadores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `relation` (`id_entrenador`,`id_jugador`),
  ADD KEY `FK_5526ce509b71bd0704af822d771` (`id_jugador`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_648e3f5447f725579d7d4ffdfb` (`name`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `IDX_446adfc18b35418aac32ae0b7b` (`email`),
  ADD KEY `FK_933f1f766daaa16d3848d186a59` (`role_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `entrenador_jugadores`
--
ALTER TABLE `entrenador_jugadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `entrenador_jugadores`
--
ALTER TABLE `entrenador_jugadores`
  ADD CONSTRAINT `FK_5526ce509b71bd0704af822d771` FOREIGN KEY (`id_jugador`) REFERENCES `usuarios` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_bb8ce6969a0a2a7ca3a6062cc5f` FOREIGN KEY (`id_entrenador`) REFERENCES `usuarios` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `FK_933f1f766daaa16d3848d186a59` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
